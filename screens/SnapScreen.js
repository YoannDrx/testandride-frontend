import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, TouchableOpacity, View, Dimensions } from "react-native";
import { Camera, CameraType, FlashMode } from "expo-camera";
import { useDispatch } from "react-redux";
import { changePhoto } from "../reducers/user";
import FontAwesome from "react-native-vector-icons/FontAwesome";
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
const btnPadding = constant.btnPadding;
const dangerColor = constant.dangerColor;
const warningColor = constant.warningColor;

// Backend URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function SnapScreen({ navigation }) {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const [hasPermission, setHasPermission] = useState(false);
    const [type, setType] = useState(CameraType.back);
    const [flashMode, setFlashMode] = useState(FlashMode.off);

    let cameraRef = useRef(null);

    // Ask for camera permissions
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    // Take a picture and save it to the redux store and send it to the backend
    const takePicture = async () => {
        const photo = await cameraRef.takePictureAsync({ quality: 0.3 });

        dispatch(changePhoto(photo.uri));

        const formData = new FormData();

        formData.append("photoFromFront", {
            uri: photo.uri,
            name: "photo.jpg",
            type: "image/jpeg",
        });

        fetch(`http://${BACKEND_URL}:3000/upload`, {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
        navigation.navigate("profil");
    };

    if (!hasPermission || !isFocused) {
        return <View />;
    }

    return (
        <Camera type={type} flashMode={flashMode} ref={(ref) => (cameraRef = ref)} style={styles.camera}>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
                    <FontAwesome name="arrow-left" size={25} color={dangerColor} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFlashMode(flashMode === FlashMode.off ? FlashMode.torch : FlashMode.off)} style={styles.button}>
                    <FontAwesome name="flash" size={25} color={flashMode === FlashMode.off ? "#ffffff" : "#e8be4b"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)} style={styles.button}>
                    <FontAwesome name="rotate-right" size={25} color="#ffffff" />
                </TouchableOpacity>
            </View>

            <View style={styles.snapContainer}>
                <TouchableOpacity onPress={() => cameraRef && takePicture()}>
                    <FontAwesome name="circle-thin" size={95} color="#ffffff" />
                </TouchableOpacity>
            </View>
        </Camera>
    );
}

const styles = StyleSheet.create({
    camera: {
        flex: 1,
    },
    buttonsContainer: {
        flex: 0.1,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    button: {
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        borderRadius: 50,
    },
    snapContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: 25,
    },
});