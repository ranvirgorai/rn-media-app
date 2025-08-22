import { Dimensions } from 'react-native';

const calculateAspectRatio = (width: number, height: number) => {
  const aspectRatio = width / height;
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const screenAspectRatio = screenWidth / screenHeight;

  if (aspectRatio > screenAspectRatio) {
    // Content is wider than screen, adjust height
    const adjustedHeight = screenWidth / aspectRatio;
    return { width: screenWidth, height: adjustedHeight };
  } else {
    // Content is taller than screen, adjust width
    const adjustedWidth = screenHeight * aspectRatio;
    return { width: adjustedWidth, height: screenHeight };
  }
};

export default calculateAspectRatio;
