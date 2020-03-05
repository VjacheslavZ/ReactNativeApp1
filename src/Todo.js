import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

export const Todo = ({ todo, onRemoveTodo }) => {
  return (
    <TouchableOpacity 
      activeOpacity={0.5} 
      onPress={() => {

      }}
      onLongPress={() => {
        onRemoveTodo(todo.id)
      }}
    >
      <View style={styles.todo}>
        <Text>{todo.title}</Text>
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