import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  FlatList,
  Dimensions,
  View,
  Animated,
  ScrollView,
} from "react-native";
import {
  Text,
  Card,
  Button,
  useTheme,
} from "react-native-paper";
import { Link, router } from "expo-router";
import { getExpenses } from "../utils/storage";
import { LineChart, PieChart } from "react-native-chart-kit";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

// Sample animated expense item component
const ExpenseItem = React.memo(({ item, index, animationEnabled }) => {
  const theme = useTheme();
  const translateX = useRef(new Animated.Value(50)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animationEnabled) {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0,
          duration: 500,
          delay: index * 100,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          delay: index * 100,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      translateX.setValue(0);
      opacity.setValue(1);
    }
  }, []);

  return (
    <Animated.View
      style={{
        opacity,
        transform: [{ translateX }],
      }}
    >
      <Card style={[styles.card, { marginVertical: 6 }]}>
        <Card.Title
          title={`$${item.amount.toFixed(2)}`}
          subtitle={new Date(item.date).toLocaleDateString()}
          left={(props) => (
            <MaterialCommunityIcons
              name="currency-usd"
              size={24}
              color={theme.colors.primary}
            />
          )}
        />
      </Card>
    </Animated.View>
  );
});

export default function HomeScreen() {
  const theme = useTheme();
  const [expenses, setExpenses] = useState([]);
  const [scrollY] = useState(new Animated.Value(0));
  const [fadeAnim] = useState(new Animated.Value(0));
  const [animationEnabled] = useState(true);

  // Define a palette of colors for the pie chart slices.
  const COLORS = [
    "#f39c12", // bright orange
    "#e74c3c", // red
    "#2ecc71", // green
    "#3498db", // blue
    "#9b59b6", // purple
    "#34495e", // dark blue/gray
    "#1abc9c", // turquoise
  ];

  useEffect(() => {
    const loadExpenses = async () => {
      const data = await getExpenses();
      setExpenses(data);
      // Fade in animation when data loads
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    };
    loadExpenses();
  }, []);

  // Header animation based on scroll
  const headerScale = scrollY.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: [1.2, 1, 0.8],
    extrapolate: "clamp",
  });

  // Aggregate expenses by month for the line chart
  const aggregateByMonth = () => {
    const monthlyData = {};
    expenses.forEach((exp) => {
      const date = new Date(exp.date);
      const month = date.toLocaleString("default", { month: "short" });
      monthlyData[month] = (monthlyData[month] || 0) + exp.amount;
    });
    const labels = Object.keys(monthlyData);
    const amounts = labels.map((label) => monthlyData[label]);
    return { labels, amounts };
  };

  const chartData = aggregateByMonth();

  // Aggregate expenses by description for the pie chart
  const aggregateByCategory = () => {
    const categoryData = {};
    expenses.forEach((exp) => {
      // Use the description as the key; default to "Other" if empty.
      const description = exp.description ? exp.description : "Other";
      categoryData[description] = (categoryData[description] || 0) + exp.amount;
    });
    // Map the aggregated data into the format expected by PieChart:
    return Object.keys(categoryData).map((key, index) => ({
      name: key,
      amount: categoryData[key],
      color: COLORS[index % COLORS.length],
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    }));
  };

  const pieData = aggregateByCategory();

  const renderItem = ({ item, index }) => (
    <ExpenseItem
      item={item}
      index={index}
      animationEnabled={animationEnabled}
    />
  );

  const handleAddExpense = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push("/add-expense");
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <Animated.View style={{ transform: [{ scale: headerScale }] }}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>
          Expense Tracker
        </Text>
      </Animated.View>

      <Animated.View style={{ opacity: fadeAnim }}>
        {/* Total Overview Card */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Title
            title="Total Overview"
            left={(props) => (
              <MaterialCommunityIcons
                name="chart-pie" // Changed to a valid icon name
                size={24}
                color={theme.colors.primary}
              />
            )}
          />
          <Card.Content>
            <Text style={[styles.summary, { color: theme.colors.primary }]}>
              ${expenses.reduce((sum, exp) => sum + exp.amount, 0).toFixed(2)}
            </Text>
          </Card.Content>
        </Card>

          <Text>Scroll left to see more</Text>
        <ScrollView horizontal>
          {/* Line Chart Card for Monthly Trends */}
          <Card style={[styles.card, { marginVertical: 20 }]}>
            <Card.Title
              title="Monthly Trends"
              left={(props) => (
                <MaterialCommunityIcons
                  name="chart-line"
                  size={24}
                  color={theme.colors.primary}
                />
              )}
            />
            <Card.Content>
              {chartData.labels.length > 0 ? (
                <LineChart
                  data={{
                    labels: chartData.labels,
                    datasets: [{ data: chartData.amounts }],
                  }}
                  width={Dimensions.get("window").width - 70} // Extra padding for mobile view
                  height={220}
                  chartConfig={{
                    backgroundColor: theme.colors.surface,
                    backgroundGradientFrom: "#1E1E1E",
                    backgroundGradientTo: "#121212",
                    decimalPlaces: 2,
                    // Return a valid color string instead of concatenating values
                    color: (opacity = 1) => theme.colors.primary,
                    labelColor: (opacity = 1) =>
                      `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      borderRadius: 10,
                    },
                    propsForDots: {
                      r: "6",
                      strokeWidth: "2",
                      stroke: "#64C8FF",
                    },
                    propsForHorizontalLabels: {
                      fontSize: 12,
                    },
                    propsForVerticalLabels: {
                      fontSize: 12,
                    },
                    propsForBackgroundLines: {
                      strokeDasharray: "",
                      stroke: "rgba(243, 237, 237, 0.2)",
                    },
                  }}
                  bezier
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                    elevation: 3,
                  }}
                />
              ) : (
                <Text>No expenses to display</Text>
              )}
            </Card.Content>
          </Card>

          {/* Pie Chart Card for Description Breakdown */}
          <Card style={[styles.card, { marginVertical: 20, marginLeft: 20 }]}>
            <Card.Title
              title="Spending by Description"
              left={(props) => (
                <MaterialCommunityIcons
                  name="chart-pie" // Changed to a valid icon name
                  size={24}
                  color={theme.colors.primary}
                />
              )}
            />
            <Card.Content>
              {pieData.length > 0 ? (
                <PieChart
                  data={pieData}
                  width={Dimensions.get("window").width - 70}
                  height={220}
                  chartConfig={{
                    // Return a valid color string here as well
                    color: (opacity = 1) => theme.colors.primary,
                  }}
                  accessor="amount"
                  backgroundColor="transparent"
                  paddingLeft="15"
                  absolute
                />
              ) : (
                <Text>No description data to display</Text>
              )}
            </Card.Content>
          </Card>
        </ScrollView>
      </Animated.View>

      <Animated.FlatList
        data={expenses}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      />

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={handleAddExpense}
          icon="plus"
        >
          Add Expense
        </Button>
        <Button
          mode="outlined"
          style={styles.button}
          onPress={() => router.push("/expense-list")}
          icon="format-list-bulleted"
        >
          View All
        </Button>
      </View>
            <StatusBar style="light" />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "System",
  },
  card: {
    elevation: 4,
    borderRadius: 16,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  summary: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 10,
    elevation: 2,
  },
  list: {
    paddingBottom: 20,
  }
});
