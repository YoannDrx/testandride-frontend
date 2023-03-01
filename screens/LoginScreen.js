import { useState, useRef } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Modal, KeyboardAvoidingView, SafeAreaView, Dimensions } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

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

export default function LoginScreen({ navigation }) {
    // Hooks
    const [showSignUp, setShowSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const emailRef = useRef();
    const passwordRef = useRef();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.window}>
                {/* HEADER CONNEXION INFOS */}

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

                {/* SIGNIN */}

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
                    <TouchableOpacity style={styles.btnContain} onPress={() => navigation.navigate("DrawerNavigator")}>
                        <Text style={styles.btnText}>Ma journee</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* SIGNUP */}

            {showSignUp && (
                <Modal style={styles.modalContainer}>
                    <View></View>
                    <TouchableOpacity onPress={() => setShowSignUp(false)} style={styles.closeButton}>
                        <FontAwesome name={"times"} style={styles.closeIcon} size={100} color={"black"} paddingTop={10} />
                    </TouchableOpacity>
                    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
                        <View style={styles.sepContainer}>
                            <View style={styles.sepLine} />
                            <View>
                                <Text style={styles.sepText}>Ou m'inscrire avec mon email</Text>
                            </View>
                            <View style={styles.sepLine} />
                        </View>

                        <View style={styles.inputCont}>
                            <TextInput style={styles.input} placeholder="Nom" />
                        </View>

                        <View style={styles.inputCont}>
                            <TextInput style={styles.input} placeholder="Prénom" />
                        </View>

                        <View style={styles.inputCont}>
                            <TextInput style={styles.input} keyboardType="numeric" maxLength={10} placeholder="Téléphone" />
                        </View>

                        <View style={styles.inputCont} onPress={() => emailRef.focus()}>
                            <TextInput style={styles.input} ref={emailRef} placeholder="Email" />
                            <FontAwesome name={"at"} style={styles.iconInput} size={20} />
                        </View>

                        <View style={styles.inputCont} onPress={() => emailRef.focus()}>
                            <TextInput style={styles.input} ref={emailRef} placeholder="Confirmer mon email" />
                            <FontAwesome name={"at"} style={styles.iconInput} size={20} />
                        </View>

                        <View style={styles.inputCont} onPress={() => passwordRef.focus()}>
                            <TextInput style={styles.input} ref={passwordRef} placeholder="Mot de passe" secureTextEntry={showPassword} />
                            <FontAwesome name={showPassword ? "eye-slash" : "eye"} style={styles.iconInput} size={20} onPress={() => setShowPassword(!showPassword)} />
                        </View>
                        <View style={styles.btnEnvoyer}>
                            <TouchableOpacity style={styles.btnContain}>
                                <Text style={styles.btnText}>Envoyer</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </Modal>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    /*
     *** GENERAL STYLES
     */
    container: {
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
    /*
     *** HEADER CONNECION INFOS
     */
    tinyLogo: {
        width: 100,
        height: 100,
        marginTop: 30,
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
    /*
     *** Modal
     */
    modalContainer: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },

    /*
     *** SIGNIN
     */
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
    iconInput: {
        color: mainColor,
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
    /*
     *** SIGNIN
     */
    closeButton: {
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
