# Media App (React Native)

## 🚀 Features  

### Landing Page  
- Displays media items in **card format**.  
- Each card includes:  
  - Media thumbnail (image or video)  
  - Alt text  
  - Photographer’s name  

### Media Thumbnails  
- Images and videos are rendered as thumbnails.  
- Video-specific features:  
  - **Play icon overlay** on thumbnail  
  - **Auto-play** when the video is scrolled into the center of the screen  
  - **Auto-stop** when scrolled out of view  
  - **Manual play** via play button (only one video plays at a time)  

### Detail View  
- Tap on an image or video to open in detail view.  
- Gestures supported:  
  - **Double tap** → Zoom in/out (for images)  
  - **Swipe up/down** → Navigate to next/previous media item  
- Videos auto-play in detail view when visible and stop when swiped away.  

### Media Handling  
- Initially loads **5 media items**.  
- **Infinite scrolling**: loads additional content as the user scrolls.  

### Experience Reference  
- Designed for a **smooth, immersive experience**:  
  - Easy browsing  
  - Seamless zoom and swipe gestures  
  - Smart video auto-play  
- Demo video attached for reference.  

---

## Getting Started  

### Prerequisites  
- Node.js  
- React Native CLI

### Installation  
```bash
# Clone the repository
git clone git@github.com:ranvirgorai/rn-media-app.git

# Navigate into the project directory
cd rn-media-app

# Install dependencies
npm install

# Install dependencies
npm run ios