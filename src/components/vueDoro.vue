<template>
   
   <div :class="`${actualStepClass}`" >

       <vue-doro-header/>



        <main class="grid">           
            <div class="row main--center ">
                <span class="col  m-12  main__title">
                        <h2>{{actualStep.title}}</h2>
                </span>
                <span class="col  m-12  c-12  main__timer">
                    <vue-doro-timer
                        :timer="actualStep.time"
                        :isPlaying="isPlaying"
                        @setTimeFinished="setNextStep()"
                    />
                </span>
                
                 <span class="col  m-12 c-12 main__rounds">
                        {{actualRound}}/{{rounds}} rounds
                </span>
                
                <span class="col   m-12 c-12 main__actions">
                    <vue-doro-action
                        @toggleIsPlaying="setIsPlaying($event)"
                        @nextStep="setNextStep()"
                        @setAdjustment="setAdjustment($event)"
                    />
                </span>
            </div>
        </main>
   
   
   
   </div>




</template>



<script>

import vueDoroHeader from "./vueDoroHeader.vue"
import vueDoroAction from "./VueDoroActions.vue"
import vueDoroTimer from "./vueDoroTimer.vue"
import timer from "./enums/timer"

const{
    FOCUS,
    SHORT,
    LONG,
    ROUNDS
} = timer




export default {

    data(){
       return{ 
        isPlaying:false,
        actualStep:null,
        rounds:ROUNDS,
        actualRound:1,
        steps:{
            focus:{
                time:FOCUS.TIME,
                title:FOCUS.LABEL
            },
            short:{
                time:SHORT.TIME,
                title:SHORT.LABEL
            },
            long:{
                time:LONG.TIME,
                title:LONG.LABEL
            }

            }
        }    
    },
    
    created(){
        this.setActualStep(this.steps.focus)
    },

    computed:{
        actualStepClass(){
            const step={
                [FOCUS.LABEL]:'focus',
                [SHORT.LABEL]:'short',
                [LONG.LABEL]:'long',
                

            }
        return `page--${step[this.actualStep.title]}`
        }
    },



    methods:{
        setNextStep(){
            const {title}=this.actualStep
            if(title === LONG.LABEL && this.actualRound == this.rounds){
                this.setActualRound(1)
                this.setActualStep(this.steps.focus)
            }

           else if(title === FOCUS.LABEL && this.actualRound == this.rounds)
                this.setActualStep(this.steps.long)
           
           
           else if(title === FOCUS.LABEL && this.actualRound != this.rounds)
                this.setActualStep(this.steps.short)        
        
            else if(title === SHORT.LABEL && this.actualRound != this.rounds){
                this.setActualStep(this.steps.focus)
                this.setActualRound(this.actualRound+1)

            }
        },
        
        setActualStep(step){
            this.actualStep=step
        },

        setActualRound(round){
            this.actualRound=round
        },
    
    
        setIsPlaying(isplaying){
            this.isPlaying=isplaying
        },
        
        setAdjustment(adjustment){
            Object.entries(adjustment).forEach(([key,value])=>{
                key==="rounds"?this.rounds=value : this.steps[key].time=value
            })
            this.setActualRound(1)
            this.setActualStep(this.steps.focus)
        }
    
    
    },

    
    
    components:{
        vueDoroHeader,
        vueDoroAction,
        vueDoroTimer,
    }
}
</script>

<style lang="stylus">
    pageStatusGradient(endColor)
        initial = #FFFFFF
        background linear-gradient(180deg, initial -8%, rgba(initial, 0) 100%), endColor

    .page   
        height 100vh
        width 100vw   
        
    .main--center
        flex-direction column        
        align-content center    
    .page--focus
        @extends .page
        pageStatusGradient($cosmos)

    .page--short
        @extends .page
        pageStatusGradient($pattens-blue)
    
    .page--long
        @extends .page
        pageStatusGradient($tana)

    .main__title
        font-size 2.1rem
        font-weight 400
        @media screen and (min-width 1024px)        
            margin-left 3.2rem
        @media screen and (max-width 740px)
            font-size 1.5rem
            margin-left 23%
    .main__rounds
        font-size 1.5rem
        letter-spacing .2rem
        margin-top 1rem
        @media screen and (min-width 1024px)
            margin-left 7.5rem
        @media screen and (max-width 740px)
            margin-left 28%
            font-size 1.4rem
    
</style>    