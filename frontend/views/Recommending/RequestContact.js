import React, { Component } from 'react'
import {View, Text, StyleSheet} from 'react-native'
import HeaderText from '../../components/HeaderText'
import SettingsButton from '../../components/SettingsButton'
import PermissionButton from '../../components/PermissionButton'

class RequestContact extends Component {

    render() {
        return (
            <View style={styles.container}>
                <HeaderText>Thank You!</HeaderText>
                <View style={styles.alert}>
                    <Text style={styles.alertText}>Project Loneliness needs contact access to enable its core functionality. Please press continue and select allow or press open settings to allow manually.</Text>
                </View>
                <SettingsButton title='Open Settings' color={{backgroundColor: '#007aff', width: 150}}/>
                <PermissionButton title='Continue' route='Recommendation' color={{backgroundColor: '#007aff'}}/>
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

export default RequestContact;
