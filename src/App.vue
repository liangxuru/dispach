<template>
  <div id="app">
    <div class="container">
      <transition name="fade">
        <router-view></router-view>
      </transition>
      <scale-loader v-bind:loading="isLoading" ref="load"></scale-loader>
    </div>
  </div>
</template>

<script>
import "./styles/common.less"
import { mapState, mapActions } from 'vuex'
import { Request } from 'service/requests' 
import ScaleLoader from 'components/ScaleLoader'
import { WebStorageCache } from 'lib/StorageCache'
export default {
  name: 'app',
  computed: mapState({
    isLoading: state => state.common.isLoading
  }),
  components: {
    ScaleLoader
  },
  mounted(){
  	//解决移动端click事件300ms的延迟响应
    window.addEventListener('load', function() {
      FastClick.attach(document.body);
    }, false);
  }
}
</script>
<style lang="less">
  .container{
    &.fade-enter-active, &.fade-leave-active {
        transition: opacity .5s
    }
    &.fade-enter, &.fade-leave-active {
        opacity: 0
    }
  }
</style>