import React from 'react';
import { View, Text, StyleSheet,Button,Image,TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// style constants
import constant from '../constants/constant';
const mainColor = constant.mainColor;
const secondaryColor = constant.secondaryColor;
const borderRadius = constant.borderRadius;
const secondaryBackground = constant.secondaryBackground;
const logoPath = constant.logoPath;
const mainBackground = constant.mainBackground;

export default function Header({navigation}) {

    return (
        <View style={styles.headerContainer}>
            <View style={styles.shadowContainer} />
            <TouchableOpacity onPress={()=> navigation.navigate('profil')} style={styles.btn} ><FontAwesome name='user-circle' size={35} color={secondaryColor} /></TouchableOpacity>
            <TouchableOpacity onPress={()=> navigation.navigate('maJournee')} style={styles.btn}><Image source={logoPath} style={styles.logo} resizeMode='contain' /></TouchableOpacity>
            <TouchableOpacity onPress={()=> navigation.openDrawer()} style={styles.btn}><FontAwesome name='bars' size={35} color={secondaryColor} /></TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: mainBackground,
        marginVertical: 10,
        height: 70, // Réduire la hauteur du Header
    },
    shadowContainer: {
        position: 'absolute',
        width: '100%',
        height: 5, // Hauteur de l'ombre
        backgroundColor: mainBackground,
        bottom: 0, // Positionner la vue sous le Header
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4, // Décaler l'ombre
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    logo:{
        width:100,
    },
    btn:{
        marginHorizontal:10,
    }
})