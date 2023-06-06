
import React, { Component } from 'react'
import { View , Text, ScrollView, Alert, TouchableOpacity, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { Modal, Portal, Provider, Avatar, FAB,  Appbar } from 'react-native-paper';
import { Platform } from 'react-native';
import Cardlist from './cardlist';
import { connect } from 'react-redux';
import { SignOut } from '../store/actions/authAction';
import {getDataList } from '../store/actions/listActions';
import AddlistComp from './addNewListmodal';
const containerStyle = {padding: 20};
const LeftContent = props => <Avatar.Icon {...props} icon="card-plus" />
const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'logout';
import { Auth, db } from '../firebase';
import {signOut } from 'firebase/auth';
import LoadingPage from './loading';
import { collection, query, where,orderBy, onSnapshot } from 'firebase/firestore';
import StartingPage from './starting';
import SearchMe from './searchMe';
import Toast from 'react-native-toast-message';
import { ThemeConsumer } from 'styled-components';





export class ListApp extends Component {

  state = {
    oten:null,
    login:true,
    visible: false,
    userId: null,
    todo: '',
    checking:true,
    datas: [],
    starting: false,
    searchVal: '',
    filterItem:[],
    dataId: '',
  }

  
  handleChoose = (id) => {
  this.setState({dataId:id});
  }
  handleSearch = (val) => {
    
    this.setState({searchVal:val})

    let copy = [...this.state.datas];

  

      let result = copy.filter(item=>{
        if(item.todo.includes(val)){
          return item;
        }
      })

      this.setState({filterItem:result})
      
  
  }
  handleShow = () => {
    this.setState({visible: true});
}
handleHide = () => {
    this.setState({visible: false});
}

getUpdateId = (id) => {
  console.log(id);
}

handleout = () =>{
  Alert.alert(
    "Do you wish to sign out!",
    "Please choose one of the following.",
    [
     {
      text: "No",
        onPress: () => {
          Toast.show({
            type: 'success',
            text1: 'Thank you for your response 👋',
            position:'top',
          });
        },
        style: "cancel"
        },
        { text: "Yes", onPress: () => {
        signOut(Auth).then(()=> {
            console.log('signOut');
            this.props.navigation.replace('Login')})
          }}
        ]
    );
  }

  showlist = (id) => {
    const docs = collection(db, 'todolist');
        const ref = query(docs, where('userId', '==', id), orderBy('createdAt', 'desc'));
    
        onSnapshot(ref, (list)=>{
            let value = [];
            list.docs.forEach(element => {
                value.push({...element.data(), id: element.id});
            });
            this.setState({datas:value})
        })

  }
  
 

  componentDidMount(){

    
    this.setState({
      oten: this.props.route.params.user,
      userId: this.props.route.params.userId,
      starting:true,
    });


    
   

    this.handleSearch();

    setTimeout(()=>{

      this.setState({starting:false});

    },3000)

    if(this.props.route.params.userId){
      this.showlist(this.props.route.params.userId);
    }

    
    


  } 

  

  

 



    render(){

     
 
      
      

      

      if(this.state.starting){
        return (
         <StartingPage/>
        )
      }


      if(this.state.datas){

     

      
    return (
        <> 

        

     <Appbar.Header>
       <Appbar.Content title="" color="purple" fontSize={5}/>
        <Appbar.Action icon={MORE_ICON} onPress={this.handleout}  color='red'/>
      </Appbar.Header>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'center',
            gap:4,
            marginBottom:10,
    
        }}>
          
         <View style={{
          flexDirection:'column',
         }}>
      
         <Text style={{
            fontSize:30,
            color:'gray'
          }}>TodoList App</Text>
          <Text style={{
            width:100,
            height:3,
            borderTopWidth:4,
            alignSelf:'center',
            borderColor:'coral',
            marginTop:5,
          }}></Text>
          
         </View>
        
        </View>

        </TouchableWithoutFeedback>
        
        <SearchMe  handleSearch={this.handleSearch} searchVal={this.state.searchVal}/>
       
        <Provider >
        <Portal>
          <Modal visible={this.state.visible} onDismiss={this.handleHide} contentContainerStyle={containerStyle}>
          <AddlistComp listData = {this.state.datas} visible= {this.state.visible} handleHide={this.handleHide} userUid = {this.state.userId}/>
          </Modal>
        </Portal>

       
        <ScrollView>

        {!this.state.searchVal? (

this.state.datas.length == 0 ? (
  <LoadingPage />
): this.state.datas.map(item=>(
  <TouchableOpacity key={item.id} onPress={()=> this.handleChoose(item.id)}>
  <Cardlist dataId = {this.state.dataId} datas={this.state.datas} item={item} getUpdate={this.getUpdateId()} navigation = {this.props.navigation} searchVal={this.state.searchVal}/>
  </TouchableOpacity>
))
          
        ):(

          this.state.filterItem.length == 0 ? (
            <LoadingPage />
          ): this.state.filterItem.map(item=>(
            <TouchableOpacity key={item.id} activeOpacity={2} onPress={()=> this.handleChoose(item.id)}>
            <Cardlist dataId = {this.state.dataId} datas={this.state.datas} key={item.id} item={item} getUpdate={this.getUpdateId()} navigation = {this.props.navigation}/>
            </TouchableOpacity>
          ))

        )}
        
        
        </ScrollView>
       
        

     
        



        <FAB.Group
          open={this.state.visible}
          visible
          icon= {this.state.visible ? 'pencil-plus' : 'plus'}

          actions={[
          ]}
          onStateChange={this.handleShow}
          

        />
      
           
      </Provider>



     
   
      </>
    )
  }else{
    return (
      <View>Data fetching!</View>
    )
  }











    }

  
}

const mapStateToProps = (state) =>{
    return {
        listValue: state.listing.list,
        onSignOut: state.aut.loginUser,
        getUserLoginId: state.aut.userId,
        getTodoData: state.listing.lisdata 
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    singOut: () => dispatch(SignOut()),
    getList: (uid)=> dispatch(getDataList(uid))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListApp)