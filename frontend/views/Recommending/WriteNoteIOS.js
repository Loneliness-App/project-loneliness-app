import React, { Component } from 'react'
import {View, Text, StyleSheet, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, InputAccessoryView, Dimensions,
        Button} from 'react-native'
import {Avatar} from 'react-native-elements'
import HeaderText from '../../components/HeaderText'
import {TextInput, TouchableOpacity } from 'react-native-gesture-handler'

class WriteNoteIOS extends Component {
    constructor(props) {
        super(props)
        this.state = {
           note: ""
        }
    }

    render() {
        const keyboardVerticalOffset = Platform.OS === 'ios' ? 60 : 0
        const inputAccessoryViewID = 'writeNote';
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset} contentContainerStyle={styles.avoidingViewContainer}> 
                        {this.props.route.params.image 
                            ? <Avatar rounded size="large" source={{uri: this.props.route.params.image.uri  }}/>
                            : <Avatar rounded overlayContainerStyle={{backgroundColor: '#c8c8c8'}} size="large" title={this.props.route.params.name[0]} titleStyle={{color: 'white'}}/>
                        }
                        <HeaderText style = {{textAlign:'center', paddingVertical: 5}}>Write your note about {this.props.route.params.name}!</HeaderText>
                        <Text style={styles.inputText}>{this.props.route.params.number}</Text>
                        <View style={styles.alert}>
                            <TextInput 
                                style = {styles.textInput}
                                multiline = {true}
                                scrollEnabled = {true}
                                numberOfLines = {12}
                                placeholder = {"Add note"}
                                placeholderTextColor={'#9a9a9a'}
                                maxLength = {300}
                                autoCorrect = {false}
                                value = {this.state.note}
                                onChangeText = {(note) => this.setState({note})}
                                inputAccessoryViewID={inputAccessoryViewID}
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
        margin: 30, 
        paddingVertical: 10,
        alignItems: 'center',
    },
    alert: {
        width: '100%',
        height: '55%'
    },
    inputText: {
        fontSize: 18,
        fontWeight: '500',
        paddingVertical: 5
    },
    textInput: {
        backgroundColor: '#EEEEEE',
        fontSize: 16,
        marginVertical: 10,
        paddingHorizontal: 15,
        paddingTop: 15,
        paddingBottom: 30,
        borderRadius: 10,
        width: '100%',
        minHeight: 220
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

export default WriteNoteIOS;
