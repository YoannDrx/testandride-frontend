import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Header from "../components/Header";


export default function ItineraireScreen() {

    return (
        <View style={styles.container}>
            <Header navigation={navigation}/>
            <Text>itinéraire</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'green',
        borderWidth: 1,
    },
})
