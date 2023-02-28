import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Dimensions } from "react-native";
import { useState, useRef } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SignInForms from "../components/SignInForms";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const mainColor = "#16A085";
const secondaryColor = "#636869";
const borderRadius = 4;
const secondaryBackground = "whitesmoke";

export default function LoginScreen() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  let emailRef = useRef("");
  const passwordRef = useRef("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpLastName, setSignUpLastName] = useState("");
  const [signUpFirstName, setSignUpFirstName] = useState("");
  const [signUpTelephone, setSignUpTelephone] = useState([]);
 
 //fonction pour se créer un compte
 const handleRegister = () => {
  fetch(`${BACKEND_URL}/users/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      lastName: signUpLastName,
      firstName: signUpFirstName,
      email: signUpEmail,
      tels: signUpTelephone,
      password: signUpPassword,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.result) {
        dispatch(login({ email: signUpEmail, token: data.token }));
        setSignUpLastName("");
        setSignUpFirstName("");
        setSignUpEmail("");
        setSignUpTelephone([]);
        setSignUpPassword("");
        setIsModalVisible(false);
      }
    });
};
 

  return (
    <View style={styles.container}>
      <View style={styles.window}>
        <Image
          style={styles.tinyLogo}
          source={require("../assets/Mini-logo.png")}
        />
        <Text style={styles.pageTitle}> CONNEXION</Text>
        <Text> Pas encore de compte ?</Text>
        <Text style={styles.linkSignUp} onPress={() => setShowSignUp(true)}>
          Cliquez pour vous inscrire
        </Text>
        <View style={styles.sepContainer}>
          <View style={styles.sepLine} />
          <View>
            <Text style={styles.sepText}>Me connecter avec mon email</Text>
            <SignInForms/>
          </View>
          <View style={styles.sepLine} />
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

});
