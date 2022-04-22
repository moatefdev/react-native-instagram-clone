import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import FormikPostUploader from "./FormikPostUploader";

// const Header = ({ navigation }) => (
//   <View style={styles.headerContainer}>
//     <TouchableOpacity onPress={() => navigation.goBack()}>
//       <FontAwesome name="chevron-left" size={24} color="white" />
//     </TouchableOpacity>
//     <Text style={styles.headerText}>New Post</Text>
//     <Text></Text>
//   </View>
// );

const AddNewPost = () => (
  <View style={styles.container}>
    {/* <Header navigation={navigation} /> */}
    <FormikPostUploader />
    <StatusBar barStyle="dark-content" />
  </View>
);

export default AddNewPost;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    marginRight: 25,
  },
});
