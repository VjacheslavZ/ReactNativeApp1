import React  from 'react';
import {FlatList, StyleSheet, Text, View, Image } from 'react-native';

import { AddTodo } from "../components/AddTodo";
import { Todo } from "../components/Todo";

export const MainScreen = ({ addTodo, todos, removeTodo, openTodo }) => {
  let content = <FlatList
    data={todos}
    keyExtractor={item => item.id}
    renderItem={({item}) => <Todo todo={item} onRemoveTodo={removeTodo} onOpen={openTodo}/>}
  />;

  if (!todos.length) {
    content = (
      <View style={styles.imageWrap}>
        <Image source={require('../../assets/no-items.png')} style={styles.image}/>
      </View>
    )
  }

  return (
    <View>
      <AddTodo onSubmit={addTodo} />
      {content}
    </View>
  )
};

const styles = StyleSheet.create({
  imageWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  }
});