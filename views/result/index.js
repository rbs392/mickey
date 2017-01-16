import React, { Component } from 'react'
import {
  View,
  ListView,
  Text,
  Image,
  Button,
} from 'react-native'

import style from './styles'


export default class Result extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      data: ds.cloneWithRows(props.data)
    };
    this.gotoSearch = this.gotoSearch.bind(this)
  }
  gotoSearch() {
    this.props.onPrev()
  }
  render() {
    return (
      <View style={style.container}>
        <ListView
          dataSource={this.state.data}
          renderRow={(x) => (
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
          )}
        />
        <Button onPress={this.gotoSearch} title="Back to search" />
      </View>
    )
  }
}