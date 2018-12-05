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
        Icon
        } from 'native-base';

import {FireBase} from './Firebase'

export default class Chat extends Component {
    constructor(props){
        super(props);
        this.state={
            userInput:'',
            messgeList:[]
        }
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
    return (
      <Container>
        <Header>
          <Body>
            <Title>Chat Box</Title>
          </Body>
        </Header>
        <Content>
         {
             this.state.messgeList.map((list,i)=>{
                 
                 <ListItem key={i}>
                    <Left>
                      <Text>{list}</Text>
                    </Left>
                 </ListItem>
             })
         }
          {/* <ListItem>
            <Left>
              <Text>Discussion with Client</Text>
            </Left>
            <Right>
              <Radio selected={true} />
            </Right>
          </ListItem>         */}
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