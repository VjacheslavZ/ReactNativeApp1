import React, { useState }  from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

import { AppCard } from "../components/ui/AppCard";
import { EditModal } from "../components/EditModal";

import { THEME } from "../theme";

export const TodoScreen = ({ goBack, todo, onRemove }) => {
  const [ modal, setModal ] = useState(false);

  return (
    <View>
      <EditModal
        visible={modal}
        onCancel={() => setModal(false )}
      />

      <AppCard style={styles.card}>
        <Text style={styles.title}>{todo.title}</Text>
        <Button
          title='Edit'
          onPress={() => setModal(true)}
        />
      </AppCard>

      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button
            title='Go back'
            onPress={goBack}
            color={THEME.GREY_COLOR}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Delete'
            onPress={() => onRemove(todo.id)}
            color={THEME.DANGER_COLOR}
          />
        </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    width: '40%',
  },
  title: {
    fontSize: 20,
  },
  card: {
    marginBottom: 20,
    padding: 15
  }
});