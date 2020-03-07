import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, View, Image, Dimensions} from 'react-native';

import {AddTodo} from "../components/AddTodo";
import {Todo} from "../components/Todo";
import {THEME} from "../theme";

export const MainScreen = ({addTodo, todos, removeTodo, openTodo}) => {
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

  let content = (
    <View style={{
      width: deviceWidth
    }}>
      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        renderItem={({item}) => <Todo todo={item} onRemoveTodo={removeTodo} onOpen={openTodo}/>}
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
  }
});