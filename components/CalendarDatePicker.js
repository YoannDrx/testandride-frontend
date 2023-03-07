import React, { useState } from "react";
import { Button, Text, View, StyleSheet, Dimensions, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

// style constants
import constant from "../constants/constant";
import { TouchableOpacity } from "react-native-gesture-handler";
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


export default function CalendarDatePicker(props) {

  const [showCalendar, setShowCalendar] = useState(false);
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(Platform.OS === "ios");

  const onChange = (event, selectedDate) => {
    const currentDate = new Date(selectedDate) || props.date;
    setShow(Platform.OS === "ios");
    props.handleDateChange(currentDate);
  };

  const showMode = (currentMode) => {
    setMode(currentMode);
    setShow(true);
  };
  const dateString = props.date.toLocaleDateString('fr-FR',{ year: 'numeric', month: 'short', day: 'numeric' })
  return (
    <View style={styles.container}>
      {show && (
        <DateTimePicker
          value={props.date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
          display={Platform.OS === "ios" ? "calendar" : "default"}
        />
      )}
      {Platform.OS === "android" && (
        <TouchableOpacity style={styles.btnDate} onPress={() => showMode("date")}><Text style={styles.txtDate}>{dateString}</Text></TouchableOpacity>
        // <Button onPress={() => showMode("date")} title={dateString} />
      )}
    </View>
  )};

const styles = StyleSheet.create({
  container : {
  borderRadius: borderRadius,
    backgroundColor: secondaryBackground,
  },
  btnDate:{
    backgroundColor:'#dfe6e9',
    padding:btnPadding,
    borderRadius:borderRadius,
  },
txtDate:{
  color:secondaryColor,
  fontSize:16,
  fontWeight:'600'
}
  
});