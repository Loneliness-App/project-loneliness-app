import React, { Component } from 'react'
import {View, StyleSheet, Text, FlatList, Linking, TouchableOpacity} from 'react-native'
import {ListItem, Avatar} from 'react-native-elements'
import { Ionicons, Feather, AntDesign, Entypo, FontAwesome} from '@expo/vector-icons'
import {Collapse, CollapseHeader, CollapseBody} from 'accordion-collapse-react-native'
import {Swipeable} from 'react-native-gesture-handler'
import * as Contacts from 'expo-contacts'
import BigHeaderText from '../components/BigHeaderText'

class ViewRequest extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: friendData
        }
    }

    openContacts = async (item) => {
        const { status } = await Contacts.getPermissionsAsync();
        const contact = {
            [Contacts.Fields.FirstName]: item.firstName,
            [Contacts.Fields.LastName]: item.lastName,
            [Contacts.Fields.PhoneNumbers]: [{
                number: item.phone,
                isPrimary: true,
                label: 'mobile'
            }]
        }
        if (status === 'granted') {
            try {
                await Contacts.addContactAsync(contact)
                item.isAdded = true
                this.forceUpdate()
            } catch (e) {
                console.log(e)
            }
        }
    }

    openMessages(phone) {
        Linking.openURL(`sms:${phone}`)
    }

    deleteRecommendation(id) {
        const newData = this.state.data.filter(item => item.id !== id)
        this.setState({data: newData})
    }
  
    rightAction = (item) => {
        return (
            <View style={styles.rightIconContainer}>
                <TouchableOpacity onPress={() => {this.openMessages(item.phone)}}>
                    <AntDesign 
                        name="message1" 
                        size={24} 
                        color="#34C759" 
                    />
                </TouchableOpacity>
            </View>
        )
    }

    leftAction = (item) => {
        return (
            <View style={styles.leftIconContainer}>
                <TouchableOpacity onPress={() => {this.deleteRecommendation(item.id)}}>
                    <AntDesign 
                        name="close"
                        size={24} 
                        color="#ff5a5a"
                    />
                </TouchableOpacity>
            </View>
        )
    }

    renderItem = ({item}) => (
        <Swipeable
            renderRightActions={() => this.rightAction(item)}
            renderLeftActions={() => this.leftAction(item)}
        >
            <Collapse style={styles.listItemContainer}>
                <CollapseHeader style={{paddingHorizontal: 3}}>
                    <ListItem containerStyle={styles.listItem}>
                        {item.new &&
                            <FontAwesome name="circle" size={10} color="#007aff"/>
                        }
                        {item.image  
                            ? <Avatar rounded size="medium" source={{uri: item.image }}/>
                            : <Avatar rounded overlayContainerStyle={{backgroundColor: '#c8c8c8'}} size="medium" title={item.title} titleStyle={{color: 'white'}}/>
                        }
                        <ListItem.Content>
                            <ListItem.Title style={styles.listTitle}>{`${item.firstName} ${item.lastName}`}</ListItem.Title>
                            <ListItem.Subtitle style={styles.listSubtitle}>{item.subtitle}</ListItem.Subtitle>
                        </ListItem.Content>
                        {item.isAdded
                            ? <Entypo name="check" size={22} color="#34c759" />
                            : <TouchableOpacity onPress = {() => {this.openContacts(item)}}><Feather name="plus" size={22} color="#007aff"/></TouchableOpacity>
                        }
                        
                    </ListItem>
                </CollapseHeader>
                { item.note && 
                    <CollapseBody style={styles.description}>
                        <Text style={styles.descriptionText}>{item.note}</Text>
                    </CollapseBody>
                }
            </Collapse>
        </Swipeable>
    )

    render() {
        return (
            <View style={styles.container}>
                 <View style={styles.iconContainer}>
                    <TouchableOpacity
                        onPress={() => {this.props.navigation.navigate('RequestDescription', {title: this.props.route.params.title});}}
                    >
                        <Ionicons name="md-information-circle-outline" size={28} color="#007aff"/>
                    </TouchableOpacity>
                </View>
                <BigHeaderText>{this.props.route.params.title}</BigHeaderText>
                <FlatList
                    data={this.state.data}
                    style={styles.listContainer}
                    renderItem={this.renderItem}
                    keyExtractor = {item => item.id.toString()}
                />
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
    iconContainer: {
        width: '105%',
        alignItems: 'flex-end',
        marginTop: -5
    },
    listContainer: {
        width: '100%',
        marginTop: 10,
    },
    listItemContainer: {
        width: '100%',
        marginBottom: 5,
        paddingTop: 10,
        borderRadius: 10,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 4,
    }, 
    listItem: {
        backgroundColor: 'white'
    },
    listTitle: {
        fontSize: 18,
        fontWeight: '600'
    },
    listSubtitle: {
        paddingTop: 3,
        fontWeight: '300',
        fontSize: 14
    },
    description: {
        width: '99%',
        paddingRight: 15,
        paddingLeft: 20,
        paddingVertical: 15,
        marginTop: -5,
        marginBottom: 10,
        backgroundColor: '#e7e7e7',
    },
    descriptionText: {
        color: '#5d5d5d',
        fontSize: 14
    },
    rightIconContainer: {
        height: '50%',
        alignItems: 'center',
        marginTop: 36,
        marginLeft: 12
    },
    leftIconContainer: {
        height: '50%',
        alignItems: 'center',
        marginTop: 36,
        marginRight: 12
    }
})

const friendData = [
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "subtitle": "Recommended by Natalie H.",
      "note": "John is a childhood friend of mine. He’s a sophomore at Brown University and I’m pretty sure he’s studying Sociology. You two have a shared love for coffee and sci-fi, hit him up!",
      "image": 'https://expertphotography.com/wp-content/uploads/2020/08/social-media-profile-photos-8.jpg',
      "phone": "234-567-8910",
      "isAdded": false,
      "new": true
    },
    {
      "id": 2,
      "firstName": "Cameron",
      "lastName": "Cortez",
      "subtitle": "Recommended by Andrew G.",
      "note": "",
      "image": 'https://t3.ftcdn.net/jpg/03/67/46/48/360_F_367464887_f0w1JrL8PddfuH3P2jSPlIGjKU2BI0rn.jpg',
      "phone": "234-567-8910",
      "isAdded": false,
      "new": true
    },
    {
      "id": 3,
      "firstName": "Kevin",
      "lastName": "Brooks",
      "subtitle": "Recommended by Cameron N.",
      "note": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "image": "http://image10.photobiz.com/8451/16_20200621162347_8957713_large.jpg",
      "phone": "234-567-8910",
      "isAdded": false,
      "new": false
    },
    {
        "id": 4,
        "firstName": "Elena",
        "lastName": "Kim",
        "subtitle": "Recommended by Isabel P.",
        "note": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "image": "",
        "title": "EK",
        "phone": "234-567-8910",
        "isAdded": false,
        "new": false
    }
];

export default ViewRequest;
