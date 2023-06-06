import { View} from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import { Text } from 'react-native-paper';

const StartingPage = () => {
  return (
    <View style={{
        justifyContent: 'center',
        alignItems:'center',
        flex:1,
        paddingHorizontal:40,
    }}>
          <Text style={{
      color:'red',
      fontSize:40,
      opacity:0.7,
      fontWeight: 'bold',
     }}>WELCOME USER!</Text>
     <LottieView style={{
        width:350,
        height:350,
     }} source={require('../assets/113816-hello-user.json')} autoPlay loop/>
   
    </View>
  )
}

export default StartingPage