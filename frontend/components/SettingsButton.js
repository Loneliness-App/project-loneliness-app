import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Linking, NativeModules, Platform} from 'react-native'

const { RNAndroidOpenSettings } = NativeModules;

function openAppSettings() {
    if (Platform.OS === 'ios') {
      Linking.openURL("app-settings:");
    } else {
      Linking.openSettings();
    }
}

const SettingsButton = (props) => {
    return(
        <>
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={0.5} style={[styles.button, props.color, props.width]} onPress={openAppSettings}>
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

export default SettingsButton;