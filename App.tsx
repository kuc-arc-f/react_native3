import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { MainScreen } from './src/MainScreen';
import { ComposeScreen } from './src/ComposeScreen';
import { ShowScreen } from './src/ShowScreen';
import { EditScreen } from './src/EditScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="MainScreen"
            component={MainScreen}
            options={{
              title: 'メモ帳-555' // (1)
            }}
          />
          <Stack.Screen
            name="ComposeScreen"
            component={ComposeScreen}
            options={{
              title: '作成'
            }}
          />
          <Stack.Screen
            name="ShowScreen"
            component={ShowScreen}
            options={{
              title: 'Show'
            }}
          />
          <Stack.Screen
            name="EditScreen"
            component={EditScreen}
            options={{
              title: 'Edit'
            }}
          />                    
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

