import React from 'react'
import { View, Text, StyleSheet } from 'react-native'


export default function MonJourneeScreen() {

    return (
        <View style={styles.container}>
            <Text>ma journée</Text>
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