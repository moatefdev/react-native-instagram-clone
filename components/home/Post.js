import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
// import { Divider } from "@rneui/themed";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getFirestore,
} from "firebase/firestore";
// import BottomTabs from "./BottomTabs";

const Post = ({ post }) => {
  const handleLike = async (post) => {
    // debugger;
    const currentLikeStatus = !post.likes_by_users.includes(
      getAuth().currentUser.email
    );
    console.log(currentLikeStatus);
    const db = getFirestore();
    const auth = getAuth();
    const postsRef = doc(db, "users", post.owner_email, "posts", post.id);
    await updateDoc(postsRef, {
      likes_by_users: currentLikeStatus
        ? arrayUnion(auth.currentUser.email)
        : arrayRemove(auth.currentUser.email),
    })
      .then(() => {
        console.log("✅Document successfully updated!");
      })
      .catch((error) => {
        console.log("❌Error updating document!: ", error);
      });
  };
  return (
    <View style={{ marginBottom: 30 }}>
      {/* <Divider width={1} orientation="vertical" /> */}
      <PostHeader post={post} />
      <PostImage post={post} />
      <PostFooter post={post} handleLike={handleLike} />
      <Captions post={post} />
      <CommentSection post={post} />
      <Comments post={post} />
    </View>
  );
};

const PostHeader = ({ post }) => (
  <View style={styles.postHeaderStyle}>
    <View style={styles.postHeaderUser}>
      <Image source={{ uri: post.profileImage }} style={styles.story} />
      <Text style={{ color: "white" }}>{post.user}</Text>
    </View>
    <Text style={{ color: "white", fontWeight: "900" }}>...</Text>
  </View>
);

const PostImage = ({ post }) => (
  <View style={{ width: "100%", height: 450 }}>
    <Image
      source={{ uri: post.postImageUrl }}
      style={{ height: "100%", resizeMode: "cover" }}
    />
  </View>
);

const PostFooter = ({ post, handleLike }) => {
  const [iconName, setIconName] = useState("heart-o");
  const [iconColor, setIconColor] = useState("white");
  useEffect(() => {
    if (post.likes_by_users.includes(getAuth().currentUser.email)) {
      setIconName("heart");
      setIconColor("red");
    } else {
      setIconName("heart-o");
      setIconColor("white");
    }
  }),
    [];
  return (
    <>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={styles.leftFooterIcons}>
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() => handleLike(post)}
          >
            <View>
              <FontAwesome
                name={iconName}
                size={24}
                style={{ color: iconColor, margin: 7 }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome5
              name="comment"
              size={24}
              style={{ color: "white", margin: 7 }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome
              name="send-o"
              size={24}
              style={{ color: "white", margin: 7 }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.rightFooterIcons}>
          <TouchableOpacity>
            <FontAwesome
              name="bookmark-o"
              size={24}
              style={{ color: "white", margin: 7 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Likes post={post} />
    </>
  );
};

const Likes = ({ post }) => (
  <View style={{ flexDirection: "row", marginLeft: 3 }}>
    <Text style={{ color: "white", fontWeight: "bold" }}>
      {" "}
      {post.likes_by_users.length.toLocaleString("en")} likes
    </Text>
  </View>
);

const Captions = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    <Text style={{ color: "white" }}>
      <Text style={{ fontWeight: "600" }}> {post.user}</Text> {post.caption}
    </Text>
  </View>
);

const CommentSection = ({ post }) => (
  <View style={{ flexDirection: "row", marginTop: 5 }}>
    {!!post.comments.length && (
      <Text style={{ color: "gray" }}>
        {" "}
        View {post.comments.length > 1 ? "all" : ""} {post.comments.length}{" "}
        {post.comments.length > 1 ? "comments" : "comment"}
      </Text>
    )}
  </View>
);

const Comments = ({ post }) => (
  <>
    {post.comments.map((comment, index) => (
      <View key={index} style={{ marginTop: 5 }}>
        <Text style={{ color: "white" }}>
          <Text style={{ fontWeight: "600" }}> {post.user}</Text>{" "}
          {comment.comment}
        </Text>
      </View>
    ))}
  </>
);

export default Post;

const styles = StyleSheet.create({
  postHeaderStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    alignItems: "center",
  },
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginHorizontal: 5,
    borderWidth: 1.5,
    borderColor: "#ff8501",
  },
  postHeaderUser: {
    flexDirection: "row",
    alignItems: "center",
  },
  leftFooterIcons: {
    flexDirection: "row",
  },
  rightFooterIcons: {
    flexDirection: "row",
  },
});
