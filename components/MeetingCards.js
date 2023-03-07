import FontAwesome from "react-native-vector-icons/FontAwesome";

import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Linking,
  Platform,
  Alert,
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


export default function MeetingCards(props) {

  const [modalVisible, setModalVisible] = useState(false);
  const [modelData,setModelData] = useState(null);
  const dispatch = useDispatch();


  // get data of brand and model 
        useEffect(() => {
            const getModelData = async (modelId)=> {
                const response = await fetch(`${BACKEND_URL}/airtable/bike/${modelId}`);
                const data = await response.json();
                setModelData(data.data);
            };
            const modelId = props.fields['Modèle'][0];
            getModelData(modelId);
        }, [])
      
    // Fonction pour lancer l'appel téléphonique
        const callNumber = (phone) => {
           
            let phoneNumber = phone;
            if (Platform.OS !== "android") {
            phoneNumber = `telprompt:${phone}`;
            } else {
            phoneNumber = `tel:${phone}`;
            }
            Linking.canOpenURL(phoneNumber)
            .then((supported) => {
                if (!supported) {
                Alert.alert("Phone number is not available");
                } else {
                return Linking.openURL(phoneNumber);
                }
            })
            .catch((err) => console.log(err));
        };

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
        console.log(dataCoords);
        return dataCoords;
      };

  // Handle the press on the GO button and redirect to the map page
  
  const handleGoPress = async (queryString) => {
    const position = await fetchGeoLoc(queryString);
    // Add the meeting in the store
     dispatch(importMeetingDetailsStore({position:position,model:modelData}));
     props.navigation.navigate("itineraire");
  };

  
  
  
 


  // format time of course
  const formatDateTime = ()=>{
    if (modelData){const date = new Date(props.fields.date_essai);
      const hours = date.getHours()<10?'0'+date.getHours():date.getHours();
      const minutes = date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes();
      const formatedTime = hours + 'h' + minutes;
     
      return formatedTime;}
    
  }
  // get url of bike image 36x36
 const urlBikeImg = modelData && modelData.fields.Packshot[0].thumbnails.small.url;

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
            <Text style={styles.textHour}>{formatDateTime()}</Text>
            
            
            {modelData && <Image  resizeMode="contain" style={styles.thumbnails} src={modelData && urlBikeImg}/>}
           
          </View>
          {/* Data container */}
          <View style={styles.dataContainer}>
            <View style={styles.dataBox}>
              <Text style={styles.textMinutes}>15 min</Text>
            </View>
            <View style={styles.dataBox}>
              <Text style={styles.bold}>{modelData && modelData.fields["nom_marque_pretty"]}</Text>
            </View>
            <View style={styles.dataBox}>
              <Text style={styles.bold}>{modelData && modelData.fields["nom_velo_pretty"]}</Text>
            </View>
          </View>

          {/* button GO */}
          <TouchableOpacity
            style={styles.btnGo}
            onPress={()=> handleGoPress(props.fields.client_adresse)}
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
                {props.fields.client_prenom_nom}
              </Text>
              <Text style={styles.modalText}>
                {props.fields.client_adresse}
              </Text>
            </View>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                style={styles.iconBox}
                onPress={() => callNumber(props.fields["client_telephone"])}
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
                onPress={() => console.log('info click')}
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
    borderColor: "lightgrey",
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: borderRadius,
    alignItems: "center",
    backgroundColor: mainBackground,
  },
  cardBgDefault: {
    backgroundColor: mainBackground,
  },

  cardBgError: {
    backgroundColor: dangerColor,
  },
  cardBgWarning: {
    backgroundColor: warningColor,
  },
  cardBgDone: {
    backgroundColor: mainColor,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
    padding: 5,
  },
  imageBox: {
    justifyContent: "center",
    alignItems: "center",
    padding:5,
  },
  thumbnails:{
    width:36,
    height:36,
    
  },
  textHour: {
    fontSize: 20,
    fontWeight: 600,
  },
  textMinutes:{
    color:secondaryColor,
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
