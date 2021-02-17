import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import * as Contacts from 'expo-contacts';

const ContactsButton  = (props) => {
    const navigation = useNavigation()

    async function openContacts() {
        let route = "ContactsError"
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
            route = 'Home'
        }
        navigation.navigate(route, {name: props.name});
    }

    return(
        <>
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={0.5} style={[styles.button, props.color, props.width]} onPress={openContacts}>
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

export default ContactsButton;