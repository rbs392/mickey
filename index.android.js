/**@flow */
import React, { Component } from 'react';
import fs from 'react-native-fs';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
  Dimensions
} from 'react-native';
import Camera from 'react-native-camera';

export default class mickey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    }
  }
  fetchResult() {
    const headers = new Headers({
      'content-length': data.length
    })
    return fetch('http://192.168.0.103:9000/search', {
      method: 'POST',
      body: data,
      headers
    })
  }
  setData(data) {
    this.setState({ data })
  }
  takePicture() {
    this.setState({data: {}})
    this.camera.capture()
      .then((data) => fs.readFile(data.path, 'base64'))
      .then(this.fetchResult)
      .then(this.setData)
      .catch(err => console.error(err));
  }

  render() {
    const base64Image = this.state.data.hits ? `data:image/png;base64,${this.state.data.hits.hits[0]._source.rawImage}` : ''
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          captureMode={Camera.constants.CaptureMode.still}
          captureTarger={Camera.constants.CaptureTarget.memory}
          >
          {
            base64Image ? <Image source={{uri: base64Image}} style={styles.image} /> : null
          }
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image:{
    width: 100,
    height: 100
  },
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

AppRegistry.registerComponent('mickey', () => mickey);
