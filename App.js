import * as React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

// Screens
import MaJourneeScreen from "./screens/MaJourneeScreen";
import MonProfilScreen from "./screens/MonProfilScreen";
import LoginScreen from "./screens/LoginScreen";
import ItineraireScreen from "./screens/ItineraireScreen";
import FeedbackScreen from "./screens/FeedbackScreen";
import CalendarScreen from "./screens/CalendarScreen";
import MeetingDetails from "./screens/MeetingDetails";
import SnapScreen from './screens/SnapScreen';


// Components
import DrawerContent from "./components/DrawerContent";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";

// store
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";
import myMeetings from "./reducers/myMeetings";
import meetingDetails from "./reducers/meetingDetails";

const store = configureStore({
  reducer: { user, myMeetings,meetingDetails },
});
// style constants
import constant from "./constants/constant";

const mainColor = constant.mainColor;
const secondaryColor = constant.secondaryColor;
const borderRadius = constant.borderRadius;
const secondaryBackground = constant.secondaryBackground;
const logoPath = constant.logoPath;
const mainBackground = constant.mainBackground;

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Drawer Navigator
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
    drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={({ route }) => ({
        drawerIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "profil") {
            iconName = "user-circle";
          } else if (route.name === "maJournee") {
            iconName = "check-square";
          } else if (route.name === "itineraire") {
            iconName = "map";
          } else if (route.name === "calendrier") {
            iconName = "calendar";
          } else if (route.name === "meetingDetails") {
            iconName = "address-book-o";
          } else if (route.name === "snap") {
            iconName = "camera";
          } else if (route.name === "feedback") {
            iconName = "comment";
          }

          return <FontAwesome name={iconName} size={30} color={color} />;
        },
        drawerActiveTintColor: mainColor,
        drawerActiveBackgroundColor: secondaryBackground,
        drawerInactiveTintColor: secondaryColor,
        headerShown: false,
        drawerLabelStyle: { fontSize: 18 },
        
      })}
    >
      <Drawer.Screen
        name="maJournee"
        component={MaJourneeScreen}
        options={() => ({
          title: "Ma journée",
        })}
      />
      <Drawer.Screen
        name="profil"
        component={MonProfilScreen}
        options={() => ({
          title: "Mon Profil",
        })}
      />
      <Drawer.Screen
        name="itineraire"
        component={ItineraireScreen}
        options={() => ({
          title: "Itinéraire",
        })}
      />
       <Drawer.Screen
        name="calendrier"
        component={CalendarScreen}
        options={() => ({
          title: "Calendrier",
        })}
      />
      <Drawer.Screen
        name="meetingDetails"
        component={MeetingDetails}
        options={() => ({
          title: "Fiche rendez-vous",
        })}
      />
      <Drawer.Screen
      name="googleForm"
      component={GoogleFormScreen}
      options={()=> ({
        title:"Feedback"
      })}
      />
      <Drawer.Screen
        name="snap"
        component={SnapScreen}
        options={() => ({
          title: "Appareil photo",
        })}
      />
          <Drawer.Screen
        name="feedback"
        component={FeedbackScreen}
        options={() => ({
          title: "Feedback",
        })}
      />
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
          <Stack.Screen name="Feedback" component={FeedbackScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
