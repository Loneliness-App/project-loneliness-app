import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import React from 'react';
import { StyleSheet} from 'react-native'
import NewUser from './views/NewUser'
import AcceptContacts from './views/AcceptContacts'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="NewUser"
          component={NewUser}
          options={{headerShown: false}}
        /> 
        <Stack.Screen           
          name="AcceptContacts"
          component={AcceptContacts}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
