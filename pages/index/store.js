import {createStore} from 'redux'
import request from "superagent"
export const store = createStore((state={}, action)=>{
	switch(action.type){
		case "Config":
			return Object.assign({},state,{Config:action.data})
		case "News":
			return Object.assign({},state,{News:action.data})
		default:
			return state
	}
})
export function onLoaded(dispatch){
	return ()=>{
		request
			.get("/db/config?key=target&value=index")
			.end((err,res)=>{
				dispatch({type:"Config",data:res.body.data[0].data})
			})
		request
			.get("/db/news?sort=date&sortdir=-1&limit=3")
			.end((err,res)=>{
				dispatch({type:"News",data:res.body.data})
			})
	}
}