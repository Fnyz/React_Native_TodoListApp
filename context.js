import React, { Component } from 'react'

const MadeContex = React.createContext();

class GlobalProvider extends Component {

  state = {
    getUserId : null,
};


  
  


  render() {
    return (
      <MadeContex.Provider value={{
       ...this.state,
         searchData: this.searchData,
         changedata:this.changedata,
         getSingle: this.getSingle
      }}>
       {this.props.children}
      </MadeContex.Provider>
    )
  }

}

const ContextConsumer = MadeContex.Consumer;

export {GlobalProvider, MadeContex, ContextConsumer};