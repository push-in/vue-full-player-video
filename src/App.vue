<template>
  <div id="app">
    <FullPlayer
      :src="src"
      width="80%"
      title="Testando título"
    />


    <button @click="setPlay">TESTE 1</button>

    <button @click="setArray">TESTE ARRAY</button>


    {{ src }}
  </div>
</template>

<script>
import FullPlayer from './components/FullPlayer.vue'

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
          title: 'TESTE MANEIRO',
          src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          poster: "https://coolthemestores.com/wp-content/uploads/2020/11/naruto-features.jpg"
        },

        {
          title: 'TESTE SUPREMOOO',
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
    }
  }
}
</script>
