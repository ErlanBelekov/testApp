import React from 'react';
import { StyleSheet, Pressable } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 8,
    marginVertical: 8,
  },
});

const ListItemWrapper = ({ children, onPress = () => {} }) => {
  return (
    <Pressable style={styles.wrapper} onPress={onPress}>
      {children}
    </Pressable>
  );
};

export default ListItemWrapper;
