import { View} from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';


const Downloading = () => {
  return (
    <View style={{
      justifyContent: 'center',
      alignItems:'center',
      flex:1,
    }}>
     <LottieView style={{
        width:300,
     }} source={require('../assets/99602-empty-loading-state.json')} autoPlay loop/>
    </View>
  )
}

export default Downloading