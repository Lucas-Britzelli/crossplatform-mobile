import { ListItem } from "@rneui/themed";
import { View, Text, FlatList, Button } from "react-native";

import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../store/api/usersApi";

const UserList = ({ navigation }) => {
  const { data, isLoading } = useGetUsersQuery({});
  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = (itemId) => {
    deleteUser({ id: itemId });
  };

  const renderItem = ({ item }) => (
    <ListItem
      key={item.id}
      onPress={() => {
        navigation.navigate("UserInfo", { user: item });
      }}
    >
      <ListItem.Content>
        <ListItem.Title>{`${item.firstName} ${item.lastName}`}</ListItem.Title>
      </ListItem.Content>
      <Button
        title="edit"
        onPress={() => navigation.navigate("UserForm", { user: item })}
      />
      <Button title="delete" onPress={() => handleDelete(item.id)} />
    </ListItem>
  );

  return (
    <View>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

export default UserList;
