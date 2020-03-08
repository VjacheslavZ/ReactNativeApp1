import React, {useReducer, useContext} from 'react';
import {Alert} from 'react-native';

import {ScreenContext} from "../screen/screenContext";

import {todoReducer} from './todoReducer'
import {TodoContext} from './todoContext';
import {
  ADD_TODO,
  CLEAR_ERROR,
  FETCH_TODOS,
  HIDE_LOADER,
  REMOVE_TODO,
  SHOW_ERROR,
  SHOW_LOADER,
  UPDATE_TODO
} from "../types";
import { FIREBASE_URI } from "../../constants";

const initialState = {
  todos: [],
  loading: false,
  err: null
};

export const TodoState = ({children}) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const {changeScreen} = useContext(ScreenContext);

  const addTodo = async title => {
    const responce = await fetch(`${FIREBASE_URI}/todos.json`, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({title})
    });
    const data = await responce.json();

    dispatch({type: ADD_TODO, title, id: data.name})
  };

  const removeTodo = id => {
    const todo = state.todos.find(t => t.id === id);
    Alert.alert(
      'Delete item',
      `Are you sure delete ${todo.title} ?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          onPress: () => {
            changeScreen(null);
            dispatch({type: REMOVE_TODO, id})
          }
        },
      ],
      {
        cancelable: false
      },
    );
  };

  const updateTodo = (id, title) => dispatch({type: UPDATE_TODO, id, title});

  const showLoader = () => dispatch({type: SHOW_LOADER});
  const hideLoader = () => dispatch({type: HIDE_LOADER});

  const showError = err => dispatch({type: SHOW_ERROR, err});
  const clearError = () => dispatch({type: CLEAR_ERROR});

  const fetchTodos = async () => {
    showLoader();
    clearError();

    try {
      const responce = await fetch(`${FIREBASE_URI}/todos.json`, {
        headers: {'content-type': 'application/json'},
      });
      const data = await responce.json();
      const todos = Object.keys(data).map(key => ({ ...data[key], id: key }));

      dispatch({ type: FETCH_TODOS, todos});
    } catch (e) {
      showError('Some thing went wrong, try again');
      console.log('error happen', e);
    } finally {
      hideLoader();
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  )
};