<template>
  <div id="app">
      <vue-doro/>
  </div>
</template>
    
<script>
import vueDoro from "./components/vueDoro.vue"

export default {
    components:{
        vueDoro
    }
}
</script>

<style lang="stylus">
    @import './styles/global.styl'
    @import './styles/Grid.styl'
</style>