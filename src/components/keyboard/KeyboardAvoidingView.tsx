import {Platform, ScrollView, StyleSheet, ViewStyle} from 'react-native';
import React, {useMemo} from 'react';

type KeyboardAvoidingViewProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

const KeyboardAvoidingView: React.FC<KeyboardAvoidingViewProps> = props => {
  const style = useMemo(() => {
    return {
      ...props.style,
      flexGrow: 1,
      flex: Platform.OS == 'android' ? undefined : props.style?.flex,
    };
  }, [props.style]);

  return (
    <ScrollView
      alwaysBounceVertical={false}
      contentContainerStyle={style}
      keyboardShouldPersistTaps="handled">
      {props.children}
    </ScrollView>
  );
};

export default KeyboardAvoidingView;

const styles = StyleSheet.create({});
