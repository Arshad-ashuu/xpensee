// utils/storage.js
import AsyncStorage from "@react-native-async-storage/async-storage";

const EXPENSES_KEY = "@expenses_key";

export const  saveExpense = async (expense) => {
  try {
    const storedExpenses = await AsyncStorage.getItem(EXPENSES_KEY);
    const expenses = storedExpenses ? JSON.parse(storedExpenses) : [];
    expenses.push(expense);
    await AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
  } catch (error) {
    console.error("Error saving expense:", error);
  }
};

export const getExpenses = async () => {
  try {
    const storedExpenses = await AsyncStorage.getItem(EXPENSES_KEY);
    return storedExpenses ? JSON.parse(storedExpenses) : [];
  } catch (error) {
    console.error("Error retrieving expenses:", error);
    return [];
  }
};

export const deleteExpense = async (indexToDelete) => {
  try {
    const storedExpenses = await AsyncStorage.getItem(EXPENSES_KEY);
    const expenses = storedExpenses ? JSON.parse(storedExpenses) : [];
    const updatedExpenses = expenses.filter((_, index) => index !== indexToDelete);
    await AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(updatedExpenses));
  } catch (error) {
    console.error("Error deleting expense:", error);
  }
};
