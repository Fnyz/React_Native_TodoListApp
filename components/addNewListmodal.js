import React, { Component } from 'react'
import { Alert } from 'react-native';
import {Button, Card, Avatar, TextInput } from 'react-native-paper';
const LeftContent = props => <Avatar.Icon {...props} icon="card-plus" />
import { connect } from 'react-redux';
import { addNewlist } from '../store/actions/listActions';
import Toast from 'react-native-toast-message';

export class AddlistComp extends Component {

   
    state = {
        todo: '',
        visible: false,
        uid: null,
        added: false,
        copyItem: [],
    }

    addNewList = () => {

      const specialChar =  /[^\w\s]/gi;
      if(this.state.todo.match(specialChar)){

        Alert.alert(
          "Warning...",
          "Especial character is not allowed, please try again!",
          [

              { text: "Ok", onPress: () => {
                this.setState({todo: ""});
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
      
      if(!this.state.todo){
        Alert.alert(
          "Warning...",
          "Please input something on this list!",
          [

              { text: "Ok", onPress: () => {
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
      let data = [...this.state.copyItem];
      let res = data.find(item=>item.todo.trim().toLowerCase() === this.state.todo.trim().toLowerCase());
      
      if(res){
        alert('This item is already in the list!');
        this.setState({todo:''})
        return;
      }


      const {handleHide} = this.props;
      this.props.newList(this.state);
      handleHide();
      this.setState({added:true})


    } 
    componentDidMount(){
     this.setState({uid: this.props.userUid, copyItem: this.props.listData})
    }
        


  render() {

    const {handleHide, listData} =this.props;
    
    return (
        <Card>
        <Card.Title title="ADD NEW LIST" left={LeftContent}/>
        <Card.Content>
        <TextInput
          label="Whats on your mind?"
          value={this.state.todo}
          multiline
          onChangeText = {(val)=> this.setState({todo:val})}    
        />
        </Card.Content>
        <Card.Actions style={{
            marginVertical:10,
        }}>
          <Button onPress={handleHide}>Cancel</Button>
          <Button icon="plus" 
          style={{
            marginRight:10,
          }}
          onPress={()=>this.addNewList()}
          >{this.state.added ? 'Adding...': 'Add'}</Button>
        </Card.Actions>
      </Card>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    newList: (list) => dispatch(addNewlist(list)),
  }
}

export default connect(null,mapDispatchToProps)(AddlistComp)