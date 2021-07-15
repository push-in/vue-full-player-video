<template>
    <div 
        id="content-video" 
        ref="contentvideo"
        :style="`width: ${width}`"
        @mousemove="mousemove"
        :class="`${displayControls ? '' : 'hideCursor'}`"
    >
        <transition name="fade">
            <div id="content-title" v-if="srcPlay.title && displayControls">{{ srcPlay.title }}</div>
        </transition>
        <video
            :src="srcPlay.src"
            :controls="false"
            ref="player"
            width="100%"
            @ended="onEnd"
            :poster="srcPlay.poster"
            @click="playPause"
        >
            <div id="content-play"></div>
        </video>

        <transition>
            <div id="content-multiples" v-if="showMultiples">
                <div id="close">
                    <button
                        @click="showMultiples = false"
                        class="content-button"
                    >
                        <img
                            :src="require('./../assets/close.svg')"
                        />
                    </button>
                </div>
                <div 
                    class="item" 
                    v-for="(video, index) in src"
                    :key="index"
                    @click="playArray(index)"    
                >
                    <span>
                        {{ video.title }}
                    </span>
                    <button
                            v-if="paused"
                            class="content-button"
                        >
                        <img
                            :src="require('./../assets/play.svg')"
                        />
                    </button>
                </div>
            </div>
        </transition>

        <transition name="fade">
            <div id="content-controls" v-if="player && displayControls">
                <div id="content-time">
                    <input 
                        type="range"
                        min="0" 
                        :max="duration"
                        step="0.1"
                        v-model="currentTime"
                        id="inputTime"
                        @change="changeTime"
                    >
                </div>
                <div id="controls">
                    <div id="control-left">
                        <button 
                            @click="playPause"
                            v-if="paused"
                            class="content-button"
                        >
                            <img
                                :src="require('./../assets/play.svg')"
                            />
                        </button>

                        <button 
                            @click="playPause"
                            v-else
                            class="content-button"
                        >
                            <img
                                :src="require('./../assets/pause.svg')"
                            />
                        </button>
                        
                        <div id="content-volume">
                            <button 
                                @click="toggleMute"
                                v-if="muted"
                                class="content-button"
                            >
                                <img
                                    :src="require('./../assets/volume_off.svg')"
                                />
                            </button>

                            <button 
                                @click="toggleMute"
                                v-else
                                class="content-button"
                            >
                                <img
                                    :src="require('./../assets/volume_on.svg')"
                                />
                            </button>
                            <div id="content-input-volume">
                                <input
                                    type="range" 
                                    id="inputVolume" 
                                    name="inputVolume" 
                                    min="0" 
                                    max="1"  
                                    step="0.1"
                                    @change="changeVolume"
                                    v-model="volume"
                                >
                            </div>
                        </div>
                        <span id="content-timer-formated">{{ pad_with_zeroes(minutes, 2) }}:{{ pad_with_zeroes(seconds, 2) }}/{{ durationFormated }}</span>
                    </div>

                    <div id="control-right">
                            <button
                                class="content-button"
                                v-if="multiples"
                                @click="onShowMultiples"
                            >
                                <img
                                    :src="require('./../assets/list.svg')"
                                />
                            </button>

                        
                            <button 
                                @click="toggleFullScreen"
                                class="content-button"
                            >
                                <img
                                    :src="require('./../assets/fullscreen_on.svg')"
                                />
                            </button>
                    </div>

                </div>
            </div>
        </transition>


        <transition>
            <div id="content-play" v-if="paused" @click="playPause">
                <img
                    :src="require('./../assets/play_circle.svg')"
                />
            </div>
        </transition>
    </div>
</template>


