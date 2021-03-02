import React, { Component } from 'react'
import {View, StyleSheet, Text, FlatList, TouchableHighlight, TouchableOpacity, Modal, Image, Platform} from 'react-native'
import {ListItem, Avatar, SearchBar} from 'react-native-elements'
import HeaderText from '../../components/HeaderText'
import * as Permissions from 'expo-permissions';
import * as Contacts from 'expo-contacts';
import icon from '../../assets/successIcon.png'


class ChooseContacts extends Component {
    

    constructor(props) {
       
        super(props)
        this.state = {
            search: '',
            contacts: null,
            memoryContacts: null,
            show: false,
        };
        
    }
    

    loadContacts = async()=>{
        const permission = await Permissions.getAsync(Permissions.CONTACTS)

        if(permission.status !== 'granted'){
            return
        }

        const {data} = await Contacts.getContactsAsync({
            fields:[Contacts.Fields.PhoneNumbers, Contacts.Fields.Image]
        })

        this.setState({contacts: data, memoryContacts: data})
    }

    async componentDidMount(){
        this.loadContacts()
    }

    updateSearch = (search) => {
        this.setState({ search });
        const filteredContacts = this.state.memoryContacts.filter(
            contact => {
                let contactLowercase = (contact.firstName+' '+contact.lastName).toLowerCase()

                let searchTermLowercase = search.toLowerCase()

                return contactLowercase.indexOf(searchTermLowercase) > -1
            }
        )
        this.setState({contacts: filteredContacts})
    };
    decorate = (arr, item) =>{
        const index = arr.indexOf(item)
        arr[index].added = true
        return arr
    }

    renderItem = ({item}) => (
        item.added == true?
        <TouchableOpacity style={styles.listItemContainer} activeOpacity={0.5} underlayColor="gray" onPress = {()=>{
            
            var curimage = null
            if (item.image !== undefined){
                curimage = item.image
            }
            if (Platform.OS === 'android') {
                this.props.navigation.navigate('WriteNoteAndroid', {name: item.name, image: curimage, number: item.phoneNumbers[0].number, object: item})
            } else {
                this.props.navigation.navigate('WriteNoteIOS', {name: item.name, image: curimage, number: item.phoneNumbers[0].number, object: item})
            }
        }} >
            <View style={{paddingHorizontal: 3}}>
                <ListItem containerStyle={{backgroundColor:'gray'}}>
                    {item.image  
                        ? <Avatar rounded size="medium" source={{uri: item.image.uri }}/>
                        : <Avatar rounded overlayContainerStyle={{backgroundColor: '#c8c8c8'}} size="medium" title={item.name[0]} titleStyle={{color: 'white'}}/>
                    }
                    <ListItem.Content>
                        <ListItem.Title style={styles.listTitle}>{item.name}</ListItem.Title>
                    </ListItem.Content>
                   
                </ListItem>
            </View>

        </TouchableOpacity>
        :<TouchableHighlight style={styles.listItemContainer} activeOpacity={0.5} underlayColor="white" onPress = {()=>{
            
            var curimage = null
            if (item.image !== undefined){
                curimage = item.image
            }
            if (Platform.OS === 'android') {
                this.props.navigation.navigate('WriteNoteAndroid', {name: item.name, image: curimage, number: item.phoneNumbers[0].number, object: item})
            } else {
                this.props.navigation.navigate('WriteNoteIOS', {name: item.name, image: curimage, number: item.phoneNumbers[0].number, object: item})
            }
        }} >
            <View style={{paddingHorizontal: 3}}>
                <ListItem containerStyle={styles.listItem}>
                    {item.image  
                        ? <Avatar rounded size="medium" source={{uri: item.image.uri }}/>
                        : <Avatar rounded overlayContainerStyle={{backgroundColor: '#c8c8c8'}} size="medium" title={item.name[0]} titleStyle={{color: 'white'}}/>
                    }
                    <ListItem.Content>
                        <ListItem.Title style={styles.listTitle}>{item.name}</ListItem.Title>
                    </ListItem.Content>
                   
                </ListItem>
            </View>

        </TouchableHighlight>
    )
   
    render() {
        const { search } = this.state;
        if (this.props.route.params.showmodal == true && this.state.show == false){
            this.setState({show: true})
            this.props.route.params.showmodal = false
        }
        return (
            <View style={styles.container}>
                <Modal visible = {this.state.show} animationType= 'slide'>
                    <View style = {{backgroundColor:'#000000aa', flex: 1, opacity:0.8}}>
                    <View style = {styles.modalcontainer}>
                        <Image source={icon} style={styles.logo}/>
                        <HeaderText style = {{padding: 20, textAlign: 'center'}}>Recommendation {"\n"}Sent!</HeaderText>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} activeOpacity={0.5} onPress = {()=>{
                                this.setState({show:false})
                                this.setState({contact: this.decorate(this.state.contacts, this.props.route.params.originalobj)})
                                }}>
                                <Text style={styles.buttonText}>Recommend More</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} activeOpacity={0.5} onPress = {()=>{
                                this.props.navigation.navigate('Home');
                                this.setState({show:false})
                            }}>
                                <Text style={styles.buttonText}>Done</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </View>
                    

                </Modal>
                <SearchBar
                    platform = {'ios'}
                    containerStyle = {styles.searchContainer}
                    style = {styles.searchBar}
                    placeholder = 'Search'
                    onChangeText={this.updateSearch}
                    value={search}
                />
                <FlatList
                    data={this.state.contacts}
                    style={styles.listContainer}
                    renderItem={this.renderItem}
                    keyExtractor = {item => item.id.toString()}
                    ListEmptyComponent = {() => 
                    <View style = {{flex:1, alignItems:"center", paddingTop:40}}>
                        <Text style={styles.listTitle}>No Contacts Found</Text>
                    </View>  
                       
                    }

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
    modalcontainer:{
        flex: 1,
        paddingBottom: 40,
        borderRadius:10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    button:{
        padding: 10,
        paddingHorizontal: 15,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        backgroundColor: '#007aff'
    },
    buttonText: {
        color: 'white',
        fontWeight: '400',
        fontSize: 18
    },
    searchContainer: {
        width: '95%',
        backgroundColor: 'white',
        borderWidth: 0,
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
    },
    logo: {
        width: 200,
        height: 200,
        marginTop: 30,
        marginBottom: 10
    }
})


export default ChooseContacts;
