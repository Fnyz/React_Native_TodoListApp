import { View, Alert } from 'react-native'
import React, { Component } from 'react'
import { Text, Card, IconButton,  MD3Colors} from 'react-native-paper';
import { db } from '../firebase';
import { doc, deleteDoc, getDoc } from 'firebase/firestore';
import moment from 'moment';
import Downloading from './downloading';
import Deleting from './deleting';
import Toast from 'react-native-toast-message';
import LoadingPage from './loading';


export class Cardlist extends Component {

  state = {
    removeClick:false,
    data: [],
    isDeleted: false,
  }
  removeDocs = (id) => {
   
    

    Alert.alert(
      "Haii there!",
      "Do you really want to delete this document?",
      [
        { text: "No", onPress: () => {
          Toast.show({
            type: 'success',
            text1: 'Thank you for your response 👋',
            position:'top',
          });
        }},
        { text: "Yes", onPress: () => {
          this.setState({removeClick:true});
          deleteDoc(doc(db, 'todolist', id)).then(()=>{
            Toast.show({
              type: 'success',
              text1: 'Item is deleted successfully, Thank you. 👋',
              position:'top',
            });
            this.setState({removeClick:false, isDeleted:true});
            
          })
        }}
      ]
    );

  
  }

  showDialog = (todo, id, navigation, date, datas) =>{ 


    Alert.alert(
      "Hello there!",
      "Do you really want to update this document?",
      [
        { text: "No", onPress: () => {
          Toast.show({
            type: 'success',
            text1: 'Thank you for your response 👋',
            position:'top',
          });
        }},
        { text: "Yes", onPress: () => {

          navigation.navigate('MyComponent', {
            todo,
            id,
            dates: date,
            data: datas
          });
          
        }}
      ]
    );



  
  };




  render() {
    const {todo, createdAt, id} = this.props.item;
    const {datas, searchVal, dataId} =  this.props;
    
    
    

    

    if(this.state.removeClick){
      return (
        <Deleting/>
      )
    }

    if(this.state.isDeleted){
      return (
        <LoadingPage />
      )
    }
    

    
    if(createdAt){

      return (
        <>
          <View >
  
          <Card style={{
              margin:10,
              backgroundColor:id === dataId ?'pink':'white'
              
          }}>
      <Card.Content style={{
              flexDirection:'row',
              justifyContent:'space-between',
              
          }}>
          <View>
          <Text variant="titleMedium" style={{
            color:id === dataId ? 'white':'purple',
            fontSize:20,
            overflow: 'hidden',
            flexShrink: 1,
            marginBottom:2,
            opacity:id === dataId ? 1:0.6,
          }} numberOfLines={1} >{todo}</Text>
           <Text variant="bodyMedium" style={{
            color:id === dataId ? 'white':'gray',

           }}>{createdAt? moment(createdAt.toDate()).calendar(): 'loading time...'}</Text>
          </View>
  
          <View style={{
              flexDirection:'row',
          }}>
         
       <IconButton
      icon="clipboard-edit"
      iconColor='purple'
      size={30}
      style={{
          margin:0,
          padding:0,
          border:'none',
          marginRight:7,
          opacity:0.6
      }}
  
      onPress={()=> this.showDialog(todo, id,this.props.navigation, createdAt , datas)}
      
    />
    <Text style={{
      fontSize:35,

    }}>/</Text>
  
  <IconButton
      icon="delete"
      iconColor={MD3Colors.error50}
      size={30}
      style={{
          position:'relative',
          left:5,
          margin:0,
          padding:0,
          border:'none',
          opacity:0.6
      }}
      onPress={() => this.removeDocs(id, searchVal)}
    />
          </View>
  
      </Card.Content>
    </Card>
  
              
  
  
          </View>
      </>
      )
      
    }else{
      return (
        <Downloading/>
      )
    }

  }
}


export default Cardlist