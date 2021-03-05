import axios from 'axios'
import Vue from 'vue';
/* 
1.写一个方法传两个参数apiId，metadataUrl
2.根据参数获取路径
3.创建数组
4.根据数组创建循环
5.在循环里面创建map集合
6.把循环得到的值放入map集合当中
7.然后在把map集合放入数组中
8.在返回数组
9定义一个数组
10在循环中定义map集合
11创建循环根据循环得到的值根据键值对的形式定义到map集合中
12创建一个children来调用dataInterface()方法保存到集合当中
13然后push到数组中返回数组

 */
function dataInterface(data){
		var tabledata= [];
		for(var i=0;i<data.length;i++){
			var colle=new Map;
			colle.set("lable",data[i].name);
			colle.set("apiId",data[i].apiId);
			colle.set("metadataUrl",data[i].metadataUrl);
			var children=dataInterfaceTwo(data[i].metadataUrl,data[i].apiId);
			colle.set("children",children);
			tabledata.push(colle);
		}
/* 		var tabledata1 = JSON.stringify(tabledata);
		
		console.log(tabledata1)
		console.log(1)		console.log(tabledata) */
/* 		return tabledata1; */
}


function dataInterfaceTwo(metadataUrl,apiId){
		var result=[];
		var runForm = [];
		var url=metadataUrl.slice(26);
		Vue.config.token = localStorage.getItem('token');
		/* var url=metadataUrl+"?apiId="+apiId; *///接口路径
		axios.defaults.headers = {
			'X-Requested-With': 'XMLHttpRequest',
			'Access-Control-Allow-Origin': true,
			'Token': Vue.config.token
		}
		axios.get(url+"?apiId="+apiId).then(resp=>{
			result=resp.data.result
			var keys = Object.keys(result[0]);
			for(var i=0;i<keys.length;i++){
				var mapTwo = new Map;
				mapTwo.set('label',keys[i]);
				runForm.push(mapTwo);
			}
		}).catch(resp=>{
			console.log(resp);
		});
		return runForm;
}

export default {
	dataInterface,
	dataInterfaceTwo
}