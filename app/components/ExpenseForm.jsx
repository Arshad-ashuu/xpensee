// components/ExpenseForm.jsx
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { TextInput, Button, useTheme } from "react-native-paper";

export default function ExpenseForm({ onSubmit }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");


  const handleSubmit = () => {
    if (!description || !amount) {
      return;
    }
    const expense = {
      description,
      amount: parseFloat(amount),
      date: new Date(),
    };
    onSubmit(expense);
    setDescription("");
    setAmount("");
  };

  return (
    <>
      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Amount"
        value={amount}
        onChangeText={setAmount}
        style={styles.input}
        keyboardType="numeric"
        mode="outlined"
      />
      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        Add Expense
      </Button>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
});
