import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useThemeContext } from '../context/ThemeContext';

const CourseDetailScreen = ({ route }) => {
  const { isDark } = useThemeContext();
  const course = route.params?.course;

  if (!course) {
    return (
      <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#fff' }]}>
        <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>
          No course data provided.
        </Text>
      </View>
    );
  }

  const {
    name, id, rating, type, city, state, country, topMale, topMaleTime,
    topMaleDate, topFemale, topFemaleTime, topFemaleDate, deviationSec,
    deviationPct, lengthM, avgSpeed, location, dateSet, googleMaps, setters
  } = course;

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#121212' : '#fff' }]}>
      <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>{name}</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Course ID:</Text>
        <Text style={styles.value}>{id}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Rating:</Text>
        <Text style={styles.value}>{rating}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Type:</Text>
        <Text style={styles.value}>{type}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Location:</Text>
        <Text style={styles.value}>{`${city}, ${state}, ${country}`}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Top Male:</Text>
        <Text style={styles.value}>{topMale} — {topMaleTime}s on {topMaleDate}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Top Female:</Text>
        <Text style={styles.value}>{topFemale} — {topFemaleTime}s on {topFemaleDate}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>± Deviation:</Text>
        <Text style={styles.value}>{deviationSec}s ({deviationPct}%)</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Length:</Text>
        <Text style={styles.value}>{lengthM} meters</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Avg. Speed:</Text>
        <Text style={styles.value}>{avgSpeed} m/s</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Location Detail:</Text>
        <Text style={styles.value}>{location}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Date Set:</Text>
        <Text style={styles.value}>{dateSet}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Google Maps:</Text>
        <Text style={[styles.value, { color: 'blue' }]}>{googleMaps}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Setters:</Text>
        <Text style={styles.value}>{setters}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15
  },
  section: {
    marginBottom: 12
  },
  label: {
    fontWeight: '600',
    fontSize: 16
  },
  value: {
    fontSize: 16
  }
});

export default CourseDetailScreen;
