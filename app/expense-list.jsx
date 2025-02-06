// app/expense-list.jsx
import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, ScrollView, Alert } from "react-native";
import { Text, Card, useTheme } from "react-native-paper";
import ExpenseItem from "./components/ExpenseItem";
import { getExpenses, deleteExpense } from "../utils/storage";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExpenseListScreen() {
  const [expenses, setExpenses] = useState([]);
  const theme = useTheme();

  const loadExpenses = async () => {
    const data = await getExpenses();
    setExpenses(data);
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const handleDelete = async (index) => {
    Alert.alert("Delete Expense", "Are you sure you want to delete this expense?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deleteExpense(index);
          loadExpenses();
        },
      },
    ]);
  };

  return (
    <>
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
    {/* <ScrollView style={styles.container}> */}
      <Text style={styles.title}>Expense List</Text>
      <FlatList
        data={expenses}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <ExpenseItem expense={item} onDelete={() => handleDelete(index)} />
        )}
      />
    {/* </ScrollView> */}
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F5F5F5",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});
