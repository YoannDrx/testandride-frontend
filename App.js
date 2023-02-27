// IMPORT --------------------------------------------------------------------
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Link } from 'react-native';

// STORE -------------------------------------------------------------------
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';
const store = configureStore({
  reducer: {user},
 });

// NAVIGATION --------------------------------------------------------------
import LoginScreen from './screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();



export default function App() {
return (
  <Provider store={store}>
    <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: true }}>
     <Stack.Screen name="Login" component={LoginScreen} />
   </Stack.Navigator>
  </NavigationContainer>
  </Provider>
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
},
});
