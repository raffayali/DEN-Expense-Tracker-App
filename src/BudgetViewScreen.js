import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useFocusEffect } from '@react-navigation/native';

const BudgetViewScreen = ({ navigation }) => {
  const [budgets, setBudgets] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });

  const fetchBudgets = async () => {
    try {
      const response = await fetch('http://192.168.0.105:3000/budgets');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setBudgets(data);
      setChartData({
        labels: data.map((item) => item.category),
        datasets: [
          {
            data: data.map((item) => item.amount),
          },
        ],
      });
    } catch (error) {
      console.error('Failed to fetch budgets:', error);
      Alert.alert('Error', 'Failed to fetch budgets.');
    }
  };

 
  useFocusEffect(
    React.useCallback(() => {
      fetchBudgets();
    }, [])
  );

  const handleAddBudget = () => {
    navigation.navigate('Add Budget', {
      onGoBack: fetchBudgets, 
    });
  };

  const handleDeleteBudget = async (id) => {
    try {
      const response = await fetch(`http://192.168.0.105:3000/budgets/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete budget');
      }
      Alert.alert('Success', 'Budget deleted successfully');
      fetchBudgets(); 
    } catch (error) {
      console.error('Could not delete budget:', error);
      Alert.alert('Error', 'Could not delete budget. Please try again.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.budgetItem}>
      <Text style={styles.budgetText}>Amount: ${item.amount}</Text>
      <Text style={styles.budgetText}>Category: {item.category}</Text>
      <Button title="Delete" onPress={() => handleDeleteBudget(item.id)} color="#ff4d4d" />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={budgets}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={styles.emptyMessage}>No budgets available.</Text>}
      />
      <Button title="Add Budget" onPress={handleAddBudget} color="#6200ee" />

     
      {chartData.labels.length > 0 && (
        <LineChart
          data={chartData}
          width={Dimensions.get('window').width - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  budgetItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  budgetText: {
    fontSize: 18,
    color: '#333',
  },
  emptyMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default BudgetViewScreen;
