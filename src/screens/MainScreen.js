import React  from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

import { AddTodo } from "../components/AddTodo";
import { Todo } from "../components/Todo";

export const MainScreen = ({ addTodo, todos, removeTodo }) => {
  return (
    <View>
      <AddTodo onSubmit={addTodo} />

      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        renderItem={({item}) => <Todo todo={item} onRemoveTodo={removeTodo}/>}
      />
    </View>
  )
};

const styles = StyleSheet.create({

})