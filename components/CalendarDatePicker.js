import React, { useState } from "react";
import { Button, Text, View, StyleSheet, Dimensions, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

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

export default function CalendarDatePicker() {
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setMode(currentMode);
    setShow(true);
  };

  return (
    <View style={styles.container}>
      {show && (
        <DateTimePicker
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
          display={Platform.OS === "ios" ? "calendar" : "default"}
        />
      )}
      {Platform.OS === "android" && (
        <Button onPress={() => showMode("date")} title="Calendrier"/>
      )}
    </View>
  )};

const styles = StyleSheet.create({
  container : {
  borderRadius: borderRadius,
    backgroundColor: secondaryBackground,
  },
});