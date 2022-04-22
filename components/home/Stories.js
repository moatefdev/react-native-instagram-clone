import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { USERS } from "../../data/user";

const Stories = () => {
  return (
    <View style={{ marginBottom: 13 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {USERS.map((story, index) => {
          return (
            <View key={index}>
              <TouchableOpacity
                style={{
                  alignItems: "center",
                }}
              >
                <Image style={styles.story} source={{ uri: story.image }} />
                <Text style={{ color: "white", marginTop: 3 }}>
                  {story.user.length > 11
                    ? story.user.slice(0, 6).toLowerCase() + "..."
                    : story.user.charAt(0).toUpperCase() + story.user.slice(1)}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Stories;

const styles = StyleSheet.create({
  story: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginHorizontal: 6,
    borderWidth: 3,
    borderColor: "#ff8501",
  },
});
