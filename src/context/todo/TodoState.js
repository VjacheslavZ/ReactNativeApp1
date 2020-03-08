import React, { useReducer } from 'react';

import { todoReducer} from './todoReducer'
import { TodoContext } from './todoContext';

const initialState = {
  todos: [
    {id: '1', title: 'todo 1'},
  ]
};

export const TodoState = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos
      }}
    >
      {children}
    </TodoContext.Provider>
  )
};