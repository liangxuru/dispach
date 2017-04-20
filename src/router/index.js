import Vue from 'vue'
import Router from 'vue-router'
import routes from '../routes'

Vue.use(Router);

var router = new Router({
	history: false,
	routes,
	saveScrollPosition: true
});
export default router = router;