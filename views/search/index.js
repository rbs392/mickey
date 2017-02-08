import fs from 'react-native-fs'
import React, { Component } from 'react'
import Camera from 'react-native-camera'
import { View, Text, Image } from 'react-native'
import styles from './styles'

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      loading: false
    }
    this.setData = this.setData.bind(this)
    this.takePicture = this.takePicture.bind(this)
    this.fetchResult = this.fetchResult.bind(this)
  }
  fetchResult(body) {
    const headers = new Headers({
      'content-length': body.length
    })
    this.setState({searchImage: body})
    return fetch(`${this.props.server}/search`, {
      method: 'POST',
      body,
      headers
    })
  }
  setData(data) {
    this.setState({ loading: false }, () => {
      this.props.onNext(JSON.parse(data._bodyInit))
      this.setState({searchImage: null })
    })
    
  }
  takePicture() {
    if(this.state.loading) return false
    this.setState({data: {}, loading: true})
    this.camera.capture()
      .then((data) => fs.readFile(data.path, 'base64'))
      .then(this.fetchResult)
      .then(this.setData)
      .catch(err => console.error(err));
  }

  render() {
    return (
      <View style={styles.container}>
        {
          (this.state.searchImage) ? <View><Image
                  source={{uri: `data:image/png;base64,${this.state.searchImage}`}}
                  style={styles.searchImage}
                /><Text>Searching db...</Text></View> : null
        }
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          captureMode={Camera.constants.CaptureMode.still}
          captureTarger={Camera.constants.CaptureTarget.memory}
          captureQuality={Camera.constants.CaptureQuality.low}
          >
          <Text style={styles.capture} onPress={this.takePicture}>[
            {
              this.state.loading ? 'LOADING...' : 'CAPTURE' 
              
            }]</Text>
        </Camera>
      </View>
    );
  }
}