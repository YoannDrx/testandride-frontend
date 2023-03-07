
import constant from "../constants/constant";
import {
    StyleSheet,
  } from "react-native";
const statutColor = constant.statut;


function statuStyle(statutString) {
// defines color statut
let statutStyle; 
switch (statutString) {
  case 'Programmé':
    statutStyle = styles.yellowStatut;
    break;
  case 'Fait':
      statutStyle = styles.greenStatut;
      break;
  case 'Reprog':
    statutStyle = styles.redStatut;
    break;
  case 'Annulé_Client':
    statutStyle = styles.redStatut;
    break;
  case 'Annulé_T&R':
      statutStyle = styles.redStatut;
    break;
  case 'Plantage':
      statutStyle = styles.purpleStatut;
    break;
  case 'Essai Additionnel':
      statutStyle = styles.blueStatut;
    break;
  default:
    statutStyle = styles.defaultStatut;
    break;
}
    return statutStyle;
}
module.exports = { statuStyle };

const styles = StyleSheet.create({
    blueStatut:{
        backgroundColor:statutColor.blue,
      },
      redStatut:{
        backgroundColor:statutColor.red,
      },
      yellowStatut:{
        backgroundColor:statutColor.yellow,
      },
      greenStatut:{
        backgroundColor:statutColor.green,
      },
      purpleStatut:{
        backgroundColor:statutColor.purple,
      },
      defaultStatut:{
        backgroundColor:'lightgrey',
      },
})

