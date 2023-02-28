import React from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Header from "../components/Header";
export default function MonProfilScreen() {

    return ( <View style={styles.container}>
        <Header navigation={navigation}/>
        {/* Profil */}
        <View style={styles.profilContainer}>
            <Image source={require("../assets/demoAvatar.png")} style={styles.avatar} />
            <View style={styles.info}>
                <Text style={styles.prenom}>Prénom</Text>
                <Text style={styles.nom}>Nom</Text>
            </View>
        </View>

        {/* Rdv pris */}
        <Text style={styles.statsTitle}>Statistiques Semaine</Text>
        <View style={styles.statsContainer}>
            <View style={styles.stats}>
                <View style={styles.iconGroup}>
                    <FontAwesome name="calendar-o" size={30} color="#000" style={styles.Icon} />
                    <Text style={styles.statsData}>100%</Text>
                </View>
                <Text style={styles.statsCount}>18</Text>
                <Text style={styles.statsRdv}>rdv terminés</Text>
            </View>
        </View>

        {/* Rdv validés */}
        <View style={styles.statsContainer}>
            <View style={styles.stats}>
                <View style={styles.iconGroup}>
                    <FontAwesome name="check" size={30} color="#000" style={styles.Icon} />
                    <Text style={styles.statsData}>100%</Text>
                </View>
                <Text style={styles.statsCount}>9</Text>
                <Text style={styles.statsRdv}>rdv terminés</Text>
            </View>
        </View>

        {/* Rdv convertis */}
        <View style={styles.statsContainer}>
            <View style={styles.stats}>
                <View style={styles.iconGroup}>
                    <FontAwesome name="calendar-o" size={30} color="#000" style={styles.Icon} />
                    <Text style={styles.statsData}>100%</Text>
                </View>
                <Text style={styles.statsCount}>6</Text>
                <Text style={styles.statsRdv}>rdv terminés</Text>
            </View>
        </View>

        {/* Tps moyen */}
        <View style={styles.statsContainer}>
            <View style={styles.stats}>
                <View style={styles.iconGroup}>
                    <FontAwesome name="clock-o" size={30} color="#000" style={styles.Icon} />
                    <Text style={styles.statsData}>38 min</Text>
                </View>
                <Text style={styles.statsRdv}>temps moyen / rdv</Text>
            </View>
        </View>
        

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
    profilContainer: {
        borderColor: "green",
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    avatar: {
        width: 100,
        height: 100,
    },
    info: {
        borderColor: "red",
        borderWidth: 1,
        marginLeft: 20,
    },
    prenom: {
        fontSize: 20,
        marginBottom: 10,
    },
    nom: {
        fontSize: 20,
    },
    statsContainer: {
        borderColor: "blue",
        borderWidth: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    iconGroup: {
        flexDirection: "row",
        borderColor: "orange",
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    Icon: {
        marginRight: 10,
    },
    stats: {
        borderColor: "red",
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "70%",
        padding: 10,
        alignItems: "center",
    },
})
