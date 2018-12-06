import React, {Component} from 'react';
import {
    Container,
    Header,
    Title,
    Input,
    Content,
    Footer,
    Item,
    Button,
    ListItem,
    Thumbnail,
    List,
    Left,
    Right,
    Body,
    Icon,
    Text,
    Spinner,
} from 'native-base';
import Toast from 'react-native-simple-toast';
import {Dimensions,View,ScrollView,ListView} from 'react-native';
import { withNavigation } from 'react-navigation';
import firebaseApp from './Firebase';
import KeyboardSpacer from 'react-native-keyboard-spacer'



class Chat extends Component {
    constructor(props){
        super(props)
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state={
            valid:true,
            userInput:'',
            loading:true,
            msList:[],
            isUpdate:false,
            updateKey:''
        }
    }

    componentWillMount() {
        try {
            firebaseApp.database().ref('Chatbox/chat').on('value',data=>{
                let obj = data.toJSON()
                let messages=obj;
                // for(let x in obj){
                //     messages.push({...obj})
                // }
                this.setState({
                    msList:messages,
                    loading:false
                })
            }).catch((err)=>{
                console.log(err)
            })
        }catch (e) {
            console.log(e)
        }

    }

    insertData(item){
        if(!this.state.isUpdate){
            //======================== INSERTING DATA TO FIREBASE =================
            let newPostKey = firebaseApp.database().ref().child('posts').push().key; //Create a random key in firebase
            firebaseApp.database().ref('Chatbox/chat/'+newPostKey+'/SD').set( // "Chatbox/chat" is the path name of our database
                {
                    message:this.state.userInput,
                    timestamp: this.getTime(),
                }
            ).then(()=>{
                Toast.show('Successfully Added!')
            }).catch((err)=>{
                console.log(err)
            })
        }else {
            //======================== UPDATING DATA TO FIREBASE =================
            firebaseApp.database().ref('Chatbox/chat/'+item+'/SD').update(
                {
                    message:this.state.userInput,
                    timestamp: this.getTime(),
                }
            ).then(()=>{
                Toast.show('Successfully Updated!')
                this.setState({
                    isUpdate:false
                })
            }).catch((err)=>{
                console.log(err)
            })
        }

    }
    //========================== THIS METHOD WILL GET DATA ONCE  ==================================
    // getDataOnce(){
    //     firebaseApp.database().ref('users/').once('value',data=>{
    //         console.log(data.toJSON());
    //     }).catch((err)=>{
    //         console.log(err)
    //     })
    // }


    //========================== THIS METHOD WILL DELETE DATA (where the path is specified in ref)  ==================================
    deleteData(item){
        firebaseApp.database().ref('Chatbox/chat/'+item).remove()
            .then(()=>{ Toast.show('Removed!') })
            .catch((err)=>{ console.log(err) })
    }


    updateData(item){
        const data = this.state.msList;
        this.setState({
            userInput:data[item].SD.message,
            isUpdate:true,
            updateKey:item
        })
    }


    //======================= THIS  METHOD IS JUST TO GET THE CURRENT TIME IN A SPECIFIC FORMAT =====================================
    getTime() {
        let date = new Date()
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let second = date.getSeconds()
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        let strTime = hours + ':' + minutes+':'+second + ' ' + ampm;
        return strTime;
    }

    handleSend(){
        if(this.state.userInput && this.state.isUpdate){
            this.insertData(this.state.updateKey);
            this.setState({
                userInput:'',
                valid:false
            })
        }else if(this.state.userInput){
            this.insertData();
            this.mylist._root.scrollToEnd()
            this.setState({
                userInput:'',
                valid:false
            })
        }
        else{
            this.setState({
               valid:false
            })
        }
    }

    handleInput(text){
        if(text){
            this.setState({
                userInput:text,
                valid:true
            })
        }else{
            this.setState({
                userInput:text,
                valid:false
            })
        }

    }

    render() {
        const ds = new ListView({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return <Container>
            <Header>
                <Left/>
                <Body>
                <Title>Chat Box</Title>
                </Body>
                <Right/>
            </Header>

            {this.state.loading?<Spinner style={{flex:1}}/>:
                <Content ref={c => this.mylist = c}>
                    <List dataSource={this.ds.cloneWithRows(this.state.msList)}
                          leftOpenValue={75}
                          rightOpenValue={-75}
                          renderRow={(item,index,obj)=>
                            <ListItem avatar key={obj}>
                                <Left>
                                    <Thumbnail
                                        style={{marginLeft:10,alignSelf:'center'}}
                                        small source={{ uri:'https://via.placeholder.com/150' }} />
                                </Left>
                                <Body>
                                <Text>{"SD"}</Text>
                                <Text note>
                                    {item.SD.message}
                                </Text>
                                </Body>
                                <View style={{position:'absolute',right:0,border:0,}}>
                                    <Text note style={{marginRight:10,fontSize:8}}>
                                        {item.SD.timestamp}
                                    </Text>
                                </View>
                            </ListItem>
                          }
                          renderLeftHiddenRow={(item,id,obj) =>
                              <Button warning onPress={()=>this.updateData(obj)}>
                                  <Icon active name="create"/>
                              </Button>
                          }
                          renderRightHiddenRow={(item,id,obj) =>
                              <Button danger onPress={()=>this.deleteData(obj)}>
                                  <Icon active name="trash"/>
                              </Button>
                          }
                    >
                    </List>
                </Content>
            }
            <Footer>
                <Item style={styles.textInput} success>
                    <Input placeholder='Message here!..'
                           value={this.state.userInput}
                           onChangeText={(text) => this.handleInput(text)}
                    />
                    <Button iconLeft transparent
                            success={this.state.valid}
                            danger={!this.state.valid}
                            onPress={() => this.handleSend()}
                            disabled={this.state.loading}
                    >
                        <Icon name='send'/>
                        <Text>{this.state.isUpdate?"Update":"Send"}</Text>
                    </Button>
                </Item>
            </Footer>
            <KeyboardSpacer/>
        </Container>;
    }
}

export default Chat;

// Get devices with and height
const {height,width}=Dimensions.get('window')
styles={
    textInput:{
        width:width,
    }

}
