import React, { Component } from 'react'
import {View, StyleSheet, Keyboard, Dimensions, InputAccessoryView, Button, TextInput, TouchableOpacity, TouchableWithoutFeedback} from 'react-native'
import {Feather} from '@expo/vector-icons'
import BigHeaderText from '../components/BigHeaderText'
import CopyButton from '../components/CopyButton'
import ShareButton from '../components/ShareButton'

class RequestDescription extends Component {

    constructor(props) {
        super(props)
        this.state = {
            description: description,
            isEditable: false,
            link: 'https://myrequestlink.brown.edu'
        }
    }

    editText() {
        this.setState({isEditable: true})
        setTimeout(() => this.textInput.focus(), 100)
    }

    saveText() {
        this.setState({isEditable: false})
        this.textInput.blur()
        Keyboard.dismiss()
    }

    render() {
        const inputAccessoryViewID = 'requestDescription';
        return (
            <TouchableWithoutFeedback onPress={() => {this.saveText()}} accessible={false}>
                <View style={styles.container}>
                    <BigHeaderText>{this.props.route.params.title}</BigHeaderText>
                    <View style={styles.alert}>
                        <View style={styles.textInputContainer}>
                            <TextInput 
                                style={styles.alertText}
                                multiline = {true}
                                editable = {this.state.isEditable}
                                value = {this.state.description}
                                onChangeText = {(description) => this.setState({description})}
                                ref={(input) => { this.textInput = input; }}
                                numberOfLines={15}
                                inputAccessoryViewID={inputAccessoryViewID}
                                autoCorrect={false}
                            />
                            <TouchableOpacity
                                onPress = {() => {this.editText()}}
                                style={styles.editIcon}
                            >   
                                {!this.state.isEditable &&
                                    <Feather name="edit" size={24} color="#007aff" />
                                }

                            </TouchableOpacity>
                        </View>
                    </View>
                    <CopyButton title='Copy Request Link' link={this.state.link} color={{backgroundColor: '#007aff'}}/>
                    <ShareButton title='Share' requestName={this.props.route.params.title} link={this.state.link} color={{backgroundColor: '#007aff'}}/>
                    <InputAccessoryView nativeID={inputAccessoryViewID}>
                            <View style={styles.accessory}>
                                <Button onPress={() => {this.saveText()}} title="Save"/>
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
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    alert: {
        marginVertical: 30,
        paddingTop: 20,
        paddingBottom: 50,
        paddingHorizontal: 20,
        backgroundColor: '#EEEEEE',
        width: '90%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: 300, 
        minHeight: 100
    },
    alertText: {
        fontSize: 16,
        fontWeight: '400'
    },
    textInputContainer: {
        width: '100%',
    },
    editIcon: {
        position: 'absolute',
        right: -5,
        bottom: -40,
        justifyContent: 'center',
        marginBottom: 5
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

const description = "I’m looking for some new friends to read with! None of my current friends really enjoy the types of books that I read, so if you know of anyone who has a soft spot for sci-fi or romance novels, please connect us. \n\nSome of my favorite authors are Isaac Asimov, H.G. Wells, Robyn Carr, and Alyssa Cole."

export default RequestDescription;
