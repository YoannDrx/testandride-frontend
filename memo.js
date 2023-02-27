import * as React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Screens
import MaJourneeScreen from "./screens/MaJourneeScreen";
import MonProfilScreen from "./screens/MonProfilScreen";
import LoginScreen from "./screens/LoginScreen";
import ItineraireScreen from "./screens/ItineraireScreen";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Drawer Navigator
const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            screenOptions={({ route }) => ({
                drawerIcon: ({ color, size }) => {
                    let iconName = "";

                    if (route.name === "user") {
                        iconName = "user-circle";
                    } else if (route.name === "maJournee") {
                        iconName = "calendar-check-o";
                    } else if (route.name === "itineraire") {
                        iconName = "map";
                    }

                    return <FontAwesome name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "#ec6e5b",
                tabBarInactiveTintColor: "#335561",
                headerShown: true,
            })}
            drawerPosition="right"
        >
            <Drawer.Screen name="maJournee" component={MaJourneeScreen} />
            <Drawer.Screen name="user" component={MonProfilScreen} />
            <Drawer.Screen name="itineraire" component={ItineraireScreen} />
        </Drawer.Navigator>
    );
};

// User Icon Navigation
function UserIcon() {
    const navigation = useNavigation();
    const handleUserIcon = () => {
        navigation.navigate("profil");
    };
    return (
        <TouchableOpacity onPress={() => handleUserIcon()}>
            <FontAwesome name="user" size={25} color="#000" />
        </TouchableOpacity>
    );
}

// Menu Icon Navigation
function MenuIcon() {
    const navigation = useNavigation();
    const handleMenuIcon = () => {
        navigation.navigate("DrawerNavigator");
    };
    return (
        <TouchableOpacity onPress={() => handleMenuIcon()}>
            <FontAwesome name="bars" size={25} color="#000" />
        </TouchableOpacity>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: "#fff",
                    },
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                    headerLeft: () => (
                        <View style={{ marginLeft: 10 }}>
                            <UserIcon />
                        </View>
                    ),
                    headerRight: () => (
                        <View style={{ marginRight: 10 }}>
                            <MenuIcon />
                        </View>
                    ),
                }}
            >
                <Stack.Screen name="login" component={LoginScreen} />
                <Stack.Screen name="profil" component={MonProfilScreen} />
                <Stack.Screen name="maJournee" component={MaJourneeScreen} />
                <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
