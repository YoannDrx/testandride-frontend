import React from 'react'
import { View, Text, StyleSheet,SafeAreaView,StatusBar,Platform } from 'react-native'
import Header from "../components/Header";
import { Dimensions } from "react-native";

// style constants
    import constant from '../constants/constant';
    const screenWidth = Dimensions.get("window").width;
    const screenHeight = Dimensions.get("window").height;
    const mainColor = constant.mainColor;
    const secondaryColor = constant.secondaryColor;
    const borderRadius = constant.borderRadius;
    const secondaryBackground = constant.secondaryBackground;
    const logoPath = constant.logoPath;
    const mainBackground = constant.mainBackground;

export default function ItineraireScreen({navigation}) {

    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation}/>
            <Text>itinéraire</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderColor: 'green',
        borderWidth: 1,
        backgroundColor:mainBackground,
        paddingTop:Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    bodyContainer:{
        backgroundColor:secondaryBackground,
        width:'100%',
        alignItems: "center",
        justifyContent: "flex-start",
    },
})
