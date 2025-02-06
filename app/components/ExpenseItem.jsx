import React, { useRef } from "react";
import { StyleSheet, View, Animated, TouchableOpacity } from "react-native";
import { Card, Text, IconButton, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from 'expo-haptics';

const CategoryIcons = {
  food: "food",
  transportation: "car",
  shopping: "shopping",
  entertainment: "movie",
  bills: "file-document",
  other: "currency-usd",
};

export default function ExpenseItem({ expense, onDelete, onPress, index }) {

  const theme = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleDelete = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Animated.timing(translateX, {
      toValue: -100,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      onDelete();
    });
  };

  const categoryIcon = CategoryIcons[expense.category?.toLowerCase()] || CategoryIcons.other;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            { scale: scaleAnim },
            { translateX },
            { translateY: new Animated.Value(0) }
          ],
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
      >
        <Card
          style={[
            styles.card,
            { elevation: 4,
                borderRadius: 16,
                marginBottom: 10,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84, },
          ]}
        >
          <Card.Content style={styles.content}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name={categoryIcon}
                size={24}
                color={theme.colors.primary}
              />
            </View>
            <View style={styles.info}>
              <Text style={[styles.description, { color: theme.colors.onSurface }]}>
                {expense.description}
              </Text>
              <View style={styles.detailsRow}>
                <Text style={[styles.amount, { color: theme.colors.primary }]}>
                  ${parseFloat(expense.amount).toFixed(2)}
                </Text>
                <Text style={[styles.date, { color: theme.colors.onSurfaceVariant }]}>
                  {new Date(expense.date).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </Text>
              </View>
              {expense.note && (
                <Text style={[styles.note, { color: theme.colors.onSurfaceVariant }]} 
                      numberOfLines={1}>
                  {expense.note}
                </Text>
              )}
            </View>
            <IconButton
              icon="delete-outline"
              iconColor={theme.colors.error}
              size={20}
              onPress={handleDelete}
              style={styles.deleteButton}
            />
          </Card.Content>
        </Card>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 6,
  },
  card: {
    elevation: 3,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  info: {
    flex: 1,
    marginRight: 8,
  },
  description: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  amount: {
    fontSize: 16,
    fontWeight: "700",
  },
  date: {
    fontSize: 12,
  },
  note: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  deleteButton: {
    margin: 0,
  },
});