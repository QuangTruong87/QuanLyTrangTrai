import React, { useState } from 'react';
import {
    View,
    Text,
} from 'react-native';
import PetListScreen from "../PetListScreen/index.tsx"
import AddPetScreen from "../AddPetScreen/index.tsx"
import PetDetailScreen from "../PetDetailScreen/index.tsx"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from '../../Pet/PetContext';



const Stack = createNativeStackNavigator();

const MainScreen = () => {
    return (
        <AuthProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerShown:false,
                }}>
                    <Stack.Screen name="PetListScreen" component={PetListScreen} />
                    <Stack.Screen name="AddPetScreen" component={AddPetScreen} />
                    <Stack.Screen name="PetDetailScreen" component={PetDetailScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </AuthProvider>
    )
}
export default MainScreen;