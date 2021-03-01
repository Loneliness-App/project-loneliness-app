import React, { Component } from 'react'
import {View, Image, Text, StyleSheet} from 'react-native'
import HeaderText from '../../components/HeaderText'
import SubmitButton from '../../components/SubmitButton'

class Recommendation extends Component {

    render() {
        return (
            <View style={styles.container}>
                <HeaderText style = {{textAlign:'center'}}>{currentRequest.name} has asked you to recommend for {currentRequest.title}!</HeaderText>
                <View style={styles.alert}>
                    <Text style={styles.alertText}>{currentRequest.note}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <SubmitButton title='Accept' route='ChooseContacts' color={{backgroundColor: '#007aff'}}/>
                    <SubmitButton title='Reject' route='Reject' color={{backgroundColor: '#e82020'}}/>
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
        height: '45%',
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

const currentRequest = {
    "id":1,
    "name": "Angela S.", 
    "title": "Reading Buddies",
    "note": "I’m looking for some new friends to read with! None of my current friends really enjoy the types of books that I read, so if you know of anyone who has a soft spot for sci-fi or romance novels, please connect us. Some of my favorite authors are Isaac Asimov, H.G. Wells, Robyn Carr, and Alyssa Cole.",
    "url": "success.brown.edu"
}

export default Recommendation;
