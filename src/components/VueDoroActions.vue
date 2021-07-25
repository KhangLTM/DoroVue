<template>
  
<div class="button">
    <button class="button__action">
        <sliders-icon @click="toggleAdjustment()">adjustment</sliders-icon>
    </button>

    <button class="button__toggle">
        <transition-group name="toggle-buttons">
            <play-icon v-if="!isPlaying" @click="toggleIsPlaying()" key="play" >PLAY</play-icon>
            <pause-icon v-else @click="toggleIsPlaying()" key="pause"  >STOP</pause-icon>
        </transition-group>
    </button>

    <button class="button__action">
        <skip-forward-icon @click="nextStep()">NEXT</skip-forward-icon>
    </button>

        <vue-doro-adjustment
            v-show="isAdjustment"
            @setAdjustment="setAdjustment($event)"
            @closeAdjustment="toggleAdjustment()"
        />

</div>



</template>

<script>

import vueDoroAdjustment from "./vueDoroAdjustmet.vue"
import {
  PlayIcon,
  PauseIcon,
  SkipForwardIcon,
  SlidersIcon,
} from 'vue-feather-icons'




export default {
  
  data(){
      return{
          isPlaying:false,
          isAdjustment:false
      }
  },
  
    methods:{
        toggleIsPlaying(){
            this.isPlaying=!this.isPlaying
            this.$emit('toggleIsPlaying',this.isPlaying)
        },
    
        nextStep(){
            this.$emit("nextStep")
        },
    
        toggleAdjustment(){
            this.isAdjustment=!this.isAdjustment
        },

        setAdjustment(adjustment){
            this.toggleAdjustment()
            this.$emit("setAdjustment", adjustment)

        }

        

    },


    components: { 
        PlayIcon,
        PauseIcon,
        SkipForwardIcon,
        SlidersIcon,
        
        vueDoroAdjustment },


}
</script>

<style lang="stylus">
.button
    margin-top 2rem
    display flex
    justify-content space-between    
    width 100%
.button__action
    background-color transparent
    border-radius 100%
    width 4rem
    height @width 
    transition background-color linear 
    padding 1.1rem 1rem 1rem 1rem
    hoverTransition()
    @media screen and (max-width 820px)
        margin-top 4rem

.button__toggle
    
    @extends .button__action
    border 2px solid $border-color

.toggle-buttons-enter-active
  transition all 0.5s linear

.toggle-buttons-enter, .toggle-buttons-leave-to
  transform translateY(5px)
  opacity 0
</style>
