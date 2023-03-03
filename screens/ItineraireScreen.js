import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Platform, Dimensions } from "react-native";
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Location from "expo-location";
import { Marker } from "react-native-maps";
import { useSelector, useDispatch } from "react-redux";
import { storePosition } from "../reducers/user";

// import components
import Header from "../components/Header";

// style constants
import constant from "../constants/constant";
import { current } from "@reduxjs/toolkit";
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

// Backend URL
const BACKEND_URL = "http://192.168.10.165:3000";

export default function ItineraireScreen({ navigation }) {
    const [currentPosition, setCurrentPosition] = useState();
    const [newDestination, setNewDestination] = useState("");
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [distance, setDistance] = useState(null);
    const [departureTime, setDepartureTime] = useState("");
    const [arrivalTime, setArrivalTime] = useState("");
    const [googleMapApiKey, setGoogleMapApiKey] = useState("");

    const dispatch = useDispatch();

    // Get the user's location and ask for permission
    useEffect(() => {
        // Fetch Google Maps API key
        fetch(`${BACKEND_URL}/api/googlemaps`, {})
            .then((response) => response.json())
            .then((responseJson) => {
                setGoogleMapApiKey(responseJson.api);
                console.log(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });

        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status === "granted") {
                await Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
                    setCurrentPosition(location.coords);
                });
            }
        })();
    }, []);

    // Get the route timing between the user's position and the destination
    useEffect(() => {
        if (currentPosition && newDestination) {
            const origin = `${currentPosition.latitude},${currentPosition.longitude}`;
            const destination = `${newDestination.latitude},${newDestination.longitude}`;

            fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=bicycling&key=${googleMapApiKey}`)
                .then((response) => response.json())
                .then((responseJson) => {
                    setDirectionsResponse(responseJson);
                    setDistance(responseJson.routes[0].legs[0].distance.value / 1000);

                    // Calculate the departure and arrival times
                    const arrivalTime = new Date(Date.now() + responseJson.routes[0].legs[0].duration.value * 1000);
                    const departureTime = new Date(arrivalTime.getTime() - responseJson.routes[0].legs[0].duration.value * 1000);

                    // Format the departure and arrival times as strings
                    const formattedDepartureTime = `${departureTime.getHours()}h${departureTime.getMinutes().toString().padStart(2, "0")}`;
                    const formattedArrivalTime = `${arrivalTime.getHours()}h${arrivalTime.getMinutes().toString().padStart(2, "0")}`;

                    setDepartureTime(formattedDepartureTime);
                    setArrivalTime(formattedArrivalTime);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [currentPosition, newDestination]);

    // Log the user's location and store it in redux
    useEffect(() => {
        if (currentPosition) {
            dispatch(storePosition(currentPosition));
        } else {
            console.log("no position");
        }
    }, [currentPosition]);

    // Handle the long press on the map
    const handleMapLongPress = (e) => {
        setNewDestination(e.nativeEvent.coordinate);
    };

    // Handle the press on the phone icon
    const handlePhonePress = () => {
        console.log("click");
    };

    // Handle the press on the flag icon
    const handleFlagPress = () => {
        console.log("click");
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} />

            {currentPosition && (
                <MapView
                    region={{
                        latitude: currentPosition.latitude,
                        longitude: currentPosition.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    style={styles.map}
                    onLongPress={handleMapLongPress}
                >
                    <MapViewDirections origin={currentPosition} destination={newDestination} apikey={googleMapApiKey} strokeWidth={3} strokeColor={mainColor} mode="BICYCLING" />

                    {currentPosition && <Marker coordinate={currentPosition} title="My position" pinColor={mainColor} />}

                    <Marker
                        coordinate={{
                            latitude: newDestination.latitude,
                            longitude: newDestination.longitude,
                        }}
                        title={"Destination to Go"}
                        pinColor={"red"}
                    />
                </MapView>
            )}

            {/* FOOTER */}

            <View style={styles.footer}>
                <FontAwesome name="phone-square" size={50} color={mainColor} onPress={() => handlePhonePress()} />

                <View style={styles.centralBox}>
                    <Text style={styles.departureTime}>{departureTime}</Text>

                    {directionsResponse && <Text style={styles.estimatedTiming}>{directionsResponse.routes[0].legs[0].duration.text}</Text>}

                    <View style={styles.estimationData}>
                        <View style={styles.estimatedData}>{distance && <Text style={styles.estimatedData}>{distance.toFixed(1)} km</Text>}</View>
                        <FontAwesome style={styles.circle} name="circle" size={8} color={secondaryColor} />
                        <Text style={styles.estimatedData}>{arrivalTime}</Text>
                    </View>
                </View>
                <FontAwesome name="flag-checkered" size={50} color="black" onPress={() => handleFlagPress()} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: mainBackground,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    bodyContainer: {
        backgroundColor: secondaryBackground,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    map: {
        flex: 1,
        width: screenWidth,
        height: screenHeight,
    },
    /*
     *** Footer ***
     */
    footer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "row",
        padding: btnPadding,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderTopColor: "lightgrey",
        borderLeftColor: "lightgrey",
        borderRightColor: "lightgrey",
        borderTopWidth: 3,
        borderLeftWidth: 3,
        borderRightWidth: 3,
    },
    centralBox: {
        alignItems: "center",
        marginTop: 10,
    },
    departureTime: {
        fontSize: 20,
        fontWeight: 600,
    },
    estimationData: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    estimatedData: {
        color: secondaryColor,
        fontSize: 16,
    },
    estimatedTiming: {
        alignItems: "center",
        justifyContent: "center",
        color: warningColor,
        fontWeight: 800,
        fontSize: 20,
        justifyContent: "center",
        textAlign: "center",
        padding: 5,
    },
    circle: {
        marginHorizontal: btnPadding,
    },
});
