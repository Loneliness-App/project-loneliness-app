import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {useNavigation} from '@react-navigation/native'

const SubmitButton = (props) => {
    const navigation = useNavigation();

    return(
        <>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={() => {
                    navigation.navigate(props.route, {name: props.name});
                }}>
                    <Text style={styles.buttonText}>{props.title}</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15
    },
    button: {
        backgroundColor: '#007aff',
        padding: 10,
        width: 120,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    buttonText: {
        color: 'white',
        fontWeight: '400',
        fontSize: 18
    }
})

export default SubmitButton;