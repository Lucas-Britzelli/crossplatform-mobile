import { useRoute, RouteProp } from "@react-navigation/native";
import { Input, Button } from "@rneui/themed";
import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useToast } from "react-native-toast-notifications";

import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from "../../store/api/usersApi";
type UserFormRouteParams = {
  user: {
    id: string;
    firstName: string;
    lastName: string;
  };
};

export const UserForm = (props) => {
  const { navigation } = props;
  const lastNameRef = useRef(null);

  const { t } = useTranslation();
  const route =
    useRoute<RouteProp<Record<string, UserFormRouteParams>, "UserForm">>();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [createUser, { isLoading }] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const isEditing = route.params?.user;
  const toast = useToast();
  const user = route.params?.user;
  useEffect(() => {
    if (isEditing) {
      setFirstName(route.params?.user.firstName || "");
      setLastName(route.params?.user.lastName || "");
    }
  }, [route.params?.user]);

  const handleSubmit = () => {
    console.log("firstName: ", firstName);
    console.log("lastName: ", lastName);

    if (firstName === "" || lastName === "") {
      // show toast, must fill all inputs
      console.log("Invalid form!");
      toast.show("Please fill out all inputs", {
        type: "warning",
        placement: "top",
        duration: 4000,
        animationType: "slide-in",
      });
      return;
    }

    if (isEditing) {
      console.log(user);
      updateUser({
        user: { id: user.id, firstName, lastName },
      })
        .then(() => {
          navigation.navigate("UserList");
          toast.show(`Användaren ${firstName} ${lastName} har uppdaterats!`, {
            type: "success",
            placement: "top",
            duration: 4000,
            animationType: "slide-in",
          });
          setFirstName("");
          setLastName("");
        })
        .catch((error) => {
          toast.show(error, { type: "danger" });
        });
    } else {
      createUser({
        user: {
          firstName,
          lastName,
        },
      })
        .then(() => {
          navigation.navigate("UserList");
          toast.show(`Användaren ${firstName} ${lastName} har skapats!`, {
            type: "success",
            placement: "top",
            duration: 4000,
            animationType: "slide-in",
          });
          setFirstName("");
          setLastName("");
        })
        .catch((error) => {
          toast.show(error, { type: "danger" });
        });
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.parentContainer}>
        <View style={styles.container}>
          <Text>Create your user</Text>
          <Input
            returnKeyType="next"
            onSubmitEditing={() => lastNameRef.current.focus()}
            blurOnSubmit={false}
            value={firstName}
            disabled={isLoading}
            onChangeText={(text) => setFirstName(text)}
            placeholder="First name"
          />
          <Input
            ref={lastNameRef}
            value={lastName}
            disabled={isLoading}
            returnKeyType="send"
            onSubmitEditing={() => handleSubmit()}
            onChangeText={(text) => setLastName(text)}
            placeholder="Last name"
          />
          <Button
            title={t("createUser")}
            disabled={isLoading}
            loading={isLoading}
            onPress={() => handleSubmit()}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
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
    alignItems: "center",
  },
});
