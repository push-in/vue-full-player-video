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

    <div id="buttons">
      <button @click="setPlay">Test Video</button>
      <button @click="setArray">Test Video Playlist</button>
    </div>

    
    <json-viewer 
      :value="src"
      :expanded="true"  
    ></json-viewer>
    
  </div>
</template>

<script>
import FullPlayer from './components/FullPlayer.vue'
import JsonViewer from 'vue-json-viewer'
export default {
  name: 'App',
  components: {
    FullPlayer,
    JsonViewer
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

<style scoped>
#buttons {
  margin-top: 30px;
}
</style>