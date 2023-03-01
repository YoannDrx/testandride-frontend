import React, { useState } from 'react';

// import all the components we are going to use
import {StyleSheet, View, Dimensions } from 'react-native';

//import DatePicker from the package we installed
import DatePicker from 'react-native-datepicker';

// style constants
import constant from "../constants/constant";
import { ScrollView } from "react-native-gesture-handler";
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

export default function CalendarDatePicker(props){
  const [date, setDate] = useState(new Date());

  // handle date change and pass it to parent component with props
  const handleDateChange = (date) => {
    setDate(date);
    props.handleDateChange(date);
  };


  return (
      <View style={styles.container}>
        <DatePicker
          style={styles.datePickerStyle}
          date={date} //initial date from state
          mode="date" //The enum of date, datetime and time
          placeholder="select date"
          format="DD-MM-YYYY"
          minDate=""
          maxDate=""
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              // display: 'none', // hide icon or not
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
              borderRadius: borderRadius,
            },
          }}
          onDateChange={(value)=> handleDateChange(value)}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
});
