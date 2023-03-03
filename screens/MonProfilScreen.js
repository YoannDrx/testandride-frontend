import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity,StatusBar,Platform, ScrollView } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Header from "../components/Header";
import { Dimensions, SafeAreaView } from "react-native";
import {useSelector} from "react-redux";

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

export default function MonProfilScreen({ navigation }) {
    // Todo : Récupérer les datas de l'utilisateur connecté pour les afficher dans le profil
    const user = useSelector((state) => state.user.value);
   

    
    return (
        <SafeAreaView style={styles.container}>
            
            <Header navigation={navigation} />
            <View style={styles.window}>
            <View style={styles.bodyContainer}>
                {/* Contact info */}
                <View style={styles.profilContainer}>
                    <View>
                        <Image source={require("../assets/demoAvatar.png")} style={styles.avatar} />
                    </View>

                    <View style={styles.info}>
                        <View style={styles.nameBox}>
                            <Text style={styles.prenom}>{user.firstName}</Text>
                            <Text style={styles.nom}>{user.lastName}</Text>
                        </View>
                        <View>
                            {user.tels.map(telInfo => {
                                return <Text style={styles.contactTelMail}>{`${telInfo.title} : ${telInfo.num}`}</Text>
                            })}
                            
                            <Text style={styles.contactTelMail}>{user.email}</Text>
                        </View>
                    </View>
                </View>
                
                <View style={styles.statsContainer}>
                    {/* Rdv pris */}
                    <Text style={styles.statsTitle}>Statistiques Semaine</Text>
                    <View style={styles.statsCard}>
                        <View style={styles.iconGroup}>
                            <FontAwesome name="calendar-o" size={30} color="#000" style={styles.Icon} />
                            <Text style={styles.statsData}>100%</Text>
                        </View>
                        <Text style={styles.statsCount}>18</Text>
                        <Text style={styles.statsRdv}>rdv terminés</Text>
                    </View>

                    {/* Rdv validés */}
                    <View style={styles.statsCard}>
                        <View style={styles.iconGroup}>
                            <FontAwesome name="check" size={30} color="#000" style={styles.Icon} />
                            <Text style={styles.statsData}>100%</Text>
                        </View>
                        <Text style={styles.statsCount}>9</Text>
                        <Text style={styles.statsRdv}>rdv terminés</Text>
                    </View>

                    {/* Rdv convertis */}
                    <View style={styles.statsCard}>
                        <View style={styles.iconGroup}>
                            <FontAwesome name="calendar-o" size={30} color="#000" style={styles.Icon} />
                            <Text style={styles.statsData}>100%</Text>
                        </View>
                        <Text style={styles.statsCount}>6</Text>
                        <Text style={styles.statsRdv}>rdv convertis</Text>
                    </View>

                    {/* Tps moyen */}
                    <View style={styles.statsCard}>
                        <View style={styles.iconGroup}>
                            <FontAwesome name="clock-o" size={30} color="#000" style={styles.Icon} />
                            <Text style={styles.statsData}>38 min</Text>
                        </View>
                        <Text style={styles.statsRdv}>temps moyen / rdv</Text>
                    </View>
                </View>
               

                
            </View>
            {/* Boutons */}
            <View style={styles.bottomButtonsContainer}>
                    <TouchableOpacity style={styles.bottomButtonModif} onPress={() => navigation.navigate("Modification")}>
                        <Text style={styles.bottomButtonModifText}>Demander une modification</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bottomButtonMdp} onPress={() => navigation.navigate("Nouveau mot de passe")}>
                        <Text style={styles.bottomButtonMdpText}>Nouveau mot de passe</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
       flex:1,
        backgroundColor: mainBackground,
        alignItems: "center",
        justifyContent: "flex-start",
 
    },
    bodyContainer:{
        backgroundColor:secondaryBackground,
        width:'100%',
        alignItems: "center",
        justifyContent: "flex-start",
        
    },
    window: {
        width: screenWidth,
        height:'85%',
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor:secondaryBackground
    },
    /*
    *** CONTACT INFO ***
    */
    profilContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    avatar: {
        width: 100,
        height: 100,
    },
    info: {
        marginLeft: 20,
    },
    nameBox: {
        flexDirection: "row",
        marginBottom: 10,
    },
    nom: {
        fontSize: 20,
        marginBottom: 5,
        fontWeight: "600",
        marginRight: 5,
    },
    prenom: {
        fontSize: 20,
        marginBottom: 5,
        fontWeight: "600",
        marginRight: 5,
    },
    contactTelMail: {
        fontSize: 16,
        marginBottom: 5,
    },
    contactTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 5,
    },
    contactText: {
        fontSize: 16,
        marginBottom: 5,
    },
    tel: {
        marginBottom: 0,
    },
    mail: {
        marginBottom: 20,
    },
    /*
     *** STATS ***
     */
    statsContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingLeft: "2%",
        paddingRight: "2%",
    },
    statsTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10,
        marginTop: 10,
    },
    iconGroup: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    Icon: {
        marginRight: 10,
    },
    statsCard: {
        backgroundColor: "#fff",
        borderColor: "lightgrey",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        padding: 15,
        alignItems: "center",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        scrollContent: {},
    },
    /*
        *** BOTTOM BUTTONS ***
    */
    bottomButtonsContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:mainBackground,
    },
    bottomButtonModif: {
        backgroundColor: "transparent",
        padding: 10,
        borderRadius: borderRadius,
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center",
        width: '90%',
        borderColor: "#16A085",
        borderWidth: 1,
    },
    bottomButtonModifText: {
        color: mainColor,
        fontSize: 20,
    },
    bottomButtonMdp: {
        backgroundColor: secondaryColor,
        padding: 10,
        borderRadius: borderRadius,
        justifyContent: "center",
        alignItems: "center",
        width: 330,
        borderWidth: 1,
        borderColor: secondaryColor,
    },
    bottomButtonMdpText: {
        color: "#fff",
        fontSize: 20,
    },
});
