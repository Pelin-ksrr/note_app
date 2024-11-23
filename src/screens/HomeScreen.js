import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { FAB, List, IconButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem("notes");
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      }
    } catch (error) {
      console.error("Failed to load notes.", error);
    }
  };

  const saveNotes = async (newNotes) => {
    try {
      await AsyncStorage.setItem("notes", JSON.stringify(newNotes));
      setNotes(newNotes);
    } catch (error) {
      console.error("Failed to save notes.", error);
    }
  };

  const addNote = (note) => {
    const noteIndex = notes.findIndex((n) => n.id === note.id);
    let newNotes;
    if (noteIndex > -1) {
      newNotes = [...notes];
      newNotes[noteIndex] = note;
    } else {
      newNotes = [...notes, note];
    }
    saveNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    saveNotes(newNotes);
  };

  const confirmDelete = (id) => {
    Alert.alert(
      "Delete Note",
      "Are you sure you want to delete this note?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => deleteNote(id) },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <List.Section>
        {notes.map((item) => (
          <List.Item
            key={item.id.toString()}
            title={item.text}
            titleStyle={{ color: "#000000" }}
            right={() => (
              <IconButton
                icon="delete"
                iconColor="#ff0000"
                onPress={() => confirmDelete(item.id)}
              />
            )}
            onPress={() => navigation.navigate("Note", { note: item, addNote })}
          />
        ))}
      </List.Section>
      <FAB
        style={styles.fab}
        icon="plus"
        color="#ffffff"
        onPress={() => navigation.navigate("Note", { addNote })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#007bff",
  },
});
