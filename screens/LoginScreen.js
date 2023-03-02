import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import { Dimensions } from "react-native";
import { useDispatch} from 'react-redux';
import { useState, useRef } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { loginStore, loginError} from '../reducers/user';
// style constants
import constant from '../constants/constant';
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const mainColor = constant.mainColor;
const secondaryColor = constant.secondaryColor;
const borderRadius = constant.borderRadius;
const secondaryBackground = constant.secondaryBackground;
const logoPath = constant.logoPath;
const mainBackground = constant.mainBackground;

const BACKEND_URL = "http://192.168.10.147:3000";

export default function LoginScreen({navigation}) {
  // hooks
  const dispatch = useDispatch();
  const [showSignUp, setShowSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  
  const ctrlEmail = true;
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
        dispatch(loginStore({ email: signInEmail, token: data.token }));
        setSignInEmail("");
        setSignInPassword("");       
      // message d'erreur : mdp ou email pas correct
      }else {
        Alert.alert("L\'email ou le mot de passe est incorrect, veuillez réessayer.")
      }
    });
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

                {/* INPUTS LOGIN*/}

                <View style={styles.inputsContainer}>
                    <View style={styles.inputCont}>
                        <TextInput 
                        style={styles.input} 
                        placeholder="Email" 
                        onChangeText={(value) => setSignInEmail(value)} 
                        value={signInEmail} />
                        <FontAwesome name={"at"} style={styles.iconInput} size={20} color={mainColor} />
                    </View>

          <View style={styles.inputCont}>
            <TextInput
              style={styles.input}
              placeholder="Mot de passe"
              secureTextEntry={showPassword}
              onChangeText={(value) => setSignInPassword(value)} 
              value={signInPassword}
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
          onPress={() => handleConnection()}>
            <Text style={styles.btnText}>Se connecter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnContain} onPress={()=>navigation.navigate('DrawerNavigator')}>
            <Text style={styles.btnText}>Ma journee</Text>
          </TouchableOpacity>
        </View>
        {/* Modal Signup*/}
      
      <Modal visible={showSignUp} style={styles.modal}>
      <View style={styles.modalContainer}>
      <TouchableOpacity onPress={() => setShowSignUp(false)} style={styles.closeButton}>
      <FontAwesome name={'times'} style={styles.closeIcon} size={50} color={'black'} paddingTop={10}/>
      </TouchableOpacity>
        <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <View style={styles.headerlogo}>
        <Image
          style={styles.tinyLogo}
          source={require("../assets/Mini-logo.png")}
        />
        </View>
        <View style={styles.sepContainer}>
        <View style={styles.sepLine} />
        <View>
        <Text style={styles.sepText}>Ou m'inscrire avec mon email</Text>
        </View>
        <View style={styles.sepLine} />
        </View>
      
       
        <View style={styles.inputCont}>
        <TextInput style={styles.input} placeholder="Nom"/>
        </View>
      
        <View style={styles.inputCont}>
        <TextInput style={styles.input} placeholder="Prénom"/>
        </View>
        
        <View style={styles.inputCont}>
        <TextInput 
        style={styles.input}
        keyboardType="numeric"
        maxLength={10} 
        placeholder="Téléphone"
        />
        </View>

        <View style={styles.inputCont}>
        <TextInput
        style={styles.input}
        placeholder="Email"
        />
        <FontAwesome name={'at'} 
        style={styles.iconInput}
        size={20}
        color={mainColor}/>
        </View>
        
        <View style={styles.inputCont}>
        <TextInput
        style={styles.input}
        placeholder="Confirmer mon email"
        />
        <FontAwesome name={'at'} 
        style={styles.iconInput}
        size={20}
        color={mainColor}/>
        </View>


        <View style={styles.inputCont}>
        <TextInput
        style={styles.input}
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
        <View style={styles.btnEnvoyer}>
        <TouchableOpacity style={styles.btnContain}>
        <Text style={styles.btnText}>Envoyer</Text>
        </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
        </ScrollView>
       
      </View>
     
      </Modal>
    </View>
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
    justifyContent: "flex-start"
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
    flex:1,
    width: "80%",
    marginVertical: 20,
    justifyContent:'space-evenly',
  },
  inputCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: borderRadius,
    borderBottomWidth: 1,
    borderColor: mainColor,
    marginVertical:15,
  },
  input: {
    fontSize:22,
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
  }
});
