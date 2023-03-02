import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Dimensions, SafeAreaView, ScrollView } from "react-native";

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

// import components
import Header from "../components/Header";
import MeetingCards from "../components/MeetingCards";
import CalendarDatePicker from "../components/CalendarDatePicker";

export default function MaJourneeScreen({ navigation }) {

    // State qui permet de stocker la date sélectionnée dans le calendrier
    const [date, setDate] = useState(new Date());

    // Fonction qui permet de mettre à jour la date dans le composant enfant via les props
    const handleDateChange = (date) => {
        setDate(date);
    };

    return (
        <SafeAreaView style={styles.container}>
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
    /*
     *** Calendar
     */
    dateContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: screenWidth * 0.9,
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
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        scrollContent: {},
        padding: 5,
    },
});