<script>
    export default {
        name: "full-player",
        components: {
        },
        props: {
            src: {
                required: true
            },
            width: ""
        },
        
        data: () => {
            return {
                multiples: false,
                player: null,
                paused: true,
                currentTime: 0,
                minutes: 0,
                seconds: 0,
                duration: 0,
                durationFormated: 0,
                muted: false,
                volume: 1,
                displayControls: false,
                timeoutDisplay: null,
                showMultiples: false,
                srcPlay: {
                    src: null,
                    title: null,
                    poster: null
                },
                title: null
            }
        },

        mounted() {
            this.player = this.$refs.player
            setInterval(() => {
                this.currentTime = this.player.currentTime
                this.minutes = Math.floor(this.currentTime / 60)
                this.seconds = Math.floor(this.currentTime - (this.minutes / 60) * 60)
            }, 1000)


            let interval = setInterval(() => {
                if(this.player.readyState > 0) {
                    this.durationFormated = this.pad_with_zeroes(parseInt(this.player.duration / 60, 10), 2) + ':' + this.pad_with_zeroes((this.player.duration % 60).toFixed(0), 2)
                    this.duration = this.player.duration
                    clearInterval(interval)
                }
            })



        },

        methods: {
            playPause() {
                if(this.player.paused) {
                    this.player.play()
                    this.paused = false
                } else {
                    this.player.pause()
                    this.paused = true
                }
            },

            toggleMute(){
                this.player.muted = !this.player.muted
                this.muted = this.player.muted
                this.$emit('muted', this.muted)
            },

            changeVolume (event) {
                this.player.volume = this.volume
                this.$emit('onChangeVolume', this.volume)
            },

            changeTime () {
                this.player.currentTime = this.currentTime
            },

            onEnd () {
                this.paused = true
                this.$emit('onEnded', true)
            },

            pad_with_zeroes(number, length) {
                let my_string = '' + number;
                while (my_string.length < length) {
                    my_string = '0' + my_string;
                }
                return my_string
            },

            mousemove () {
                this.displayControls = true
                clearTimeout(this.timeoutDisplay)
                this.timeoutDisplay = setTimeout(() => {
                    this.displayControls = false
                }, 3000)
            },

            toggleFullScreen (event) {
                const elm = this.$refs.contentvideo
                const element = document.body

                const isInFullScreen = (document.fullScreenElement && document.fullScreenElement !== null) ||  (document.mozFullScreen || document.webkitIsFullScreen)

                if (isInFullScreen) {
                    const el = document
                    const requestMethod = el.cancelFullScreen||el.webkitCancelFullScreen||el.mozCancelFullScreen||el.exitFullscreen||el.webkitExitFullscreen
                    if (requestMethod) {
                        requestMethod.call(el);
                    }
                    return
                }

                if (elm.requestFullscreen) {
                    elm.requestFullscreen();
                } else if (elm.webkitRequestFullscreen) { /* Safari */
                    elm.webkitRequestFullscreen();
                } else if (elm.msRequestFullscreen) { /* IE11 */
                    elm.msRequestFullscreen();
                }
            },


            onShowMultiples () {
                this.showMultiples = !this.showMultiples
            },

            playArray(index) {
                this.srcPlay.src = this.src[index].src
                this.srcPlay.title = this.src[index].title
                this.srcPlay.poster = this.src[index].poster
                this.showMultiples = false
                this.paused = true
            }

        },

        watch: {
            src: function () {
                if (Array.isArray(this.src)) {
                    this.multiples = true
                    this.srcPlay.src = this.src[0].src
                    this.srcPlay.title = this.src[0].title
                    this.srcPlay.poster = this.src[0].poster
                    this.paused = true
                    this.player.load()
                } else {
                    this.multiples = false
                    this.srcPlay.src = this.src.src
                    this.srcPlay.title = this.src.title
                    this.srcPlay.poster = this.src.poster
                    this.player.load()
                }
                this.player.pause()
                this.paused = true
            },

            paused: function () {
                this.$emit('onPlayPause', this.paused ? 'paused' : 'played')
            }
        }
    }
</script>


