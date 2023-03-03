import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';


 {/* Integration du Google Form dans l'app avec Webview*/}

 const FeedbackScreen = () => {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://docs.google.com/forms/d/e/1FAIpQLScH86p3mhprzTQ-Bs_y9hNqqzXuIWp3zpow8gZqC1Z0C4cNiQ/viewform?embedded=true” width=“100%" height=“100%” frameborder=“0" marginheight=“0” marginwidth=“0">Chargement…</iframe>' }}
        style={{ flex: 1 }}
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
});

export default FeedbackScreen;
