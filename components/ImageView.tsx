import CachedImage from 'expo-cached-image';
import React, { useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface ImageViewProps {
  item: any;
  scale: any;
  onPinchEvent: any;
  onPinchStateChange: any;
}

const ImageView: React.FC<ImageViewProps> = ({ item, scale, onPinchEvent, onPinchStateChange }) => {
  const doubleTapRef = useRef(null);
  const scaleValue = useRef(new Animated.Value(1)); // Initialize as Animated.Value
  const screenWidth = Dimensions.get('window').width;
  const [isZoomed, setIsZoomed] = useState(false);

  const handleDoubleTap = () => {
    const newZoomState = !isZoomed;
    setIsZoomed(newZoomState);
    const targetScale = newZoomState ? 2 : 1;
    Animated.spring(scaleValue.current, {
      toValue: targetScale,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TapGestureHandler
      ref={doubleTapRef}
      numberOfTaps={2}
      onActivated={handleDoubleTap}>
        <Animated.View 
        style={[styles.image, { width: screenWidth, transform: [{ scale: scaleValue.current }] }]}
        >
      <CachedImage
        source={{ uri: item.src.original }}
        cacheKey={item.id.toString()}
        resizeMode="contain"
        style={[styles.image, { width: screenWidth,  }]}
      />
      </Animated.View>
    </TapGestureHandler>
  );
};

export default ImageView;
