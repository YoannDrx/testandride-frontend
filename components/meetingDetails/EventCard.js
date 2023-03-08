import { callNumber } from "../../modules/callNumber";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
} from "react-native";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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

export default function EventCard() {
  const [showDetails, setShowDetails] = useState(false);

  const meetingDetails = useSelector((state) => state.meetingDetails.value);

  // afficher détails
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

 const handleReprog = ()=>{
    const reprogLink = meetingDetails.infos.fields["Événement"].match(/https:\/\/calendly\.com\/reschedulings\/\S+/);
    if (reprogLink){
        // Linking.openURL(reprogLink);
        alert('pas de reprog en preprod sur calendly')
    }else { alert('lien Calendly Invalid')}
};
const handleCancelClient = ()=>{
    const cancelLink = meetingDetails.infos.fields["Événement"].match(/https:\/\/calendly\.com\/cancellations\/\S+/);
    if (reprogLink){
        // Linking.openURL(cancelLink);
        alert('pas d annulation en preprod sur calendly')
    }else { alert('lien Calendly Invalid')}
}

  

  return (
    <View style={styles.Container}>
      <TouchableOpacity
        style={styles.clientHeader}
        onPress={() => toggleDetails()}
      >
        <FontAwesome style={styles.icon} name="calendar" size={30} color="black" />
        <Text style={styles.idClient}>
          Evènement
        </Text>
        <FontAwesome
          style={styles.icon}
          name={showDetails ? "chevron-up" : "chevron-down"}
          size={30}
          color={secondaryColor}
        />
      </TouchableOpacity>

      {showDetails && (
        <View style={styles.clientDetails}>
            <Text>{meetingDetails.infos.fields["Événement"]}</Text>
            <View style={styles.btnClientContainer}>
        <TouchableOpacity style={styles.btnCancel} onPress={()=>handleCancelClient()}>
        <FontAwesome
            style={styles.iconPhone}
            name="times"
            size={15}
            color={dangerColor}
          />
          <Text style={styles.cancelText}>Annuler Client</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnCancel}
          onPress={() => handleReprog()}
        >
          <FontAwesome
            style={styles.iconPhone}
            name="hourglass"
            size={15}
            color={dangerColor}
          />
          <Text style={styles.cancelText}>Reprog</Text>
        </TouchableOpacity>
      </View>

        </View>
      )}
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  clientHeader: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    backgroundColor: mainBackground,
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

  dataContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textStyle: {
    fontSize: 16,
    marginBottom: 3,
  },
  labelStyle: {
    fontSize: 12,
    color: secondaryColor,
    width: "40%",
  },
  idClient: {
    fontWeight: "600",
    fontSize: 18,
  },
  clientDetails: {
    borderColor: "lightgrey",
    borderWidth: 1,
    justifyContent: "space-between",
    padding: 10,
    marginTop: 10,
    borderRadius: borderRadius,
  },
  textStyle: {
    fontSize: 16,
    marginBottom: 3,
  },

  btnClientContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: 10,
  },
  btnCancel: {
    borderColor: dangerColor,
    borderWidth: 1,
    borderRadius: borderRadius,
    padding: btnPadding,
    justifyContent: "center",
    alignItems: "center",
    width: "45%",
    flexDirection:'row',
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
    width: "45%",
  },
  iconPhone: {
    marginRight: 5,
  },
  callText: {
    color: "white",
    fontWeight: "600",
  },
});
