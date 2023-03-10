import * as React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

// Screens
import MaJourneeScreen from "./screens/MaJourneeScreen";
import MonProfilScreen from "./screens/MonProfilScreen";
import LoginScreen from "./screens/LoginScreen";
import ItineraireScreen from "./screens/ItineraireScreen";
import FeedbackScreen from "./screens/FeedbackScreen";
import CalendarScreen from "./screens/CalendarScreen";
import MeetingDetailsScreen from "./screens/MeetingDetailsScreen";

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
          title: "Ma journ??e",
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
          title: "Itin??raire",
          drawerItemStyle: {
            display: "none",
          },
        })}
      />
       {/* <Drawer.Screen
        name="calendrier"
        component={CalendarScreen}
        options={() => ({
          title: "Calendrier",
        })}
      />   */}
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
          <Stack.Screen name="feedback" component={FeedbackScreen} />
          <Stack.Screen name = "meetingDetails" component={MeetingDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
