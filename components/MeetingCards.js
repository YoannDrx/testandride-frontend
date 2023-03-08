import FontAwesome from "react-native-vector-icons/FontAwesome";

import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { importMeetingDetailsStore } from "../reducers/meetingDetails";

// style constants

import constant from "../constants/constant";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const mainColor = constant.mainColor;
const secondaryColor = constant.secondaryColor;
const borderRadius = constant.borderRadius;
const secondaryBackground = constant.secondaryBackground;
const logoPath = constant.logoPath;
const mainBackground = constant.mainBackground;
const dangerColor = constant.dangerColor;
const btnPadding = constant.btnPadding;
const warningColor = constant.warningColor;


// environnement variables
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// modules
import { callNumber } from "../modules/callNumber";
import { statuStyle } from "../modules/statutStyle";


export default function MeetingCards(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modelData, setModelData] = useState(null);
  const [minTrajet,setMinTrajet] = useState(0);
  const dispatch = useDispatch();
  


  // get data of brand and model
    useEffect(() => {
      
      const getModelData = async (modelId) => {
        const response = await fetch(`${BACKEND_URL}/airtable/bike/${modelId}`);
        const data = await response.json();
        setModelData(data.data);
      };
      const modelId = props.card.fields["Modèle"][0];
      getModelData(modelId);

      // effet wahou / efffake
      setMinTrajet(26 + Math.floor(Math.random()*10+1)-5);
      
    }, []);

  // Toogle the modal cards
    const toggleVisible = () => {
      setModalVisible(!modalVisible);
    };

  // Fetch data API gouv
    const fetchGeoLoc = async (queryString) => {
      const response = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${queryString}&limit=1`
      );
      const data = await response.json();
      const dataCoords = {
        longitude: data.features[0].geometry.coordinates[0],
        latitude: data.features[0].geometry.coordinates[1],
      };

      return dataCoords;
    };

  // Handle the press on the GO button and redirect to the map page
    const handleGoPress = async (queryString) => {
      if (modelData) {
        const position = await fetchGeoLoc(queryString);
        // Add the meeting in the store
        dispatch(
          importMeetingDetailsStore({ position: position, model: modelData, infos: props.card  })
        );
        props.navigation.navigate("itineraire");
      } else {
        alert("En attente du chargement des données de vélos");
      }
    };

  // Handle the press on the INFO button and redirect to the meetingDetail page
    const handleInfoPress = async () => {
      if (modelData) {
         dispatch(
          importMeetingDetailsStore({ model: modelData, infos: props.card })
        );
        await props.navigation.navigate("meetingDetails");
      } else {
        alert("En attente du chargement des données de vélos");
      }
    };

  // format time of course
    const formatDateTime = () => {
      if (props.card.fields.date_essai) {
        const date = new Date(props.card.fields.date_essai);
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const formatedTime = hours + "h" + minutes;

        return formatedTime;
      } else {
        return "error";
      }
    };

  // construire l'image du bike avec une image par défaut en cas de problème.
    let bikeImage = (
      <FontAwesome name="bicycle" size={20} color={secondaryColor} />
    );

    if (modelData) {
      bikeImage = (
        <Image
          style={styles.thumbnails}
          src={modelData.fields.packshot[0].thumbnails.small.url}
        />
      );
    }


  return (
    <View style={styles.container}>
      {/* CARDS */}
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => toggleVisible()}
      >
        <View style={styles.card}>
          {/* Image container */}
          <View style={styles.imageBox}>
            <Text  style={[styles.statut,statuStyle(props.card.fields["Statut"])]}>{props.card.fields["Statut"]}</Text>
            <Text style={styles.textHour}>{formatDateTime()}</Text>
            {bikeImage}
          </View>
          {/* Data container */}
          <View style={styles.dataContainer}>
            <View style={styles.dataBox}>
              <Text style={styles.textMinutes}>Id {props.card.fields["Course_id"]} - {minTrajet} min</Text>
            </View>
            <View style={styles.dataBox}>
              <Text style={styles.bold}>
                {modelData && modelData.fields["nom_marque"]}
              </Text>
            </View>
            <View style={styles.dataBox}>
              <Text style={styles.bold}>
                {modelData && modelData.fields["nom_velo"]}
              </Text>
            </View>
          </View>

          {/* button GO */}
          <TouchableOpacity
            style={styles.btnGo}
            onPress={() => handleGoPress(props.card.fields.client_adresse)}
          >
            <Text style={styles.textGo}>GO</Text>
          </TouchableOpacity>
        </View>
        <FontAwesome
          name="chevron-down"
          size={20}
          color={secondaryColor}
          onPress={() => toggleVisible()}
        />

        {modalVisible && (
          <View style={styles.modalContainer}>
            <View style={styles.address}>
              <Text style={styles.modalTextName}>
                {props.card.fields.client_prenom_nom}
              </Text>
              <Text style={styles.modalText}>
                {props.card.fields.client_adresse}
              </Text>
            </View>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                style={styles.iconBox}
                onPress={() =>
                  callNumber(props.card.fields["client_telephone"])
                }
              >
                <FontAwesome
                  style={styles.icon}
                  name="phone"
                  size={35}
                  color={secondaryColor}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconBox}
                onPress={() => handleInfoPress()}
              >
                <FontAwesome
                  style={styles.icon}
                  name="info"
                  size={35}
                  color={secondaryColor}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  window: {
    height: screenHeight,
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
  },
  /*
   *** Cards
   */
  cardContainer: {
    marginBottom: 10,
    borderRadius: borderRadius,
    alignItems: "center",
    backgroundColor: mainBackground,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
    padding: 5,
  },
  imageBox: {
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 5,
    height:'100%',


  },
  statut:{
    width:'100%',
    color:secondaryColor,
    fontSize:10,
    padding:2,
    borderRadius:borderRadius,
    
  },
  thumbnails: {
    width: 36,
    height: 36,
  },
  textHour: {
    fontSize: 20,
    fontWeight: 600,
  },
  textMinutes: {
    color: secondaryColor,
  },
  avatar: {
    width: 50,
    height: 50,
  },
  dataContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    flex: 1,
    paddingLeft: 15,
  },
  dataBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:'flex-start',
    marginBottom: 5,
  },
  bold: {
    fontSize: 16,
    fontWeight: 600,
  },
  btnGo: {
    backgroundColor: mainColor,
    borderRadius: borderRadius,
    padding: 5,
    width: 50,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  textGo: {
    color: "#fff",
    fontWeight: 600,
  },
  chevronContainer: {
    top: -30,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  /*
   *** Modal
   */
  modalContainer: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: borderRadius,
    padding: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: secondaryBackground,
    borderColor: secondaryColor,
    borderRadius: borderRadius,
    padding: btnPadding,
    width: "45%",
  },
  modalText: {
    fontSize: 16,
  },
  modalTextName: {
    fontSize: 16,
    fontWeight: 600,
  },
  modalTextIcon: {
    fontSize: 16,
    fontWeight: 600,
    marginLeft: 10,
  },
  address: {
    borderTopColor: mainColor,
    borderTopWidth: 1,
    marginBottom: 10,
    paddingTop: 10,
  },
});
