
import React, { Component } from 'react'
import { View, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Button, Card, Text, TextInput } from 'react-native-paper';
import { connect } from 'react-redux';
import { SignIn } from '../store/actions/authAction';
import { onAuthStateChanged , signInWithEmailAndPassword} from 'firebase/auth';
import { Auth } from '../firebase';



export class LoginPage extends Component {

  state = {
    email: '',
    password: '',
    loading: true,
    initializing: false,
    users: null,
    click: false,
    error:false,
  }

  handleLogin = () => {

    if(!this.state.email || !this.state.password ){
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
    
    signInWithEmailAndPassword(Auth,
      this.state.email,
      this.state.password
    ).then((user)=> {
      console.log('User logged in successfully');
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
        case "auth/wrong-password":
          errorMessage = "Password is incorrect!";
        break;
        case 'auth/user-not-found':
          errorMessage = "Email is not registered!";
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
      email: '',
      password: '',
      click: true,
    });
    
    
  }


  componentDidMount(){
    const subscribe = onAuthStateChanged(Auth,(user)=>{
        this.setState({users: user})
        if(user) {
         this.props.navigation.navigate('ListPage', {
          user: user.email,
          userId:user.uid
         })
         console.log(user.uid);
         this.setState({initializing:false})
        }else{
          this.setState({
            email:'',
            password:'',
            loading: true,
          })
        }
    })
    return subscribe;
  }


  
  render() {
  

    
    

    if(this.state.initializing){
      return null;
    }

    


    

    if(!this.state.users){

      return (
        <>
       
        



       <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{
          flex:1,
          justifyContent:'center',
        }}>


         
  
  <Card style={{
          margin:20,
          height:400,
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
            }}          
            >LOGIN</Text>  

  
            <View style={{
              marginVertical: 10,
              gap:10,
            }}>
  
            <TextInput 
            label='Email'
            mode='outlined'
            placeholder="e.g. email"
            value = {this.state.email}
            onChangeText = {val => this.setState({email:val})}
  
            />

            <TextInput 
            label="Password" 
            mode='outlined'
            placeholder="e.g password"
            autoCorrect={false}
 secureTextEntry={true}
 textContentType={'password'}
            value = {this.state.password}
            style={{
            }}
  
            onChangeText = {val => this.setState({password:val})}
         
            />
            </View>
  
            <View style={{
              margin:10,
            }}>

            {this.state.click? (
              
          <Button loading mode="contained" style={{
            padding:5,
          }} onPress={this.handleLogin}>
          <Text style={{
             fontSize:15,
             color: 'white',
             fontWeight: 'bold',
          }}>{this.state.click? 'Please wait...' : 'Login'}</Text>
        </Button>
            ):(
              <Button icon="key-variant" mode="contained" style={{
                padding:5,
              }} onPress={this.handleLogin}>
              <Text style={{
                 fontSize:15,
                 color: 'white',
                 fontWeight: 'bold',
              }}>{this.state.click? 'Please wait...' : 'Login'}</Text>
            </Button>
            )}
           

       
        
  
  <View style={{
    flexDirection:'row',
    alignSelf:'center',
    margin:10,
  }}>
  <Text variant="bodyMedium">Don't have an Account?</Text>
  <TouchableOpacity onPress={()=>this.props.navigation.navigate('Register')}>

 
  
  <Text variant="bodyMedium" style={{
    color:'red',
  }}> Register here.</Text>
  
  </TouchableOpacity>
  
  </View>
   
              
            </View>
  
         
  
          </Card.Content>
        </Card>
  
        </View>
        </TouchableWithoutFeedback>
        </>
      )
    }


    }


}

const mapStateToProps = (state) => {
  return {
     trackError: state.aut.authuError,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (user) => dispatch(SignIn(user)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginPage);