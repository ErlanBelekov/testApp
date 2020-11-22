import React, { useEffect, useReducer } from 'react';
import {
  Pressable,
  Image,
  ActivityIndicator,
  SafeAreaView,
  SectionList,
  Alert,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import trashIcon from '../../images/trashIcon.png';

import Text from '../../components/Text';
import ListItemWrapper from '../../components/ListItemWrapper';

import { fetchCommentsForPost } from '../../api/comments';

import { setUserPosts } from '../../actions/posts';

import { commentReducer, commentInitialState } from './commentState';
import {
  BEGIN_LOADING_COMMENTS,
  SUCCESS_LOADING_COMMENTS,
  ERROR_LOADING_COMMENTS,
} from './actionTypes';

const SinglePost = ({ navigation, route: { params = {} } }) => {
  const { title, body, id: postID } = params;

  const [commentsState, commentsDispatch] = useReducer(
    commentReducer,
    commentInitialState,
  );

  const sections = [
    {
      title: 'postBody',
      data: [{ id: postID, body }],
    },
    {
      title: 'comments',
      data: commentsState.comments,
    },
  ];

  const { posts } = useSelector(({ user }) => ({
    posts: user.posts,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    if (title) {
      navigation.setOptions({
        title,
        headerRight: () => {
          return (
            <Pressable
              onPress={() => {
                Alert.alert(
                  'Delete Item?',
                  'This action is very serious, please think about it.',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => {},
                      style: 'cancel',
                    },
                    {
                      text: 'OK',
                      onPress: () => {
                        const updatedPosts = posts.filter(
                          (post) => post.id !== postID,
                        );
                        dispatch(setUserPosts(updatedPosts));
                        navigation.goBack();
                      },
                    },
                  ],
                );
              }}>
              <Image source={trashIcon} style={{ tintColor: 'red' }} />
            </Pressable>
          );
        },
      });
    }
  }, [title, navigation, posts, dispatch, postID]);

  useEffect(() => {
    async function loadComments() {
      commentsDispatch({
        type: BEGIN_LOADING_COMMENTS,
      });
      setTimeout(async () => {
        const comments = await fetchCommentsForPost(postID);

        if (comments instanceof Error) {
          commentsDispatch({
            type: ERROR_LOADING_COMMENTS,
            payload: comments.message,
          });
          return;
        }

        commentsDispatch({
          type: SUCCESS_LOADING_COMMENTS,
          payload: comments,
        });
      }, 2000);
    }

    if (postID) {
      loadComments();
    }
  }, [postID]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SectionList
        sections={sections}
        renderSectionHeader={({ section }) => {
          if (section.title === 'comments') {
            return (
              <Text mx={8} fontSize={40} mt={40}>
                Comments:
              </Text>
            );
          }
          return <></>;
        }}
        renderItem={({ item, section: { title } }) => {
          if (title === 'postBody') {
            return (
              <Text fontSize={35} fontWeight="bold" mx={8} numberOfLines={0}>
                {item.body}
              </Text>
            );
          }
          return (
            <ListItemWrapper>
              <Text fontWeight="700" fontSize={20}>
                {item.name}
              </Text>
              <Text fontWeight="500">{item.body}</Text>
            </ListItemWrapper>
          );
        }}
        keyExtractor={(item, index) => `${item.id ? item.id : item.id}`}
        ListFooterComponent={() => {
          if (commentsState.isLoading) {
            return <ActivityIndicator size="large" />;
          }
          return commentsState.errorMsg ? (
            <Text>{commentsState.errorMsg}</Text>
          ) : (
            <></>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default SinglePost;
