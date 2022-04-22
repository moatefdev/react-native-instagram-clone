import { SafeAreaView, StyleSheet, ScrollView, StatusBar } from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../components/home/Header";
import Stories from "../components/home/Stories";
import Post from "../components/home/Post";
import { POSTS } from "../data/posts";
import BottomTabs, { bottomTabsIcons } from "../components/home/BottomTabs";
import Reels from "./Reels";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Search from "./Search";
import { FontAwesome5 } from "@expo/vector-icons";
import Shopping from "./Shopping";
import Profile from "./Profile";
import {
  getDocs,
  getFirestore,
  collectionGroup,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
const Tab = createBottomTabNavigator();

const db = getFirestore();
const HomeTab = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  // useEffect(() => {
  //   getDocs(collectionGroup(db, "posts"))
  //     .then((snapshot) => {
  //       snapshot.docs.map((doc) => {
  //         setPosts((posts) => [...posts, doc.data()]);
  //       });
  //       // console.log("posts =>", posts);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  useEffect(() => {
    const q = query(collectionGroup(db, "posts"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, collectionGroup(db, "posts"), (snapshot) => {
      let posts = [];
      snapshot.docs.map((doc) => {
        posts.push({ id: doc.id, ...doc.data() });
      });
      setPosts(posts);
    });
    return () => {
      unsub();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView>
        <Header navigation={navigation} />
        <Stories />
        {posts.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
const HomeScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: { backgroundColor: "black", padding: 1, height: 60 },
        tabBarActiveTintColor: "orange",
        tabBarInactiveTintColor: "white",
        tabBarLabelStyle: { fontSize: 12, paddingBottom: 5 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeTab}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Video"
        component={Reels}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="video" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Shopping"
        component={Shopping}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="shopping-bag" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});

export default HomeScreen;
