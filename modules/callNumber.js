
import { Linking,
    Platform,
    Alert, } from "react-native";
// Fonction pour lancer l'appel téléphonique
const callNumber = (phone) => {
    let phoneNumber = phone.replace(/\s/g, '')         
    
    if (Platform.OS !== "android") {
    phoneNumber = `telprompt:${phoneNumber}`;
    } else {
    phoneNumber = `tel:${phoneNumber}`;
    }
    Linking.canOpenURL(phoneNumber)
    .then((supported) => {
        if (!supported) {
        Alert.alert("Mauvais format de numéro de téléphone");
        } else {
        return Linking.openURL(phoneNumber);
        }
    })
    .catch((err) => console.log(err));
};

module.exports = { callNumber };