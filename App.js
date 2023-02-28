import * as React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";

// Screens
import MaJourneeScreen from "./screens/MaJourneeScreen";
import MonProfilScreen from "./screens/MonProfilScreen";
import LoginScreen from "./screens/LoginScreen";
import ItineraireScreen from "./screens/ItineraireScreen";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

// store
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';
const store = configureStore({
  reducer: {user},
 });


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
            })}
            drawerPosition="right"
        >
            <Drawer.Screen name="maJournee" component={MaJourneeScreen} />
            <Drawer.Screen name="user" component={MonProfilScreen} />
            <Drawer.Screen name="itineraire" component={ItineraireScreen} />
        </Drawer.Navigator>
    );
};

export default function App() {
    return (
      <Provider store={store}>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="login" component={LoginScreen} />
                <Stack.Screen name="profil" component={MonProfilScreen} />
                <Stack.Screen name="maJournee" component={MaJourneeScreen} />
                <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
        </Provider>
    );
}