<style scoped>
    #content-video {
        position: relative;
        background-color: #000;
    }

    .hideCursor {
        cursor: none;
    }

    #content-title {
        position: absolute;
        top: 0px;
        width: 100%;
        padding: 10px;
        color: #FFF;
        background-color: rgba(0, 0, 0, 0.7);
        box-sizing: border-box;
        z-index: 1
    }
    #content-play{
        background-color: rgba(0, 0, 0, 0.7);
        position: absolute;
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    #content-play img {
        width: 100px;
    }
    #content-controls {
        position: absolute;
        bottom: 0px;
        width: 100%;
        padding: 10px;
        color: #FFF;
        background-color: rgba(0, 0, 0, 0.7);
        box-sizing: border-box;
        z-index: 1
    }
    #content-controls #controls {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
    }
    #content-controls #control-left {
        display: flex
    }
    #content-controls #control-right {
        display: flex,
    }
    #content-volume {
        position: relative;
        display: inline-block;
    }
    #content-volume #content-input-volume {
        display: none;
        position: absolute;
        z-index: 1;
        top: -70px;
        left: -47px;
    }
    #content-volume:hover #content-input-volume {
        display: block;
    }
    #content-volume #content-input-volume input {
        transform: rotate(-90deg);
    }

    #content-volume #content-input-volume input[type=range] {
        -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
        background: transparent; /* Otherwise white in Chrome */
    }

    #content-volume #content-input-volume input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
    }

    #content-volume #content-input-volume input[type=range]:focus {
        outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
    }

    /*Styling the thumb in Chrome*/
    #content-volume #content-input-volume input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        border: 1px solid #000000;
        height: 16px;
        width: 16px;
        border-radius: 16px;
        background: #ffffff;
        cursor: pointer;
    }


    #content-input-volume input[type=range]::-webkit-slider-runnable-track {
        -webkit-appearance: none;
        appearance: none;
        background: #000;
        cursor: pointer;
        border-radius:30px;
        outline:none;
        box-sizing: border-box;
        border: 0.3px solid #fff;
    }

    #content-input-volume input[type=range]::-moz-range-track { 
        -moz-appearance: none;
        appearance: none;
        background: #000;
        cursor: pointer;
        border-radius:30px;
        outline:none;
        box-sizing: border-box;
        border: 0.3px solid #fff;
        height: 16px;
    }


    #content-time{
        width: 100%;
    }
    #inputTime {
        width: 100%;
    }

    #inputTime[type=range] {
        -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
        background: transparent; /* Otherwise white in Chrome */
    }

    #inputTime[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
    }

    #inputTime[type=range]:focus {
        outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
    }

    #inputTime::-webkit-slider-runnable-track {
        -webkit-appearance: none;
        appearance: none;
        background: #fff;
        cursor: pointer;
        border-radius:30px;
        outline:none;
        box-sizing: border-box;
        height: 5px;
    }

    #inputTime::-moz-range-track { 
        -moz-appearance: none;
        appearance: none;
        background: #fff;
        cursor: pointer;
        border-radius:30px;
        outline:none;
        box-sizing: border-box;
        height: 5px;
    }

    #inputTime::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 16px;
        width: 16px;
        border-radius: 16px;
        background: #ffffff;
        cursor: pointer;
        margin-top: -5px
    }

    .content-button, .content-button:focus {
        background-color: transparent;
        border: none !important;
        outline: 0px !important;
        position: relative;
        top: 5px;
        cursor: pointer;
    }

    #content-timer-formated {
        margin-top: 9px;
    }


    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    .fade-enter-active, .fade-leave-active {
        transition: 0.2s opacity ease-out;
    }

    #content-multiples {
        position: absolute;
        z-index: 3;
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
        background-color: rgba(0, 0, 0, 0.9);
        color: #ffffff;
    }

    #content-multiples .item {
        padding: 10px;
        width: 100%;
        box-sizing: border-box;
        cursor: pointer;
        font-size: 1.5rem;
        display: flex;
        justify-content: space-between;
    }

    #content-multiples #close {
        width: 100%;
        text-align: right;
    }
</style>