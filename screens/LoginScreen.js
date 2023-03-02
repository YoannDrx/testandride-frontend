import { useState, useRef } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Modal, KeyboardAvoidingView, SafeAreaView, Dimensions } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

// Components
  import SignUpForm from "../components/SignUpForm";

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

// HOOKS 
  // states
  const [showSignUp, setShowSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Ref signin
  const emailRef = useRef();
  const passwordRef = useRef();


// FONCTIONS

  // show signup modal or close
  const toggleModalSignUP = () => {
    setShowSignUp(!showSignUp)
  }

    return (
        <View style={styles.container}>
            <View style={styles.window}>
              {/* HEADER CONNEXION INFOS */}
                <Image style={styles.tinyLogo} source={require("../assets/Mini-logo.png")} />
                <Text style={styles.pageTitle}> CONNEXION</Text>
                <Text> Pas encore de compte ?</Text>
                <Text style={styles.linkSignUp} onPress={() => toggleModalSignUP()}>
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

          <View style={styles.inputCont} onPress={() => emailRef.current.focus()}>
            <TextInput
              style={styles.input}
              ref={emailRef}
              placeholder="Email"
            />
            <FontAwesome
              name={"at"}
              style={styles.iconInput}
              size={20}
              color={mainColor}
            />
          </View>

          <View style={styles.inputCont} onPress={() => passwordRef.current.focus()}>
            <TextInput
              style={styles.input}
              ref={passwordRef}
              placeholder="Mot de passe"
              secureTextEntry={!showPassword}
            />
            <FontAwesome
              name={showPassword ? "eye-slash" : "eye"}
              style={styles.iconInput}
              size={20}
              color={mainColor}
              onPress={() => setShowPassword(!showPassword)}
            />
          </View>

          {/*BOUTONS LOGIN*/}

          <TouchableOpacity style={styles.btnContain}>
            <Text style={styles.btnText}>Se connecter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnContain}
            onPress={() => navigation.navigate("DrawerNavigator")}
          >
            <Text style={styles.btnText}>Ma journee</Text>
          </TouchableOpacity>
        </View>
        {/* Modal Signup*/}

       
      </View>
      <Modal visible={showSignUp} style={styles.modalContainer}>
          <SignUpForm  toggleModalSignUP={toggleModalSignUP} width={screenWidth} height={screenHeight} navigation={ navigation }/>
      </Modal>
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
  modalContainer: {
    flex: 1,
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
