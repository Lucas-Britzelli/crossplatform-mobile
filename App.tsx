import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button } from '@rneui/base'
import UserList from './src/screens/UserList/UserList'
import { Provider } from 'react-redux'
import { store } from './src/store/store'
import { UserForm } from './src/screens/UserForm/UserForm';
import { ToastProvider } from 'react-native-toast-notifications'

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <ToastProvider>
        <Provider store={store}>
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen name="User List" component={UserList}></Tab.Screen>
                    <Tab.Screen name="Create User" component={UserForm}></Tab.Screen>
                </Tab.Navigator>
            </NavigationContainer>
        </Provider>
        </ToastProvider>
    )
}
