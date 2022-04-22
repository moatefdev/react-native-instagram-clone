import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
// import { Divider } from "@rneui/base";
import validUrl from "valid-url";
import {
  getFirestore,
  doc,
  getDocs,
  collection,
  onSnapshot,
  getDoc,
  serverTimestamp,
  addDoc,
  collectionGroup,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { date } from "yup/lib/locale";

const PLACHOLDER_IMAGE = "https://i.imgur.com/DpTHKb9.jpeg";

const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required("A URL is required"),
  caption: Yup.string().max(2200, "Caption has reached the character limit."),
});

const FormikPostUploader = () => {
  const navigation = useNavigation();
  const [imageUrl, setImageUrl] = useState(PLACHOLDER_IMAGE);
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);
  const db = getFirestore();
  const auth = getAuth();

  const getCurrentUser = async () => {
    // Get a single document
    console.log(auth.currentUser.email);
    const docRef = doc(db, "users", auth.currentUser.email);

    // const unsubDoc = await onSnapshot(docRef, (doc) => {
    //   // console.log(doc.data(), doc.id);
    //   setCurrentLoggedInUser(doc.data());
    // });
    await getDoc(docRef).then((doc) => {
      // console.log(doc.data());
      setCurrentLoggedInUser(doc.data());
    });
    console.log(currentLoggedInUser);
  };

  useEffect(() => {
    getCurrentUser();
  }, [currentLoggedInUser]);

  const uploadPostToFirebase = async (imageUrl, caption) => {
    // const postId = collection("posts").doc().id;
    const post = {
      postImageUrl: imageUrl,
      user: currentLoggedInUser.username,
      profileImage: currentLoggedInUser.profile_picture,
      owner_uid: currentLoggedInUser.user_uid,
      owner_email: currentLoggedInUser.email,
      caption: caption,
      createdAt: serverTimestamp(),
      likes_by_users: [],
      comments: [],
    };
    addDoc(collection(db, "users", auth.currentUser.email, "posts"), post);
    // getDocs(collectionGroup(db, "posts")).then((snapshot) => {
    //   let posts = [];
    //   console.log(snapshot.docs);
    //   // const postRef = collection(db, "users", auth.currentUser.email).doc();
    //   // const post = {
    //   //   postImageUrl: imageUrl,
    //   //   user: currentLoggedInUser.username,
    //   //   profileImage: currentLoggedInUser.profile_picture,
    //   //   owner_uid: currentLoggedInUser.user_uid,
    //   //   caption: caption,
    //   //   createdAt: Date.now(),
    //   //   likes: 0,
    //   //   likes_by_users: [],
    //   //   comments: [],
    //   // };
    //   // await addDoc(postRef, post);
    // });
  };

  return (
    <Formik
      initialValues={{ caption: "", imageUrl: "" }}
      onSubmit={(values) => {
        uploadPostToFirebase(values.imageUrl, values.caption);
        navigation.goBack();
      }}
      validationSchema={uploadPostSchema}
      validateOnMount={true}
    >
      {({ handleChange, handleSubmit, values, errors, isValid }) => (
        <>
          <View style={styles.formView}>
            <Image
              source={{
                uri: validUrl.isUri(imageUrl) ? imageUrl : PLACHOLDER_IMAGE,
              }}
              style={{ width: 100, height: 100 }}
            />
            <View style={{ flex: 1, marginLeft: 20 }}>
              <TextInput
                style={{ color: "white", fontSize: 20 }}
                placeholder="Write a caption..."
                placeholderTextColor="gray"
                multiline={true}
                onChangeText={handleChange("caption")}
                // onBlur={handleChange("caption")}
                value={values.caption}
              />
            </View>
          </View>
          {/* <Divider width={0.2} orientation="vertical" /> */}
          <TextInput
            onChange={(e) => setImageUrl(e.nativeEvent.text)}
            style={{ color: "white", fontSize: 18 }}
            placeholder="Enter Image URL"
            placeholderTextColor="gray"
            onChangeText={handleChange("imageUrl")}
            // onBlur={handleChange("imageUrl")}
            value={values.imageUrl}
          />
          {errors.imageUrl && (
            <Text style={{ color: "red", fontSize: 12 }}>
              {errors.imageUrl}
            </Text>
          )}
          <Button onPress={handleSubmit} title="Share" disabled={!isValid} />
          {/* <Text>{currentLoggedInUser.username}</Text> */}
        </>
      )}
    </Formik>
  );
};

export default FormikPostUploader;

const styles = StyleSheet.create({
  formView: {
    margin: 20,
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
