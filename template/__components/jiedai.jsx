import React from "react"
import {connect,Provider} from "react-redux"
import {createStore} from 'redux'
import request from "superagent"
import Mytable from "./mytable"
import JiedaiDlg from "./jiedaidlg"
import dateFormat from "dateformat"
var store = createStore((state={}, action)=>{
	switch(action.type){
		case "jiedai":
			return Object.assign({},state,{Jiedai:action.data})
		case "JiedaiPaging":
			return Object.assign({},state,{JiedaiPaging:action.index})
		case "Jiedaishow":
			return Object.assign({},state,{Jiedaishow:true})
		case "Jiedaihide":
			return Object.assign({},state,{Jiedaishow:false})
		default:
			return state
	}
})
function getJiedai(dispatch,i){
	i=i||store.getState().JiedaiPaging||1
	request.get("/db/jiedai?skip="+(i-1)*10+"&limit=10&sort=date&sortdir=-1").end(function(err,res){
		var data={data:res.body.data.map(it=>([
			it._id,
			<img src={it.head} style={{width:100,height:100}} />,
			it.name,
			it.sex,
			it.address,
			it.idcard,dateFormat(it.starttime,"yyyy-mm-dd"),
			it.limit||0,
			Math.round((new Date()-new Date(it.starttime))/(1000 * 60 * 60 * 24))-it.limit||0
		])),total:res.body.total}
		dispatch({type:"jiedai",data})
	})
}
var Table=connect(
	state=>({
		title:"借贷管理",
		keys:["ID","头像","姓名","性别","地址","身份证号","起始时间","借贷期限","逾期天数"],
		items:(state.Jiedai||{}).data,
		total:(state.Jiedai||{}).total
	}),
	dispatch=>({
		onAdd:()=>dispatch({type:"Jiedaishow"}),
		onPaging:(i)=>{
			dispatch({type:"JiedaiPaging",index:i})
			getJiedai(dispatch,i)
		},
		onDel:(it)=>{
			it.forEach(i=>request.del('/db/jiedai/'+i).end(()=>getJiedai(dispatch)))
		},
		onLoaded:()=>getJiedai(dispatch)
	})
)(Mytable)
var Dlg=connect(
	state=>({show:state.Jiedaishow}),
	dispatch=>({
		onDlgClose:()=>dispatch({type:"Jiedaihide"}),
		onPost:data=>{
			request
				.post("/db/jiedai")
				.send(data)
				.end(function(err,res){
					if(!res.body||res.body.error)return alert(res.error)
					getJiedai(dispatch,store.getState().JiedaiPaging||1)
					dispatch({type:"Jiedaihide"})
				})
		}
	})
)(JiedaiDlg)
export default class JiedaiPage extends React.Component{
	render(){return(
		<Provider store={store}>
			<article>
				<Table/>
				<Dlg/>
			</article>
		</Provider>
	)}
}
