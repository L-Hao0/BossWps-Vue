<template>
	<div>
		<el-tree :props="props" :load="loadNode" lazy show-checkbox @check-change="handleCheckChange"></el-tree>
	</div>
</template>

<script>
/* 	import qs from 'qs' */
	import axios from 'axios'
	import Vue from 'vue';
	export default {
		name: 'menued',
		data() {
			return {
				props: {
					label: 'name',
					children: 'zones'
				},
				count: 1,
				form:{
					token:''
				},
				
			}
		},
		methods: {
			handleCheckChange(data, checked, indeterminate) {
				console.log(data, checked, indeterminate);
			},
			handleNodeClick(data) {
				console.log(data);
			},
			loadNode(node, resolve) {
				if (node.level === 0) {
					return resolve([{
						name: 'region1'
						}, {
						name: 'region2'
					}]);
				}
				if (node.level > 3) return resolve([]);

				var hasChild;
				if (node.data.name === 'region1') {
					hasChild = true;
				} else if (node.data.name === 'region2') {
					hasChild = false;
				} else {
					hasChild = Math.random() > 0.5;
				}

				setTimeout(() => {
					var data;
					if (hasChild) {
						data = [{
							name: 'zone' + this.count++
						}, {
							name: 'zone' + this.count++
						}];
					} else {
						data = [];
					}

					resolve(data);
				}, 300);
			}
		},
		mounted() {
			axios.get('/.debugTemp/NotifyDemoUrl').then((res) => {
				this.DemoSpan = res.data;
			});
		},   
		created:function(){//钩子函数
			Vue.config.token = localStorage.getItem('token');
			axios.defaults.headers = {
				'X-Requested-With': 'XMLHttpRequest',
				'Access-Control-Allow-Origin': true,
				'Token': Vue.config.token}
			axios.get('api/dpass/openApi/getApiList') //获取接口
				.then(function (response) {
					// handle success
					console.log(response);
				})
				.catch(function (error) {
					// handle error
					console.log(error);
				})
				.then(function () {
					// always executed
			});

		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
t
