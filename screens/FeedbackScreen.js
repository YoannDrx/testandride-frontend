import React from 'react';
import { View, StyleSheet, Button, Dimensions, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

// Import components
import Header from "../components/Header";

// hooks 
import { useSelector } from 'react-redux';

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


 const FeedbackScreen = (props) => {
  
 {/* Rendre l'ID essai dynamique dans la google form*/}
 const meetingDetails = useSelector(state => state.meetingDetails.value);
 const ID_ESSAI = meetingDetails.infos.fields.Course_id;
 const url = `https://docs.google.com/forms/d/e/1FAIpQLSe7hWXiDgbZIIhU2FCqBZ8lQtDGNXZOWUbABnOQU9YMsop3Ew/viewform?usp=pp_url&entry.1687010671=${ID_ESSAI}`;

  return (
    <SafeAreaView style={styles.container}>
       {/* Integration du Google Form dans l'app avec Webview*/}
      <View style={styles.webViewContainer}>
      <WebView
        source={{ uri: url }}
      />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Fermer"
          onPress={() => props.navigation.goBack()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    zIndex: 1,
  },
  webViewContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    zIndex: 1,
    position: 'absolute',
    margin: 0,
    padding: 0,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 30,
    width: '80%',
    height: 50,
    backgroundColor: 'white',
    zIndex: 2,
    elevation: 2,
    left: '10%',
    
    
  },
});

export default FeedbackScreen;