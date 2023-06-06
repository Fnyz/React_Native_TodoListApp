import { View} from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import { Text } from 'react-native-paper';

const LoadingPage = () => {
  return (
    <View style={{
        justifyContent: 'center',
        alignItems:'center',
        flex:1,
        paddingHorizontal:40,
    }}>
     <LottieView style={{
        width:500,
        height:500,
     }} source={require('../assets/102600-pink-no-data.json')} autoPlay loop/>
     <Text style={{
      color:'red',
      fontSize:20,
      opacity:0.7,
      fontWeight: 'bold',
     }}>No list found, add new now!</Text>
    </View>
  )
}

export default LoadingPage