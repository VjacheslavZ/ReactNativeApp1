import React, {useState, useEffect, useContext, useCallback} from 'react';
import {FlatList, StyleSheet, View, Image, Dimensions} from 'react-native';

import {AddTodo} from "../components/AddTodo";
import {Todo} from "../components/Todo";
import {AppLoader} from "../components/ui/AppLoader";
import {AppText} from "../components/ui/AppTetxt";
import {AppButton} from "../components/ui/AppButton";

import {THEME} from "../theme";

import {TodoContext} from "../context/todo/todoContext";
import {ScreenContext} from "../context/screen/screenContext";

export const MainScreen = () => {
  const {addTodo, todos, removeTodo, fetchTodos, loading, error} = useContext(TodoContext);
  const {changeScreen} = useContext(ScreenContext);

  const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2);


  useEffect(() => {
    const updateWidth = () => {
      const width = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2;
      setDeviceWidth(width)
    };

    Dimensions.addEventListener('change', updateWidth);

    return () => {
      Dimensions.removeEventListener('change', updateWidth)
    }
  }, []);

  const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos]);
  useEffect(() => {
    loadTodos()
  }, []);

  if (loading) {
    return <AppLoader/>
  }

  if (error) {
    return (
      <View style={styles.center}>
        <AppText style={styles.error}>{error.err}</AppText>
        <AppButton onPress={loadTodos}>Try again</AppButton>
      </View>
    )
  }

  let content = (
    <View style={{
      width: deviceWidth
    }}>
      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        renderItem={({item}) => <Todo todo={item} onRemoveTodo={removeTodo} onOpen={changeScreen}/>}
      />
    </View>
  );

  if (!todos.length) {
    content = (
      <View style={styles.imageWrap}>
        <Image source={require('../../assets/no-items.png')} style={styles.image}/>
      </View>
    )
  }

  return (
    <View>
      <AddTodo onSubmit={addTodo}/>
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
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    fontSize: 20,
    color: THEME.DANGER_COLOR
  }
});