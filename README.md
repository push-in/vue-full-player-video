# vue-full-player-video

It's a simple player of video with vue, base controls and playlist

# install

npm i --save vue-full-player-video



### Example to use
```
<template>
  <div id="app">
    <FullPlayer
      :src="src"
      width="80%"
      @onPlayPause="onPlayPause"
      @muted="muted"
      @onChangeVolume="onChangeVolume"
      @onEnded="onEnded"
    />

    <div>
      <button @click="setPlay">Test Video</button>
      <button @click="setArray">Test Video Playlist</button>
    </div>

    
  </div>
</template>

<script>
import FullPlayer from 'vue-full-player-video'
export default {
  name: 'App',
  components: {
    FullPlayer
  },
  data: () => {
    return {
      src: null
    }
  },
  methods: {
    setArray () {
      this.src = [
        {
          title: 'GOKU SOLA',
          src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          poster: "https://coolthemestores.com/wp-content/uploads/2020/11/naruto-features.jpg"
        },

        {
          title: 'TEST',
          src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          poster: 'https://i.pinimg.com/originals/db/f4/af/dbf4af88edfe3d1b13c517aa0a933305.jpg'
        }
      ]
    },
    setPlay () {
      this.src = {
        src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        title: 'GOKU SOLA',
        poster: 'https://coolthemestores.com/wp-content/uploads/2020/11/naruto-features.jpg'
      }
    },

    onPlayPause (event) {
      console.log(event)
    },

    muted (event) {
      console.log(event)
    },

    onChangeVolume (event) {
      console.log(event)
    },

    onEnded (event) {
      console.log(event)
    }
  }
}
</script>


```



## Props

| Name | Type | Default | Example
| --- | --- | --- | --- |
| src | array or object |  |
| width | string | null | "50%" or "300px"


## Events

| Name | Return |
| --- | --- |
| onPlayPause | "played" or "paused" |
| muted | true or false |
| onChangeVolume | number of volume. min 0 and max 10 |
| onEnded | true |


## Future resources

Auto next video

Do you have any more ideas? open a PR :)