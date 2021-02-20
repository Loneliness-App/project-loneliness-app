import React, { Component } from 'react'
import {View, StyleSheet, Keyboard, Dimensions, InputAccessoryView, Button, TextInput, TouchableOpacity, TouchableWithoutFeedback} from 'react-native'
import {Feather} from '@expo/vector-icons'
import BigHeaderText from '../components/BigHeaderText'
import CopyButton from '../components/CopyButton'
import ShareButton from '../components/ShareButton'

class RequestCreated extends Component {

    constructor(props) {
        super(props)
        this.state = {
            link: 'https://myrequestlink.brown.edu'
        }
    }

    render() {
        return (
                <View style={styles.container}>
                    <BigHeaderText>{this.props.route.params.name}</BigHeaderText>
                    <View style={styles.alert}>
                        <View style={styles.textInputContainer}>
                            <TextInput 
                                style={styles.alertText}
                                multiline = {true}
                                editable = {false}
                                value = {this.props.route.params.description}
                                numberOfLines={15}
                                autoCorrect={false}
                            />
                        </View>
                    </View>
                    <CopyButton title='Copy Request Link' link={this.state.link} color={{backgroundColor: '#007aff'}}/>
                    <ShareButton title='Share' requestName={this.props.route.params.name} link={this.state.link} color={{backgroundColor: '#007aff'}}/>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 25, 
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: 50
    },
    alert: {
        marginVertical: 30,
        paddingTop: 20,
        paddingBottom: 30,
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
        fontWeight: '400',
        color: '#333333',
    },
    textInputContainer: {
        width: '100%'
    }
})

export default RequestCreated;
