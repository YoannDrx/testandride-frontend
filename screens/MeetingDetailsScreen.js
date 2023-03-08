import React from "react";
import { View, StyleSheet, SafeAreaView, Text, ScrollView, Dimensions } from "react-native";

// hooks
import { useSelector } from "react-redux";

// modules
import {callNumber} from '../modules/callNumber';
import {statutStyle} from '../modules/statutStyle';
import { updateCourseStatut } from "../modules/updateCourseStatut";
import { TouchableOpacity } from "react-native-gesture-handler";
import FontAwesome from "react-native-vector-icons/FontAwesome";

//components
import BikeCard from "../components/meetingDetails/BikeCard";
import ClientCard from "../components/meetingDetails/ClientCard";

// Style constants
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


export default function MeetingDetailsScreen  ({ navigation })  {
    
  const meetingDetails = useSelector(state => state.meetingDetails.value)
    console.log(meetingDetails.model)
  //fonction pour anviguer vers le feedback
  const handleFeedback = () => {
    navigation.navigate("feedback")
  };

  //fonctioner pour changer le statut du test en "fait"
  const handleFinishTest=()=>{
    updateCourseStatut('Fait',meetingDetails.infos.id);
  };
 
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.bodyContainer}>
                <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>
                    <FontAwesome style={styles.iconBack} name="arrow-left" size={30} />
                    <Text style={styles.backText}>Retour</Text>
                </TouchableOpacity>
                <View style={styles.infoHeaderRdvContainer}>
                        <View style={styles.iconBox}>
                            <FontAwesome style={styles.icon} name="calendar" size={30} color="black" />
                            <Text style={styles.title}>Infos rendez-vous :</Text>
                        </View>
                        <View>
                            <View style={styles.statusContainer}>
                                <View style={styles.statusBox}>
                                    <FontAwesome style={styles.iconCircle} name="circle" size={20} color="green" />
                                    <Text style={styles.statusText}>En attente</Text>
                                </View>
                                <Text style={styles.idRdv}>ID: 242436435324</Text>
                            </View>
                        </View>
                    </View>
                <ScrollView>
                    {/* HEADER STATUS */}
                    
                    <ClientCard/>
                    <BikeCard/>
                  
                   
                </ScrollView>

                {/* BUTTONS PART */}
                {/*  */}
            </View><View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.btnDone}>
                        <Text style={styles.doneText}>Test terminé</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnFeedback} onPress={() => handleFeedback()}>
                        <Text style={styles.feedbackText}>Feedback</Text>
                    </TouchableOpacity>
                </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: secondaryBackground,
    },
    bodyContainer: {
        width: screenWidth,
        height: screenHeight * 0.9,
        justifyContent: "space-between",
    },
    iconBox: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    icon: {
        marginRight: 10,
    },
    /*
     *** HEADER
     */
    iconBack: {
        marginRight: 10,
        color: dangerColor,
    },
    backText: {
        fontSize: 16,
        fontWeight: '600',
    },
    header: {
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        width: screenWidth,
        padding: btnPadding,
    },
    /*
     *** HEADER STATUS
     */
    infoHeaderRdvContainer: {
        justifyContent: "center",
        alignItems: "flex-start",
        padding: btnPadding,
        borderColor: "lightgrey",
       
        margin: 10,
        borderRadius: borderRadius,
        backgroundColor: mainBackground,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
    },
    statusContainer: {

        
        justifyContent: "flex-start",
        padding: 10,
        marginTop: 10,
        borderRadius: borderRadius,
    },
    statusBox: {
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: 5,
    },
    statusText: {
        fontSize: 16,
        fontWeight: '600',
    },
    iconCircle: {
        marginRight: 10,
    },
    /*
     *** CLIENT INFO PART
     */
    clientContainer: {
       
       
        height: screenHeight * 0.3,
        justifyContent: "space-between",
        margin: 10,
        borderRadius: borderRadius,
        backgroundColor: mainBackground,
    },
    clientHeader: {
        justifyContent: "space-between",
        padding: 10,
    },
    idClient: {
        fontWeight: '600',
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
    textStyle: {
        fontSize: 16,
        marginBottom: 3,
    },
    /*
     *** CLIENT BUTTONS PART
     */
    btnClientContainer: {
        justifyContent: "space-around",
        flexDirection: "row",
        padding: 10,
        marginBottom: "10%",
    },
    btnCancel: {
        borderColor: dangerColor,
        borderWidth: 1,
        borderRadius: borderRadius,
        padding: btnPadding,
        justifyContent: "center",
        alignItems: "center",
        width: screenWidth * 0.4,
    },
    cancelText: {
        color: dangerColor,
        fontWeight: '600',
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
        width: screenWidth * 0.4,
    },
    iconPhone: {
        marginRight: 5,
    },
    callText: {
        color: "white",
        fontWeight: '600',
    },
    /*
     *** BIKE PART
     */
    
    /*
     *** BUTTONS PART
     */
    btnContainer: {
        width: screenWidth,
        justifyContent: "space-around",
        flexDirection: "row",
        padding: 10,
    },
    btnDone: {
        borderColor: mainColor,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderRadius: borderRadius,
        padding: btnPadding,
        justifyContent: "center",
        alignItems: "center",
      
    },
    doneText: {
        color: mainColor,
        fontWeight: '600',
    },
    btnFeedback: {
        borderColor: mainColor,
        backgroundColor: mainColor,
        borderWidth: 1,
        borderRadius: borderRadius,
        padding: btnPadding,
        justifyContent: "center",
        alignItems: "center",
      
    },
    feedbackText: {
        color: "#fff",
        fontWeight: '600',
    },
});
