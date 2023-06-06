import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { Component } from 'react'
import ListApp from './components/ListApp';
import LoginPage from './components/login';
import RegistePage from './components/register';
import { createStore,  applyMiddleware} from 'redux';
import rootReducers from './store/reducers/rootReducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import MyComponent from './components/updateDialog';
import Toast from 'react-native-toast-message';


const store = createStore(rootReducers,applyMiddleware(thunk))

const Stack = createNativeStackNavigator();


export class App extends Component {



  render(){
      return (
        <>
         <Provider store={store}>
               <NavigationContainer>
              <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="Login" component={LoginPage} options={{ title: '' }} />
            <Stack.Screen name="Register" component={RegistePage} options={{ title: '' }} />
             <Stack.Screen name="ListPage" component={ListApp} options={{ title: '' }} />
             <Stack.Screen name="MyComponent" component={MyComponent} options={{ title: '' }} />
             </Stack.Navigator>
          </NavigationContainer>
        </Provider>
        <Toast />
        </>
       
          
      )  

     }
  
}

export default App;