import React, { useReducer } from 'react';

import { todoReducer} from './todoReducer'
import { TodoContext } from './todoContext';
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from "../types";

const initialState = {
  todos: [
    {id: '1', title: 'todo 1'},
  ]
};

export const TodoState = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = title => dispatch({ type: ADD_TODO, title});
  const removeTodo = id => dispatch({ type: REMOVE_TODO, id});
  const updateTodo = (id, title) => dispatch({ type: UPDATE_TODO, id, title});

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        addTodo,
        removeTodo,
        updateTodo
      }}
    >
      {children}
    </TodoContext.Provider>
  )
};