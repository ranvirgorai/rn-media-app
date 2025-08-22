import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import ImageView from './ImageView';
import VideoPlayer from './VideoPlayer';

const screenHeight = Dimensions.get('window').height;



interface ListItemProps {
  item: any;
  isVideoLoaded: boolean;
  handleVideoLoad: () => void;
  currentIndex: number;
  mediaList: any[];
  scale: any;
  onPinchEvent: any;
  onPinchStateChange: any;
}

const ListItem: React.FC<ListItemProps> = ({ item, isVideoLoaded, handleVideoLoad, currentIndex, mediaList, scale, onPinchEvent, onPinchStateChange }) => {
  return (
    <View style={[styles.mediaContainer, { height: screenHeight }]}>  {/* Set card height to screen height */}
      {item.video_files?(<VideoPlayer
          item={item}
          isVideoLoaded={isVideoLoaded}
          handleVideoLoad={handleVideoLoad}
          currentIndex={currentIndex}
          mediaList={mediaList}
        />):(<ImageView
          item={item}
          scale={scale}
          onPinchEvent={onPinchEvent}
          onPinchStateChange={onPinchStateChange}
        />)}</View>
  );
};

const styles = StyleSheet.create({
  mediaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListItem;

