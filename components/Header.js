import React from "react";
import { View, Text, StyleSheet, Button, Image, TouchableOpacity, StatusBar, Platform } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

// Redux
import { useSelector } from "react-redux";

// style constants
import constant from "../constants/constant";
const mainColor = constant.mainColor;
const secondaryColor = constant.secondaryColor;
const borderRadius = constant.borderRadius;
const secondaryBackground = constant.secondaryBackground;
const logoPath = constant.logoPath;
const mainBackground = constant.mainBackground;

export default function Header({ navigation }) {
    // Get the profil picture from the store
    const user = useSelector((state) => state.user.value);
    const profilPicture = user.picturePath ? { uri: user.picturePath } : require("../assets/demoAvatar.png");

    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("profil")} style={styles.btn}>
                <Image source={profilPicture} style={styles.avatar} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("maJournee")} style={styles.btn}>
                <Image source={logoPath} style={styles.logo} resizeMode="contain" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.btn}>
                <FontAwesome name="bars" size={35} color={secondaryColor} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        height: Platform.OS === "android" ? "12%" : "10%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        backgroundColor: mainBackground,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4, // Décaler l'ombre
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 5,
        paddingTop: StatusBar.currentHeight,
    },
    logo: {
        width: 100,
    },
    btn: {
        marginHorizontal: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 50,
    },
});
