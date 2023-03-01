import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Header from "../components/Header";
import { Dimensions, SafeAreaView } from "react-native";

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

// import components
import MeetingCards from "../components/MeetingCards";

export default function MaJourneeScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} />
            <MeetingCards />
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
});
