import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { NavBar } from "./src/components/NavBar";
import { MainScreen } from "./src/screens/MainScreen";
import { TodoScreen } from "./src/screens/TodoScreen";

export default function App() {
  const [todoId, setTodoId] = useState(null);
  const [todos, setTodos] = useState([
    {id: '1', title: 'todo 1'},
    {id: '2', title: 'todo 2'},
  ]);

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
    const todo = todos.find((t) => t.id === id);

    Alert.alert(
      'Delete item',
      `Are you sure delete ${todo.title} ?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => {
            setTodoId(null);
            setTodos(prev => prev.filter(todo => todo.id !== id));
          }
        },
      ],
      {
        style: 'destructive',
        cancelable: false
      },
    );
  };

  let content = (
    <MainScreen
      todos={todos}
      addTodo={addTodo}
      removeTodo={removeTodo}
      openTodo={setTodoId}
    />
  );

  if (todoId) {
    const selectedTodo = todos.find(todo => todo.id === todoId);
    content = (
        <TodoScreen
          onRemove={removeTodo}
          goBack={() => setTodoId(null)}
          todo={selectedTodo}
        />
      )
  }

  return (
    <View>
      <NavBar title='Todo app'/>
      <View style={styles.container}>
        {content}
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
