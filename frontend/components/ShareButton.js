import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'

const ShareButton = (props) => {

    return(
        <>
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={0.5} style={[styles.button, props.color, props.width]}>
                    <Text style={styles.buttonText}>{props.title}</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    button: {
        padding: 10,
        paddingHorizontal: 30,
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

export default ShareButton;