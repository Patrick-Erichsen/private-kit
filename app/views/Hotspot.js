import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ToastAndroid,
  FlatList,
} from 'react-native';
import Hotspot from 'react-native-wifi-hotspot';

export default class HotspotScreen extends Component {
  constructor(props) {
    super(props);
    const peers = [];
    this.state = {
      peers,
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>React native Hotspot library</Text>
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.subtitle}>
            Enable & Check if it already opened
          </Text>
          <Button title='enable' onPress={() => this.enable()} />
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.subtitle}>
            Disable & Check if it already disabled
          </Text>
          <Button title='disable' onPress={() => this.disable()} />
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.subtitle}>
            Set your hotspot seetings (SSID, PASSWORD, ...)
          </Text>
          <Button title='create' onPress={() => this.create()} />
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.subtitle}>Fetch hotspot settings</Text>
          <Button title='fetch' onPress={() => this.fetch()} />
        </View>
        <View>
          <Text style={styles.subtitle}>Show all peers</Text>
          <Button title='peers' onPress={() => this.peers()} />
        </View>
        <FlatList
          data={this.state.peers}
          style={{ marginTop: 15 }}
          renderItem={(peer, index) => {
            return (
              <View style={styles.viewList} key={index}>
                <Text style={styles.viewText}>{peer.device}</Text>
                <Text style={styles.viewText}>{peer.ip}</Text>
                <Text style={styles.viewText}>{peer.mac}</Text>
              </View>
            );
          }}
        />
      </View>
    );
  }
  enable() {
    Hotspot.enable(
      () => {
        ToastAndroid.show('Hotspot Enabled', ToastAndroid.SHORT);
      },
      err => {
        ToastAndroid.show(err.toString(), ToastAndroid.SHORT);
      },
    );
  }
  disable() {
    Hotspot.disable(
      () => {
        ToastAndroid.show('Hotspot Disabled', ToastAndroid.SHORT);
      },
      err => {
        ToastAndroid.show(err.toString(), ToastAndroid.SHORT);
      },
    );
  }
  create() {
    const hotspot = { SSID: 'ASSEM', password: 'helloworld' };
    Hotspot.create(
      hotspot,
      () => {
        ToastAndroid.show('Hotspot enstablished', ToastAndroid.SHORT);
      },
      err => {
        ToastAndroid.show(err.toString(), ToastAndroid.SHORT);
      },
    );
  }
  fetch() {
    Hotspot.getConfig(
      config => {
        ToastAndroid.show(config.ssid, ToastAndroid.SHORT);
      },
      err => {
        ToastAndroid.show(err.toString(), ToastAndroid.SHORT);
      },
    );
  }
  peers() {
    Hotspot.peersList(
      data => {
        const peers = JSON.parse(data);
        this.setState({ peers });
      },
      err => {
        ToastAndroid.show(err.toString(), ToastAndroid.SHORT);
      },
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#F5FCFF',
    margin: 8,
  },
  welcome: {
    fontSize: 20,
    height: 60,
    lineHeight: 50,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  viewList: {
    backgroundColor: '#F1F1F1',
    marginBottom: 10,
  },
  viewText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
});
