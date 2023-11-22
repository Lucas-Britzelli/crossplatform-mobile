import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import { useCreatePostMutation } from "../../store/api/postsApi";
import { RootState } from "../../store/store"; // Adjust the import path as needed

const PostForm = ({ navigation }) => {
  const loggedInUser = useSelector((state: RootState) => state.auth.loggedInAs);
  const [text, setText] = useState("");
  const [createPost] = useCreatePostMutation();

  const handleSave = () => {
    if (!loggedInUser || text === "") {
      console.log("User not logged in or post text is empty");
      return;
    }
    const createdDate = new Date().toLocaleDateString();
    const createdBy = `${loggedInUser.firstName} ${loggedInUser.lastName}`;

    createPost({ post: { createdBy, text, createdDate } });
    navigation.navigate("PostList");
    console.log(
      "text: ",
      text,
      "createdBy: ",
      createdBy,
      "createdDate: ",
      createdDate,
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          width: "100%",
          marginBottom: 8,
        }}
        value={text}
        onChangeText={setText}
        placeholder="Write your post here"
      />
      <Button title="Save Post" onPress={handleSave} />
    </View>
  );
};
const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: "white",
    margin: 36,
    // marginTop: 84,
    // border: 1px solid black
    borderColor: "#eee",
    borderWidth: 4,
    borderRadius: 16,
  },
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
  },
  button: {
    marginTop: 8,
  },
});

export default PostForm;
