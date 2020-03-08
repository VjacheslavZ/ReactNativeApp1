import React, {useReducer, useContext} from 'react';

import {ScreenContext} from "../screen/screenContext";

import {todoReducer} from './todoReducer'
import {TodoContext} from './todoContext';
import {ADD_TODO, REMOVE_TODO, UPDATE_TODO} from "../types";

const initialState = {
  todos: [
    {id: '1', title: 'todo 1'},
  ]
};

export const TodoState = ({children}) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const {changeScreen} = useContext(ScreenContext);

  const addTodo = title => dispatch({type: ADD_TODO, title});
  const removeTodo = id => {
    changeScreen(null);
    dispatch({type: REMOVE_TODO, id});
  };
  const updateTodo = (id, title) => dispatch({type: UPDATE_TODO, id, title});

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