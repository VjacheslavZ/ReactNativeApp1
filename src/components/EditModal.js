import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Modal, Alert } from 'react-native';

import { THEME } from "../theme";
import { AppButton } from "./ui/AppButton";

export const EditModal = ({ visible, onCancel, value, onSave }) => {
  const [ title, setTile ] = useState(value);
  const saveHandler = () => {
    if (title.trim().length < 3) {
      Alert.alert('Warning', `Min length 3 symbols, now ${title.trim().length} symbols`)
      return
    }
    onSave(title)
  };

  const cancelHandler = () => {
    setTile(value);
    onCancel();
  }

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
          <AppButton
            onPress={cancelHandler}
            color={THEME.DANGER_COLOR}
          >Cancel</AppButton>
          <AppButton onPress={saveHandler}>Save</AppButton>
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
