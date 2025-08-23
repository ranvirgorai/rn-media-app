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
  - Seamless zoom and swipe gestures  
  - Smart video auto-play  
- Demo video attached for reference.  

### Challenges Faced  

1. **Detecting media items in view**  
   - Implementing logic to determine which item is currently in the center of the viewport was challenging.  
   - Ensuring only the centered video auto-plays while stopping others required careful event handling and optimization.  

2. **Optimizing network calls in Detail View**  
   - When navigating to the media detail page, avoiding redundant API requests was important.  
   - We optimized by reusing existing data from the landing page, which reduced network overhead and improved responsiveness.  

3. **Smooth video playback & resource management**  
   - Managing video playback across multiple components while maintaining smooth scrolling was tricky.  
   - Ensured only one video plays at a time and handled memory, resource cleanup to avoid performance and stability issues.  

---

### Setup and Running the app  
```bash
# Clone the repository
git clone git@github.com:ranvirgorai/rn-media-app.git

# Navigate into the project directory
cd rn-media-app

# Install dependencies
npm install

# Install dependencies
npm run ios