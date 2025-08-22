import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { createClient, Photos, Videos } from 'pexels';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Dimensions, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView, State } from 'react-native-gesture-handler';
import ListItem from '../../components/ListItem';

const screenHeight = Dimensions.get('window').height;

function FullScreenMediaView() {
  const route = useRoute<RouteProp<{ params: { currentMediaItem: any,mediaItems: any[] ,initialPage: number} }, 'params'>>();
  const { currentMediaItem, initialPage,mediaItems } = route.params;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const navigation = useNavigation();
  const client = createClient('M9Moel9GsArJamlr5r9jreQwZm4Z8EZRyIRAN29lEs1UszjOfZrklVAy');
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [mediaList, setMediaList] = useState<any[]>(mediaItems);
  const [loading, setLoading] = useState(false);

  const scale = useRef(new Animated.Value(1)).current; 
  const scaleValue = useRef(1);

  useEffect(() => {
    const initialIndex = mediaItems.findIndex((item: any) => item.id.toString() === currentMediaItem.id.toString());
    setCurrentIndex(initialIndex);

  }, [mediaItems, currentPage, client.collections,currentMediaItem.id]);

  useEffect(() => {
    const listenerId = scale.addListener(({ value }) => {
      scaleValue.current = value;
    });
    return () => {
      scale.removeListener(listenerId);
    };
  }, [scale]);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const onPinchEvent = Animated.event(
    [{ nativeEvent: { scale: scale } }],
    { useNativeDriver: true }
  );

  const onPinchStateChange = (event: any) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleViewableItemsChanged = ({ viewableItems }: any) => {
    
  };


  const fetchMedia = useCallback(async (pageNum: number) => {
    setLoading(true);
    try {
      const response = await client.collections.media({ id: "vog4mjt", per_page: 5, page: pageNum });
      if ('media' in response) {
        setMediaList((prevMedia) => [...prevMedia, ...(response.media as unknown as (Photos | Videos)[])]);
      } else {
        console.error('Error fetching photos:', response);
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  }, [client]);


  useEffect(() => {
    if(!loading){
      fetchMedia(currentPage);
    }
  }, [currentPage, loading, fetchMedia]);

  const handleLoadMore = () => {
    console.log('handleLoadMore');
    if (!loading) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        hitSlop={20}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <FlatList
        data={mediaList}
        initialScrollIndex={currentIndex}
        renderItem={({ item }) => (
          <ListItem
            item={item}
            isVideoLoaded={isVideoLoaded}
            handleVideoLoad={handleVideoLoad}
            currentIndex={currentIndex}
            mediaList={mediaList}
            scale={scale}
            onPinchEvent={onPinchEvent}
            onPinchStateChange={onPinchStateChange}
          />
        )}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        pagingEnabled
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        getItemLayout={(data, index) => ({
          length: screenHeight,
          offset: screenHeight * index,
          index,
        })}
        onScrollToIndexFailed={(info) => {
          console.warn('Scroll to index failed:', info);
          setTimeout(() => {
            // flatListRef.current?.scrollToIndex({ index: info.index, animated: true }); 
          }, 500);
        }}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
      />
    </GestureHandlerRootView>
  );
}

export default FullScreenMediaView;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 10,
    zIndex: 1,
  },
  mediaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  
  },
    });