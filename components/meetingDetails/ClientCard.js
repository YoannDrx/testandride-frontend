import { callNumber } from "../../modules/callNumber";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { View, StyleSheet, Text, Dimensions, TouchableOpacity, ScrollView, Image } from "react-native";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// style constants

import constant from "../../constants/constant";
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

export default function ClientCard() {
    const [showDetails, setShowDetails] = useState(false);

    const meetingDetails = useSelector((state) => state.meetingDetails.value);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };
    return (
        <View style={styles.Container}>
            <TouchableOpacity style={styles.clientHeader} onPress={() => toggleDetails()}>
                <FontAwesome style={styles.icon} name="user" size={30} color="black" />
                <Text style={styles.idClient}>{meetingDetails.infos.fields.client_prenom_nom}</Text>
                <FontAwesome style={styles.icon} name={showDetails ? "chevron-up" : "chevron-down"} size={30} color="black" />
            </TouchableOpacity>

            {showDetails && (
                <View style={styles.clientDetails}>
                    <View style={styles.dataContainer}>
                        <Text style={styles.labelStyle}>Course ID :</Text>
                        <Text style={styles.textStyle}>{meetingDetails.infos.fields.Course_id}</Text>
                    </View>
                    <View style={styles.dataContainer}>
                        <Text style={styles.labelStyle}>Adresse :</Text>
                        <Text style={styles.textStyle}>{meetingDetails.infos.fields.client_adresse}</Text>
                    </View>
                    <View style={styles.dataContainer}>
                        <Text style={styles.labelStyle}>Email :</Text>
                        <Text style={styles.textStyle}>{meetingDetails.infos.fields.client_email}</Text>
                    </View>
                    <View style={styles.dataContainer}>
                        <Text style={styles.labelStyle}>Téléphone :</Text>
                        <Text style={styles.textStyle}>{meetingDetails.infos.fields.client_telephone}</Text>
                    </View>
                </View>
            )}

            <View style={styles.btnClientContainer}>
                <TouchableOpacity style={styles.btnCancel}>
                    <Text style={styles.cancelText}>Annuler le RDV</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnCall}>
                    <FontAwesome style={styles.iconPhone} name="phone" size={15} color="white" />
                    <Text style={styles.callText}>Appeler</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    clientHeader: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        padding: 10,
        backgroundColor: secondaryBackground,
    },
    icon: {
        marginRight: 10,
    },
    Container: {
        justifyContent: "space-between",
        margin: 10,
        padding: 10,
        borderRadius: borderRadius,
        backgroundColor: mainBackground,
    },

    dataContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    textStyle: {
        fontSize: 16,
        marginBottom: 3,
    },
    labelStyle: {
        fontSize: 12,
        color: secondaryColor,
        width: "40%",
    },
    idClient: {
        fontWeight: "600",
        fontSize: 16,
    },
    clientDetails: {
        borderColor: "lightgrey",
        borderWidth: 1,
        justifyContent: "space-between",
        padding: 10,
        marginTop: 10,
        borderRadius: borderRadius,
    },
    textStyle: {
        fontSize: 16,
        marginBottom: 3,
    },

    btnClientContainer: {
        justifyContent: "space-between",
        flexDirection: "row",
        marginVertical: 10,
    },
    btnCancel: {
        borderColor: dangerColor,
        borderWidth: 1,
        borderRadius: borderRadius,
        padding: btnPadding,
        justifyContent: "center",
        alignItems: "center",
        width: "45%",
    },
    cancelText: {
        color: dangerColor,
        fontWeight: "600",
    },
    btnCall: {
        borderColor: mainColor,
        backgroundColor: mainColor,
        borderWidth: 1,
        borderRadius: borderRadius,
        padding: btnPadding,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        width: "45%",
    },
    iconPhone: {
        marginRight: 5,
    },
    callText: {
        color: "white",
        fontWeight: "600",
    },
});
