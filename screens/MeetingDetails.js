import React from "react";
import { View, StyleSheet, SafeAreaView, Text } from "react-native";

// import components
import Header from "../components/Header";

export default MeetingDetails = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
          <Header navigation={navigation} />
          <Text style={{fontSize: 24, fontWeight: "600", marginVertical: 10, color: "#000"}}>MeetingDetails</Text>
            
        </SafeAreaView>
    );
};  

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
