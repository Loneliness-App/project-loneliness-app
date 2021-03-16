import React, { Component } from 'react'
import {View, Text, StyleSheet} from 'react-native'

class HeaderText extends Component {
    render() {
      return (
        <Text {...this.props} style={[styles.headerText, this.props.style]}>{this.props.children}</Text>
      )
    }
  }
  const styles = StyleSheet.create({
    headerText: {
      fontSize: 30,
      fontWeight: '500'
    },
  });

  export default HeaderText;
