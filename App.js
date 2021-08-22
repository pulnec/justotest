// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Views from './src/views/CombineViews';
import { Provider } from 'react-redux';
import configureStore from './src/views/redux/store';
import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={configureStore}>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="News" component={Views.ListNewsView} />
          <Stack.Screen name="DetailNews" component={Views.InformationView} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;