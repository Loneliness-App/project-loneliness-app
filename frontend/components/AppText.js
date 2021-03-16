import React, { Component } from 'react'
import {View, Text, StyleSheet} from 'react-native'

export class AppText extends Component {
    render() {
      return (
        <Text {...this.props} style={[styles.appText, this.props.style]}>{this.props.children}</Text>
      )
    }
  }
  const styles = StyleSheet.create({
    appText: {
      fontSize: 16
    },
  });
