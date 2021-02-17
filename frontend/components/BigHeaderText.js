import React, { Component } from 'react'
import {Text, StyleSheet} from 'react-native'

class BigHeaderText extends Component {
    render() {
      return (
        <Text {...this.props} style={[styles.headerText, this.props.style]}>{this.props.children}</Text>
      )
    }
  }
  const styles = StyleSheet.create({
    headerText: {
      fontSize: 32,
      fontWeight: '700'
    },
  });

  export default BigHeaderText;
