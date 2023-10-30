import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from '@rneui/base'

const HomeScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Home Screen</Text>
            <Button
            title="Go to Details"
            onPress={() => navigation.navigate('Details')}
            ></Button>
        </View>
    )
}

function DetailsScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Details Screen</Text>
        </View>
    )
}

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
                <Stack.Screen name="Details" component={DetailsScreen}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
