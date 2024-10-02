import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';

const AddBudgetScreen = ({ navigation }) => {
  const [budgets, setBudgets] = useState([{ amount: '', category: '' }]);


  const addBudgetFields = () => {
    setBudgets([...budgets, { amount: '', category: '' }]);
  };


  const handleSubmit = async () => {
    const filledBudgets = budgets.filter(
      (budget) => budget.amount !== '' && budget.category !== ''
    );

    if (filledBudgets.length === 0) {
      Alert.alert('Error', 'Please fill in at least one budget entry.');
      return;
    }

    try {
      const response = await fetch('http://192.168.0.105:3000/budgets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filledBudgets),
      });

      if (!response.ok) {
        throw new Error('Failed to add budgets');
      }

      Alert.alert('Success', 'Budgets added successfully');
      navigation.goBack(); // Navigate back after successful submission
    } catch (error) {
      console.error('Failed to add budgets:', error);
      Alert.alert('Error', 'Failed to add budgets. Please try again.');
    }
  };

 
  const handleInputChange = (index, field, value) => {
    const updatedBudgets = [...budgets];
    updatedBudgets[index][field] = value;
    setBudgets(updatedBudgets);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add Budgets</Text>

      {budgets.map((budget, index) => (
        <View key={index} style={styles.budgetRow}>
          <TextInput
            style={styles.input}
            placeholder="Amount"
            keyboardType="numeric"
            value={budget.amount}
            onChangeText={(value) => handleInputChange(index, 'amount', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Category"
            value={budget.category}
            onChangeText={(value) => handleInputChange(index, 'category', value)}
          />
        </View>
      ))}

      <Button title="Add Another Budget" onPress={addBudgetFields} color="#6200ee" />
      <Button title="Submit Budgets" onPress={handleSubmit} color="#6200ee" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  budgetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
});

export default AddBudgetScreen;
