/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StatusBar } from 'react-native';

import { Provider } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Posts from './screens/Posts';
import SinglePost from './screens/SinglePost';

import store from './store';

import { useOnMount } from './hooks';
import { loadUserData } from './actions/user';

const NavigationStack = createStackNavigator();

const App = () => {
  // fetch user data at the start of app lifecycle
  useOnMount(() => {
    store.dispatch(loadUserData(1));
  });

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Provider store={store}>
        <NavigationContainer>
          <NavigationStack.Navigator initialRouteName="Posts">
            <NavigationStack.Screen
              name="Posts"
              component={Posts}
              options={{ title: '' }}
            />
            <NavigationStack.Screen name="SinglePost" component={SinglePost} />
          </NavigationStack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
};

export default App;
