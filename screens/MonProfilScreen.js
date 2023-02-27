import React from 'react'
import { View, Text, StyleSheet } from 'react-native'


export default function MonProfilScreen() {

    return (
        <View style={styles.container}>
            <Text>monProfile</Text>
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
