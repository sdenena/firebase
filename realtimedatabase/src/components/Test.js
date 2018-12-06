import React, { Component } from 'react';
import {
  AppRegistry,
  ScrollView,
  View,
  TextInput,
  StyleSheet,
} from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#F0F0F0',
  },
  row: {
    height: 64,
    margin: 13,
    backgroundColor: '#F68B38',
    borderRadius: 3,
  },
  textInput: {
    height: 44,
    alignSelf: 'stretch',
    padding: 10,
    backgroundColor: 'white',
  },
  fakeTabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
  },
  fakeTabBarItem: {
    width: 38,
    height: 38,
    margin: 10,
    backgroundColor: '#4C4C4C',
    borderRadius: 3,
  },
});

export default class Test extends Component {

  render() {
    return (
      <View style={styles.container}>
        <KeyboardResponsiveView>
          <ScrollView>
            <View style={styles.row} />
            <View style={styles.row} />
            <View style={styles.row} />
            <View style={styles.row} />
            <View style={styles.row} />
            <View style={styles.row} />
            <View style={styles.row} />
            <View style={styles.row} />
          </ScrollView>
          <TextInput style={styles.textInput} placeholder={"Type me"}/>
        </KeyboardResponsiveView>
        <View style={styles.fakeTabBarContainer}>
          <View style={styles.fakeTabBarItem} />
          <View style={styles.fakeTabBarItem} />
          <View style={styles.fakeTabBarItem} />
          <View style={styles.fakeTabBarItem} />
        </View>
      </View>
    );
  }
}

