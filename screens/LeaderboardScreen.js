import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const dummyLeaderboard = [
  { id: '1', username: 'RunnerOne', time: '1:05' },
  { id: '2', username: 'FastCat', time: '1:12' },
];

export default function LeaderboardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Leaderboard</Text>
      <FlatList
        data={dummyLeaderboard}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.entry}>
            <Text style={styles.rank}>{index + 1}</Text>
            <View>
              <Text style={styles.username}>{item.username}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  header: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  entry: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8
  },
  rank: { fontSize: 16, width: 30, fontWeight: 'bold' },
  username: { fontSize: 16 },
  time: { fontSize: 12, color: 'gray' }
});
