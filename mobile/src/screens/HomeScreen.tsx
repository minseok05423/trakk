import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ski Racing Tracker</Text>
      <Button
        title="Start New Run"
        onPress={() => navigation.navigate('LiveRun')}
      />
      <Button
        title="View Past Runs"
        onPress={() => {/* TODO: Show runs list */}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  }
});
