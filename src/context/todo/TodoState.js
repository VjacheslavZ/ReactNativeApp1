import React, {useReducer, useContext} from 'react';
import {Alert} from 'react-native';

import {Http} from "../../http";
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
import {FIREBASE_URI} from "../../constants";

const initialState = {
  todos: [],
  loading: false,
  err: null
};

export const TodoState = ({children}) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const {changeScreen} = useContext(ScreenContext);

  const showLoader = () => dispatch({type: SHOW_LOADER});
  const hideLoader = () => dispatch({type: HIDE_LOADER});
  const showError = err => dispatch({type: SHOW_ERROR, err});
  const clearError = () => dispatch({type: CLEAR_ERROR});

  const addTodo = async title => {
    clearError();
    try {
      const data = await Http.post(`${FIREBASE_URI}/todos.json`, {title});
      dispatch({type: ADD_TODO, title, id: data.name})
    } catch (e) {
      showError('Some thing went wrong, try again');
    }
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
          onPress: async () => {
            changeScreen(null);
            await Http.delete(`${FIREBASE_URI}/todos/${id}.json`);
            dispatch({type: REMOVE_TODO, id})
          }
        },
      ],
      {
        cancelable: false
      },
    );
  };

  const updateTodo = async (id, title) => {
    clearError();
    try {
      await Http.patch(`${FIREBASE_URI}/todos/${id}.json`,  JSON.stringify({title}));
      dispatch({type: UPDATE_TODO, id, title})
    } catch (e) {
      showError('Some thing went wrong, try again');
      console.log('error happen', e);
    }
  };

  const fetchTodos = async () => {
    showLoader();
    clearError();

    try {
      const data = await Http.get(`${FIREBASE_URI}/todos.json`)
      const todos = Object.keys(data).map(key => ({...data[key], id: key}));
      dispatch({type: FETCH_TODOS, todos});
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