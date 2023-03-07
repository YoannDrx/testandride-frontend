import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, StatusBar, Platform, TouchableOpacity } from "react-native";
import { Dimensions, SafeAreaView, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { importMeetingsStore } from "../reducers/myMeetings";

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

// environnement variables
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;



// Import components
import Header from "../components/Header";
import MeetingCards from "../components/MeetingCards";
import CalendarDatePicker from "../components/CalendarDatePicker";

export default function MaJourneeScreen({ navigation }) {
    const user = useSelector((state) => state.user.value);
    const meetings = useSelector((state) => state.myMeetings.value);

    // State qui permet de stocker la date sélectionnée dans le calendrier
    const [date, setDate] = useState(new Date());
    const [meetingsCards, setMeetingsCards] = useState([<Text key={0}>Pas de courses aujourd'hui</Text>]);
    // update reducer mymeeting with courses from airtable
  
    
    useEffect(() => {
        const monthStr = date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth();
        const dayStr = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        const formatedDate = `${date.getFullYear()}-${monthStr}-${dayStr}`;
        
        const fetchCoursesAirtable = async () => {
            const response = await fetch(`${BACKEND_URL}/airtable/courses/${formatedDate}`);
            const dataFetch = await response.json();
            
            if (dataFetch.result) {
                const filteredMeetings = await dataFetch.data.records.filter((course) => course.fields["Rider_email"][0] === user.email);
                // Map the cardsData array to create a MeetingCards component for each object
                if (filteredMeetings.length){
                    
                const mappedMeetings = await filteredMeetings.map((card,index) => {
                    return <MeetingCards key={'c-'+index+card.fields["Course_id"]} {...card} navigation={navigation} />;
                });
                setMeetingsCards(mappedMeetings);
                
                } 
                
            } else {
                alert("Error while retrieving data from airTable");
            }
        };
        fetchCoursesAirtable();
    }, [date]);

    // Fonction qui permet de mettre à jour la date dans le composant enfant via les props
    const handleDateChange = (date) => {
        setDate(date);
    };
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.bodyContainer}>
                <Header navigation={navigation} />

                {/* Date Picker */}
                <View style={styles.calendarContainer}>
                    <Text style={styles.title}>Mes rendez-vous</Text>
                    <CalendarDatePicker handleDateChange={handleDateChange} date={date} />
                </View>

                {/* Meeting Cars */}
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    {meetingsCards}
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
    bodyContainer: {
        flex: 1,
        backgroundColor: secondaryBackground,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    /*
     *** Calendar
     */
    calendarContainer: {
        width: "80%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderBottomColor: mainColor,
        borderBottomWidth: 3,
        marginTop: 10,
        marginBottom: 20,
        paddingBottom: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: 600,
        marginRight: 30,
    },
    scrollContent: {
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 5,
        width: "100%",
    },
});
