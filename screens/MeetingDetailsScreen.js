import React from "react";
import { View, StyleSheet, SafeAreaView, Text, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import constant from "../constants/constant";
const mainColor = constant.mainColor;
const secondaryColor = constant.secondaryColor;
const borderRadius = constant.borderRadius;
import FontAwesome from "react-native-vector-icons/FontAwesome";

// import components
import Header from "../components/Header";

export default function MeetingDetailsScreen  ({ navigation })  {

  //fonction pour anviguer vers le feedback
  const handleFeedback = () => {
    navigation.navigate("googleForm")
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.firstContainer}>
        <Text style={styles.detailText}>Details rendez-vous</Text>
        <Text style={styles.status}> Status du rendez-vous</Text>

        <View style={styles.pageClient}>
          <Text style={styles.idClient}>Client ID :</Text>

          <ScrollView style={styles.clientContainer} showsVerticalScrollIndicator={false}>
            <Text style={styles.clientText}>DATE/HEURE</Text>
            <Text style={styles.clientText}>John Doe</Text>
            <Text style={styles.clientText}>
              56 boulevard Pereire 75017 Paris
            </Text>
            <Text style={styles.clientText}>06.63.07.02.79</Text>
            <Text style={styles.clientText}>john.doe@gmail.com</Text>
          </ScrollView>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btnAnnuler}>
            <Text style={styles.annuler}>Annuler le RDV</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnAppeler}>
            <FontAwesome
              style={styles.icon}
              name="phone"
              size={15}
              color="white"
            />
            <Text style={styles.appeler}>Appeler</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.detailsProduct} showsVerticalScrollIndicator={false}>
          <Text style={styles.textProduct}>Vélo</Text>
          <View style={styles.details}>
            <Text>Marque</Text>
            <Text>Modele</Text>
            <Text>Details techniques</Text>
          </View>
        </ScrollView>
        <View style={styles.btnTest}>
          <TouchableOpacity style={styles.test}>
            <Text style={styles.textTest}>Test terminé</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnFeedback} onPress={()=> handleFeedback()}>
            <Text style={styles.feedback}>Feedback</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  firstContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    height: "20%",
    padding : 5,
  },
  detailText: {
    fontSize: 24,
    fontWeight: "600",
    marginVertical: 10,
    color: "#000",
  },
  status: {
    fontSize: 20,
    fontWeight: "300",
    color: "#cfcfcf",
    borderColor: "#cfcfcf",
    borderWidth: 2,
    width: "60%",
    padding: 2,
    marginTop: 10,
  },
  pageClient: {
    height: "26%",
    width: "100%",
  },
  idClient: {
    fontSize: 15,
    marginTop: 7,
  },
  clientContainer: {
    borderColor: "#cfcfcf",
    borderWidth: 2,
    marginTop: 3,
    padding: 10,
  },
  clientText: {
    marginVertical: 3,
  },
  btnContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    height: "12%",
    width: "100%",
    flexDirection: "row",
    marginTop: 50,
  },
  btnAnnuler: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: borderRadius,
    borderColor: "red",
    borderWidth: 1,
    marginVertical: 10,
    width : "100%"
  },
  annuler: {
    color: "red",
    fontWeight: 600,
  },
  btnAppeler: {
    backgroundColor: "#cfcfcf",
    padding: 10,
    borderRadius: borderRadius,
    borderColor: "#cfcfcf",
    borderWidth: 1,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "70%"
  },
  appeler: {
    color: "white",
    fontWeight: 600,
  },
  detailsProduct: {
    width: "100%",
    height: "20%",
  },
  textProduct: {
    fontSize: 15,
  },
  details: {
    borderColor: "#cfcfcf",
    borderWidth: 2,
    width: "100%",
    height: "80%",
  },
  btnTest: {
    width: "100%",
    height: "10%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
  },
  test: {
    borderColor: "#cfcfcf",
    borderWidth: 1,
    backgroundColor: "#cfcfcf",
    borderRadius: borderRadius,
    width: "150%",
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  textTest: {
    color: "white",
    fontWeight: 600,
  },
  btnFeedback: {
    borderWidth: 1,
    borderColor: mainColor,
    width: "190%",
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: mainColor,
    borderRadius: borderRadius,
  },
  feedback: {
    color: "white",
    fontWeight: 600,
  },
});
