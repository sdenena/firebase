import React, { Component } from 'react';

import { Container, 
        Header, 
        Content, 
        ListItem, 
        Text, 
        Radio, 
        Right, 
        Left, 
        Footer, 
        Input,
        Form,
        Body,
        Title,
        Button,
        Icon,
        List
        } from 'native-base';

    import {ListView} from 'react-native'

import {FireBase} from './Firebase'

const datas = [
    'Simon Mignolet',
    'Nathaniel Clyne',
    'Dejan Lovren',
    'Mama Sakho',
    'Alberto Moreno',
    'Emre Can',
    'Joe Allen',
    'Phil Coutinho',
  ];

export default class Chat extends Component {
    constructor(props){
        super(props);
        this.state={
            userInput:'',
            messgeList:[]
        }
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    }

    componentWillMount(){
        try{
            FireBase.database().ref('Chatbox/chat').on('value',data=>{
                let obj=data.toJSON()
                let messages=[];
                for(let m in obj){
                    messages.push({...obj[m]})
                }
                this.setState({
                    messgeList:messages
                })
                console.log("=>",messages)
            })
        }catch(err){
            console.log("=>error:",err)
        }
    }

  render() {

    console.log("=>message:",this.state.messgeList[1])
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return (
      <Container>
        <Header>
          <Body>
            <Title>Chat Box</Title>
          </Body>
        </Header>
        <Content ref={c => this.mylist = c}>
        <List dataSource={this.ds.cloneWithRows(this.state.messgeList)}
            leftOpenValue={75}
            rightOpenValue={-75}
            dataSource={this.ds.cloneWithRows(this.state.messgeList)}
            renderRow={(data,index,obj) =>
              <ListItem key={obj}>
                <Text> {data} </Text>
              </ListItem>}
            renderLeftHiddenRow={data =>
              <Button full onPress={() => alert(data)}>
                <Icon active name="information-circle" />
              </Button>}
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                <Icon active name="trash" />
              </Button>}
          />
        </Content>
        <Footer>
            <Left>
              <Form>
                  <Input placeholder="type message here..." style={styles.txt}></Input>
              </Form>
            </Left>
            <Right>
                <Button iconRight light style={styles.icon}>
                    <Icon name='send' />
                    <Text>Send</Text>
                </Button>
            </Right>
          </Footer>
      </Container>
    );
  }
}

const styles={
    header:{
        marginTop: 10,
    },
    txt:{
        width:200,
        borderColor: 'blue',
        marginLeft: 20,
        borderColor: 'gray',
    },
    icon:{
        marginRight: 20,
        color:'green',
        fontSize:30
    }
}