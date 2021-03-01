import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Linking, NativeModules, Platform, Alert} from 'react-native'
import * as Permissions from 'expo-permissions';
import {useNavigation} from '@react-navigation/native'
const { RNAndroidOpenSettings } = NativeModules;

function openAppSettings() {
    if (Platform.OS === 'ios') {
      Linking.openURL("app-settings:");
    } else {
      Linking.openSettings();
    }
}


function showAlert(){
    Alert.alert('Please go to settings to allow access to contacts')
}


const PermissionButton = (props) => {
    
    const navigation = useNavigation();

    async function checkPermission(){

        const {status} = await Permissions.askAsync(Permissions.CONTACTS);
        if (status==='granted'){
            navigation.navigate(props.route, {name: props.name})
        }
        else{
            showAlert()
        }
    }
    function nextStep(){
        checkPermission()
    }
    return(
        <>
            <View style={styles.container}>
                <TouchableOpacity style={[styles.button, props.color, props.width]} onPress={nextStep}>
                    <Text style={styles.buttonText}>{props.title}</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15
    },
    button: {
        padding: 10,
        width: 120,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    buttonText: {
        color: 'white',
        fontWeight: '400',
        fontSize: 18
    }
})

export default PermissionButton;