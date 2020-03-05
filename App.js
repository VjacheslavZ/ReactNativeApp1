import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import { NavBar } from "./src/NavBar";
import { AddTodo } from "./src/AddTodo";
import { Todo } from "./src/Todo";

export default function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = title => {
    setTodos(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        title,
      }
    ])
  };

  const removeTodo = id => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  };

  return (
    <View>
      <NavBar title='Todo app'/>

      <View style={styles.container}>
        <AddTodo onSubmit={addTodo} />

        <FlatList
          data={todos}
          keyExtractor={item => item.id}
          renderItem={({item}) => <Todo todo={item} onRemoveTodo={removeTodo}/>}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
});
