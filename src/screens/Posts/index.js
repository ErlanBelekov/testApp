import React, { useEffect } from 'react';
import { SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// import { fetchPostsOfUser } from '../../api/posts';
import { loadUserPosts } from '../../actions/posts';
import Text from '../../components/Text';
import ListItemWrapper from '../../components/ListItemWrapper';

const Posts = ({ navigation }) => {
  const dispatch = useDispatch();

  const {
    name,
    userID,
    posts,
    isLoadingUserPosts,
    userPostsLoadError,
  } = useSelector(({ user }) => ({
    name: user.name,
    userID: user.id,
    posts: user.posts,
    isLoadingUserPosts: user.isLoadingUserPosts,
    userPostsLoadError: user.userPostsLoadError,
  }));

  useEffect(() => {
    name && navigation.setOptions({ title: name });
  }, [name, navigation]);

  useEffect(() => {
    async function onMount() {
      dispatch(loadUserPosts(userID));
    }

    if (userID) {
      onMount();
    }
  }, [userID, dispatch]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <ListItemWrapper
            onPress={() => navigation.push('SinglePost', { ...item })}>
            <Text fontWeight="bold">{item.title}</Text>
          </ListItemWrapper>
        )}
        ListEmptyComponent={() => {
          if (isLoadingUserPosts) {
            return <ActivityIndicator size="large" />;
          }
          if (userPostsLoadError) {
            return <Text>{userPostsLoadError}</Text>;
          }
          return <></>;
        }}
        keyExtractor={(item, index) => `${item.id}`}
      />
    </SafeAreaView>
  );
};

export default Posts;
