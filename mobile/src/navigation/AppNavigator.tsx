import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LiveRunScreen from '../screens/LiveRunScreen';
import RunDetailScreen from '../screens/RunDetailScreen';
import CompareScreen from '../screens/CompareScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Ski Tracker' }} />
        <Stack.Screen name="LiveRun" component={LiveRunScreen} options={{ title: 'Live Run' }} />
        <Stack.Screen name="RunDetail" component={RunDetailScreen} options={{ title: 'Run Details' }} />
        <Stack.Screen name="Compare" component={CompareScreen} options={{ title: 'Compare Runs' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
