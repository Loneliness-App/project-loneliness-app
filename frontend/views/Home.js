import React, { Component } from 'react'
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Modal} from 'react-native'
import {SearchBar, ListItem} from 'react-native-elements'
import {AntDesign, FontAwesome} from '@expo/vector-icons'
import CreateRequestModal from '../components/CreateRequestModal'

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            search: '',
            showModal: false
        };
        this.hideModal = this.hideModal.bind(this)
    }

    updateSearch = (search) => {
        this.setState({ search });
    };

    hideModal() {
        this.setState({showModal: false})
    }

    renderRequest = ({item}) => (
        <ListItem style={styles.listItem} bottomDivider onPress={() => {
            this.props.navigation.navigate('ViewRequest', {title: item.title});
        }}>
            <ListItem.Content>
                <ListItem.Title style={styles.listTitle}>{item.title}</ListItem.Title>
                <ListItem.Subtitle style={styles.listSubtitle}>{item.subtitle}</ListItem.Subtitle>
            </ListItem.Content>
            {item.new &&
                <FontAwesome name="circle" size={10} color="#007aff"/>
            }
            <ListItem.Chevron size={24} />
        </ListItem>
    )

    renderReply = ({item}) => (
        <ListItem style={styles.listItem} bottomDivider onPress={() => {
            this.props.navigation.navigate('ReplyDescription', {title: item.title, subtitle: item.subtitle});
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
                <Modal 
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    style={styles.modal}
                >
                    <CreateRequestModal hideModal={this.hideModal} navigation={this.props.navigation}/>
                </Modal>
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
                        renderItem = {this.renderRequest}
                        keyExtractor = {item => item.id.toString()}
                        style= {styles.listContainer}
                    />
                </View>
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionHeader}>Replies</Text>
                    <FlatList
                        data = {recsData}
                        renderItem = {this.renderReply}
                        keyExtractor = {item => item.id.toString()}
                        style= {styles.listContainer}
                    />
                </View>
                <View style={styles.iconContainer}>
                    <TouchableOpacity  onPress = {() => {this.setState({showModal: true})}}>
                        <AntDesign style={styles.addIcon} name="pluscircle" size={56} color="#007aff" />
                    </TouchableOpacity>
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
        padding: 20, 
    },
    modal: {
        backgroundColor: 'red'
    }
})


const requestsData = [
    {
      "id": 1,
      "title": "Reading Buddies",
      "subtitle": "5 new recommendations",
      "new": true
    },
    {
      "id": 2,
      "title": "Boba",
      "subtitle": "2 new recommendations",
      "new": true
    },
    {
      "id": 3,
      "title": "Netflix Party Group",
      "subtitle": "8 recommendations",
      "new": false
    },
    {
        "id": 4,
        "title": "Pickup Basketball",
        "subtitle": "1 recommendation",
        "new": false
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
        "title": "Musicians to Jam With!",
        "subtitle": "From Marcus P."
      },
      {
        "id": 4,
        "title": "NFL Fans",
        "subtitle": "From Paula B.",
      }
]

export default Home;
