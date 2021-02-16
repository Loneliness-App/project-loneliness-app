import React, { Component } from 'react'
import {View, StyleSheet, Text, FlatList} from 'react-native'
import {ListItem, Avatar} from 'react-native-elements'
import { Ionicons, Feather } from '@expo/vector-icons';
import {Collapse, CollapseHeader, CollapseBody} from 'accordion-collapse-react-native'

class ViewRequest extends Component {

    constructor(props) {
        super(props)
    }

    renderItem = ({item}) => (
        <Collapse style={styles.listItemContainer}>
            <CollapseHeader style={{paddingHorizontal: 3}}>
                <ListItem containerStyle={styles.listItem}>
                    {item.image  
                        ? <Avatar rounded size="medium" source={{uri: item.image }}/>
                        : <Avatar rounded overlayContainerStyle={{backgroundColor: '#c8c8c8'}} size="medium" title={item.title} titleStyle={{color: 'white'}}/>
                    }
                    <ListItem.Content>
                        <ListItem.Title style={styles.listTitle}>{item.name}</ListItem.Title>
                        <ListItem.Subtitle style={styles.listSubtitle}>{item.subtitle}</ListItem.Subtitle>
                    </ListItem.Content>
                    <Feather name="plus" size={22} color="#007aff" />
                </ListItem>
            </CollapseHeader>
            { item.note && 
                <CollapseBody style={styles.description}>
                    <Text style={styles.descriptionText}>{item.note}</Text>
                </CollapseBody>
            }
        </Collapse>
    )

    render() {
        return (
            <View style={styles.container}>
                 <View style={styles.iconContainer}>
                    <Ionicons name="md-information-circle-outline" size={28} color="#007aff" />
                </View>
                <Text style={styles.bigHeader}>{this.props.route.params.title}</Text>
                <FlatList
                    data={friendData}
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
    bigHeader: {
        fontWeight: '700',
        fontSize: 32
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
        width: '100%',
        paddingRight: 15,
        paddingLeft: 20,
        paddingVertical: 10,
        marginTop: -5,
        marginBottom: 10,
        backgroundColor: '#e7e7e7',
    },
    descriptionText: {
        color: '#5d5d5d',
        fontSize: 14
    }
})

const friendData = [
    {
      "id": 1,
      "name": "John Doe",
      "subtitle": "Recommended by Natalie H.",
      "note": "John is a childhood friend of mine. He’s a sophomore at Brown University and I’m pretty sure he’s studying Sociology. You two have a shared love for coffee and sci-fi, hit him up!",
      "image": 'https://expertphotography.com/wp-content/uploads/2020/08/social-media-profile-photos-8.jpg'
    },
    {
      "id": 2,
      "name": "Carmen Cortez",
      "subtitle": "Recommended by Andrew G.",
      "note": "",
      "image": 'https://t3.ftcdn.net/jpg/03/67/46/48/360_F_367464887_f0w1JrL8PddfuH3P2jSPlIGjKU2BI0rn.jpg'
    },
    {
      "id": 3,
      "name": "Kevin Brooks",
      "subtitle": "Recommended by Cameron N.",
      "note": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "image": "http://image10.photobiz.com/8451/16_20200621162347_8957713_large.jpg"
    },
    {
        "id": 4,
        "name": "Elena Kim",
        "subtitle": "Recommended by Isabel P.",
        "note": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "image": "",
        "title": "EK"
    }
];

export default ViewRequest;
