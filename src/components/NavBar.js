import React from 'react';
import {StyleSheet, View, Platform} from 'react-native'

import {AppTextBold} from "./ui/AppTextBold";
import {THEME} from "../theme";

export const NavBar = ({title}) => {
  return (
    <View
      style={{
        ...styles.navBar,
        ...Platform.select({
          ios: styles.navBarIos,
          android: styles.navBarArndroid,
        })
      }}
    >
      <AppTextBold style={styles.text}>{title}</AppTextBold>
    </View>
  )
};

const styles = StyleSheet.create({
  navBar: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10
  },
  navBarArndroid: {
    backgroundColor: THEME.MAIN_COLOR
  },
  navBarIos: {
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 1
  },
  text: {
    color: Platform.OS === 'ios' ? THEME.MAIN_COLOR : '#fff' ,
    fontSize: 20
  },
})