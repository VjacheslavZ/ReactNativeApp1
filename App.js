import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import { NavBar } from "./src/NavBar";
import { AddTodo } from "./src/AddTodo";
import { Todo } from "./src/Todo";

export default function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (title) => {
    setTodos(prev => [...prev, {
      id: Date.now().toString(),
      title,
    }])
  };

  return (
    <View>
      <NavBar title='Todo app'/>

      <View style={styles.container}>
        <AddTodo onSubmit={addTodo} />

        <FlatList
          keyExtractor={(item) => item.id}
          data={todos}
          renderItem={({item}) => <Todo title={item.title}/>}
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
