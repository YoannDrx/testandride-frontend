import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';


 {/* Integration du Google Form dans l'app avec Webview*/}
const GoogleFormScreen = () => {
  const html = `
    <style>
      body {
        background-color: #16A085 !important;
      }
    </style>
    <iframe src=“https://docs.google.com/forms/d/e/1FAIpQLScH86p3mhprzTQ-Bs_y9hNqqzXuIWp3zpow8gZqC1Z0C4cNiQ/viewform?embedded=true” width=“100%" height=“100%” frameborder=“0" marginheight=“0” marginwidth=“0">Chargement…</iframe>
  `;

  return (
    <View style={styles.container}>
      <WebView
        source={{ html }}
        style={styles.webView}
        scrollEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webView:{
    flex: 1 
  }
});

export default GoogleFormScreen;
