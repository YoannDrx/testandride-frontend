import React from 'react';
import { View, Text, StyleSheet,Button,Image,TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Header({navigation}) {

    return (
        <View style={styles.container}>
            <TouchableOpacity><FontAwesome name='user-circle' size={35} color/></TouchableOpacity>
            <Button title='profil' onPress={()=> navigation.navigate('profil')}></Button>
            <Image source={require('../assets/Mini-logo.png')} style={styles.logo} resizeMode='contain'/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        height: '12%',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: 'green',
        borderWidth: 1,
    },
    logo:{
        width:100,
    }
})
