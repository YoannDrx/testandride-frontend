import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { Calendar } from 'expo-calendar';

// Import components
import Header from '../components/Header';

// Style constants
import constant from "../constants/constant";
import { current } from "@reduxjs/toolkit";
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


export default function CalendarScreen({navigation}) {
  useEffect(() => {
    displayCalendar();
  }, []);

  async function displayCalendar() {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === 'granted') {
      const calendars = await Calendar.getCalendarsAsync();
      console.log('Here are all your calendars:');
      console.log({ calendars });

      // Récupérez l'ID du calendrier par défaut
      const defaultCalendar = calendars.find(
        (calendar) => calendar.isPrimary && calendar.allowsModifications
      ) || calendars[0];

      // Créez un événement dans le calendrier par défaut
      const newEvent = await Calendar.createEventAsync(defaultCalendar.id, {
        title: 'Mon premier événement',
        startDate: new Date(),
        endDate: new Date(),
        timeZone: 'GMT+1',
        location: 'Paris',
        notes: 'Ceci est une note pour l\'événement'
      });
      console.log(`Event created successfully with ID: ${newEvent}`);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
        <Header style={styles.header} navigation={navigation}/>
      <Text>Calendar Screen</Text>
      <Button title="Display Calendar" onPress={displayCalendar} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: mainBackground,
        alignItems: "center",
        justifyContent: "flex-start",
    },
});