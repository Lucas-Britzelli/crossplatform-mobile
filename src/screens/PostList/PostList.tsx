import React from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";

import {
  useGetPostsQuery,
  useDeletePostMutation,
} from "../../store/api/postsApi";

const PostList = ({ navigation }) => {
  const { data, error, isLoading } = useGetPostsQuery({});
  console.log({ data, error, isLoading });
  const [deletePost] = useDeletePostMutation();

  const handleDelete = (id) => {
    deletePost(id);
  };

  const renderItem = ({ item }) => {
    console.log({ item });
    return (
      <View style={styles.container}>
        <Text style={styles.username}>{item.createdBy}</Text>
        <Text style={styles.date}>{item.createdDate}</Text>
        <Text>{item.text}</Text>
        <Button title="Delete" onPress={() => handleDelete(item.id)} />
      </View>
    );
  };
  const styles = StyleSheet.create({
    parentContainer: {
      flex: 1,
      backgroundColor: "white",
      // margin: 36,
      // marginTop: 84,
      // border: 1px solid black
      borderColor: "#eee",
      borderWidth: 1,
      borderRadius: 16,
    },
    container: {
      flex: 1,
      padding: 16,
    },
    username: {
      fontWeight: "bold",
      fontSize: 24,
      marignTop: 4,
    },
    date: {
      fontWeight: "400",
      fontSize: 16,
      marginBottom: 8,
      marginTop: 8,
    },
  });
  return (
    <View>
      {isLoading && <Text>Loading...</Text>}
      {error && <Text>Error loading posts</Text>}
      {data && data.length === 0 && <Text>No posts available</Text>}
      {data && data.length > 0 && (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

export default PostList;
