import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Modal } from "react-native";
import { Dimensions } from "react-native";
import { useState, useRef } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const mainColor = "#16A085";
const secondaryColor = "#636869";
const borderRadius = 4;
const secondaryBackground = "whitesmoke";
import { useNavigation } from "@react-navigation/native";


export default function LoginScreen() {
    const [showSignUp, setShowSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const emailRef = useRef();
    const passwordRef = useRef();

    // Buttons Nav
        const navigation = useNavigation();
      
        const handleItinerairePress = () => {
          navigation.navigate("itineraire");
        };
      
        const handleLoginPress = () => {
          navigation.navigate("login");
        };
      
        const handleMaJourneePress = () => {
          navigation.navigate("maJournee");
        };
      
        const handleProfilPress = () => {
          navigation.navigate("profil");
        };

    return (
        <View style={styles.container}>
            <View style={styles.window}>
                <Image style={styles.tinyLogo} source={require("../assets/Mini-logo.png")} />
                <Text style={styles.pageTitle}> CONNEXION</Text>
                <Text> Pas encore de compte ?</Text>
                <Text style={styles.linkSignUp} onPress={() => setShowSignUp(true)}>
                    Cliquez pour vous inscrire
                </Text>
                <View style={styles.sepContainer}>
                    <View style={styles.sepLine} />
                    <View>
                        <Text style={styles.sepText}>Me connecter avec mon email</Text>
                    </View>
                    <View style={styles.sepLine} />
                </View>
                <View style={styles.inputsContainer}>
                    <View style={styles.inputCont} onPress={() => emailRef.focus()}>
                        <TextInput style={styles.input} ref={emailRef} placeholder="Email" />
                        <FontAwesome name={"at"} style={styles.iconInput} size={20} color={mainColor} />
                    </View>

                    <View style={styles.inputCont} onPress={() => passwordRef.focus()}>
                        <TextInput style={styles.input} ref={passwordRef} placeholder="Mot de passe" secureTextEntry={showPassword} />
                        <FontAwesome name={showPassword ? "eye-slash" : "eye"} style={styles.iconInput} size={20} color={mainColor} onPress={() => setShowPassword(!showPassword)} />
                    </View>
                    <TouchableOpacity style={styles.btnContain}>
                        <Text style={styles.btnText}>Se connecter</Text>
                    </TouchableOpacity>

                    {/* Buttons Nav */}
                    <TouchableOpacity style={styles.button} onPress={() => handleItinerairePress()}>
                        <Text style={styles.buttonText}>Itinéraire</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => handleLoginPress()}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => handleMaJourneePress()}>
                        <Text style={styles.buttonText}>Ma journée</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => handleProfilPress()}>
                        <Text style={styles.buttonText}>Profil</Text>
                    </TouchableOpacity>
                    {/* End buttons nav */}
                </View>
                <Modal visible={showSignUp}></Modal>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    window: {
        height: screenHeight,
        width: screenWidth,
        justifyContent: "center",
        alignItems: "center",
    },
    tinyLogo: {
        width: 100,
        height: 100,
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: "600",
        marginVertical: 10,
        color: secondaryColor,
    },
    linkSignUp: {
        marginVertical: 10,
        color: mainColor,
        fontWeight: "600",
    },
    sepContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
    },
    sepLine: {
        flex: 1,
        height: 1,
        backgroundColor: secondaryColor,
    },
    sepText: {
        textAlign: "center",
        marginHorizontal: 10,
        color: secondaryColor,
    },
    inputsContainer: {
        flex: 1,
        width: "80%",
        marginVertical: 20,
        justifyContent: "space-evenly",
    },
    inputCont: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: borderRadius,
        borderBottomWidth: 1,
        borderColor: mainColor,
        marginVertical: 15,
    },
    input: {
        fontSize: 22,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: "#fff",
        color: "#424242",
    },
    btnContain: {
        backgroundColor: mainColor,
        padding: 10,
        borderRadius: borderRadius,
        marginVertical: 10,
    },
    btnText: {
        color: "white",
        fontSize: 20,
        textAlign: "center",
    },
});
