import React, { Component } from 'react'
import {View, StyleSheet, Button, Text, TextInput, TouchableOpacity} from 'react-native'
import {Feather} from '@expo/vector-icons'
import BigHeaderText from '../components/BigHeaderText'
import CopyButton from '../components/CopyButton'
import ShareButton from '../components/ShareButton'

class RequestDescription extends Component {

    constructor(props) {
        super(props)
        this.state = {
            description: description,
            isEditable: false
        }
    }

    editText() {
        this.setState({isEditable: true})
        setTimeout(() => this.textInput.focus(), 100)
    }

    saveText() {
        this.setState({isEditable: false})
        this.textInput.blur()
    }

    render() {
        return (
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
                        />
                        <TouchableOpacity
                            onPress = {() => {this.editText()}}
                        >   
                            {this.state.isEditable 
                                ? <Button title="Save" onPress = {() => {this.saveText()}}/>
                                : <Feather name="edit" size={24} color="#007aff" />
                            }

                        </TouchableOpacity>
                    </View>
                </View>
                <CopyButton title='Copy Request Link' link='https://myrequestlink.brown.edu' color={{backgroundColor: '#007aff'}} onPress = {() => {this.copyToClipboard()}}/>
                <ShareButton title='Share' color={{backgroundColor: '#007aff'}}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 25, 
        alignItems: 'center',
        backgroundColor: 'white'
    },
    alert: {
        marginVertical: 30,
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: '#EEEEEE',
        width: '90%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    alertText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#333333'
    },
    textInputContainer: {
        width: '100%',
        alignItems: 'flex-end'
    }
})

const description = "I’m looking for some new friends to read with! None of my current friends really enjoy the types of books that I read, so if you know of anyone who has a soft spot for sci-fi or romance novels, please connect us. \n\nSome of my favorite authors are Isaac Asimov, H.G. Wells, Robyn Carr, and Alyssa Cole."

export default RequestDescription;
