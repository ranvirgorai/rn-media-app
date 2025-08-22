import { ResizeMode, Video } from 'expo-av';
import React from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';

interface VideoPlayerProps {
  item: any;
  isVideoLoaded: boolean;
  handleVideoLoad: () => void;
  currentIndex: number;
  mediaList: any[];
}

const styles = StyleSheet.create({
  video: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const VideoPlayer: React.FC<VideoPlayerProps> = ({ item, isVideoLoaded, handleVideoLoad, currentIndex, mediaList }) => {
  const screenWidth = Dimensions.get('window').width;
  return (
    <>
      {!isVideoLoaded && (
        <Image
          source={{ uri: item.image }}
          style={[styles.video, { width: screenWidth}]}
        />
      )}
      <Video
        source={{ uri: item.video_files[0].link }}
        style={[styles.video, { width: screenWidth}]}
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay={currentIndex === mediaList.indexOf(item)}
        onLoad={handleVideoLoad}
      />
    </>
  );
};

export default VideoPlayer;
