/**@flow */
import fs from 'react-native-fs';
import React, { Component } from 'react';
import Camera from 'react-native-camera';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Dimensions
} from 'react-native';
import { Start, Search, Result } from './views';

export default class mickey extends Component {
  constructor(props){
    super(props)
    this.state = {
      route: { name: SEARCH },
      server: "http://174.129.159.174:9000"
    }
  }
  gotoSearch(navigator, pop) {
    return (url) => {
      const server = url ? url : this.state.server
      this.setState({ server }, () => {
        if(pop){ return navigator.pop() }
        navigator.push({ name: SEARCH })
      })
    }
  }
  gotoHome(navigator) {
    return (url) => {
      navigator.push({ name: START })
    }
  }
  gotoResult(navigator) {
    return (results) => {
      this.setState({ results }, () => {
        navigator.push({ name: RESULT })
      })
    }
  }
  render() {
    return (
      <Navigator
        initialRoute={{ name:SEARCH }}
        renderScene={(route, navigator) => {
          switch(route.name) {
            case START: return <Start
              onNext={this.gotoSearch(navigator)}
            />
            case SEARCH: return <Search
              server={this.state.server}
              onNext={this.gotoResult(navigator)}
              onPrev={this.gotoHome(navigator)}
            />
            case RESULT: return <Result
              data={this.state.results}
              onPrev={this.gotoSearch(navigator, true)}
            />
            default: return <Text>Error view not found</Text> 
          }
        }}
        style={styles.container}
      /> 
    )
  }
}

const START = 'start'
const SEARCH = 'search'
const RESULT = 'result'
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('mickey', () => mickey);
