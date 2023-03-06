import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Modal, Alert, Linking, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Dimensions } from "react-native";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";

// Components
import SignUpForm from "../components/SignUpForm";
// Reducer
import { loginStore } from "../reducers/user";
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

// URL backend
const BACKEND_URL = "http://192.168.10.156:3000";

export default function LoginScreen({ navigation }) {
    // HOOKS
    // states divers
    const dispatch = useDispatch();
    const [showSignUp, setShowSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    //state modal camera
    const [modalVisible, setModalVisible] = useState(false);

    // states signin
    const [signInEmail, setSignInEmail] = useState("");
    const [signInPassword, setSignInPassword] = useState("");

    // refs signin
    const inEmailRef = useRef();
    const inPasswordRef = useRef();

    // FONCTIONS
    // fonction pour se connecter
    const handleConnection = () => {
        fetch(`${BACKEND_URL}/users/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: signInEmail,
                password: signInPassword,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.result) {
                    const { email, firstName, lastName, token, tels } = data;
                    dispatch(loginStore({ email, firstName, lastName, token, tels }));
                    setSignInEmail("");
                    setSignInPassword("");
                    navigation.navigate("DrawerNavigator");
                } else {
                    // Pop up alert
                    Alert.alert("Email ou mot de passe incorrect.");
                }
            });
    };

    // show signup modal or close
    const toggleModalSignUP = () => {
        setShowSignUp(!showSignUp);
    };

    return (
        <View style={styles.container}>
            <View style={styles.window}>
                {/* HEADER CONNEXION INFOS */}
                <Image style={styles.tinyLogo} source={require("../assets/Mini-logo.png")} />
                <Text style={styles.pageTitle}> CONNEXION</Text>
                <Text> Pas encore de compte ?</Text>
                <Text style={styles.link} onPress={() => toggleModalSignUP()}>
                    Cliquez pour vous inscrire
                </Text>
                <View style={styles.sepContainer}>
                    <View style={styles.sepLine} />
                    <View>
                        <Text style={styles.sepText}>Me connecter avec mon email</Text>
                    </View>
                    <View style={styles.sepLine} />
                </View>

                {/* INPUTS LOGIN*/}

                <View style={styles.inputsContainer}>
                    <KeyboardAvoidingView style={styles.keyBoardAvoidingView} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                        <ScrollView>
                            <View style={styles.inputCont}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email"
                                    onChangeText={(value) => setSignInEmail(value)}
                                    value={signInEmail}
                                    ref={inEmailRef}
                                    onEndEditing={() => inPasswordRef.current.focus()}
                                />
                                <FontAwesome name={"at"} style={styles.iconInput} size={20} color={mainColor} />
                            </View>
                            <View style={styles.inputCont}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Mot de passe"
                                    secureTextEntry={!showPassword}
                                    onChangeText={(value) => setSignInPassword(value)}
                                    value={signInPassword}
                                    ref={inPasswordRef}
                                />
                                <FontAwesome name={showPassword ? "eye-slash" : "eye"} style={styles.iconInput} size={20} color={mainColor} onPress={() => setShowPassword(!showPassword)} />
                            </View>
                            {/* Mot de passe oublié*/}
                            <TouchableOpacity>
                                <Text style={styles.link}>Mot de passe oublié ?</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
                {/*BOUTONS LOGIN*/}
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.btnContain} onPress={() => handleConnection()}>
                        <Text style={styles.btnText}>Se connecter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnContain} onPress={() => navigation.navigate("DrawerNavigator")}>
                        <Text style={styles.btnText}>Ma journee</Text>
                    </TouchableOpacity>
                </View>

                {/* Modal Signup*/}
            </View>

            <Modal visible={showSignUp} style={styles.modalContainer}>
                <SignUpForm toggleModalSignUP={toggleModalSignUP} width={screenWidth} height={screenHeight} navigation={navigation} />
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },

    window: {
        height: screenHeight,
        width: screenWidth,
        alignItems: "center",
    },
    tinyLogo: {
        width: 100,
        height: 100,
        flexDirection: "column",
        justifyContent: "flex-start",
        marginTop: 40,
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: "600",
        marginVertical: 10,
        color: secondaryColor,
    },
    link: {
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
        marginVertical: 10,
        justifyContent: "flex-start",
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
    forgotPasswordText: {
        color: mainColor,
        fontWeight: "600",
    },
    btnContainer: {
        flex: 1,
        width: "80%",
        marginVertical: 10,
        justifyContent: "flex-end",
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
    closeButton: {
        position: "absolute",
        top: 30,
        right: 20,
    },
    closeIcon: {
        opacity: 0.8,
    },

    headerlogo: {
        paddingTop: 20,
        alignItems: "center",
    },

    btnEnvoyer: {
        paddingTop: 40,
    },
});
