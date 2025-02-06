import React, { useState } from "react";
import { StyleSheet, ScrollView, View, Animated, Keyboard } from "react-native";
import { Card, Text, useTheme, Portal, Snackbar } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ExpenseForm from "./components/ExpenseForm";
import { saveExpense } from "../utils/storage";
import { useRouter } from "expo-router";
import * as Haptics from 'expo-haptics';

export default function AddExpenseScreen() {
   const theme = useTheme();
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    // Add keyboard listeners to adjust layout
    const keyboardWillShow = Keyboard.addListener('keyboardWillShow', () => {
      // You could add additional animations here when keyboard shows
    });
    const keyboardWillHide = Keyboard.addListener('keyboardWillHide', () => {
      // You could add additional animations here when keyboard hides
    });

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  const handleAddExpense = async (expense) => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      await saveExpense(expense);
      setVisible(true);
      setError(false);
      
      // Delay navigation to show success message
      setTimeout(() => {
        router.push("/expense-list");
      }, 1500);
    } catch (error) {
      console.error("Error adding expense: ", error);
      setError(true);
      setVisible(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  return (
    <View style={[styles.wrapper, { backgroundColor: theme.colors.background }]}>
      <ScrollView 
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View style={[
          styles.animatedContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }
        ]}>
          <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
            <View style={styles.headerContainer}>
              <MaterialCommunityIcons
                name="wallet-plus"
                size={32}
                color={theme.colors.primary}
                style={styles.icon}
              />
              <Text variant="headlineMedium" style={styles.title}>
                Add New Expense
              </Text>
            </View>
            
            <Card.Content style={styles.formContainer}>
              <ExpenseForm onSubmit={handleAddExpense} />
            </Card.Content>
          </Card>
        </Animated.View>
      </ScrollView>

      <Portal>
        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          duration={2000}
          style={[
            styles.snackbar,
            { backgroundColor: error ? theme.colors.error : theme.colors.primary }
          ]}
          action={{
            label: 'Dismiss',
            onPress: () => setVisible(false),
          }}
        >
          {error ? "Error saving expense" : "Expense saved successfully!"}
        </Snackbar>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    padding: 20,
    flexGrow: 1,
    justifyContent: "center",
  },
  animatedContainer: {
    width: '100%',
  },
  card: {
    elevation: 4,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  icon: {
    marginRight: 12,
  },
  title: {
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 16,
  },
  snackbar: {
    marginBottom: 20,
    borderRadius: 8,
  }
});