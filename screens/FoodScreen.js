import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as ReduxProvider } from 'react-redux';
import configureStore from '../redux/store';
import FoodEats from './FoodEats';
import RestaurantDetail from './RestaurantDetail';
import OrderCompleted from './OrderCompleted';

const store = configureStore();

export default function FoodScreen({route}) {
  const Stack = createStackNavigator();
  const screenOptions = {
    headerShown: false,
  };

  return (
    <ReduxProvider store={store}>
        <Stack.Navigator initialRouteName='FoodEats' screenOptions={screenOptions}>
          <Stack.Screen name="FoodEats" component={FoodEats}/>
          <Stack.Screen name="RestaurantDetail" component={RestaurantDetail}/>
          <Stack.Screen name="OrderCompleted" component={OrderCompleted} route={route}/>
        </Stack.Navigator>
    </ReduxProvider>
  )
}


const styles = StyleSheet.create({})