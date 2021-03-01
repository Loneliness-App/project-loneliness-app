import React, { Component } from 'react'
import {View, Text, StyleSheet} from 'react-native'
import SettingsButton from '../components/SettingsButton'
import SubmitButton from '../components/SubmitButton'

class ContactsError extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.alert}>
                    <Text style={styles.alertText}>Project Loneliness needs contact access to enable its core functionality. Please go to 
                    Settings and allow access to your contacts.</Text>
                </View>
                <SettingsButton title='Open Settings' color={{backgroundColor: '#007aff', width: 150}}/>
                <SubmitButton title='Back' route='NewUser' color={{backgroundColor: '#007aff'}}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 25, 
        paddingVertical: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    alert: {
        marginTop: 30,
        paddingVertical: 20,
        paddingHorizontal: 15,
        backgroundColor: '#E1E1E1',
        width: '95%',
        height: '50%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    alertText: {
        fontSize: 24,
        fontWeight: '500',
        textAlign: 'center'
    }
})

export default ContactsError;
