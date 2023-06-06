import { useState } from 'react';
import { Alert, Button } from 'react-native';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, } from 'react-native';


export default function DummySend({ navigation }) {
  const [people, setPeople] = useState([
    { name: 'dad', lastname: 'Balbacua' ,key: '1' },
    { name: 'mom', lastname: 'Adobo' ,key: '2' },
    { name: 'john', lastname: 'Hotdog' ,key: '3' },
    { name: 'tita',  lastname: 'Chorizo',key: '4' },
    { name: 'tito',  lastname: 'Cheese',key: '5' },
    { name: 'david', lastname: 'Spring' ,key: '6' },
    { name: 'kim',  lastname: 'Union', key: '7' },
    { name: 'eliza',  lastname: 'Pandesal', key: '8' },
    { name: 'aleah',  lastname: 'Elorde',key: '9' },
    { name: 'clydel',  lastname: 'Baboy', key: '10' },
  ]);

  const pressHandler = (name, lastname ) => {

    Alert.alert('', 'Do you want to continue?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => navigation.navigate('Details',{
            userName: name,
            lastName: lastname
        }) },
      ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>FAMILY CONTACT LIST</Text>
      <ScrollView>
        {people.map((item) => {
          return (
            <TouchableOpacity onPress={() => pressHandler(item.name, item.lastname)} key={item.key}>
              <View>
                <Text style={styles.item}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )
        }
        )}
      </ScrollView>
    </View >

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CCD5AE',
    paddingTop: 40,
    paddingHorizontal: 20,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',

  },
  item: {
    marginTop: 24,
    padding: 30,
    backgroundColor: 'white',
    fontSize: 20,
  },

});