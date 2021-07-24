<template>
    <div class="timer">
        <radial-progress
            :diameter="timeDiameter"
            :total-steps="timerTotalSteps"
            :completed-steps="completedSteps"
            :stroke-width="5"
            :inner-stroke-width="2"
            inner-stroke-color="#888"
            start-color="#888"
            stop-color="#444"
            :is-clockwise="false"
        >
        <span class="time">{{actualTime}}</span>
    
        </radial-progress>
    
    </div>

</template>

<script>

import alarm from "@/assets/alarm.mp3"
import moment from "moment"
import radialProgress from "vue-radial-progress"

export default {
    props:{
        timer:{
            type:String,
            require:true
        },
        isPlaying:{
            type:Boolean,
            require:true
        }
    },
    data(){
        return{
            actualTime:"",
            timeInterval:null,
            timeDiameter:400
        }
    },
    
    mounted(){
        this.setTimerWidth()
        window.addEventListener('resize',this.setTimerWidth())
        this.setActualTime(this.timer)
    },

    watch:{
        timer(value){
            this.stopInterval()
            this.setActualTime(value)
            if(this.isPlaying){
                this.stopInterval()
                this.initCountDownTime()
            }
        },
        
        isPlaying(playing){
            if(playing){
                this.initCountDownTime()
            }
            else{
                this.stopInterval()
                this.changeTitle('VueDoro')
            }
    
        },    

        actualTime(value,oldvalue){
            if(this.isPlaying){
                this.changeTitle(value)
            }
            if(oldvalue==="00:01" && value==="00:00"){
                const LAST_TIME=1000
                setTimeout(()=>
                {
                    this.stopInterval()
                    this.setTimeFinished()
                    this.playAlram()
                },LAST_TIME)
                
                
            }
      
      }
        
    
    
    },



    computed:{
        timerTotalSteps(){
           return this.changeToNumber(this.timer)
        },
        
        completedSteps(){
            return this.changeToNumber(this.actualTime)-Math.abs(this.timerTotalSteps)
        }

    },




    methods:{
        changeTitle(value){
            document.title = value
        },
        
        setActualTime(actualtime){
            this.actualTime=actualtime
        },        
    
        setTimeFinished(){
            this.$emit('setTimeFinished')
        },
         
        setTimerWidth() {
            const { width } = window.screen
            if (width < 400) {
                 this.timeDiameter = 350
             }
            if (width < 350) {
                this.timeDiameter = 300
                   }
            if (width > 400) {
                this.timeDiameter = 400
            }
    }, 

        changeToNumber(time){
            return +time.replace(":","")
        },
        stopInterval(){
            clearInterval(this.timeInterval)
        },
        subTractOneSecond(){
            const subTratedOne=moment(this.actualTime,"mm:ss")
                .subtract(1,"seconds")
                .format("mm:ss")
            this.setActualTime(subTratedOne)
        },

        initCountDownTime(){
            const INTERVAL_TIME=1000
            this.timeInterval=setInterval(()=>{
                this.subTractOneSecond()
            },INTERVAL_TIME)
        },

        playAlram(){
            const audio = new Audio(alarm)
            audio.play()
        }    
    },
   
   
   components:{
        radialProgress
    }



}   
</script>

<style lang="stylus">
    .timer
        // @media screen and (min-width 1024px)
        //     margin-left 36%
        @media screen and (max-width 740px)
            margin-left 0.75 rem
    .time   
        font-size 6rem
</style>