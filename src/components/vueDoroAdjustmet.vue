<template>
  <transition name="modal--fade">
      <div class="backdrop">
          
          <article
                class="modal"
          >
              <header>
                <h1  class="modal__title">Adjustment</h1>
                <button @click.stop="close()" class="modal__close">
                    <x-icon size="2x"/>
                </button>
              </header>
              
              
              <main class="modal__content ">
                  <form @submit.prevent="setAdjustment()">
                      <div class="row">
                        <div class="col c-12 form__input ">
                            <label class="form__label" for="focus">FOCUS</label>
                            <input class="input__field"  id="focus" v-model="adjustment.focus" v-mask="'##:##'"  >
                        </div>
                        
                        <div class="col c-12 form__input ">
                            <label class="form__label" for="short">SHORT</label>    
                            <input class="input__field"  id="short" v-model="adjustment.short" v-mask="'##:##'"  >
                        </div>
                    
                        <div class="col c-12 form__input  ">
                            <label class="form__label" for="long">LONG</label>
                            <input class="input__field"  id="long" v-model="adjustment.long"  v-mask="'##:##'"  >
                        </div>
                        
                        <div class="col c-12 form__input  ">
                            <label class="form__label" for="rounds">ROUNDS</label>
                            <input class="input__field"  id="rounds" v-model="adjustment.rounds" type="number" min="0" >
                        </div>
        
                        <div class="col form__footer ">
                            <button class="form__submit" type="submit">COMFIRM</button>
                        </div>
                      </div>
                  </form>
              </main>
          </article>
      </div>

  </transition>

</template>
    

<script>
    import { XIcon } from 'vue-feather-icons'
    import {mask} from "vue-the-mask"
    import timer from "./enums/timer"

    const{
        FOCUS,
        SHORT,
        LONG,
        ROUNDS
    } = timer

export default {
    directives:{mask},
    data(){
        return{
            adjustment:{
                focus:FOCUS.TIME,
                short:SHORT.TIME,
                long:LONG.TIME,
                rounds:ROUNDS
            }

        }
    },

    methods:{
        setAdjustment(){
            this.$emit("setAdjustment",this.adjustment)
        },
    

        close(){
            this.$emit("closeAdjustment")            
        }
    },
    
    
    components:{
        XIcon
    }
}
</script>

<style lang="stylus">
.backdrop
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    background-color rgba(#fff, .5)
    display flex
    justify-content center
    align-items center
    @media screen and (max-width 740px)
        height 100vh
.modal
    justify-content center
    position relative
    border-radius 10px
    background-color #fff        
    width 40rem
    height auto
   

.modal__title
    font-size 2.5em
    text-align center    
    font-weight 400

.modal__close
    position absolute
    top 1rem
    right 0.5rem    
    background-color transparent
    cursor pointer
    hoverTransition()   

.form__input
    display flex
    flex-direction column
    align-items center
    width 40%
    line-height 3rem
    @media screen and (max-width 740px)
        line-height 3rem

label
    text-align center
    font-size 1.8rem
    font-weight 300

.input__field        
    text-align center 
    font-size 1.3rem
    width 60%
    &:hover
        addShadow()
    @media screen and (max-width 740px)
        border  0.5px solid
        width 80%
.form__footer
    display flex
    justify-content center
    width 100%
    margin-top 3rem
.form__submit
    background-color transparent
    font-size 1.4rem
    border 2px solid $border-color
    border-radius $radius
    hoverTransition()
    addShadow()
    padding .5rem 3rem
    margin-bottom 1rem
    cursor pointer
        
.modal--fade-enter, .modal--fade-leave-active
    opacity 0
    top -10px
.modal--fade-enter-active, .modal--fade-leave-active
    transition all .4s ease
</style>