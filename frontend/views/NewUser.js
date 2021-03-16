import React, { Component } from 'react'
import {View, TextInput, Image, StyleSheet} from 'react-native'
import HeaderText from '../components/HeaderText'
import SubmitButton from '../components/SubmitButton'
import logo from '../assets/logo.png'

class NewUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            firstName: ""
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderText>Tell Us About Yourself!</HeaderText>
                <Image source={logo} style={styles.logo}/>
                <TextInput 
                    style={styles.input} 
                    placeholder={'First Name'} 
                    placeholderTextColor={'#9a9a9a'} 
                    value = {this.state.firstName}
                    onChangeText = {(firstName) => this.setState({firstName})}
                    autoCorrect = {false}
                />
                <TextInput 
                    style={styles.input} 
                    placeholder={'Last Name'} 
                    placeholderTextColor={'#9a9a9a'}
                    autoCorrect = {false}
                />
                <SubmitButton title='Create' route='AcceptContacts' name={this.state.firstName}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 25, 
        paddingVertical: 100,
        alignItems: 'center'
    },
    logo: {
        width: 190,
        height: 209,
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

export default NewUser;
