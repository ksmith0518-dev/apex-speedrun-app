import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const { width } = Dimensions.get('window');

// 9:16 aspect ratio (portrait) with padding around the video
const VIDEO_WIDTH = width * 0.9;
const VIDEO_HEIGHT = (VIDEO_WIDTH / 9) * 16;

const YouTubeVideoPlayer = ({ videoId }) => {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          html, body {
            margin: 0;
            padding: 0;
            background-color: black;
            height: 100%;
            overflow: hidden;
          }
          iframe {
            width: 100%;
            height: 100%;
            border: none;
          }
        </style>
      </head>
      <body>
        <iframe
          src="https://www.youtube.com/embed/${videoId}?modestbranding=1&controls=1&rel=0&playsinline=1"
          allow="autoplay; encrypted-media"
          allowfullscreen
        ></iframe>
      </body>
    </html>
  `;

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <WebView
          source={{ html }}
          originWhitelist={['*']}
          javaScriptEnabled
          allowsFullscreenVideo
          allowsInlineMediaPlayback
          scrollEnabled={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginVertical: 16, // space between videos
  },
  container: {
    width: VIDEO_WIDTH,
    height: VIDEO_HEIGHT,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'black',
    elevation: 4, // subtle shadow (Android)
    shadowColor: '#000', // subtle shadow (iOS)
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
});

export default YouTubeVideoPlayer;
