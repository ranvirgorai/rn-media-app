# Overview

## Landing Page
	•	Displays a list of media items in card format.
	•	Each card includes:
	   •	Media thumbnail (image or video)
	   •	Alt text
	   •	Photographer’s name


## Media Thumbnails
	•	Images and videos are rendered as thumbnails.
	•	For videos:
	   •	A play icon overlay is shown.
	   •	When the video thumbnail scrolls into the center of the screen, it auto plays.
	   •	When it moves out of view, playback stops.
	   •	Tapping the play button allows manual control, but only one video plays at a time (playing a new video stops the previous one).

## Detail View
	•	Tapping on an image or video opens it in detail view.
	•	Gestures supported in detail view:
	•	Double tap → Zoom in/out (for images).
	•	Swipe up or down → Navigate to next/previous media item.
	•	In detail view, videos auto-play when in view and stop when swiped away.


# Media handling
	•	Initially loads 5 media items.
	•	Implements infinite scrolling – when the user reaches the end, more content loads dynamically.

# Experience reference video
	•	A smooth, immersive experience where images and videos are easy to browse, zoom, and play seamlessly.
	•	Video demo attached for reference.



# How to run the app
- Clone the repo
- run ``` npm install ```
- run ``` num run ios ```


# 📱 React Native APP: Media Feed with Full-Screen Swipe Viewer

## 🎯 Objective

Build a performant React Native app that:

1. Displays a **scrollable media feed** (photos + videos from a Pexels collection)
2. On tapping an item, opens a **full-screen media viewer** with **swipe navigation** (up/down)
3. Focuses on **performance**, **media handling**, and **smooth user experience**

---

## 🧱 Requirements

### 1. Media Feed Screen (List)

- Render a list of media thumbnails
    - Render each item in its original aspect ratio; don’t crop
- Each item can be a **photo** or a **video thumbnail**.
- Videos should autoplay when in focus
- On tap, open the selected media in a **full-screen viewer** starting at that media.
- Ensure **smooth scrolling**, **lazy loading**, and **minimal re-renders**.

### 2. Full-Screen Viewer

- Full-screen view with **swipe navigation** (swipe up/down to go to next/previous media) - like tiktok or reels
- Start with the tapped item from the feed.
- **Video Behavior**:
    - Autoplay when the video is in view.
    - Pause/unload when swiped away.
    - Show thumbnail while video is loading.
- **Image Behavior**:
    - Should not be cropped. Maintain aspect ratio. Should span the whole width/height depending on whether it’s landscape/portrait
    - (Optional) Support pinch-to-zoom on images.

### 3. Media Orientation Handling

| Orientation | Behavior |
| --- | --- |
| Portrait | Fill screen (height priority). |
| Landscape | Fit width, maintain aspect ratio (black bars allowed). |

---

## 📹 Sample designs

https://youtube.com/shorts/TC941EhfTeo?feature=share

This is for representation only

## 💾 API Details: Pexels Collection

Use the Pexels API to fetch a **collection** that includes **photos and videos**.

### Endpoint

https://www.pexels.com/api/documentation/?#collections-media

> API key - M9Moel9GsArJamlr5r9jreQwZm4Z8EZRyIRAN29lEs1UszjOfZrklVAy
Collection ID - vog4mjt
> 

### Notes

- Use the **highest** definition version of the media for full screen
- For each video, use the **thumbnail image** for the feed preview.
- Videos are MP4 files hosted on CDN; playback must be optimized.

---

## 🧪 Technical Expectations

| Feature | Description |
| --- | --- |
| Navigation | Use `react-navigation` or modal-based approach. Handle Android back button. |
| Media Preloading | Preload next/previous media (image or video) before swipe transition. |
| Video Player | Use `react-native-video` or equivalent. Manage autoplay, pause, buffering. |
| Image Loader | Use `react-native-fast-image` or similar for caching and performance. |

---

## ⚙️  Bonus Features

- Manual swipe control with gesture handlers (`react-native-gesture-handler` or Reanimated)
- Continuous swipe on fullscreen like reels/tiktok
- Offline caching of first 5 media items
- Auto-retry logic for failed media loads
- As many performance optimizations as possible
    - State the same in the README

---

## 📄 Deliverables

1. GitHub repo with complete code and clear structure using react-native
2. [**README.md**](http://readme.md/) with:
    - Overview of your implementation.
    - Instructions to run the app.
    - Description of media handling and performance techniques.
    - List of challenges you faced while building this.
3. (Optional) Demo video or screen recording of your app in action.

---

## 🤖 Feel free to use AI for coding

---

Export and attach the prompt history in the github repo / walk us through in the call post submission

## 📦 Libraries (Suggested, Not Mandatory)

| Purpose | Suggested Library |
| --- | --- |
| Video Playback | `react-native-video` |
| Image Caching | `react-native-fast-image` |
| Gesture Navigation | `react-native-gesture-handler`, Reanimated |

---

## 🚀 Goal

This assignment is designed to test your ability to handle:

- Complex media interactions,
- Optimized performance under heavy load,
- Clean architectural design,
- And smooth user experience.

We look forward to seeing your approach!


