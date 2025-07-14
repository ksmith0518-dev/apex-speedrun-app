import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useThemeContext } from '../context/ThemeContext';
import MapView, { Marker } from 'react-native-maps';
import YouTubeVideoPlayer from '../components/YouTubeVideoPlayer';

const screenWidth = Dimensions.get('window').width;

const darkMapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
  { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#38414e' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#17263c' }] }
];

const CourseDetailScreen = ({ route, navigation }) => {
  const { isDark } = useThemeContext();
  const course = route.params?.course;

  const textColor = isDark ? '#ffffff' : '#000000';
  const backgroundColor = isDark ? '#121212' : '#ffffff';

  const themedStyles = {
    label: [styles.label, { color: textColor }],
    value: [styles.value, { color: textColor }],
    centeredText: [styles.centeredText, { color: textColor }]
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: course?.name || 'Course Details',
      headerTitleAlign: 'center'
    });
  }, [navigation, course]);

  if (!course) {
    return (
      <View style={[styles.container, { backgroundColor }]}>
        <Text style={[styles.title, { color: textColor }]}>No course data provided.</Text>
      </View>
    );
  }

  const {
    id, rating, type, city, state, country,
    topMale, topFemale,
    timeDiffSeconds, timeDiffPercent,
    lengthMeters, avgSpeed,
    location, dateSet, accepted, setters,
    youtubeIds = []
  } = course;

  const lat = location?.latitude || 0;
  const lon = location?.longitude || 0;

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      {youtubeIds.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalVideoList}
        >
          {youtubeIds.map((id, index) => (
            <View
              key={index}
              style={[
                styles.horizontalVideoItem,
                index === youtubeIds.length - 1 && { marginRight: 0 }
    ]}
            >
            <YouTubeVideoPlayer videoId={id} />
          </View>
))}

  </ScrollView>
)}

      <View style={styles.centeredBlock}>
        <Text style={themedStyles.centeredText}>Coordinates:</Text>
        <Text style={themedStyles.centeredText}>{lat}, {lon}</Text>

        <Text style={themedStyles.centeredText}>Course ID:</Text>
        <Text style={themedStyles.centeredText}>{id}</Text>

        <Text style={themedStyles.centeredText}>Rating:</Text>
        <Text style={themedStyles.centeredText}>{rating}</Text>

        <Text style={themedStyles.centeredText}>Type:</Text>
        <Text style={themedStyles.centeredText}>{type}</Text>

        <Text style={themedStyles.centeredText}>Location:</Text>
        <Text style={themedStyles.centeredText}>{city}, {state}, {country}</Text>

        <MapView
          style={styles.map}
          initialRegion={{
            latitude: lat,
            longitude: lon,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
          }}
          customMapStyle={isDark ? darkMapStyle : []}
        >
          <Marker coordinate={{ latitude: lat, longitude: lon }} />
        </MapView>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={themedStyles.label}>Top Male:</Text>
          <Text style={themedStyles.value}>{topMale?.name}</Text>
          <Text style={themedStyles.value}>{topMale?.time}s</Text>
          <Text style={themedStyles.value}>{topMale?.date}</Text>
        </View>
        <View style={styles.column}>
          <Text style={themedStyles.label}>Top Female:</Text>
          <Text style={themedStyles.value}>{topFemale?.name}</Text>
          <Text style={themedStyles.value}>{topFemale?.time}s</Text>
          <Text style={themedStyles.value}>{topFemale?.date}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={themedStyles.label}>± Deviation:</Text>
          <Text style={themedStyles.value}>{timeDiffSeconds}s ({timeDiffPercent}%)</Text>

          <Text style={themedStyles.label}>Length:</Text>
          <Text style={themedStyles.value}>{lengthMeters} meters</Text>
        </View>
        <View style={styles.column}>
          <Text style={themedStyles.label}>Avg. Speed:</Text>
          <Text style={themedStyles.value}>{avgSpeed} m/s</Text>

          <Text style={themedStyles.label}>Date Set:</Text>
          <Text style={themedStyles.value}>{dateSet}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={themedStyles.label}>Accepted:</Text>
          <Text style={themedStyles.value}>{accepted ? 'Yes' : 'No'}</Text>
        </View>
        <View style={styles.column}>
          <Text style={themedStyles.label}>Setters:</Text>
          <Text style={themedStyles.value}>{setters?.join(', ')}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  verticalVideoList: {
    alignItems: 'center',
    marginVertical: 10
  },
  videoItem: {
    marginVertical: 24 // controls vertical spacing between each video
  },
  horizontalVideoList: {
    paddingHorizontal: 10,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  horizontalVideoItem: {
    marginRight: 16
  },
  centeredBlock: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20
  },
  map: {
    width: screenWidth * 0.9,
    height: 200,
    borderRadius: 10,
    marginTop: 15
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 20
  },
  column: {
    width: '48%'
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 2
  },
  value: {
    fontSize: 16,
    marginBottom: 8
  },
  centeredText: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 8
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40
  }
});

export default CourseDetailScreen;
