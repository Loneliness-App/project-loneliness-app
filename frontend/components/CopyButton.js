import React, { useState } from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import Clipboard from 'expo-clipboard'

const CopyButton = (props) => {

    const [copied, setCopied] = useState(props.title)
 
    const copyToClipboard = () => {
        Clipboard.setString(props.link);
        setCopied('Copied!')
    }

    return(
        <>
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={0.5} style={[styles.button, props.color, props.width]} onPress={() => {copyToClipboard()}}>
                    <Text style={styles.buttonText}>{copied}</Text>
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

export default CopyButton;