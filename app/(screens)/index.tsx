import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ResizeMode, Video } from 'expo-av';
import CachedImage from 'expo-cached-image';
import { createClient, Photos, Videos } from 'pexels';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const client = createClient('M9Moel9GsArJamlr5r9jreQwZm4Z8EZRyIRAN29lEs1UszjOfZrklVAy');

function HomeScreen() {
  const navigation = useNavigation();
  const [media, setMedia] = useState<(Photos | Videos)[]>([]);
  const { width, height } = Dimensions.get('window');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  const handleViewableItemsChanged = ({ viewableItems }: any) => {
    const centeredItem = viewableItems.find((viewableItem: any) => viewableItem.isViewable);
    if (centeredItem) {
      setPlayingVideoId(centeredItem.item.id); // Auto-play the centered video
    }
  };

  const handleMediaItemPress = (item: any) => {
    setPlayingVideoId(null); // Pause all videos
    navigation.navigate('FullScreenMediaView', { currentMediaItem: item,mediaItems: media,initialPage: page });
  };

  const handlePlayButtonPress = (itemId: string) => {
    setPlayingVideoId((prevId) => (prevId === itemId ? null : itemId));
  };

  const fetchMedia = async (pageNum: number) => {
    setLoading(true);
    try {
      const response = await client.collections.media({ id: "vog4mjt", per_page: 5, page: pageNum });
      if ('media' in response) {
        setMedia((prevMedia) => [...prevMedia, ...(response.media as unknown as (Photos | Videos)[])]);
      } else {
        console.error('Error fetching photos:', response);
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia(page);
  }, [page]);

  const handleLoadMore = () => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const renderMediaItem = ({ item }: { item: any }) => {
    const isVideo = 'video_files' in item;
    const isPlaying = item.id === playingVideoId;

    return (
      <TouchableOpacity onPress={() => handleMediaItemPress(item)}>
        <View style={styles.card}>
          {isVideo ? (
            <>
              <Video
                source={{ uri: item.video_files[0].link }}
                style={{ width: '100%', height: width * (item.height / item.width) }}
                resizeMode={ResizeMode.COVER}
                shouldPlay={isPlaying}
                isLooping
              />
              {!isPlaying && (
                <TouchableOpacity style={styles.playButton} onPress={() => handlePlayButtonPress(item.id)}>
                  <Ionicons name="play" size={24} color="white" style={styles.playIcon} />
                </TouchableOpacity>
              )}
            </>
          ) : (
            <CachedImage
              cacheKey={item.id.toString()}
              source={{ uri: item.src.original }}
              style={{ width: '100%', height: width * (item.height / item.width) }}
            />
          )}
          <View style={styles.cardContent}>
            <Text style={styles.title}>{isVideo ? item.user.name : item.photographer}</Text>
            <Text style={styles.description}>{isVideo ? item.user.name : item.photographer} on Pexels</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const RenderLoader = () => {
    return (
      <View style={media.length === 0 ? [styles.loader, { height: height-100 }] : styles.loaderWithContent}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50, 
  };

  return (
    <FlatList
      data={media}
      renderItem={renderMediaItem}
      keyExtractor={(item: any) => ('id' in item ? item.id.toString() : '')}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={loading ? RenderLoader : null}
      showsVerticalScrollIndicator={false}
      onViewableItemsChanged={handleViewableItemsChanged}
      viewabilityConfig={viewabilityConfig} 
      style={styles.flatList}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 10,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardContent: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  playButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    borderRadius: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderWidth: 2,
    padding: 10,
    borderColor: 'white',
  },
  loader: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderWithContent: {
    marginTop: 10,
    marginBottom: 40,
  },
  flatList: {
    paddingTop: 60,
  }
  });

export default HomeScreen;