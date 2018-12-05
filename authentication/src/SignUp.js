import React, { Component } from 'react';
import { View, Text,StyleSheet } from 'react-native';

import * as firebase from 'firebase'




import {Container,Content,Header,Form,Item,Button,Input} from 'native-base' 

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email:'',
        pass:''
    };
  }

componentWillMount(){
    var config = {
        apiKey: "AIzaSyBprRcSRMkw3v7tZfqkEuKgtv_XUuH15ww",
        authDomain: "signup-c77e7.firebaseapp.com",
        databaseURL: "https://signup-c77e7.firebaseio.com",
        projectId: "signup-c77e7",
        storageBucket: "signup-c77e7.appspot.com",
        messagingSenderId: "663881348131"
      };
      firebase.initializeApp(config);    
}

  onSignUp = () =>{
      firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.pass)
        .then(success=>{
            console.log("=>Success:"+success)
        }).catch(error=>{
            console.log("=>error:"+error)
        })
    }

    onLogin = () =>{
        firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.pass)
        .then(success=>{
            console.log("=>Success:"+success)
        }).catch(error=>{
            console.log("=>error:"+error)
        })
    }

  render() {
    return (
        <Container>
        <Content>
            <Text style={styles.txt}>Login</Text>
          <Form>
            <Item>
              <Input placeholder="Email" autoCapitalize="none" autoCorrect={false} onChangeText={(email)=>this.setState({email})}/>
            </Item>
            <Item last>
              <Input placeholder="Password" secureTextEntry={true} onChangeText={(pass)=>this.setState({pass})}/>
            </Item>
          </Form>
          <Button style={styles.btn} onPress={this.onSignUp}>
              <Text>Sign Up</Text>
          </Button>
          <Button style={styles.btn} onPress={this.onLogin}>
              <Text>Login</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles={
    txt:{
        marginTop:50,
        alignSelf:"center"
    },

    btn:{
        marginTop:20,
        alignSelf: 'center',
    }
}