import React, { useState,useEffect } from "react";
import { View, StyleSheet, Text,StatusBar,Platform,TouchableOpacity } from "react-native";
import { Dimensions, SafeAreaView, ScrollView } from "react-native";
import { useSelector } from "react-redux";
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

// Calendar 
import * as Calendar from 'expo-calendar';  

// import components
import Header from "../components/Header";
import MeetingCards from "../components/MeetingCards";
import CalendarDatePicker from "../components/CalendarDatePicker";
import { Link } from "@react-navigation/native";

export default function MaJourneeScreen({ navigation }) {
    const user = useSelector(state => state.user.value)
    const [proCalendars,setProCalendars] = useState();
    const [proMeetings,setProMeetings] = useState();

 
    // Permissions
    useEffect(() => {
        (async () => {
          const { status } = await Calendar.requestCalendarPermissionsAsync();
          if (status === 'granted') {
            const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
            const filteredCalendars = calendars.filter(calendar => {
                return calendar.ownerAccount === user.email;
            })
            console.log(filteredCalendars);
            console.log(user) 
          }
        })();
      }, []);


    // State qui permet de stocker la date sélectionnée dans le calendrier
    const [date, setDate] = useState(new Date());

    // Fonction qui permet de mettre à jour la date dans le composant enfant via les props
    const handleDateChange = (date) => {
        setDate(date);
    };

    return (
        <SafeAreaView style={styles.container}>
             <View style={styles.bodyContainer}>
            <Header navigation={navigation} />
           
            {/* Date Picker */}
            <View style={styles.dateContainer}>
                <Text style={styles.title}>Mes rendez-vous</Text>
                <CalendarDatePicker handleDateChange={handleDateChange} />
            </View>

            {/* Meeting Cars */}
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Test affichage */}
                <MeetingCards />
                <MeetingCards />
                <MeetingCards />
                <MeetingCards />
                <MeetingCards />
                <MeetingCards />
                <MeetingCards />
                <MeetingCards />
                <MeetingCards />
                <MeetingCards />
                <MeetingCards />
                <MeetingCards />
            </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: mainBackground,
    },
    bodyContainer:{
        backgroundColor:secondaryBackground,
        width:'100%',
        alignItems: "center",
        justifyContent: "flex-start",
    },
    /*
     *** Calendar
     */
    dateContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        
        borderBottomColor: mainColor,
        borderBottomWidth: 1,
        paddingBottom: 20,
        marginBottom: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: 600,
        padding: 5,
        top: 10,
    },
    scrollContent: {
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 5,
    },
    
});
