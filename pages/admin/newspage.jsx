import React from "react"
import {connect,Provider} from "react-redux"
import {createStore} from 'redux'
import request from "superagent"
import dateFormat from "dateformat"
import Mytable from "./mytable"
import NewsDlg from "./newsdlg"
var store = createStore((state={}, action)=>{
	switch(action.type){
		case "news":
			return Object.assign({},state,{news:action.data})
		case "newsPaging":
			return Object.assign({},state,{newsPaging:action.index})
		case "newsshow":
			return Object.assign({},state,{newsshow:true})
		case "newshide":
			return Object.assign({},state,{newsshow:false})
		default:
			return state
	}
})
function getNews(dispatch,i){
	i=i||store.getState().newsPaging||1
	request.get("/db/news?skip="+(i-1)*10+"&limit=10&sort=date&sortdir=-1").end(function(err,res){
		var data={data:res.body.data.map(it=>([it._id,it.title,it.summary,dateFormat(it.date,"yyyy-mm-dd HH:MM:ss")])),total:res.body.total}
		dispatch({type:"news",data})
	})
}
var Table=connect(
	state=>({
		title:"新闻管理",
		keys:["ID","标题","简介","发布日期"],
		items:(state.news||{}).data,
		total:(state.news||{}).total
	}),
	dispatch=>({
		onAdd:()=>dispatch({type:"newsshow"}),
		onPaging:(i)=>{
			dispatch({type:"newsPaging",index:i})
			getNews(dispatch,i)
		},
		onDel:(it)=>{
			it.forEach(i=>request.del('/db/news/'+i).end(()=>getNews(dispatch)))
		},
		onLoaded:()=>getNews(dispatch)
	})
)(Mytable)
var Dlg=connect(
	state=>({show:state.newsshow}),
	dispatch=>({
		onDlgClose:()=>dispatch({type:"newshide"}),
		onPost:data=>{
			request
				.post("/db/news")
				.send(data)
				.end(function(err,res){
					if(!res.body||res.body.error)return alert(res.error)
					getNews(dispatch,store.getState().newsPaging||1)
					dispatch({type:"newshide"})
				})
		}
	})
)(NewsDlg)
export default class NewsPage extends React.Component{
	render(){return(
		<Provider store={store}>
			<article>
				<Table/>
				<Dlg/>
			</article>
		</Provider>
	)}
}
