import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addPlaceStore, removePlaceStore } from "../reducers/user";

export default function PlacesScreen() {
    // Variables ----------------------------------------------------

    const dispatch = useDispatch();

    // hook d'états
    const [queryString, setQueryString] = useState("");
    const [placesResults, SetPlacesResults] = useState([]);

    // user data from store
    const user = useSelector((state) => state.user.value);

    // places data
    const placesData = [
        { name: "Paris", latitude: 48.859, longitude: 2.347 },
        { name: "Lyon", latitude: 45.758, longitude: 4.835 },
        { name: "Marseille", latitude: 43.282, longitude: 5.405 },
    ];

    //places components rendered
    const places = user.cities.map((place, i) => {
        return (
            <View key={i} style={styles.card}>
                <View>
                    <Text style={styles.name}>{place.name}</Text>
                    <Text>
                        LAT : {place.LAT} LON : {place.LON}
                    </Text>
                </View>
                <FontAwesome
                    name="trash-o"
                    size={25}
                    color="#ec6e5b"
                    onPress={() => {
                        dispatch(removePlaceStore(i));
                        setQueryString("");
                    }}
                />
            </View>
        );
    });

    // dropdown components renderd
    let dropdown;
    if (placesResults) {
        dropdown = placesResults.map((place, index) => {
            return (
                <TouchableOpacity key={"dd" + index} style={styles.ddElement} index={index} onPress={() => handlePressDropDown(index)}>
                    <Text>{place.properties.label}</Text>
                </TouchableOpacity>
            );
        });
    }

    // CONDITIONS ------------------------------------------------------------

    // FONCTIONS -------------------------------------------------------------

    // fetch data API gouv
    useEffect(() => {
        const fetchGeoLoc = async () => {
            const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${queryString}&limit=3`);
            const data = await response.json();
            SetPlacesResults(data.features);
        };
        fetchGeoLoc();
    }, [queryString]);

    // select an element in dropdown ttt
    const handlePressDropDown = (index) => {
        dispatch(
            addPlaceStore({
                name: placesResults[index].properties.name,
                LAT: placesResults[index].geometry.coordinates[0],
                LON: placesResults[index].geometry.coordinates[1],
            })
        );
        setQueryString("");
    };

    // handle press add button
    const handlePressAdd = () => {
        if (placesResults.length) {
            dispatch(
                addPlaceStore({
                    name: placesResults[0].properties.name,
                    LAT: placesResults[0].geometry.coordinates[0],
                    LON: placesResults[0].geometry.coordinates[1],
                })
            );
            setQueryString("");
        }
    };

    // FINAL RETURN -----------------------------------------------------------
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>${user.nickname}'s places</Text>

            <View style={styles.inputContainer}>
                <TextInput style={styles.input} placeholder="New city" onChangeText={(value) => setQueryString(value)} value={queryString} />
                <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => handlePressAdd()}>
                    <Text style={styles.textButton}>Add</Text>
                </TouchableOpacity>
                <View style={styles.dropdown}>{dropdown}</View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollView}>{places}</ScrollView>
        </SafeAreaView>
    );
}

// STYLE ------------------------------------------------------------------

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2",
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
        marginTop: 30,
        marginBottom: 20,
    },
    scrollView: {
        alignItems: "center",
        paddingBottom: 20,
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "80%",
        backgroundColor: "#ffffff",
        padding: 20,
        marginTop: 20,
        borderRadius: 10,
    },
    name: {
        fontSize: 18,
    },
    inputContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "80%",
        backgroundColor: "#ffffff",
        padding: 20,
        marginTop: 20,
        borderRadius: 10,
        flexWrap: "wrap",
    },
    input: {
        width: "65%",
        marginTop: 6,
        borderBottomColor: "#ec6e5b",
        borderBottomWidth: 1,
        fontSize: 16,
    },
    button: {
        width: "30%",
        alignItems: "center",
        paddingTop: 8,
        backgroundColor: "#ec6e5b",
        borderRadius: 10,
    },
    textButton: {
        color: "#ffffff",
        height: 24,
        fontWeight: "600",
        fontSize: 15,
    },
    dropdown: {
        backgroundColor: "white",
        marginTop: 5,
    },
    ddElement: {
        textAlign: "left",
        paddingVertical: 5,
        backgroundColor: "white",
    },
});
