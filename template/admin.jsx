import "core-js/es6"
import ReactDOM from "react-dom"
import React from "react"
import injectTapEventPlugin from "react-tap-event-plugin"
import {createStore} from 'redux'
import {Provider} from "react-redux"
import {Router,Route} from "react-router"
import {Head,LoginDlg,Menus,NotMatchPage,Userinfo,NewsPage,JiedaiPage,ConfigPage} from "./__components"

injectTapEventPlugin()
var store = createStore((state={}, action)=>{
	switch(action.type){
		case "logout":
			return Object.assign({},state,{user:null})
		case "loginshow":
			return Object.assign({},state,{loginshow:true})
		case "loginhide":
			return Object.assign({},state,{loginshow:false})
		case "login":
			return Object.assign({},state,{user:action.user,loginshow:false})
		default:
			return state
	}
})

ReactDOM.render(
	<Provider store={store}>
		<article>
			<Head style={{position:"fixed",top:0,width:"100%"}} />	
			<LoginDlg />
			<section style={{paddingTop:64}}>
				<Menus style={{width:"10%",position:"absolute"}}/>
				<div style={{width:"84%",marginLeft:"10%",borderLeft:"solid 1px #d9d9d9",padding:"2.9%",minHeight:720}}>
					<Router>
						<Route path="/" component={Userinfo} />
						<Route path="/个人信息" component={Userinfo} />
						<Route path="/新闻管理" component={NewsPage} />
						<Route path="/借贷管理" component={JiedaiPage} />
						<Route path="/网站设置" component={ConfigPage} />
						<Route path="*" component={NotMatchPage}/>
					</Router>
				</div>
			</section>
			<footer style={{background:"#333",color:"#aaa",textAlign:"center",lineHeight:"100px"}}>Powered By 重庆久厘久科技网络有限公司</footer>
		</article>
	</Provider>
,document.querySelector("#ui"))