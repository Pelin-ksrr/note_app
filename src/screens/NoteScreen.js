import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

export default function NoteScreen({ route, navigation }) {
  const { note, addNote } = route.params || {};
  const [text, setText] = useState(note ? note.text : '');

  const handleSave = () => {
    if (note) {
      const updatedNote = { ...note, text };
      addNote(updatedNote);
    } else {
      addNote({
        id: Date.now(),
        text,
      });
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        label="Note"
        placeholder="Please write your notes here..."
        value={text}
        onChangeText={setText}
        style={styles.textInput}
        theme={{ colors: { primary: '#007bff' } }}
        multiline={true}
        numberOfLines={10} 
      />
      <Button
        mode="contained"
        onPress={handleSave}
        style={styles.button}
        contentStyle={styles.buttonContent} 
        labelStyle={styles.buttonLabel} 
      >
        Save
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5', 
  },
  textInput: {
    textAlignVertical: 'top',
    flex: 1,
    marginBottom: 20,
    backgroundColor: '#ffffff', 
  },
  button: {
    marginTop: 20,
    width: '50%',
    backgroundColor: '#007bff',
    alignSelf: 'center',
  },
  buttonContent: {
    height: 50, 
  },
  buttonLabel: {
    fontSize: 20, 
  },
});