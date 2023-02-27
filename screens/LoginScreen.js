import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image } from 'react-native';
import {Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function LoginScreen() {
  return (
    
    <View style={styles.container}>
        <View style={styles.window}>
            <Image />
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
});