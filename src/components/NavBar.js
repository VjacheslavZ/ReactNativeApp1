import React from 'react';
import { StyleSheet, View } from 'react-native'

import {AppTextBold} from "./ui/AppTextBold";
import { THEME } from "../theme";

export const NavBar = ({title}) => {
  return (
    <View style={styles.navBar}>
      <AppTextBold style={styles.text}>{title}</AppTextBold>
    </View>
  )
};

const styles = StyleSheet.create({
  navBar: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: THEME.MAIN_COLOR,
    paddingBottom: 10
  },
  text: {
    color: 'white',
    fontSize: 20
  },
})