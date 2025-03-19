<template>
  <div id="video-container">
    <video
      ref="video"
      class="video"
      preload="auto"
      autoplay="autoplay"
      muted
      width="600"
      height="400"
    />
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount, defineProps, defineEmits } from 'vue'
import WebRtcStreamer from '@renderer/utils/webrtcstreamer.ts'

// Props
const props = defineProps({
  rtsp: {
    type: String,
    required: true
  },
  isOn: {
    type: Boolean,
    default: false
  },
  spareId: {
    type: Number
  },
  selectStatus: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['selectVideo'])

// Refs
const video = ref(null)
const webRtcServer = ref(null)
const clickCount = ref(0)

// Methods
const initVideo = () => {
  try {
    // Connect to backend IP address and port
    webRtcServer.value = new WebRtcStreamer(video.value, 'http://192.168.1.108:8000')
    // Send RTSP address to backend
    webRtcServer.value.connect('rtsp://admin:jonsion1@192.168.1.64/h264/ch1/main/av_stream')
  } catch (error) {
    console.error('Error initializing video:', error)
  }
}

const btnFull = () => {
  const elVideo = video.value
  if (elVideo.webkitRequestFullScreen) {
    elVideo.webkitRequestFullScreen()
  } else if (elVideo.mozRequestFullScreen) {
    elVideo.mozRequestFullScreen()
  } else if (elVideo.requestFullscreen) {
    elVideo.requestFullscreen()
  }
}

const dbClick = () => {
  clickCount.value++
  if (clickCount.value === 2) {
    btnFull() // Double-click fullscreen
    clickCount.value = 0
  }
  setTimeout(() => {
    if (clickCount.value === 1) {
      clickCount.value = 0
    }
  }, 250)
}

const handleClickVideo = () => {
  if (props.isOn) {
    emit('selectVideo', props.spareId)
    dbClick()
  } else {
    btnFull()
  }
}

// Watchers
watch(
  () => props.rtsp,
  () => {
    if (webRtcServer.value) {
      webRtcServer.value.disconnect()
    }
    initVideo()
  }
)

// Lifecycle hooks
onMounted(() => {
  initVideo()

  // Handle browser unload
  window.onbeforeunload = () => {
    if (webRtcServer.value) {
      webRtcServer.value.disconnect()
    }
  }
})

onBeforeUnmount(() => {
  if (webRtcServer.value) {
    webRtcServer.value.disconnect()
  }
})
</script>

<style scoped lang="scss">
.active-video-border {
  border: 2px salmon solid;
}

#video-container {
  position: relative;

  .video {
    // Optional styles
  }

  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
}
</style>
