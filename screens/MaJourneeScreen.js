import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, StatusBar, Platform, TouchableOpacity } from "react-native";
import { Dimensions, SafeAreaView, ScrollView } from "react-native";
import { useSelector } from "react-redux";

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

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Calendar
import * as Calendar from "expo-calendar";

// Import components
import Header from "../components/Header";
import MeetingCards from "../components/MeetingCards";
import CalendarDatePicker from "../components/CalendarDatePicker";

export default function MaJourneeScreen({ navigation }) {
    const user = useSelector((state) => state.user.value);
    const [proCalendars, setProCalendars] = useState();
    const [proMeetings, setProMeetings] = useState();

    const cardsData = [
        {
            id: 1,
            heure: "9h15",
            prenom: "Yoann",
            nom: "Andrieux",
            telephone:"0663434665",
            adresse: "11 rue de la chine",
            ville: "75020 Paris",
            marque: "SantaCruz",
            model: "Stigmata",
        },
        {
            id: 2,
            heure: "10:45",
            prenom: "Bob",
            nom: "Colin",
            telephone:"0663434665",
            adresse: "12 rue de la paix",
            ville: "75008 Paris",
            marque: "Yubba",
            model: "Longtail",
        },
        {
            id: 3,
            heure: "11:45",
            prenom: "Antoine",
            nom: "Bebin",
            telephone:"0663434665",
            adresse: "3 rue du chatelet",
            ville: "75001 Paris",
            marque: "Cowboyw",
            model: "Electric 200",
        },
        {
            id: 4,
            heure: "14:00",
            prenom: "Alfred",
            nom: "Charlot",
            telephone:"0663434665",
            adresse: "13 avenue Montaigne",
            ville: "75008 Paris",
            marque: "VeloInParis",
            model: "MonsieurChic",
        },
        {
            id: 5,
            heure: "14:30",
            prenom: "Luc",
            nom: "Lebon",
            telephone:"0663434665",
            adresse: "122 rue du Dr Finlay",
            ville: "92120 Montrouge",
            marque: "Btwin",
            model: "FRT100",
        },
        {
            id: 6,
            heure: "15:00",
            prenom: "Beatrice",
            nom: "Bouvier",
            telephone:"0663434665",
            adresse: "60 avene Doumer",
            ville: "92120 Montrouge",
            marque: "Origin",
            model: "State",
        },
        {
            id: 7,
            heure: "16:00",
            prenom: "Amelie",
            nom: "Legrand",
            telephone:"0663434665",
            adresse: "53 rue du bon Petit",
            ville: " 750015 Paris",
            marque: "Décathlon",
            model: "RC520",
        },
        {
            id: 8,
            heure: "16:30",
            prenom: "Sebastien",
            nom: "Dujant",
            telephone:"0663434665",
            adresse: "2 passage des inconnus",
            ville: "75005 Paris",
            marque: "Fantasio",
            model: "X-trem",
        },
        {
            id: 9,
            heure: "17:00",
            prenom: "Adeline",
            nom: "Stamps",
            telephone:"0663434665",
            adresse: "678 avenue Gal de Gaulle",
            ville: "75017 Paris",
            marque: "Fucanti",
            model: "Monstro",
        },
        {
            id: 10,
            heure: "18:15",
            prenom: "Léonor",
            nom: "Chaaps",
            telephone:"0663434665",
            adresse: "46 rue des alliers",
            ville: "75007 Paris",
            marque: "Royal Bike",
            model: "Vitt",
        },
    ];

    // Map the cardsData array to create a MeetingCards component for each object
    const cards = cardsData.map((card) => {
        // console.log(card);
        return <MeetingCards key={`meeting${card.id}`} card={card} navigation={navigation} />;
    });

    // Permissions
    useEffect(() => {
        (async () => {
            const { status } = await Calendar.requestCalendarPermissionsAsync();
            if (status === "granted") {
                const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
                const filteredCalendars = calendars.filter((calendar) => {
                    return calendar.ownerAccount === user.email;
                });
                // console.log(filteredCalendars);
                // console.log(user);
            }
        })();
    }, []);

    // State qui permet de stocker la date sélectionnée dans le calendrier
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const monthStr = date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth();
        const dayStr = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        const formatedDate = `${date.getFullYear()}-${monthStr}-${dayStr}`;
        fetch(`${BACKEND_URL}/airtable/courses/${formatedDate}`);
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
                    <View>
                        <CalendarDatePicker handleDateChange={handleDateChange} />
                    </View>
                </View>

                {/* Meeting Cars */}
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    {cards}
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
    },
});
