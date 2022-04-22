import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import AddNewPost from "../components/NewPost/AddNewPost";

const NewPost = ({ navigation }) => {
  return (
    <SafeAreaView style={{ backgroundColor: "black", flex: 1 }}>
      <AddNewPost navigation={navigation} />
    </SafeAreaView>
  );
};

export default NewPost;

const styles = StyleSheet.create({});
