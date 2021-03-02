import React from 'react'
import 'react-native-gesture-handler'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {StyleSheet} from 'react-native'
import AcceptContacts from './views/AcceptContacts'
import ContactsError from './views/ContactsError'
import RequestDescription from './views/RequestDescription'
import RequestCreated from './views/RequestCreated'
import HomeHeaderIcon from './components/HomeHeaderIcon'
import NewUser from './views/NewUser'
import Home from './views/Home'
import ViewRequest from './views/ViewRequest'
import RequestContact from './views/Recommending/RequestContact'
import Recommendation from './views/Recommending/Recommendation'
import Reject from './views/Recommending/Reject'
import RecommendationSent from './views/Recommending/RecommendationSent'
import ChooseContacts from './views/Recommending/ChooseContacts'
import WriteNoteAndroid from './views/Recommending/WriteNoteAndroid'
import WriteNoteIOS from './views/Recommending/WriteNoteIOS'
import ReplyDescription from './views/ReplyDescription'

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
         <Stack.Screen           
          name="ReplyDescription"
          component={ReplyDescription}
          options={{
            title: "",
            headerStyle: {
              height: 100
            },
          }}
        />
        <Stack.Screen
          name="RequestContact"
          component={RequestContact}
          options={{headerShown: false}}
        /> 
        <Stack.Screen
          name="Recommendation"
          component={Recommendation}
          options={{headerShown: false}}
        /> 
        <Stack.Screen
          name="ChooseContacts"
          component={ChooseContacts}
          options={{
            title: "Choose Contacts",
            headerStyle: {
              height: 100
            },
            headerRight: () => (
              <HomeHeaderIcon/>
            ),
            headerRightContainerStyle: {marginRight: 15, marginTop: 2}
          }}
        /> 
        <Stack.Screen
          name="WriteNoteAndroid"
          component={WriteNoteAndroid}
          options={{
            title: "",
            headerStyle: {
              height: 100
            }
          }}
        /> 
        <Stack.Screen
          name="WriteNoteIOS"
          component={WriteNoteIOS}
          options={{
            title: "",
            headerStyle: {
              height: 100
            }
          }}
        /> 
        <Stack.Screen
          name="RecommendationSent"
          component={RecommendationSent}
          options={{headerShown: false}}
        /> 
        <Stack.Screen
          name="Reject"
          component={Reject}
          options={{
            title: "",
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
