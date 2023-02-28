import react from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { View, StyleSheet, Text, Dimensions, Image, TouchableOpacity, Modal, Pressable } from "react-native";
import { useState } from "react";

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

export default function MeetingCards() {
    const [modalVisible, setModalVisible] = useState(false);

    // Toogle the modal cards
    const toggleVisible = () => {
        setIsVisible(!modalVisible);
    };

    // Action Modal Buttons
    const goToClientCard = () => {
        setIsVisible(!modalVisible);
    };

    const phoneToClient = () => {
        setIsVisible(!modalVisible);
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                {/* CARD */}

                <View style={styles.cardContainer}>
                    <View style={styles.card}>
                        {/* Image container */}
                        <View style={styles.imageBox}>
                            <Text style={styles.textHour}>10h00</Text>
                            <Image source={require("../assets/demoAvatar.png")} style={styles.avatar} />
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
                    <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
                        <Text style={styles.textStyle}>Détails client</Text>
                    </Pressable>
                </View>




                

                {/* MODAL */}

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.iconModalBox}>
                                <TouchableOpacity onPress={goToClientCard}>
                                    <FontAwesome name="address-card-o" size={50} color="#000" style={styles.Icon} />
                                </TouchableOpacity>
                                <Text style={styles.textModal}>Fiche client</Text>
                            </View>
                            <View style={styles.iconModalBox}>
                                <TouchableOpacity onPress={phoneToClient}>
                                    <FontAwesome name="phone-square" size={50} color={mainColor} style={styles.Icon} />
                                </TouchableOpacity>
                                <Text style={styles.textModal}>Appel client</Text>
                            </View>
                            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Close</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mainBackground,
        alignItems: "center",
        justifyContent: "center",
    },
    window: {
        height: screenHeight,
        width: screenWidth,
        justifyContent: "center",
        alignItems: "center",
    },
    cardContainer: {
        borderColor: secondaryColor,
        borderWidth: 1,
        marginBottom: 10,
        borderRadius: borderRadius,
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
        color: "white",
        fontWeight: 600,
    },
    chevronContainer: {
        top: -30,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },

    Icon: {
        marginVertical: 10,
    },
    modalContainer: {
        position: "absolute",
        top: 0,
        width: "100%",
        backgroundColor: "#fff",
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
        alignItems: "center",
        borderColor: secondaryColor,
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    iconModalBox: {
        justifyContent: "center",
        alignItems: "center",
    },
    scrollContainer: {
        width: "100%",
        borderRadius: borderRadius,
        backgroundColor: "#fff",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: borderRadius,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: borderRadius,
        padding: 5,
        elevation: 2,
        width: "100%",
    },
    buttonOpen: {
        backgroundColor: secondaryColor,
    },
    buttonClose: {
        backgroundColor: "red",
        marginTop: 50,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
});
