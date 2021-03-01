import React, { Component } from 'react'
import {View, Text, StyleSheet, FlatList} from 'react-native'
import {SearchBar, ListItem} from 'react-native-elements'
import {AntDesign} from '@expo/vector-icons'

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            search: '',
        };
    }

    updateSearch = (search) => {
        this.setState({ search });
    };

    renderItem = ({item}) => (
        <ListItem style={styles.listItem} bottomDivider onPress={() => {
            this.props.navigation.navigate('ViewRequest', {title: item.title});
        }}>
            <ListItem.Content>
                <ListItem.Title style={styles.listTitle}>{item.title}</ListItem.Title>
                <ListItem.Subtitle style={styles.listSubtitle}>{item.subtitle}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron size={24} />
        </ListItem>
    )

    render() {
        const { search } = this.state;

        return (
            <View style={styles.container}>
                <SearchBar
                    platform = {'ios'}
                    containerStyle = {styles.searchContainer}
                    style = {styles.searchBar}
                    placeholder = 'Search'
                    onChangeText={this.updateSearch}
                    value={search}
                />
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionHeader}>My Requests</Text>
                    <FlatList
                        data = {requestsData}
                        renderItem = {this.renderItem}
                        keyExtractor = {item => item.id.toString()}
                        style= {styles.listContainer}
                    />
                </View>
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionHeader}>Recommendations To Give</Text>
                    <FlatList
                        data = {recsData}
                        renderItem = {this.renderItem}
                        keyExtractor = {item => item.id.toString()}
                        style= {styles.listContainer}
                    />
                </View>
                <View style={styles.iconContainer}>
                    <AntDesign name="pluscircle" size={56} color="#007aff" />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 25, 
        paddingVertical: 40,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    searchContainer: {
        width: '95%',
        backgroundColor: 'white',
        borderWidth: 0,
    },
    sectionContainer: {
        width: '100%',
        height: '40%',
        alignItems: 'center',
        paddingVertical: 10
    },
    sectionHeader: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '500' 
    },
    listContainer: {
        width: '100%',
        marginTop: 10,
        paddingHorizontal: 10
    },
    listItem: {
        borderRadius: 10
    },
    listTitle: {
        fontSize: 16,
        fontWeight: '500'
    },
    listSubtitle: {
        paddingTop: 3,
        fontWeight: '300',
        fontSize: 14
    },
    iconContainer: {
        width: '100%',
        alignItems: 'flex-end',
        padding: 20
    }
})


const requestsData = [
    {
      "id": 1,
      "title": "Reading Buddies",
      "subtitle": "5 new recommendations"
    },
    {
      "id": 2,
      "title": "Boba",
      "subtitle": "2 recommendations"
    },
    {
      "id": 3,
      "title": "Netflix Party Group",
      "subtitle": "8 recommendations"
    },
    {
        "id": 4,
        "title": "Pickup Basketball",
        "subtitle": "1 recommendation"
      }
];

const recsData = [
    {
      "id": 1,
      "title": "Gym Workout Partners",
      "subtitle": "From Natalie H."
    },
    {
      "id": 2,
      "title": "Fellow CS15 Students?",
      "subtitle": "From Connor L."
    },
    {
        "id": 3,
        "title": "Gym Workout Partners",
        "subtitle": "From Natalie H."
      },
      {
        "id": 4,
        "title": "Fellow CS15 Students?",
        "subtitle": "From Connor L."
      }
]

export default Home;
