import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const BudgetManagementScreen = () => {
  const handleDeleteBudget = () => {
    console.log('Budget deleted');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Budgets</Text>
      <Text style={styles.description}>Easily delete or update your budgets</Text>
      <Button title="Delete Budget" onPress={handleDeleteBudget} color="#d9534f" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
});

export default BudgetManagementScreen;
