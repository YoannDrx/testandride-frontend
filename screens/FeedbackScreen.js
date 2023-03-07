import React from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, Text} from "react-native";
import { WebView } from "react-native-webview";
import FontAwesome from "react-native-vector-icons/FontAwesome";

// Import components
import Header from "../components/Header";

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

const FeedbackScreen = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} />
            <View>
                <TouchableOpacity style={styles.goBack} onPress={() => navigation.goBack()}>
                    <FontAwesome name="arrow-left" size={25} color={dangerColor} />
                    <Text style={styles.goBackText}>Retour</Text>
                </TouchableOpacity>
            </View>
            <WebView
                source={{
                    uri: 'https://docs.google.com/forms/d/e/1FAIpQLScH86p3mhprzTQ-Bs_y9hNqqzXuIWp3zpow8gZqC1Z0C4cNiQ/viewform?embedded=true” width=“100%" height=“100%” frameborder=“0" marginheight=“0” marginwidth=“0">Chargement…</iframe>',
                }}
                style={{ flex: 1 }}
                scrollEnabled={true}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    goBack: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
        marginLeft: 10,
    },
    goBackText: {
        color: dangerColor,
        fontSize: 20,
        marginLeft: 10,
          
    },
});

export default FeedbackScreen;