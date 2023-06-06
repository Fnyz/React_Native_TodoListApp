import { Searchbar } from 'react-native-paper';
import React, { Component } from 'react'

export class SearchMe extends Component {

  render() {

    const {handleSearch, searchVal} = this.props;
    return (        
        <Searchbar
        placeholder="Search here"
        value={searchVal}
        style={{
            marginHorizontal:15,
            marginVertical:2,
            opacity:0.6,
        }}
        onChangeText={(val)=> handleSearch(val)}
      />
    )
  }
}

export default SearchMe