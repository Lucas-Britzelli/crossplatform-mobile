import { ListItem } from "@rneui/themed";
import { View, Text, FlatList, Button } from "react-native";

import { useGetUsersQuery } from "../../store/api/usersApi";

const renderItem = ({ item }, navigation) => (
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
  </ListItem>
);

const UserList = ({ navigation }) => {
  const { data, isLoading } = useGetUsersQuery({});
  console.log("data: ", data);
  return (
    <View>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => renderItem({ item }, navigation)}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

export default UserList;
