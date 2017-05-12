import Login from '@/pages/logIn'
import Home from '@/pages/home'
import shopList from '@/pages/shopList'
import productList from '@/pages/productList'
import shopInfo from '@/pages/shopInfo'
import distanceList from '@/pages/distanceList'
import productOn from '@/pages/productOn'
import productCheck from '@/pages/productCheck'

export default [
	{
		path: '/',
		component: Login
	},
	{
		path: '/login',
		name: 'logIn',
		component: Login
	},
	{
		path: '/home',
		name: 'home',
		component: Home
	},
	{
		path: '/shopList',
		name: 'shopList',
		component: shopList
	},
	{
		path: '/productList',
		name: 'productList',
		component: productList
	},
	{
		path: '/shopInfo',
		name: 'shopInfo',
		component: shopInfo
	},
	{
		path: '/distanceList',
		name: 'distance',
		component: distanceList
	},
	{
		path: '/productOn',
		name: 'productOn',
		component: productOn
	},
	{
		path: '/productCheck',
		name: 'productCheck',
		component: productCheck
	}
];