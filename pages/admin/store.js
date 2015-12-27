import React from "react"
import {createStore} from 'redux'
import request from "superagent"
import dateFormat from "dateformat"
export const store = createStore((state={}, action)=>{
	switch(action.type){
		case "LogOut":
			return Object.assign({},state,{user:null})
		case "Login":
			return Object.assign({},state,{user:action.user,loginshow:false})
		case "LoginOpen":
			return Object.assign({},state,{loginshow:true})
		case "LoginClose":
			return Object.assign({},state,{loginshow:false})
		case "JiedaiOpen":
			return Object.assign({},state,{JiedaiOpen:true})
		case "JiedaiClose":
			return Object.assign({},state,{JiedaiOpen:false})
		case "JiedaiData":
			return Object.assign({},state,{JiedaiData:action.data,JiedaiTotal:action.total})
		case "JiedaiPaging":
			return Object.assign({},state,{JiedaiPaging:action.i})
		default:
			return state
	}
})
export function onLogin(dispatch){
	return user=>{
		request
			.post("/user/login")
			.send(user)
			.end((err,res)=>{
				if(!res.body||res.body.error)return alert(res.error)
				dispatch({type:"Login",user:res.body})
			})
	}
}
export function onLoaded(dispatch){
	return ()=>{
		request
			.get("/user/getInfo")
			.end((err,res)=>{
				if(res.body.error)return dispatch({type:"LoginOpen"})
				dispatch({type:"Login",user:res.body})
			})
	}
}
export function onLoginOpen(dispatch){
	return ()=>dispatch({type:"LoginOpen"})
}
export function onLogOut(dispatch){
	return ()=>{
		request.get("/user/logout").end()
		dispatch({type:"LogOut"})
	}
}
export function onLoginClose(dispatch){
	return ()=>dispatch({type:"LoginClose"})
}
export function onMenuChange(item){
	 window.location.hash=item
}
export function onJiedaiData(dispatch){
	return i=>{
		request
			.get("/db/jiedai?skip="+(i-1)*10+"&limit=10&sort=date&sortdir=-1")
			.end((err,res)=>{
				var data=res.body.data.map(it=>([
					<img src={it.head} style={{width:100,height:100}} />,
					it.name,
					it.sex,
					it.address,
					it.idcard,dateFormat(it.starttime,"yyyy-mm-dd"),
					it.limit||0,
					Math.round((new Date()-new Date(it.starttime))/(1000 * 60 * 60 * 24))-it.limit||0,
					it.daikuanjine,
					it.pingtai,
					it.tel,
					it.yuqijine,
					it.xinyu
				]))
				var total=res.body.total
				dispatch({type:"JiedaiData",data,total})
			})
	}
}
export function onJiedaiOpen(dispatch){
	return ()=>dispatch({type:"JiedaiOpen"})
}
export function onJiedaiClose(dispatch){
	return ()=>dispatch({type:"JiedaiClose"})
}
export function onJiedaiDel(dispatch){
	return (it,callback)=>it.forEach(i=>request.del('/db/jiedai/'+i).end(callback))
}
export function onJiedaiPaging(dispatch){
	return i=>dispatch({type:"JiedaiPaging",i})
}
export function onJiedaiPost(dispatch){
	return (data,callback)=>{
			request
				.post("/db/jiedai")
				.send(data)
				.end(function(err,res){
					if(!res.body||res.body.error)return alert(res.error)
					dispatch({type:"JiedaiClose"})
					callback()
				})
		}
}