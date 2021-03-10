import React, { Component } from 'react'
import {View, StyleSheet, TextInput, Text, Button, Alert} from 'react-native'
import BigHeaderText from '../components/BigHeaderText'
import SubmitButton from '../components/SubmitButton'

class ReplyDescription extends Component {

    constructor(props) {
        super(props)
        this.state = {
           
        }
    }

    openConfirmationAlert() {
        Alert.alert(
            "Archive Reply",
            "Are you sure you're done recommending for this reply? Once you click Done, this reply will be archived and you won't be able to recommend anymore.",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Done",
                    onPress: () => this.props.navigation.navigate('Home')
                }
            ]
        )
    }

    render() {
        return (
                <View style={styles.container}>
                    <BigHeaderText>{this.props.route.params.title}</BigHeaderText>
                    <Text style={styles.subtitle}>{this.props.route.params.subtitle}</Text>
                    <View style={styles.alert}>
                        <View style={styles.textInputContainer}>
                            <TextInput 
                                style={styles.alertText}
                                multiline = {true}
                                editable = {false}
                                value = {replyDescription}
                                numberOfLines={15}
                                autoCorrect={false}
                            />
                        </View>
                    </View>
                    <SubmitButton title='Recommend' route='ChooseContacts' color={{backgroundColor: '#007aff'}}/>
                    <Button title="I'm Done Recommending" color="#007aff" onPress={() => {this.openConfirmationAlert()}}/>
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
    },
    subtitle: {
        fontSize: 24,
        marginTop: 10
    }
})

const replyDescription = "I'm looking for a few new workout partners. I just switched gyms last month and I don't really know anyone that goes to my new gym. If you know anyone who goes to the Planet Fitness in Providence, please let me know because I hate working out alone. Thanks!"

export default ReplyDescription;
