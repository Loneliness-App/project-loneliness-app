import React, { Component } from 'react'
import {View, TextInput, Image, StyleSheet} from 'react-native'
import HeaderText from '../../components/HeaderText'
import SubmitButton from '../../components/SubmitButton'
import icon from '../../assets/successIcon.png'

class RecommendationSent extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Image source={icon} style={styles.logo}/>
                <HeaderText style = {{padding: 20}}>Recommendation Sent!</HeaderText>
                <SubmitButton title='Recommend more' route='ChooseContacts'   color={{backgroundColor: '#007aff',  width: 250} }/>
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
    logo: {
        width: 200,
        height: 200,
        marginTop: 30,
        marginBottom: 10
    },
    input: {
        marginTop: 30,
        height: 60,
        borderColor: '#9a9a9a',
        borderWidth: 2,
        width: '95%',
        borderRadius: 10,
        paddingHorizontal: 20,
        fontSize: 18,
        fontWeight: '400'
    }
})

export default RecommendationSent;
