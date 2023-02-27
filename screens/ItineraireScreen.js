import React from 'react'
import { View, Text, StyleSheet } from 'react-native'


export default function ItineraireScreen() {

    return (
        <View style={styles.container}>
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
