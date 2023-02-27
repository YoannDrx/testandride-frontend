import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image } from 'react-native';
import {Dimensions} from 'react-native';
import { useState } from 'react';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function LoginScreen() {
    const [showSignUp,setShowSignUp] = useState(false);

  return (
    
    <View style={styles.container}>
        <View style={styles.window}>
            <Image 
                style={styles.tinyLogo}
                source={require('../assets/TR-logo-200x200.png')}/>
            <Text style={styles.pageTitle}> CONNEXION</Text>
            <Text > Pas encore de compte ?</Text>
            <Text style={styles.linkSignUp} onPress={()=>setShowSignUp(true)}>Cliquez pour vous inscrire</Text>
            <View style={styles.sepContainer}>
                <View style={styles.sepLine} />
                <View>
                    <Text style={styles.sepText}>Me connecter avec mon email</Text>
                </View>
                <View style={styles.sepLine} />
            </View>
        </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  window:{
    height:screenHeight,
    width:screenWidth,
    justifyContent:'flex-start',
    alignItems:'center',
  },
  tinyLogo:{
    width:100,
    height:100,
  },
  pageTitle:{

  },
  linkSignUp:{

  },
  sepContainer:{
    flexDirection: 'row', 
    alignItems: 'center'
  },
  sepLine:{
    flex: 1, 
    height: 1, 
    backgroundColor: 'black',
  },
  sepText:{
    width: 50, 
    textAlign: 'center',
  }
});