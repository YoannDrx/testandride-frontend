import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Platform, Dimensions } from "react-native";
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Location from "expo-location";
import { Marker } from "react-native-maps";
import { useSelector, useDispatch } from "react-redux";


// Import components
import Header from "../components/Header";

// Style constants
import constant from "../constants/constant";
import { current } from "@reduxjs/toolkit";
import { TouchableOpacity } from "react-native-gesture-handler";
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


// environnement variables

const GOOGLE_MAPS_APIKEY = process.env.REACT_APP_GOOGLE_MAPS_APIKEY;

export default function ItineraireScreen({ navigation }) {
    const [currentPosition, setCurrentPosition] = useState({latitude:48.866667,longitude:2.333333});
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [distance, setDistance] = useState(null);
    const [departureTime, setDepartureTime] = useState("");
    const [arrivalTime, setArrivalTime] = useState("");
    const [originPosition, setOriginPosition] = useState(null);
    const [hasPermission,setHasPermission] = useState(false);


    // // Get the user's destination from redux
    const meetingDetails = useSelector((state) => state.meetingDetails.value);


    // Get the user's location and ask for permission 
    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status === "granted") {
                setHasPermission(true);
                await Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
                    setCurrentPosition(location.coords);
                    setOriginPosition(currentPosition);
                });
            }
        })();
       
    }, []);

    // Get the route timing between the user's position and the destination
        useEffect(() => {
            if (currentPosition && meetingDetails.position.latitude) {
                const origin = `${currentPosition.latitude},${currentPosition.longitude}`;
                const destination = `${meetingDetails.position.latitude},${meetingDetails.position.longitude}`;

                fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=bicycling&key=${GOOGLE_MAPS_APIKEY}`)
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
        }, [currentPosition, meetingDetails]);

        

    // // Handle the press on the phone icon
    // const handlePhonePress = () => {
    //     console.log("click phone");
    // };

    // // Handle the press on the flag icon
    // const handleFlagPress = () => {
    //     console.log("click flag");
    // };
    

    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} />
            {!hasPermission && <View style={styles.mapStyle}><Text>En attente d'autorisation</Text></View>}
            { hasPermission &&   <MapView
                loadingEnabled={true}
                    region={{
                        latitude: currentPosition.latitude,
                        longitude: currentPosition.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                   fitToCoordinates={[currentPosition, meetingDetails.position]}
                    style={styles.mapStyle}
                >
                    {meetingDetails && (
                        <>
                            {currentPosition && <MapViewDirections origin={currentPosition} destination={meetingDetails.position} apikey={GOOGLE_MAPS_APIKEY} strokeWidth={3} strokeColor={mainColor} mode="BICYCLING" />}
                            {originPosition && <MapViewDirections origin={originPosition} destination={currentPosition} apikey={GOOGLE_MAPS_APIKEY} strokeWidth={3} strokeColor={secondaryBackground} mode="BICYCLING" />}
                            <Marker coordinate={currentPosition} title="Départ" pinColor={"blue"} />
                            <Marker coordinate={meetingDetails.position} title="Arrivée" pinColor={"red"} />
                        </>
                    )}
                    
                </MapView>}
            

            {/* FOOTER */}

            <View style={styles.footer}>
                <TouchableOpacity style={styles.btnNav}>
                <FontAwesome name="phone" size={50} color={secondaryColor}  />
                </TouchableOpacity>
                <View style={styles.centralBox}>
                    {arrivalTime && <Text style={styles.departureTime}>{arrivalTime}</Text>}

                    {directionsResponse && <Text style={styles.estimatedTiming}>{directionsResponse.routes[0].legs[0].duration.text}</Text>}

                    <View style={styles.estimationData}>
                        {distance && (
                            <View style={styles.estimatedData}>
                                <Text style={styles.estimatedData}>{distance.toFixed(1)} km</Text>
                            </View>
                        )}
                        <FontAwesome style={styles.circle} name="circle" size={8} color={secondaryColor} />
                        {arrivalTime && <Text style={styles.estimatedData}>{arrivalTime}</Text>}
                    </View>
                </View>
                 <TouchableOpacity style={styles.btnNav} onPress={()=> navigation.navigate('meetingDetails')}>           
                <FontAwesome name="flag-checkered" size={50} color={mainColor} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: mainBackground,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    bodyContainer: {
        backgroundColor: secondaryBackground,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    mapStyle: {
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
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
 
    },
    btnNav:{
        height:80,
        width:80,
        backgroundColor:secondaryBackground,
        padding:btnPadding,
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center',
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
