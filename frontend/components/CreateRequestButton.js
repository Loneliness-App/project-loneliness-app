import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {useNavigation} from '@react-navigation/native'

const CreateRequestButton = (props) => {
    const navigation = useNavigation();

    const hideModalAndNavigate = () => {
        props.hideModal;
        navigation.navigate(props.route, {name: props.name, description: props.description});
    }

    return(
        <>
            <View style={styles.container}>
                <TouchableOpacity 
                    disabled={!props.enabled}
                    activeOpacity={0.5} 
                    style={[styles.button, props.color, props.width, props.opacity]} 
                    onPress={() => {hideModalAndNavigate()}}
                >
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

export default CreateRequestButton;