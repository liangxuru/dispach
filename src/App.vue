<template>
  <div id="app">
    <div class="container">
      <transition name="router-fade" mode="out-in">
        <router-view></router-view>
      </transition>
      <scale-loader v-bind:loading="isLoading"></scale-loader>
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

    $(window).unload(function(){
        //响应事件
        Request.LoginOut();
        WebStorageCache.remove("token");
    });
    // wx.closeWindow(function(){
    //   alert("我关了");
    // });
    // document.addEventListener('visibilitychange', function(){
    //   alert(document.visibilityState);
    // });
  }
}
</script>