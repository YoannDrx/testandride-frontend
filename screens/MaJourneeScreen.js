import React from "react";
import { View, StyleSheet,Text } from "react-native";
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

export default  MaJourneeScreen = ({navigation}) => {
    return (
        
        <View style={styles.container}>
            <Header navigation={navigation}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
    }
});
