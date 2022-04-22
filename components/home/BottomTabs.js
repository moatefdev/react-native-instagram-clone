// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import React, { useState } from "react";
// import { Divider } from "@rneui/themed";
// import { FontAwesome5 } from "@expo/vector-icons";
// import { Image } from "@rneui/themed/dist/Image";

// export const bottomTabsIcons = [
//   {
//     name: "home",
//     active: "https://img.icons8.com/fluency-systems-filled/344/home.png",
//     inActive: "https://img.icons8.com/fluency-systems-regular/344/home.png",
//   },
//   {
//     name: "search",
//     active: "https://cdn-icons-png.flaticon.com/512/54/54715.png",
//     inActive: "https://img.icons8.com/ios/344/search--v1.png",
//   },
//   {
//     name: "video",
//     active: "https://img.icons8.com/pastel-glyph/344/clapperboard--v1.png",
//     inActive: "https://img.icons8.com/pastel-glyph/344/clapperboard--v2.png",
//   },
//   {
//     name: "shopping-bag",
//     active: "https://img.icons8.com/ios-filled/344/shopping-bag.png",
//     inActive: "https://img.icons8.com/ios/344/shopping-bag--v1.png",
//   },
// ];

// const BottomTabs = ({ icons }) => {
//   const [activeTab, setActiveTab] = useState("Home");
//   const Icon = ({ icon }) => {
//     return (
//       <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
//         <Image source={{ uri: icon.inActive }} style={styles.icon} />
//       </TouchableOpacity>
//     );
//   };
//   return (
//     <View style={styles.container}>
//       {icons.map((icon, index) => (
//         <Icon key={index} icon={icon} />
//       ))}
//     </View>
//   );
// };

// export default BottomTabs;

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//   },
//   icon: {
//     width: 30,
//     height: 30,
//   },
// });
