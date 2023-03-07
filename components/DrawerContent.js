import React from "react";
import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector, useDispatch } from "react-redux";
import { logoutStore } from "../reducers/user";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";

// style constants
import constant from "../constants/constant";
const borderRadius = constant.borderRadius;
const dangerColor = constant.dangerColor;
const btnPadding = constant.btnPadding;
const warningColor = constant.warningColor;
const secondaryColor = constant.secondaryColor;

export default function DrawerContent(props) {
    const user = useSelector((state) => state.user.value);
    const profilPicture = user.picturePath ? { uri: user.picturePath } : require("../assets/demoAvatar.png");

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutStore(null));
    };

    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => props.navigation.navigate("profil")}>
                        <Image source={profilPicture} style={styles.profilePic} />
                    </TouchableOpacity>
                    <Text style={styles.userNames}>{`${user.firstName} ${user.lastName}`}</Text>
                    <Text style={styles.userText}>{user.email}</Text>
                    <View style={styles.allStatusContainer}>
                        <View style={[styles.statusContainer, styles.statusDangerBG]}>
                            <Text style={styles.statusLabel}>Non testé</Text>
                            <Text style={[styles.statusValue, styles.statusDangerCOL]}>7</Text>
                        </View>
                        <View style={[styles.statusContainer, styles.statusWarningBG]}>
                            <Text style={styles.statusLabel}>Feedback</Text>
                            <Text style={[styles.statusValue, styles.statusWarningCOL]}>7</Text>
                        </View>
                    </View>
                </View>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <TouchableOpacity style={styles.btnOutlinedDanger} onPress={()=> handleLogout()}>
                <View style={styles.logoutContainer}>
                    <Text style={styles.textDanger}>logout</Text>
                    <FontAwesome name="sign-out" size={30} color={dangerColor} />
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    profilePic: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },
    header: {
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    navContainer: {
        justifyContent: "flex-start",
        alignItems: "center",
    },
    btnOutlinedDanger: {
        borderWidth: 1,
        borderColor: dangerColor,
        padding: btnPadding,
        margin: 15,
        borderRadius: borderRadius,
    },
    textDanger: {
        textAlign: "center",
        color: dangerColor,
        fontSize: 18,
        textTransform: "capitalize",
        marginRight: 20,
    },
    userText: {
        fontSize: 18,
        margin: 5,
    },
    userNames: {
        fontSize: 18,
        margin: 5,
        fontWeight: "600",
    },
    allStatusContainer: {
        width: "100%",
        flexDirection: "row",
        padding: btnPadding,
        justifyContent: "center",
        alignItems: "center",
    },
    statusContainer: {
        width: "50%",
        padding: btnPadding,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: borderRadius,
        margin: 5,
        borderWidth: 1,
    },
    statusLabel: {
        fontSize: 12,
        color: secondaryColor,
    },
    statusValue: {
        fontSize: 20,
        fontWeight: "700",
    },
    statusDangerBG: {
        borderColor: dangerColor,
    },
    statusWarningBG: {
        borderColor: warningColor,
    },
    statusDangerCOL: {
        color: dangerColor,
    },
    statusWarningCOL: {
        color: warningColor,
    },
    logoutContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
});
