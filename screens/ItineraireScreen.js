import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { Marker } from "react-native-maps";
import { useSelector, useDispatch } from "react-redux";
import { storePosition } from "../reducers/user";

// import components
import Header from "../components/Header";

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

export default function ItineraireScreen({ navigation }) {
    const [currentPosition, setCurrentPosition] = useState("");
    const dispatch = useDispatch();

    // check if position is stored in redux
    // const positionStored = useSelector((state) => state.user.value.position);
    // console.log(positionStored)

    // Get the user's location and ask for permission
    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status === "granted") {
                Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
                    setCurrentPosition(location.coords);
                });
            }
        })();
    }, []);

    // Log the user's location and store it in redux
    useEffect(() => {
        if (currentPosition) {
            console.log(currentPosition);
            dispatch(storePosition(currentPosition));
        } else {
            console.log("no position");
        }
    }, [currentPosition]);

    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} />
            <MapView
                region={{
                    latitude: currentPosition.latitude,
                    longitude: currentPosition.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                style={styles.map}
            >
                {currentPosition && <Marker coordinate={currentPosition} title="My position" pinColor={mainColor} />}
            </MapView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: mainBackground,
    },
    map: {
        flex: 1,
        width: screenWidth,
        height: screenHeight,
    },
});
