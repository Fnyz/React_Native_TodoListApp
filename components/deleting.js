import { View} from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';


const Deleting = () => {
  return (
    <View style={{
        justifyContent: 'center',
        alignItems:'center',
        flex:1,
    }}>
     <LottieView style={{
        marginTop:10,
        width:300,
     }} source={require('../assets/97096-loading-dots-pink.json')} autoPlay loop/>
    </View>
  )
}

export default Deleting