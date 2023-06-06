
import { signOut } from 'firebase/auth';
import React, { Component } from 'react'
import { View, TouchableOpacity ,Alert, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { Button, Card, Text, TextInput } from 'react-native-paper';
import { connect } from 'react-redux';
import { Auth } from '../firebase';
import { SignUp } from '../store/actions/authAction';
import { createUserWithEmailAndPassword} from 'firebase/auth';
import { setDoc , doc} from 'firebase/firestore';
export class RegistePage extends Component {

  state = {
    firstname: '',
    lastname: '',
    email:'',
    password:'',
    click:false,
  }
  
  handleRegister = () => {

    
    if(!this.state.firstname || !this.state.lastname ){
      Alert.alert(
        "Warning!",
        "Please input all the fields!",
        [
          { text: "OK", onPress: () => {
            console.log('close!');
            this.setState({
              click:false
            })
          }}
        ]
      );
      return;
    }
    createUserWithEmailAndPassword(Auth,
      this.state.email,
      this.state.password
  ).then((users) => {

     
    
      const ref = doc(db, 'users', users.user.uid)

      return setDoc(ref,{
          firstname: this.state.firstname,
          lastname: this.state.lastname,
      })

  }).then((user)=> {
    console.log(user);    
  }).catch((error) => {
    
    let errorMessage = null;

      switch(error.code) {
        case "auth/missing-password":
          errorMessage = "Password is missing, please try again!";
        break;
        case "auth/invalid-email":
          errorMessage = "Email is in valid format, please try again!";
        break;
        case "auth/weak-password":
          errorMessage = "Password must be at least 6 characters long.";
        break;
        case 'auth/email-already-in-use':
          errorMessage = "User email already exists.";
        break;
        default:
      }
 
      if(errorMessage){
        this.setState({click:false})
        Alert.alert(
          "WARNING!",
          errorMessage,
          [

            { text: "OK", onPress: () => {
              console.log('close!');
            }}
          ]
        );
      }



      
  })
    this.setState({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      click: true,
      successlogin: true,
    })
 


  }


  render() {

    
    return (

      

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{
        flex:1,
        justifyContent:'center',
      }}>

<Card style={{
        margin:20,
        padding:10,
       
       }}>
        <Card.Content>
          <Text variant="titleLarge" style={{
            textAlign: 'center',
            marginTop:35,
            paddingTop:25,
            fontSize:50,
            alignItems:'center',
            color:'purple',
            fontWeight:100,
          }}>Register</Text>


          <View style={{
            marginVertical: 10,
            gap:10,
          }}>

<TextInput 
          label='Name'
          mode='outlined'
          placeholder='e.g. Name'
          value={this.state.firstname}
          onChangeText = {val => this.setState({firstname:val})}
          />

<TextInput 
          label='Lastname'
          mode='outlined'
          placeholder='e.g. Lastname'
          value={this.state.lastname}
          onChangeText = {val => this.setState({lastname:val})}
          />

          <TextInput 
          label='Email'
          mode='outlined'
          placeholder='e.g. Email'
          value={this.state.email}
          onChangeText = {val => this.setState({email:val})}
          />
          <TextInput 
          label='Password'
          mode='outlined'
          placeholder='e.g. Password'
          autoCorrect={false}
 secureTextEntry={true}
 textContentType={'password'}
          value={this.state.password}
          onChangeText = {val => this.setState({password:val})}
          style={{
          }}
          />
          </View>

          <View style={{
            margin:10,
          }}>
          {this.state.click ? (
            <Button loading mode="contained" style={{
              padding:5,
            }} onPress={this.handleRegister}>
            <Text style={{
               fontSize:15,
               color: 'white',
               fontWeight: 'bold',
            }}>{this.state.click ? 'Please wait...': 'Register'}</Text>
          </Button>
          ):(          <Button icon="account-plus-outline" mode="contained" style={{
            padding:5,
          }} onPress={this.handleRegister}>
          <Text style={{
             fontSize:15,
             color: 'white',
             fontWeight: 'bold',
          }}>{this.state.click ? 'Please wait...': 'Register'}</Text>
        </Button>)}


<View style={{
  flexDirection:'row',
  alignSelf:'center',
  margin:10,
}}>
<Text variant="bodyMedium">Have an Account?</Text>
<TouchableOpacity onPress={()=>this.props.navigation.navigate('Login')}>

<Text variant="bodyMedium" style={{
  color:'red',
}}> Sign-in here.</Text>

</TouchableOpacity>

</View>
 
            
          </View>

       

        </Card.Content>
      </Card>

      </View>
      </TouchableWithoutFeedback>
     
    )
  }
}

const mapStateToProps = (state) => {
  return {
     trackError: state.aut.authuError,
     succes: state.aut.success
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    SignUp: (user) => dispatch(SignUp(user)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(RegistePage);