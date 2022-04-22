import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from "react-native";
import React from "react";
import SignupForm from "./../components/signup/SignupForm";
const INSTAGRAM_LOGO =
  "https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-256.png";

const SignupScreen = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image source={{ uri: INSTAGRAM_LOGO, height: 80, width: 80 }} />
          </View>
          <SignupForm />
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 50,
  },
});
