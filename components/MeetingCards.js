import FontAwesome from "react-native-vector-icons/FontAwesome";
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, ScrollView, Linking, Platform } from "react-native";
import { useState } from "react";

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
const dangerColor = constant.dangerColor;
const btnPadding = constant.btnPadding;
const warningColor = constant.warningColor;


export default function MeetingCards() {


 // Fonction pour lancer l'appel téléphonique
    const makePhoneCall = () => {
if (Platform.OS === 'android') {
    Linking.openURL("tel: +33608270952")
} else {
    Linking.openURL("telprompt: +33608270952")
}
    }
    const [modalVisible, setModalVisible] = useState(false);

    // Toogle the modal cards
    const toggleVisible = () => {
        setModalVisible(!modalVisible);
    };


    return (
        <View style={styles.container}>
            {/* CARDS */}
                <View style={styles.cardContainer}>
                    <View style={styles.card}>
                        {/* Image container */}
                        <View style={styles.imageBox}>
                            <Text style={styles.textHour}>10h00</Text>
                        </View>

                        {/* Data container */}
                        <View style={styles.dataContainer}>
                            <View style={styles.dataBox}>
                                <Text>15 min</Text>
                            </View>
                            <View style={styles.dataBox}>
                                <Text style={styles.bold}>Marque : Décathlon</Text>
                            </View>
                            <View style={styles.dataBox}>
                                <Text style={styles.bold}>Model : RC520</Text>
                            </View>
                        </View>

                        {/* button GO */}
                        <TouchableOpacity style={styles.btnGo}>
                            <Text style={styles.textGo}>GO</Text>
                        </TouchableOpacity>
                    </View>
                    <FontAwesome name="chevron-down" size={20} color={secondaryColor} onPress={() => toggleVisible()} />

                    {modalVisible && (
                        <View style={styles.modalContainer}>
                            <View style={styles.address}>
                                <Text style={styles.modalText}>Yoann Andrieux</Text>
                                <Text style={styles.modalText}>56 boulevard Perreire</Text>
                                <Text style={styles.modalText}>75017 Paris</Text>
                            </View>
                            <View style={styles.modalHeader}>
                                <TouchableOpacity style={styles.iconBox} onPress={() => makePhoneCall()}>
                                    <FontAwesome style={styles.icon} name="phone" size={35} color={mainColor    } />
                                    <Text style={styles.modalTextIcon}>Appel client</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.iconBox} onPress={() => toggleVisible()}>
                                    <FontAwesome style={styles.icon} name="address-card-o" size={35} color={secondaryColor} onPress={() => toggleVisible()} />
                                    <Text style={styles.modalTextIcon}>Fiche rdv</Text>
                                </TouchableOpacity>

                                <FontAwesome name="close" size={30} color={dangerColor} onPress={() => toggleVisible()} />
                            </View>
                        </View>
                    )}
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
    },
    window: {
        height: screenHeight,
        width: screenWidth,
        justifyContent: "center",
        alignItems: "center",
    },
    /*
     *** Cards
     */
     cardContainer: {
        borderColor: "lightgrey",
        borderWidth: 1,
        marginBottom: 10,
        borderRadius: borderRadius,
        alignItems: "center",
        backgroundColor: "#fff",
    },
    card: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: screenWidth * 0.9,
        padding: 5,
    },
    imageBox: {
        justifyContent: "center",
        alignItems: "center",
    },
    textHour: {
        fontSize: 20,
        fontWeight: 600,
        padding: 5,
    },
    avatar: {
        width: 50,
        height: 50,
    },
    dataContainer: {
        justifyContent: "center",
        alignItems: "flex-start",
    },
    dataBox: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },
    bold: {
        fontSize: 16,
        fontWeight: 600,
    },
    btnGo: {
        backgroundColor: mainColor,
        borderRadius: borderRadius,
        padding: 5,
        width: 50,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    textGo: {
        color: "#fff",
        fontWeight: 600,
    },
    chevronContainer: {
        top: -30,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    /*
     *** Modal
     */
    modalContainer: {
        width: screenWidth * 0.9,
        backgroundColor: "white",
        borderRadius: borderRadius,
        padding: 10,
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    iconBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    modalText: {
        fontSize: 16,
    },
    modalTextIcon: {
        fontSize: 16,
        fontWeight: 600,
        marginLeft: 10,
    },
    address: {
        borderTopColor: mainColor,
        borderTopWidth: 1,
        marginBottom: 10,
        paddingTop: 10,
    },
});
