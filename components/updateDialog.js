import * as React from 'react';
import { View , Alert} from 'react-native';
import { Card, Text , TextInput, Button} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase';
import moment from 'moment';
import Updatings from './updatingg';
import Toast from 'react-native-toast-message';

export class MyComponent extends React.Component {

  state = {
    value: '',
    click: false,
  }

  updateTodo = (id) => {

    const specialChar =  /[^\w\s]/gi;
    if(this.state.value.match(specialChar)){

      Alert.alert(
        "Warning...",
        "Especial character is not allowed, please try again!",
        [

            { text: "Ok", onPress: () => {
              this.setState({value: ""});
              Toast.show({
                type: 'success',
                text1: 'Thank you for your response 👋',
                position:'bottom',
              });
              }
            }
            ]
        );
      
      return;
    }

    let cheat = [...this.props.route.params.data];

    let res = cheat.find(item=>item.todo.trim().toLowerCase() === this.state.value.trim().toLowerCase());

    if(res){
      alert('Item list is already exists. Please add something new!');
      this.setState({value:''});
      return;
    }

    if(!this.state.value){
      alert('Please input a value before updating!');
      return;
    }


    
    const ref = doc(db, "todolist", id);

 updateDoc(ref, {
 todo: this.state.value
}).then(()=>{
    this.props.navigation.goBack();
    Toast.show({
      type: 'success',
      text1: 'Item is updated successfully! 👋',
      position:'top',
    });
}); 
  this.setState({click:true });
}

GobackToList = () =>{
    this.props.navigation.goBack();
}


 
  render() {

    

    
    
    if(this.state.click){
      return (
        <Updatings/>
      )
    }
    const {todo, id, dates} = this.props.route.params;
    return (
        <SafeAreaView style={{
            flex:1,
            justifyContent:'center',
        }}>

         

<Card style={{
    margin:20,
    padding:10,
}}>
        <Card.Content>
        <View style={{
            marginBottom:20,
        }}>
        <Text style={{
            textAlign:'center',
            fontSize:30,
            fontWeight:'bold',
            marginBottom:20,
            color:'purple',
        }}>
         Update Todo Info   
        </Text>
        <Text style={{
            fontSize:20,
            color:'red'
        }}>Info: <Text style={{
            fontStyle:'italic',
        }}>{todo}</Text> </Text>
        <Text style={{
            fontSize:20,
            color:'red'
        }}>Date: <Text style={{
            fontSize:15,
            fontStyle:'italic',
        }}>
             {moment(dates.toDate()).calendar()}
        </Text></Text>
        </View>
        <TextInput
          value={this.state.value}
          label="Input here to update"
          multiline
          mode='outlined'
          onChangeText = {(value)=> this.setState({value: value})}
        />
        <View style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop:15,
            padding:10,
            gap:10,
        }}>
        <Button style={{
       
        }}   mode="elevated" onPress={()=>this.GobackToList()}>Go Back</Button>
          <Button icon="plus" 
          mode="contained"
          onPress = {()=> this.updateTodo(id, todo)}
          >{this.state.click ? 'updating data....': 'Update'}</Button>
        </View>
        </Card.Content>
      </Card>

        </SafeAreaView>
       
    )
  }
}

export default MyComponent