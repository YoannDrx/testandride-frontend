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
        <View style={styles.container}>
            <TouchableOpacity style={styles.btn}><FontAwesome name='user-circle' size={35} color={secondaryColor} onPress={()=> navigation.navigate('profil')}/></TouchableOpacity>
            <Image source={logoPath} style={styles.logo} resizeMode='contain' onPress={()=> navigation.navigate('maJournee')}/>
            <TouchableOpacity style={styles.btn}><FontAwesome name='bars' size={35} color={secondaryColor} onPress={()=> navigation.openDrawer()}/></TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        height: '12%',
        alignItems: 'center',
        justifyContent: 'space-between',
        width:'100%',
        backgroundColor:mainBackground,
    },
    logo:{
        width:100,
    },
    btn:{
        marginHorizontal:10,
    }
})
