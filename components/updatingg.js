import { View} from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import { Text } from 'react-native-paper';

const Updatings = () => {
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
     }} source={require('../assets/98109-updating-animation.json')} autoPlay loop/>
    
    </View>
  )
}

export default Updatings