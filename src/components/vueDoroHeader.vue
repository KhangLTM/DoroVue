<template>
  <header class="header">
      <div class="header__logo">
          <img
            class="header__image"
            src="https://assets.materialup.com/uploads/05f16ab7-ae58-4afa-952a-efe8564f0350/preview.png"
            >

        <h1 class="header__title">POMODORO</h1>
    </div>


  </header>   
</template>

<script>
export default {

}
</script>

<style lang="stylus" >
        
    .header__logo
        display flex

    .header__image
      width 3em
      @media screen and (max-width 740px)
            width  2.3rem
    .header__title
      font-size 2rem
      margin-left 0.5rem    
      @media screen and (max-width 740px)
            font-size 1.5rem
</style>