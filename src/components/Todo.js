import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native'

import { AppText } from "./ui/AppTetxt";

export const Todo = ({ todo, onRemoveTodo, onOpen }) => {
  return (
    <TouchableOpacity 
      activeOpacity={0.5} 
      onPress={() => onOpen(todo.id)}
      onLongPress={() => {
        onRemoveTodo(todo.id)
      }}
    >
      <View style={styles.todo}>
        <AppText>{todo.title}</AppText>
      </View>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
    marginTop: 15
  },
});