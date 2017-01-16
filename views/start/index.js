import React, { Component } from 'react'
import {
  View,
  Button,
  TextInput,
} from 'react-native'
import style from './styles'

export default class Start extends Component {
  constructor(props) {
    super(props)
    this.state = { text: '' }
    this.setText = this.setText.bind(this)
    this.gotoSearch = this.gotoSearch.bind(this)
  }
  gotoSearch(){
    this.props.onNext(this.state.text)
  }
  setText(text) {
    this.setState({ text })
  }
  render() {
    return (
      <View style={style.container}>
        <TextInput onChangeText={this.setText} value={this.state.text}/>
        <Button onPress={this.gotoSearch} title="Start"/>
      </View>
    )
  }
}