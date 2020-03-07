import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Modal, Button, Alert } from 'react-native';
import {THEME} from "../theme";

export const EditModal = ({ visible, onCancel, value, onSave }) => {
  const [ title, setTile ] = useState(value);
  const saveHandler = () => {
    if (title.trim().length < 3) {
      Alert.alert('Warning', `Min length 3 symbols, now ${title.trim().length} symbols`)
      return
    }
    onSave(title)
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
    >
      <View style={styles.wrap}>
        <TextInput
          value={title}
          style={styles.input}
          placeholder='Enter name'
          autoCapitaleze={false}
          autoCorrect={false}
          maxLength={64}
          onChangeText={setTile}
        />

        <View style={styles.buttons}>
          <Button
            title='Cancel'
            onPress={() => onCancel()}
            color={THEME.DANGER_COLOR}
          />
          <Button title='Save' onPress={saveHandler}/>
        </View>
      </View>
    </Modal>
  )
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    padding: 10,
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    width: '80%'
  },
  buttons: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
});
