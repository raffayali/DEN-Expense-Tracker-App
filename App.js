// // App.js
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// import SplashScreen from './src/SplashScreen';
// import AddBudgetScreen from './src/AddBudgetScreen';
// import BudgetViewScreen from './src/BudgetViewScreen';
// import BudgetManagementScreen from './src/BudgetManagementScreen';
// import ExpenseHistoryScreen from './src/ExpenseHistoryScreen';

// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Splash">
//         <Stack.Screen name="Splash" component={SplashScreen} />
//         <Stack.Screen name="Add Budget" component={AddBudgetScreen} />
//         <Stack.Screen name="Budget View" component={BudgetViewScreen} />
//         <Stack.Screen name="Budget Management" component={BudgetManagementScreen} />
//         <Stack.Screen name="Expense History" component={ExpenseHistoryScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }



import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/SplashScreen';
import BudgetViewScreen from './src/BudgetViewScreen';
import AddBudgetScreen from './src/AddBudgetScreen';
import ExpenseHistoryScreen from './src/ExpenseHistoryScreen';
import BudgetManagementScreen from './src/BudgetManagementScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Budget View" 
          component={BudgetViewScreen} 
          options={{ title: 'Budgets' }} 
        />
        <Stack.Screen 
          name="Add Budget" 
          component={AddBudgetScreen} 
          options={{ title: 'Add Budget' }} 
        />
        <Stack.Screen 
          name="Expense History" 
          component={ExpenseHistoryScreen} 
          options={{ title: 'Expense History' }} 
        />
        <Stack.Screen 
          name="Manage Budgets" 
          component={BudgetManagementScreen} 
          options={{ title: 'Manage Budgets' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
