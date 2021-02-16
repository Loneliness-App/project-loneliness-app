import React, { Component } from 'react'
import {View, StyleSheet, Text} from 'react-native'
import { Ionicons } from '@expo/vector-icons';

class ViewRequest extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                 <View style={styles.iconContainer}>
                    <Ionicons name="md-information-circle-outline" size={28} color="#007aff" />
                </View>
                <Text style={styles.bigHeader}>{this.props.route.params.title}</Text>
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
    bigHeader: {
        fontWeight: '700',
        fontSize: 32
    }, 
    iconContainer: {
        width: '105%',
        alignItems: 'flex-end',
        marginTop: -5
    }
})

export default ViewRequest;
