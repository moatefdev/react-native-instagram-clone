import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { SignedInStack, SignedOutStack } from "./navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const AuthNavigation = () => {
  const [currentUser, setCurrentUser] = useState(null);

  // Check if user logged in or logged out
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user);
      // console.log("user status changes:", currentUser);
    } else {
      setCurrentUser(null);
      // console.log("user status changes:", currentUser);
    }
  });

  // useEffect(() => {
  //   setCurrentUser(userObject);
  //   console.log("current:", currentUser);
  // }, [currentUser]);

  return <>{currentUser ? <SignedInStack /> : <SignedOutStack />}</>;
};

export default AuthNavigation;
