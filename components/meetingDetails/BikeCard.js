import FontAwesome from "react-native-vector-icons/FontAwesome";

import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking
} from "react-native";

import { useState, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";

// style constants

import constant from "../../constants/constant";
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

export default function BikeCard() {
    const [showDetails, setShowDetails] = useState(false);

    const meetingDetails = useSelector((state) => state.meetingDetails.value);
    const modelData = meetingDetails.model
  
    const toggleDetails = ()=>{
      setShowDetails(!showDetails)
    }
    const handleOpenPitch= (url)=>{
        console.log(url)
        if (url){
            console.log('opening external link :',url);
        Linking.openURL(url);
        } else {
            alert('pas de pitch pour ce vélo')
        }
        
    }

  return (
    <View style={styles.Container}>
      <TouchableOpacity
        style={styles.bikeHeader}
        onPress={() => toggleDetails()}
      >
        <Image
          style={styles.bikePhoto}
          src={modelData.fields.packshot[0].thumbnails.large.url}
        />
        <View style={styles.bikeIdContainer}>
          <Text style={styles.bikeTxt}>{modelData.fields.nom_marque}</Text>
          <Text style={styles.bikeTxt}>{modelData.fields.nom_velo}</Text>
          <TouchableOpacity
            style={styles.linkContainer}
            onPress={() => handleOpenPitch(modelData.fields.pitchLink)}
          >
            <Text style={styles.link}>Lien pitch</Text>
            <FontAwesome
              style={styles.icon}
              name={"external-link"}
              size={15}
              color={mainColor}
            />
          </TouchableOpacity>
        </View>
        <FontAwesome
          style={styles.icon}
          name={showDetails ? "chevron-up" : "chevron-down"}
          size={30}
          color={secondaryColor}
        />
      </TouchableOpacity>

      {showDetails && (
        <View style={styles.clientDetails}>
          <View style={styles.dataContainer}>
            <Text style={styles.labelStyle}>Date de réception :</Text>
            <Text style={styles.textStyle}>
             
              {modelData.fields.dateReception}
            </Text>
          </View>
          <View style={styles.dataContainer}>
            <Text style={styles.labelStyle}>Stock :</Text>
            <Text style={styles.textStyle}>
                {modelData.fields.stock}
            </Text>
          </View>
          <View style={styles.dataContainer}>
            <Text style={styles.labelStyle}>Poids :</Text>
            <Text style={styles.textStyle}>
            
              {modelData.fields.caracteristics.poids} Kgs
            </Text>
          </View>
          <View style={styles.dataContainer}>
            <Text style={styles.labelStyle}>Position :</Text>
            <Text style={styles.textStyle}>
           
              {modelData.fields.caracteristics.position}
            </Text>
          </View>
          <View style={styles.dataContainer}>
            <Text style={styles.labelStyle}>Pliant :</Text>
            <Text style={styles.textStyle}>
              
              {modelData.fields.caracteristics.pliant}
            </Text>
          </View>
          <View style={styles.dataContainer}>
            <Text style={styles.labelStyle}>Cadre :</Text>
            <Text style={styles.textStyle}>
             
              {modelData.fields.caracteristics.cadre}
            </Text>
          </View>
          <View style={styles.dataContainer}>
            <Text style={styles.labelStyle}>Siège enfant :</Text>
            <Text style={styles.textStyle}>
             
              {modelData.fields.caracteristics.siegeEnfant}
            </Text>
          </View>
          <View style={styles.dataContainer}>
            <Text style={styles.labelStyle}>Batterie amovible :</Text>
            <Text style={styles.textStyle}>
             
              {modelData.fields.caracteristics.batterieAmovible}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}


   
const styles = StyleSheet.create({
    bikeHeader: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding:10,
    
  },
  icon: {
    marginRight: 10,
  },
  Container: {
    justifyContent: "space-between",
    margin: 10,
    padding: 10,
    borderRadius: borderRadius,
    backgroundColor: mainBackground,
  },

  idClient: {
    fontWeight: "600",
    fontSize: 16,
  },
  clientDetails: {
    borderColor: "lightgrey",
    borderWidth: 1,
    justifyContent: "space-between",
    padding: 10,
    marginTop: 10,
    borderRadius: borderRadius,
  },
  dataContainer:{
    flexDirection:'row',
    alignItems:'center',
  },
  textStyle: {
    fontSize: 16,
    marginBottom: 3,
  },
  labelStyle:{
    fontSize: 12,
    color:secondaryColor,
    width:'40%'
  },
  linkContainer:{
    flexDirection:'row',
    alignItems:'center',
  },
  link:{
    paddingRight:5,
    fontSize: 16,
    color:mainColor,
  },

  btnClientContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical:10,
  },
  btnCancel: {
    borderColor: dangerColor,
    borderWidth: 1,
    borderRadius: borderRadius,
    padding: btnPadding,
    justifyContent: "center",
    alignItems: "center",
    width:'45%'
  },
  cancelText: {
    color: dangerColor,
    fontWeight: "600",
  },
  btnCall: {
    borderColor: mainColor,
    backgroundColor: mainColor,
    borderWidth: 1,
    borderRadius: borderRadius,
    padding: btnPadding,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width:'45%'
  },
  iconPhone: {
    marginRight: 5,
  },
  callText: {
    color: "white",
    fontWeight: "600",
  },
  bikePhoto:{
    width:80,
    height:80,
  }
})

