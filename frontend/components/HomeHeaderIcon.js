import React from 'react'
import {TouchableOpacity} from 'react-native'
import {AntDesign} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'

const HomeHeaderIcon = () => {
    const navigation = useNavigation();

    return(
        <>
            <TouchableOpacity onPress={() => {navigation.navigate('Home')}}>
                <AntDesign name="home" size={24} color="#007aff"/>
            </TouchableOpacity>
        </>
    )
}

export default HomeHeaderIcon;