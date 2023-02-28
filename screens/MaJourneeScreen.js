import React from "react";
import { View, StyleSheet,Text } from "react-native";
import Header from "../components/Header";


export default function MaJourneeScreen({ navigation }) {
    return (
        
        <View style={styles.container}>
            <Header navigation={navigation}/>
        </View>
    );
}
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
    }
});
