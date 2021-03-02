import React from 'react'
import 'react-native-gesture-handler'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {StyleSheet} from 'react-native'
import NewUser from './views/NewUser'
import AcceptContacts from './views/AcceptContacts'
import ContactsError from './views/ContactsError'
import Home from './views/Home'
import ViewRequest from './views/ViewRequest'
import RequestDescription from './views/RequestDescription'
import RequestCreated from './views/RequestCreated'
import HomeHeaderIcon from './components/HomeHeaderIcon'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions = {{
          cardStyle: {backgroundColor: 'white'}
        }}
      >
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
        <Stack.Screen           
          name="ContactsError"
          component={ContactsError}
          options={{headerShown: false}}
        />
        <Stack.Screen           
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen           
          name="ViewRequest"
          component={ViewRequest}
          options={{
            title: "",
            headerStyle: {
              height: 100
            }
          }}
        />
        <Stack.Screen           
          name="RequestCreated"
          component={RequestCreated}
          options={{
            title: "Request Created",
            headerStyle: {
              height: 100
            },
            headerRight: () => (
              <HomeHeaderIcon/>
            ),
            headerLeft: null,
            headerRightContainerStyle: {marginRight: 15, marginTop: 2}
          }}
        />
        <Stack.Screen           
          name="RequestDescription"
          component={RequestDescription}
          options={{
            title: "Request Description",
            headerStyle: {
              height: 100
            },
            headerRight: () => (
              <HomeHeaderIcon/>
            ),
            headerRightContainerStyle: {marginRight: 15, marginTop: 2}
          }}
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
  }
});
