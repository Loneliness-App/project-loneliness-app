import React, { Component } from 'react'
import {View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Dimensions, InputAccessoryView, Button, StyleSheet} from 'react-native'
import SubmitButton from '../components/SubmitButton'

class CreateRequest extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: "",
            description: "",
        };
    }

    render() {
        const accessoryViewID = 'createRequest';
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.fieldText}>Title</Text>
                        <TextInput 
                            style={styles.titleTextInput}
                            placeholder={'Give your request a title!'} 
                            placeholderTextColor={'#9a9a9a'} 
                            value = {this.state.title}
                            onChangeText = {(title) => this.setState({title})}
                            autoCorrect={false}
                            inputAccessoryViewID={accessoryViewID}
                        />
                    </View>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.fieldText}>Description</Text>
                        <TextInput 
                            style={styles.descriptionTextInput}
                            multiline={true}
                            numberOfLines={15}
                            placeholder={'Describe the type of friend you\'re looking for!'} 
                            placeholderTextColor={'#9a9a9a'} 
                            value = {this.state.description}
                            onChangeText = {(description) => this.setState({description})}
                            inputAccessoryViewID={accessoryViewID}
                            autoCorrect={false}
                        />
                    </View>
                    <SubmitButton 
                        enabled={this.state.title !== "" && this.state.description !== ""} 
                        title='Create' 
                        route='RequestCreated' 
                        description={this.state.description}
                        name={this.state.title}
                        color={{backgroundColor: '#007aff'}}
                        opacity={this.state.title !== "" && this.state.description !== "" ? {opacity: 1.0} : {opacity: 0.5}}
                    />
                    <InputAccessoryView nativeID={accessoryViewID}>
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
        backgroundColor: 'white',
        width: '100%',
        alignItems: 'center'
    },
    titleContainer: {
        width: '100%',
        paddingHorizontal: 30,
        paddingTop: 20,
        paddingBottom: 15,
    },
    descriptionContainer: {
        width: '100%',
        height: '50%',
        paddingHorizontal: 30
    },
    fieldText: {
        fontSize: 18,
        fontWeight: '500',
        paddingLeft: 5,
    },
    titleTextInput: {
        backgroundColor: '#EEEEEE',
        fontSize: 16,
        marginVertical: 10,
        padding: 15,
        borderRadius: 10
    },
    descriptionTextInput: {
        backgroundColor: '#EEEEEE',
        fontSize: 16,
        marginVertical: 10,
        paddingHorizontal: 15,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 10,
        maxHeight: 240, 
        minHeight: 200
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

export default CreateRequest;
