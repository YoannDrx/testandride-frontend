import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar, Platform, ScrollView, Modal, Button } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Header from "../components/Header";
import { Dimensions, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { Camera, CameraType, FlashMode } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";

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

// environnement variables
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;



export default function MonProfilScreen({navigation}) {
    //const utilisation camera
    const [modalVisible, setModalVisible] = useState(false);
    let cameraRef = useRef(null);
    const onPress = () => {
        console.log("Button pressed");
    };
    const [hasPermission, setHasPermission] = useState(false);
    const isFocused = useIsFocused();
    const [type, setType] = useState(CameraType.back);
    const [flashMode, setFlashMode] = useState(FlashMode.off);

    const takePicture = async () => {
        const photo = await cameraRef.takePictureAsync({ quality: 0.3 });
        console.log(photo);

        // Créer un objet FormData pour envoyer l'image au backend
        const data = new FormData();
        data.append("photoFromFront", {
            uri: photo.uri,
            type: "image/jpeg",
            name: "photo.jpg",
        });

        // Envoyer l'image au backend
        fetch(`${BACKEND_URL}/upload`, {
            method: "POST",
            body: data,
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result);

                // Mettre à jour l'URL de l'avatar dans l'état local
                setAvatarUrl(result.url);
                setModalVisible(false);
            })

            .catch((error) => {
                console.error(error);
            });
    };

    const closeCameraModal = () => {
        setModalVisible(false);
    };

    //obtenir autorisation utilisation camera
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    // Get the profil picture from the store
    const user = useSelector((state) => state.user.value);
    const profilPicture = user.picturePath ? { uri: user.picturePath } : require("../assets/demoAvatar.png");

    // Take a picture from the camera page
    const handleChangePhoto = () => {
        setModalVisible(true);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} />
            <View style={styles.window}>
                <View style={styles.bodyContainer}>
                    {/* Contact info */}
                    <View style={styles.profilContainer}>
                        <View>
                            <Image source={profilPicture} style={styles.avatar} />
                            <TouchableOpacity style={styles.plusIcon} onPress={() => handleChangePhoto()}>
                                <FontAwesome name="plus-circle" size={20} color={mainColor} />
                            </TouchableOpacity>
                        </View>

                    <View style={styles.info}>
                        <View style={styles.nameBox}>
                            <Text style={styles.prenom}>{user.firstName}</Text>
                            <Text style={styles.nom}>{user.lastName}</Text>
                        </View>

                        <View>
                            <Text style={styles.contactTelMail}>{user.telephone}</Text>
                            <Text style={styles.contactTelMail}>{user.email}</Text>
                        </View>

                        {/* modal camera */}
                        <Modal visible={modalVisible} animationType="slide">
                        <View style={styles.cameraContainer}>
                        <Camera type={type} flashMode={flashMode} ref={(ref) => cameraRef = ref} style={styles.camera}>
                        
                        {/* button back camera */}
                        <View style={styles.buttonBack}>
                        <TouchableOpacity
                         onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)}
                        >
                        <FontAwesome name='rotate-right' size={25} color='#ffffff' style={styles.rotateButton} />
                        </TouchableOpacity>
                        </View>

                        {/* button flash */}
                        <View><TouchableOpacity
                        onPress={() => setFlashMode(flashMode === FlashMode.off ? FlashMode.torch : FlashMode.off)}
                        style={styles.buttonFlash}
                        >
                        <FontAwesome name='flash' size={25} color={flashMode === FlashMode.off ? '#ffffff' : '#e8be4b'} />
                        </TouchableOpacity>
                        </View>

                        {/* button take picture*/}
                        <View style={styles.snapContainer}>
                        <TouchableOpacity onPress={() => cameraRef && takePicture()}>
                        <FontAwesome name='circle-thin' size={95} color='#ffffff' />
                        </TouchableOpacity>
                        </View>

                        {/* button close camera*/}
                        <View style={styles.closingCamera}>
                        <TouchableOpacity
                        onPress={() => closeCameraModal()}>
                        <FontAwesome name={"times"} style={styles.closeIcon} size={50} color={"black"} paddingTop={10} />
                        </TouchableOpacity>
                        </View>

                    </Camera>
                
        </View>
      </Modal>
                    </View> 
                </View>

                <View style={styles.statsContainer}>
                    {/* Rdv pris */}
                    <Text style={styles.statsTitle}>Statistiques Semaine</Text>
                    <View style={styles.statsCard}>
                        <View style={styles.iconGroup}>
                            <FontAwesome name="calendar-o" size={30} color="#000" style={styles.Icon} />
                            <Text style={styles.statsData}>100%</Text>
                        </View>
                        <Text style={styles.statsCount}>18</Text>
                        <Text style={styles.statsRdv}>rdv terminés</Text>
                    </View>

                    {/* Rdv validés */}
                    <View style={styles.statsCard}>
                        <View style={styles.iconGroup}>
                            <FontAwesome name="check" size={30} color="#000" style={styles.Icon} />
                            <Text style={styles.statsData}>100%</Text>
                        </View>
                        <Text style={styles.statsCount}>9</Text>
                        <Text style={styles.statsRdv}>rdv terminés</Text>
                    </View>

                    {/* Rdv convertis */}
                    <View style={styles.statsCard}>
                        <View style={styles.iconGroup}>
                            <FontAwesome name="calendar-o" size={30} color="#000" style={styles.Icon} />
                            <Text style={styles.statsData}>100%</Text>
                        </View>
                        <Text style={styles.statsCount}>6</Text>
                        <Text style={styles.statsRdv}>rdv convertis</Text>
                    </View>

                    {/* Tps moyen */}
                    <View style={styles.statsCard}>
                        <View style={styles.iconGroup}>
                            <FontAwesome name="clock-o" size={30} color="#000" style={styles.Icon} />
                            <Text style={styles.statsData}>38 min</Text>
                        </View>
                        <Text style={styles.statsRdv}>temps moyen / rdv</Text>
                    </View>
                </View>

                {/* Boutons */}
                <View style={styles.bottomButtonsContainer}>
                    <TouchableOpacity style={styles.bottomButtonModif} onPress={() => navigation.navigate("Modification")}>
                        <Text style={styles.bottomButtonModifText}>Demander une modification</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bottomButtonMdp} onPress={() => navigation.navigate("Nouveau mot de passe")}>
                        <Text style={styles.bottomButtonMdpText}>Nouveau mot de passe</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
        </SafeAreaView>
    );
    }
    

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mainBackground,
        alignItems: "center",
        justifyContent: "flex-start",
    },

    bodyContainer: {
        backgroundColor: secondaryBackground,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    window: {
        width: screenWidth,
        height: "90%",
        justifyContent: "space-between",
        alignItems: "center",
    },

    
    /*
    *** CONTACT INFO ***
    */
    profilContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    avatar: {
        width: 100,
        height: 100,
    },

    plusIcon: {
        position: 'absolute',
        top:10,
    },

    info: {
        marginLeft: 20,
    },
    nameBox: {
        flexDirection: "row",
        marginBottom: 10,
    },
    nom: {
        fontSize: 20,
        marginBottom: 5,
        fontWeight: "600",
        marginRight: 5,
    },
    prenom: {
        fontSize: 20,
        marginBottom: 5,
        fontWeight: "600",
        marginRight: 5,
    },
    contactTelMail: {
        fontSize: 16,
        marginBottom: 5,
    },
    contactTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 5,
    },
    contactText: {
        fontSize: 16,
        marginBottom: 5,
    },
    tel: {
        marginBottom: 0,
    },
    mail: {
        marginBottom: 20,
    },

    //CAMERA

    cameraContainer: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    camera: {
        width: "100%",
        height: "100%",
        marginBottom: 0,
    },

    snapContainer: {
        position: "absolute",
        bottom: 0,
        alignSelf: "center",
        marginBottom: 30,
    },

    buttonBack: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "transparent",
        padding: 10,
        borderRadius: 50,
        marginRight: 20,
        marginBottom: 20,
    },

    buttonFlash: {
        backgroundColor: "transparent",
        padding: 10,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#fff",
        position: "absolute",
        top: Platform.OS === "ios" ? 50 : StatusBar.currentHeight + 10,
        right: 20,
        zIndex: 1,
    },

    closingCamera: {
        backgroundColor: "transparent",
        position: "absolute",
        top: Platform.OS === "ios" ? 30 : StatusBar.currentHeight + 10,
        left: 20,
        zIndex: 1,
    },

    closeIcon: {
        color: 'red',
        fontSize: 35,
    },

    /*
     *** STATS ***
     */
    statsContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: "2%",
        paddingRight: "2%",
    },
    statsTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10,
        marginTop: 10,
    },
    iconGroup: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    Icon: {
        marginRight: 10,
    },
    statsCard: {
        backgroundColor: "#fff",
        borderColor: "lightgrey",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        padding: 15,
        alignItems: "center",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        scrollContent: {},
    },
    /*
        *** BOTTOM BUTTONS ***
    */
    bottomButtonsContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 20,
    },
    bottomButtonModif: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: borderRadius,
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center",
        width: '90%',
        borderColor: "#16A085",
        borderWidth: 1,
    },
    bottomButtonModifText: {
        color: mainColor,
        fontSize: 20,
    },
    bottomButtonMdp: {
        backgroundColor: mainColor,
        padding: 10,
        borderRadius: borderRadius,
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
        borderColor: secondaryColor,
        borderWidth: 1,
    },
    bottomButtonMdpText: {
        color: "#fff",
        fontSize: 20,
    },
});
