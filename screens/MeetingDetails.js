import React from "react";
import { View, StyleSheet, SafeAreaView, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import constant from "../constants/constant";
const mainColor = constant.mainColor;
const secondaryColor = constant.secondaryColor;
const borderRadius = constant.borderRadius;

// import components
import Header from "../components/Header";

export default MeetingDetails = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.firstContainer}>
        <Text style={styles.detailText}>Details rendez-vous</Text>
        <Text style={styles.status}> Status du rendez-vous</Text>

        <View style={styles.pageClient}>
          <Text style={styles.idClient}>Client ID :</Text>
          <View style={styles.clientContainer}>
            <Text style={styles.clientText}>DATE/HEURE</Text>
            <Text style={styles.clientText}>John Doe</Text>
            <Text style={styles.clientText}>
              56 boulevard Pereire 75017 Paris
            </Text>
            <Text style={styles.clientText}>06.63.07.02.79</Text>
            <Text style={styles.clientText}>john.doe@gmail.com</Text>
          </View>
        </View>
        <View style={styles.btnContainer}>
      <TouchableOpacity style={styles.btnAnnuler}>
        <Text style={styles.annuler}>Annuler le RDV</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnAppeler}>
        <Text style={styles.appeler}>Appeler</Text>
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
    borderColor: "yellow",
    borderWidth: 2,
    height: "20%"
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
    borderWidth : 1,
    justifyContent:"space-evenly",
    alignItems:"center",
    height:"15%",
    width: "80%",
    flexDirection: "row",
    marginTop : 50,
  },
  btnAnnuler: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: borderRadius,
    borderColor : "red",
    borderWidth:1,
    marginVertical: 10,
    width: "100%"
  },
  annuler :{
    color : "red",
  },
  btnAppeler :{
    backgroundColor: "grey",
    padding: 10,
    borderRadius: borderRadius,
    borderColor : "grey",
    borderWidth:1,
    marginVertical: 10,
    width: "100%"
  },
  appeler :{
    color :"white"
  }
});
