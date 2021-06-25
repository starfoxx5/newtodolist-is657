import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import ToDoList from "./screens/ToDoList";
import EditList from "./screens/EditList";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="My ToDo App" component={Home} />
        <Stack.Screen
          name="ToDoList"
          component={ToDoList}
          options={({ route }) => {
            return {
              title: route.params.title,
              headerStyle: {
                backgroundColor: route.params.color,
              },
              headerTintColor: "white",
            };
          }}
        />
        <Stack.Screen
          name="Edit"
          component={EditList}
          options={({ route }) => {
            return {
              title: `Edit ${route.params.title} list`,
              headerStyle: {
                backgroundColor: route.params.color,
              },
              headerTintColor: "white",
            };
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
