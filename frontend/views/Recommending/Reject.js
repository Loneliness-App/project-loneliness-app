import React, { Component } from 'react'
import {View, Text, StyleSheet} from 'react-native'
import HeaderText from '../../components/HeaderText'
import SubmitButton from '../../components/SubmitButton'

class Reject extends Component {

    render() {
        return (
            <View style={styles.container}>
                <HeaderText style = {{padding: 20, textAlign: 'center'}}>Thank you for your time!</HeaderText>
                <View style={styles.alert}>
                    <Text style={styles.alertText}>If you would still like to recommend a friend, press back.</Text>
                </View>
                <SubmitButton title='Back' route='Recommendation'   color={{backgroundColor: '#007aff'} }/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 25, 
        paddingVertical: 20,
        marginVertical: 100,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    alert: {
        marginTop: 30,
        paddingVertical: 20,
        paddingHorizontal: 15,
        backgroundColor: '#E1E1E1',
        width: '95%',
        height: '30%',
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

export default Reject;
