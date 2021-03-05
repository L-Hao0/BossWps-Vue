<template>
	<div>
		<div>
			<el-tree :data="dataMenu" show-checkbox node-key="id" :props="defaultProps">
			</el-tree>
		</div>

	</div>
</template>

<script>
	/* 	import qs from 'qs' */
	import axios from 'axios'
	import Vue from 'vue';
	import workSpaceOne from '../components/js/workSpaceOne.js'
	export default {
		name: 'menued',
		data() {
			return {
				form: {
					token: ''
				},
				dataMenu: [],
				data: [{
					id: 1,
					label: '一级 1',
					children: [{label: '一级 1'},{label: '一级 1'},{label: '一级 1'},{label: '一级 1'}]
				}, {
					id: 2,
					label: '一级 2',
					children: [{
						id: 5,
						label: '二级 2-1'
					}, {
						id: 6,
						label: '二级 2-2'
					}]
				}, {
					id: 3,
					label: '一级 3',
					children: [{
						id: 7,
						label: '二级 3-1'
					}, {
						id: 8,
						label: '二级 3-2'
					}]
				}],
				defaultProps: {
					children: 'children',
					label: 'label'
				}
			}

		},
		methods: {

		},
		mounted() {
			axios.get('/.debugTemp/NotifyDemoUrl').then((res) => {
				this.DemoSpan = res.data;
			});
		},
		created: function() { //钩子函数
			Vue.config.token = localStorage.getItem('token');
			/* console.log(Vue.config.token) */
			axios.defaults.headers = {
				'X-Requested-With': 'XMLHttpRequest',
				'Access-Control-Allow-Origin': true,
				'Token': Vue.config.token
			}
			axios.get('api/dpass/openApi/getApiList') //获取接口
				.then(resp => {
					// handle success
					/* console.log(resp); */
					this.dataMenu = resp.data.result;
					var data = this.dataMenu;
					// console.log(data);
					workSpaceOne.dataInterface(data);
					//alert(resp.data.result[0].name)
				})
				.catch(resp => {
					// handle error
					console.log(resp);
				});


		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
