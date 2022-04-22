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
import { onSignup } from "../../firebase";

const SignupForm = () => {
  const navigation = useNavigation();
  const signupFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An email is required"),
    username: Yup.string()
      .required()
      .min(2, "Username must be at least 2 characters"),
    password: Yup.string()
      .required("A password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  return (
    <View style={styles.wrapper}>
      <StatusBar />
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={(values) => {
          onSignup(values.email, values.password, values.username)
            .then(() => {
              Alert.alert("Signup", "Successfuly signed up");
            })
            .catch((error) => {
              console.log(error);
              Alert.alert("❌ My Lord!😒", "error");
            });
        }}
        validationSchema={signupFormSchema}
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
                    1 > values.username.length || values.username.length >= 2
                      ? "#777"
                      : "#f00",
                },
              ]}
            >
              <TextInput
                placeholderTextColor="gray"
                placeholder="Username"
                autoCapitalize="none"
                textContentType="username"
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
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

            <Pressable
              titleSize={20}
              style={styles.button(isValid)}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>

            <View style={styles.signupContainer}>
              <Text>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: "#6BB0F5" }}>Log In</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default SignupForm;

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
    marginTop: 35,
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
