import { useDispatch } from "react-redux";
import { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const mainColor = "#16A085";
const secondaryColor = "#636869";
const borderRadius = 4;
import { Dimensions } from "react-native";


const BACKEND_URL = "http://192.168.10.148:3000";

export default function SignInForms() {
  const dispatch = useDispatch();
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
   let emailRef = useRef("");
  const passwordRef = useRef("");
   const [showPassword, setShowPassword] = useState(false);

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
          dispatch(login({ email: signInEmail, token: data.token }));
          setSignInEmail("");
          setSignInPassword("");
        }
      });
  };

 return (
  <View style={styles.inputsContainer}>
    <View style={styles.inputCont} onPress={() => emailRef.focus()}>
      <TextInput
        style={styles.input}
        ref={(ref) => (ref = emailRef)}
        placeholder="Email"
        onChangeText={() => emailRef.current.value}
        value={emailRef.current.value}
      />
      <FontAwesome
        name={"at"}
        style={styles.iconInput}
        size={20}
        color={mainColor}
      />
    </View>

    <View style={styles.inputCont} onPress={() => passwordRef.focus()}>
      <TextInput
        style={styles.input}
        ref={passwordRef}
        placeholder="Mot de passe"
        secureTextEntry={showPassword}
      />
      <FontAwesome
        name={showPassword ? "eye-slash" : "eye"}
        style={styles.iconInput}
        size={20}
        color={mainColor}
        onPress={() => setShowPassword(!showPassword)}
      />
    </View>
    <TouchableOpacity
      style={styles.btnContain}
      onPress={() => handleConnection()}
    >
      <Text style={styles.btnText}>Se connecter</Text>
    </TouchableOpacity>
  </View>
)}

const styles = StyleSheet.create({
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
})