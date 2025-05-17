import { enableScreens } from 'react-native-screens';
enableScreens();
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BlogScreen from './src/screens/BlogScreen';
import BlogDetailScreen from './src/screens/BlogDetailScreen';
import HomeScreen from './src/screens/HomeScreen';
import FormScreen from './src/screens/FormScreen';
import NutritionChartScreen from './src/screens/NutritionChartScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="NutritionChart" component={NutritionChartScreen} options={{ title: 'Grafik Nutrisi' }} />
        <Stack.Screen name="Form" component={FormScreen} options={{ title: 'Tambah Data' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Blog" component={BlogScreen} options={{ title: 'Artikel' }} />
        <Stack.Screen name="BlogDetail" component={BlogDetailScreen} options={{ title: 'Detail Artikel' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
