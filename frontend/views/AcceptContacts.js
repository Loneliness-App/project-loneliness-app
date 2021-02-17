import React, { Component } from 'react'
import {View, Image, Text, StyleSheet} from 'react-native'
import HeaderText from '../components/HeaderText'
import logo from '../assets/logo.png'
import ContactsButton from '../components/ContactsButton'

class AcceptContacts extends Component {

    render() {
        return (
            <View style={styles.container}>
                <HeaderText>Welcome {this.props.route.params.name}!</HeaderText>
                <Image source={logo} style={styles.logo}/>
                <View style={styles.alert}>
                    <Text style={styles.alertText}>Project Loneliness needs to access your contacts to enable friend 
                    recommendation giving and receiving.</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <ContactsButton title='Accept' color={{backgroundColor: '#007aff'}}/>
                </View>
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
        backgroundColor: 'white'
    },
    logo: {
        width: 190,
        height: 209,
        marginTop: 30,
        marginBottom: 10
    },
    alert: {
        marginTop: 30,
        paddingVertical: 20,
        paddingHorizontal: 10,
        backgroundColor: '#E1E1E1',
        width: '90%',
        height: '25%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    alertText: {
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        height: 50,
        paddingVertical: 10
    }
})

export default AcceptContacts;
