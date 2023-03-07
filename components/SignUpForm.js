// React
import React, { useEffect,useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  TextInput,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

// custom modules
import { checkBody } from "../modules/checkBody";

// Store
import {useDispatch} from 'react-redux';
import { loginStore } from "../reducers/user";


// style constants
import constant from "../constants/constant";
const mainColor = constant.mainColor;
const secondaryColor = constant.secondaryColor;
const borderRadius = constant.borderRadius;
const secondaryBackground = constant.secondaryBackground;
const logoPath = constant.logoPath;
const mainBackground = constant.mainBackground;
const dangerColor = constant.dangerColor;

// environnement variables
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;



export default function SignUpForm(props) {
// HOOKS
  // Hooks d'état pour les valeurs des inputs
  const [showPassword, setShowPassword] = useState(false);
  const initalFormState = {
    firstName: "",
    lastName: "",
    password: "",
    passwordConf: "",
    email: "",
    emailConf: "",
    tels: [{ title: "", num: "" }],
  };
  const [formValues, setformValues] = useState(initalFormState);
  const {firstName,lastName,password,passwordConf,email,emailConf,tels} = formValues;
  
  //useDispatch
  const dispatch = useDispatch();

// Variables
    // variables boolean de control de contenu d'inputs
        let ctrlSamePassword = password === passwordConf;
        let ctrlSameEmail = email === emailConf;
        let ctrlValidEmail =
          email === initalFormState.email ||
          email.match(new RegExp(/^[A-Za-z0-9._-]+@testandride\.fr$/));
        let ctrlValidPassword =
          password === initalFormState.password || password.length >= 8;
        let ctrlValidPhoneNumber =
          tels[0].num === initalFormState.tels[0].num ||
          tels[0].num.match(
            new RegExp(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/)
          );
        let wholeFormComplete =
          checkBody(formValues, [
            "firstName",
            "lastName",
            "password",
            "passwordConf",
            "email",
            "emailConf",
          ]) &&
          (tels[0].num !=='') &&
          ctrlSamePassword &&
          ctrlSameEmail &&
          ctrlValidEmail &&
          ctrlValidPassword &&
          ctrlValidPhoneNumber;
        let displayBottomWarning = false;
// signup input refs pour .focus() - Ne pas utiliser pour les valeurs des inputs
  const upEmailRef = useRef();
  const upEmailConfRef = useRef();
  const upPasswordConfRef = useRef();
  const upPasswordRef = useRef();
  const upFirstNameRef = useRef();
  const upLastNameRef = useRef();
  const upTelRef = useRef();

// FONCTIONS
  // handle change input text
  const handleChangeInput = (name, value) => {
    setformValues({
      ...formValues,
      [name]: value,
    });
  };

  // à l'initialisation
    useEffect(() => {
        upTelRef.current.focus()
        
    }, [])

  // fonction pour inscrire dans la base
  const handleRegisterAccount = ()=> {
    const BodyToSignup = {
        firstName:firstName,
        lastName:lastName,
        tels:tels,
        password:password,
        email:email.toLowerCase()
    };

    fetch(`${BACKEND_URL}/users/signup`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(BodyToSignup)
    }).then(response => response.json()).then(
        data => {
            if (data.result){
                // enregistrer dans le store
                const {email,firstName,lastName,token,tels} = data;
              dispatch(loginStore({ email,firstName,lastName,token,tels }))
                // reset les inputs
                setformValues(initalFormState);
                // rediriger vers ma journée
               props.navigation.navigate('DrawerNavigator');

            } else {
                // alert error
                alert(data.error);
               
            }
        }
    )
  }

// RETURN
  return (
    <View style={styles.modalContainer}>
      <View style={styles.header}>
        <View style={styles.headerlogo}>
          <Image
            style={styles.tinyLogo}
            source={require("../assets/Mini-logo.png")}
          />
        </View>
        <TouchableOpacity
          onPress={() => props.toggleModalSignUP()}
          style={styles.closeButton}
        >
          <FontAwesome
            name={"times"}
            style={styles.closeIcon}
            size={50}
            color={"black"}
            paddingTop={10}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.sepContainer}>
        <View style={styles.sepLine} />
        <View>
          <Text style={styles.sepText}>Ou m'inscrire avec mon email</Text>
        </View>
        <View style={styles.sepLine} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <KeyboardAvoidingView
          style={styles.keyBoardAvoidingView}
          behavior="padding"
        >
          <View style={ctrlValidPhoneNumber ? styles.inputCont : styles.inputContDanger}>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              maxLength={10}
              ref={upTelRef}
              placeholder="Téléphone"
              onChangeText={(value) =>
                handleChangeInput("tels", [{ title: "par défaut", num: value }])
              }
              value={formValues.tels[0].num}
              onEndEditing={()=> ctrlValidPhoneNumber && upEmailRef.current.focus()}
            />
            <FontAwesome
              name={"phone"}
              style={styles.iconInput}
              size={20}
              color={mainColor}
            />
            
          </View>
          {!ctrlValidPhoneNumber && <Text style={styles.msgError}>Numéro de téléphone non valide</Text>}
          <View
            style={ctrlValidEmail ? styles.inputCont : styles.inputContDanger}
            
          >
            <TextInput
              style={styles.input}
              ref={upEmailRef}
              placeholder="Email"
              onChangeText={(value) => handleChangeInput("email", value)}
              value={formValues.email}
              autoCorrect={false}
              onEndEditing={()=> ctrlValidEmail && upEmailConfRef.current.focus()}
            />
            <FontAwesome
              name={"at"}
              style={styles.iconInput}
              size={20}
              color={mainColor}
            />
          </View>
          {!ctrlValidEmail && <Text style={styles.msgError}>entrez un email finissant par @testandride.fr</Text>}

          <View style={ctrlSameEmail ? styles.inputCont : styles.inputContDanger}>
            <TextInput
              style={styles.input}
              placeholder="Confirmer mon email"
              ref={upEmailConfRef}
              onChangeText={(value) => handleChangeInput("emailConf", value)}
              value={formValues.emailConf}
              autoCorrect={false}
              onEndEditing={()=>ctrlSameEmail && upPasswordRef.current.focus()}
            />
            <FontAwesome
              name={"at"}
              style={styles.iconInput}
              size={20}
              color={mainColor}
            />
          </View>
          {!ctrlSameEmail && <Text style={styles.msgError}>vos deux emails sont différents</Text>}


          <View style={ctrlValidPassword ? styles.inputCont : styles.inputContDanger} >
            <TextInput
              style={styles.input}
              ref={upPasswordRef}
              placeholder="Mot de passe"
              secureTextEntry={showPassword}
              onChangeText={(value) => handleChangeInput("password", value)}
              value={formValues.password}
              autoCorrect={false}
              onEndEditing={()=> ctrlValidPassword && upPasswordConfRef.current.focus()}
            />
            <FontAwesome
              name={showPassword ? "eye-slash" : "eye"}
              style={styles.iconInput}
              size={20}
              color={mainColor}
              onPress={() => setShowPassword(!showPassword)}
            />
          </View>
          {!ctrlValidPassword && <Text style={styles.msgError}>8 caractères minimum</Text>}

          <View
            style={ctrlSamePassword ? styles.inputCont : styles.inputContDanger}
            
          >
            <TextInput
              style={styles.input}
              ref={upPasswordConfRef}
              placeholder="Vérifier mot de passe"
              secureTextEntry={showPassword}
              onChangeText={(value) => handleChangeInput("passwordConf", value)}
              value={formValues.passwordConf}
              autoCorrect={false}
              onEndEditing={()=>ctrlSamePassword && upLastNameRef.current.focus()}
            />
            <FontAwesome
              name={showPassword ? "eye-slash" : "eye"}
              style={styles.iconInput}
              size={20}
              color={mainColor}
              onPress={() => setShowPassword(!showPassword)}
            />
          </View>
          {!ctrlSamePassword && <Text style={styles.msgError}>vos deux mots de passes sont différents</Text>}


          <View style={styles.inputCont} >
            <TextInput
              style={styles.input}
              placeholder="Nom"
              ref={upLastNameRef}
              onChangeText={(value) => handleChangeInput("lastName", value)}
              value={formValues.lastName}
              autoCorrect={false}
              onEndEditing={()=>upFirstNameRef.current.focus()}
            />
          </View>

          <View style={styles.inputCont} >
            <TextInput
              style={styles.input}
              placeholder="Prénom"
              ref={upFirstNameRef}
              onChangeText={(value) => handleChangeInput("firstName", value)}
              value={formValues.firstName}
              autoCorrect={false}
            />
            
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <View style={styles.btnEnvoyer}>
        
        <TouchableOpacity
          style={styles.btnContain}
          onPress={() => {
            if (wholeFormComplete){
                displayBottomWarning = false;
                handleRegisterAccount();  
            } else {
              displayBottomWarning = true;
            }
          }}
        >
          <Text style={styles.btnText}>S'inscrire</Text>
        </TouchableOpacity>
      </View>
      {displayBottomWarning && <Text style={styles.msgError} >Il manque des informations !</Text>}
    </View>
  );
}
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    width: "80%",
  },
  keyBoardAvoidingView: {
    width: "100%",
  },

  /*
   *** HEADER ***
   */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerlogo: {
    alignItems: "center",
    justifyContent: "flex-end",
    width: "80%",
  },
  closeButton: {},
  tinyLogo: {
    width: 100,
    height: 100,
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
   *** INPUTS ***
   */

  inputsContainer: {
    flex: 1,
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
  inputContDanger: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: borderRadius,
    borderWidth: 1,
    borderColor: dangerColor,
    marginVertical: 15,
  },
  input: {
    fontSize: 18,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    backgroundColor: "#fff",
    color: "#424242",
    width:'90%'
  },
  msgError:{
    fontSize:12,
    color:dangerColor
  },

  /*
   *** BOUTON ***
   */

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

  btnEnvoyer: {
    marginTop: 15,
    width: "80%",
  },
});
