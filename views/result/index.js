import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  Button,
} from 'react-native'

import style from './styles'


export default class Result extends Component {
  constructor(props) {
    super(props)
    this.gotoSearch = this.gotoSearch.bind(this)
  }
  gotoSearch() {
    this.props.onPrev()
  }
  render() {
    return (
      <View style={style.container}>
      {
        this.props.data.map(x => (
          <View key={x.id} style={style.result}>
            <Image
              source={{uri: `data:image/png;base64,${x.metadata.rawImage}`}}
              style={style.image}
            />
            <View>
              <Text>{x.metadata.title}</Text>
              <Text>{x.score}</Text>
            </View>
          </View>

        ))
      }
      <Button onPress={this.gotoSearch} title="Back to search" />
      </View>
    )
  }
}