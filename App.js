import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import ToDoList from "./screens/ToDoList";
import EditList from "./screens/EditList";
import Login from "./screens/Login";
import Settings from "./screens/Settings";
import Colors from "./constants/Colors";
// import * as firebase from "firebase";
// import firebase from "firebase/app";
// require("firebase/auth");
// import "firebase/firestore";
import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/auth";

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();

const AuthScreens = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={Login} />
    </AuthStack.Navigator>
  );
};

const Screens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="My ToDo App" component={Home} />
      <Stack.Screen name="Settings" component={Settings} />
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
            title: route.params.title
              ? `Edit ${route.params.title} list`
              : "Create New List",
            headerStyle: {
              backgroundColor: route.params.color || Colors.blue,
            },
            headerTintColor: "white",
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  const [isAuthenicated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    if (firebase.auth().currentUser) {
      setIsAuthenticated(true);
    }
    firebase.auth().onAuthStateChanged((user) => {
      console.log("Checking auth state...");
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
  }, []);

  return (
    <NavigationContainer>
      {isAuthenicated ? <Screens /> : <AuthScreens />}
    </NavigationContainer>
  );
}

const firebaseConfig = {
  apiKey: "AIzaSyAhhVSHa9fBJquK9tj3NLET8jUT5eXC9so",
  authDomain: "newtodolist-ba840.firebaseapp.com",
  projectId: "newtodolist-ba840",
  storageBucket: "newtodolist-ba840.appspot.com",
  messagingSenderId: "610773641765",
  appId: "1:610773641765:web:332542d4ecc2802677edcc",
};
firebase.initializeApp(firebaseConfig);
