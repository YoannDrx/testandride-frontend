import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Header from "../components/Header";
// style constants
import constant from '../constants/constant';
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const mainColor = constant.mainColor;
const secondaryColor = constant.secondaryColor;
const borderRadius = constant.borderRadius;
const secondaryBackground = constant.secondaryBackground;

export default function ItineraireScreen({navigation}) {

    return (
        <View style={styles.container}>
            <Header navigation={navigation}/>
            <Text>itinéraire</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'green',
        borderWidth: 1,
    },
})
