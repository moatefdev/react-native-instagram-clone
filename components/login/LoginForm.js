import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React from "react";
import { StatusBar } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import * as EmailValidator from "email-validator";
import { useNavigation } from "@react-navigation/native";
import { loginState, onLogin } from "../../firebase";

const LoginForm = () => {
  const navigation = useNavigation();
  const loginFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An email is required"),
    password: Yup.string()
      .required("A password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  return (
    <View style={styles.wrapper}>
      <StatusBar />
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          onLogin(values.email, values.password)
            .then(() => {
              Alert.alert("Login", "Successfuly logged in");
            })
            .catch((error) => {
              console.log(error);
              Alert.alert("❌ My Lord!😒", "error", [
                {
                  text: "OK",
                  onPress: () => console.log("OK"),
                  style: "cancel",
                },
                {
                  text: "Sign Up",
                  onPress: () => navigation.push("SignupScreen"),
                  style: "default",
                },
              ]);
            });
        }}
        validationSchema={loginFormSchema}
        validateOnMount={true}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          isValid,
          errors,
        }) => (
          <>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.email.length < 1 ||
                    EmailValidator.validate(values.email)
                      ? "#777"
                      : "#f00",
                },
              ]}
            >
              <TextInput
                placeholderTextColor="gray"
                placeholder="Phone number, username or email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
            </View>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    1 > values.password.length || values.password.length >= 8
                      ? "#777"
                      : "#f00",
                },
              ]}
            >
              <TextInput
                placeholderTextColor="gray"
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                textContentType="password"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
            </View>
            <View style={{ alignItems: "flex-end", marginBottom: 30 }}>
              <Text style={{ color: "#6BB0F5" }}>Forget password?</Text>
            </View>
            <Pressable
              titleSize={20}
              style={styles.button(isValid)}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Log In</Text>
            </Pressable>

            <View style={styles.signupContainer}>
              <Text>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.push("SignupScreen")}>
                <Text style={{ color: "#6BB0F5" }}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 50,
  },
  inputField: {
    marginBottom: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#777",
    padding: 12,
    backgroundColor: "#fafafa",
  },
  button: (isValid) => ({
    backgroundColor: isValid ? "#0096F6" : "#9ACAF7",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    borderRadius: 4,
  }),
  buttonText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 16,
  },
  signupContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginTop: 20,
  },
});
