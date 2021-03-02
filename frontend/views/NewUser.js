import React, { Component } from 'react'
import {View, TextInput, Image, StyleSheet, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, 
    Platform, Dimensions, InputAccessoryView, Button} from 'react-native'
import HeaderText from '../components/HeaderText'
import InteractiveSubmitButton from '../components/InteractiveSubmitButton'
import logo from '../assets/logo.png'

class NewUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            firstName: "",
            lastName: ""
        }
    }

    render() {
        const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
        const inputAccessoryViewID = 'newUser';
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset} contentContainerStyle={styles.avoidingViewContainer}>
                        <HeaderText>Tell Us About Yourself!</HeaderText>
                        <Image source={logo} style={styles.logo}/>
                            <TextInput 
                                style={styles.input} 
                                placeholder={'First Name'} 
                                placeholderTextColor={'#9a9a9a'} 
                                value = {this.state.firstName}
                                onChangeText = {(firstName) => this.setState({firstName})}
                                autoCorrect = {false}
                                inputAccessoryViewID={inputAccessoryViewID}
                            />
                            <TextInput 
                                style={styles.input} 
                                placeholder={'Last Name'} 
                                placeholderTextColor={'#9a9a9a'}
                                value = {this.state.lastName}
                                onChangeText = {(lastName) => this.setState({lastName})}
                                autoCorrect = {false}
                                inputAccessoryViewID={inputAccessoryViewID}
                            />
                        <InteractiveSubmitButton 
                            enabled={this.state.firstName !== "" && this.state.lastName !== ""} 
                            title='Create' 
                            route='AcceptContacts' 
                            name={this.state.firstName} 
                            color={{backgroundColor: '#007aff'}}
                            opacity={this.state.firstName !== "" && this.state.lastName !== "" ? {opacity: 1.0} : {opacity: 0.5}}
                        />
                        <Button title="Switch Flows" onPress={() => {this.props.navigation.navigate('Recommendation');}}/>
                    </KeyboardAvoidingView>
                    <InputAccessoryView nativeID={inputAccessoryViewID}>
                            <View style={styles.accessory}>
                                <Button onPress={Keyboard.dismiss} title="Done"/>
                            </View>
                    </InputAccessoryView>
                </View>
            </TouchableWithoutFeedback>
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
    },
    avoidingViewContainer: {
        width: 300,
        alignItems: 'center'
    },
    accessory: {
        width: Dimensions.get('window').width,
        height: 48,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
        paddingHorizontal: 8
    }
})

export default NewUser;
