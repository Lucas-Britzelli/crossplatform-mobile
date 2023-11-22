import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ToastProvider } from "react-native-toast-notifications";
import { Provider, useSelector } from "react-redux";

import PostForm from "./src/screens/PostForm/PostForm";
import PostList from "./src/screens/PostList/PostList";
import { UserForm } from "./src/screens/UserForm/UserForm";
import { UserInfo } from "./src/screens/UserInfo/UserInfo";
import UserList from "./src/screens/UserList/UserList";
import { store } from "./src/store/store";

const UserListStack = createNativeStackNavigator();
const UserListStackScreen = () => {
  return (
    <UserListStack.Navigator>
      <UserListStack.Screen name="UserList" component={UserList} />
      <UserListStack.Screen name="UserInfo" component={UserInfo} />
      <UserListStack.Screen name="UserForm" component={UserForm} />
      <UserListStack.Screen name="UserPosts" component={PostList} />
    </UserListStack.Navigator>
  );
};
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type UserListStackScreen = {
  UserList: undefined;
};

const Tab = createBottomTabNavigator();

const NavigationWrapper = () => {
  const loggedInAs = useSelector((state: any) => state.auth.loggedInAs);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="UserListStack"
          component={UserListStackScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="PostList" component={PostList} />
        {loggedInAs && <Tab.Screen name="PostForm" component={PostForm} />}
        {loggedInAs && <Tab.Screen name="UserForm" component={UserForm} />}
        {loggedInAs && (
          <Tab.Screen
            name="UserInfo"
            component={UserInfo}
            options={{
              title: `${loggedInAs.firstName} ${loggedInAs.lastName}`,
            }}
          />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <ToastProvider>
      <Provider store={store}>
        <NavigationWrapper />
      </Provider>
    </ToastProvider>
  );
}
