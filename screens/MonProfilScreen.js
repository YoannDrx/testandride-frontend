import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function MaProfilScreen({ navigation }) {
    return (
        <View style={styles.container}>
            {/* Profil */}
            <View style={styles.profilContainer}>
                <Image source={require("../assets/demoAvatar.png")} style={styles.avatar} />
                <View style={styles.info}>
                    <Text style={styles.contact}>Prénom</Text>
                    <Text style={styles.contact}>Nom</Text>
                </View>
            </View>

            <View style={styles.statsContainer}>
                {/* Rdv pris */}
                <Text style={styles.title}>Statistiques Semaine</Text>
                <View style={styles.stats}>
                    <View style={styles.iconGroup}>
                        <FontAwesome name="calendar-o" size={30} color="#000" style={styles.Icon} />
                        <Text style={styles.statsData}>100%</Text>
                    </View>
                    <Text style={styles.statsCount}>18</Text>
                    <Text style={styles.statsRdv}>rdv terminés</Text>
                </View>

                {/* Rdv validés */}
                <View style={styles.stats}>
                    <View style={styles.iconGroup}>
                        <FontAwesome name="check" size={30} color="#000" style={styles.Icon} />
                        <Text style={styles.statsData}>100%</Text>
                    </View>
                    <Text style={styles.statsCount}>9</Text>
                    <Text style={styles.statsRdv}>rdv terminés</Text>
                </View>

                {/* Rdv convertis */}
                <View style={styles.stats}>
                    <View style={styles.iconGroup}>
                        <FontAwesome name="calendar-o" size={30} color="#000" style={styles.Icon} />
                        <Text style={styles.statsData}>100%</Text>
                    </View>
                    <Text style={styles.statsCount}>6</Text>
                    <Text style={styles.statsRdv}>rdv convertis</Text>
                </View>

                {/* Tps moyen */}
                <View style={styles.stats}>
                    <View style={styles.iconGroup}>
                        <FontAwesome name="clock-o" size={30} color="#000" style={styles.Icon} />
                        <Text style={styles.statsData}>38 min</Text>
                    </View>
                    <Text style={styles.statsRdv}>temps moyen / rdv</Text>
                </View>
            </View>

            {/* Contact info */}
            <View style={styles.contactContainer}>
                <View style={styles.tel}>
                    <Text style={styles.title}>Téléphone :</Text>
                    <Text>+33 36 84 25 78 63</Text>
                </View>
                <View style={styles.mail}>
                    <Text style={styles.title}>Email :</Text>
                    <Text>example@gmail.com</Text>
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
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
        padding: 10,
    },
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
    contact: {
        fontSize: 16,
        marginBottom: 5,
    },
    contactContainer: {
        marginTop: 20,
        alignItems: "flex-start",
    },
    contactTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    contactText: {
        fontSize: 16,
        marginBottom: 5,
    },
    tel: {
        marginBottom: 15,
    },
    mail: {
        marginBottom: 15,
    },
    statsContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 10,
        marginBottom: 10,
    },
    iconGroup: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    Icon: {
        marginRight: 10,
    },
    stats: {
        borderColor: "lightgray",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        padding: 10,
        alignItems: "center",
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    contactContainer: {
        alignItems: "flex-start",
        width: "100%",
        padding: 10,
    },
    bottomButtonsContainer: {
        flexDirection: "column",
        alignItems: "center",
    },
    bottomButtonModif: {
        backgroundColor: "transparent",
        padding: 15,
        borderRadius: 5,
        marginVertical: 10,
        justifyContent: "center",
        alignItems: "center",
        width: 330,
        borderColor: "#16A085",
        borderWidth: 1,
    },
    bottomButtonModifText: {
        color: "#16A085",
        fontWeight: "bold",
    },
    bottomButtonMdp: {
        backgroundColor: "#16A085",
        padding: 15,
        borderRadius: 5,
        marginVertical: 10,
        justifyContent: "center",
        alignItems: "center",
        width: 330,
    },
    bottomButtonMdpText: {
        color: "#fff",
        fontWeight: "bold",
    },
});
