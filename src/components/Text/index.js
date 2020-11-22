import React from 'react';
import { Text as RNText } from 'react-native';

// const styles = StyleSheet.create({
// });

const Text = ({
  numberOfLines = 2,
  fontSize = 16,
  fontWeight = 'normal',
  textAlign = 'auto',
  mx = 0,
  mt = 0,
  mb = 0,
  children,
}) => {
  return (
    <RNText
      style={{
        fontSize,
        fontWeight,
        textAlign,
        marginHorizontal: mx,
        marginTop: mt,
        marginBottom: mb,
      }}
      numberOfLines={numberOfLines}>
      {children}
    </RNText>
  );
};

export default Text;
