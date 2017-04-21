<template>
  <div id="app">
    <div class="container">
      <transition name="router-fade" mode="out-in">
        <router-view></router-view>
      </transition>
      <scale-loader></scale-loader>
    </div>
  </div>
</template>

<script>
import "./styles/common.less"
import { mapState, mapActions } from 'vuex'
import ScaleLoader from 'components/ScaleLoader'
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