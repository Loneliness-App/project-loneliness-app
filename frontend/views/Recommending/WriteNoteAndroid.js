import React, { Component } from 'react'
import {View, Text, StyleSheet, Platform,} from 'react-native'
import {Avatar} from 'react-native-elements'
import HeaderText from '../../components/HeaderText'
import {TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class WriteNoteAndroid extends Component {
    constructor(props) {
        super(props)
        this.state = {
           note: ""
        }
    }

    render() {
        return (
            <KeyboardAwareScrollView  style = {{flex:1}} extraHeight={200} enableOnAndroid>
                <View style={styles.container}>
                    {this.props.route.params.image 
                        ? <Avatar rounded size="large" source={{uri: this.props.route.params.image.uri  }}/>
                        : <Avatar rounded overlayContainerStyle={{backgroundColor: '#c8c8c8'}} size="large" title={this.props.route.params.name[0]} titleStyle={{color: 'white'}}/>
                    }
                <HeaderText style = {{textAlign:'center'}}>Write your note about {this.props.route.params.name}!</HeaderText>
                <Text style={styles.inputText}>{this.props.route.params.number}</Text>
                <View style={styles.alert}>
                    <TextInput 
                        style = {styles.textInput}
                        multiline = {true}
                        scrollEnabled = {true}
                        numberOfLines = {4}
                        placeholder = {"Add note"}
                        placeholderTextColor={'#9a9a9a'}
                        maxLength = {300}
                        autoCorrect = {false}
                        value = {this.state.note}
                        onChangeText = {(note) => this.setState({note})}
                    />
                </View>
                <View style = {{flex: 1}}>
                <TouchableOpacity style={styles.button} onPress={() => {
                    if(this.state.note !== ''){
                        this.props.navigation.navigate('ChooseContacts', {name: this.props.route.params.name, image: this.props.route.params.image, number: this.props.route.params.number, showmodal: true, originalobj: this.props.route.params.object})
                    }
                    else{
                        alert('Please write a note for your recommendation')
                    }
                   
                }}>
                    <Text style={styles.buttonText}>Send Recommendation</Text>
                </TouchableOpacity>
                </View>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 80,
        margin: 30, 
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    alert: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#E1E1E1',
        width: '100%',
        height: '70%',
        borderRadius: 10,
        justifyContent: 'flex-start',
    },
    inputText: {
        fontSize: 18,
        fontWeight: '500',
    },
    textInput: {
        fontSize: 16,
        width: '100%',
        height: '100%'
    },
    button: {
        backgroundColor: '#007aff',
        width: 250,
        height: 55,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    buttonText: {
        color: 'white',
        fontWeight: '400',
        fontSize: 18
    }
})

export default WriteNoteAndroid;
