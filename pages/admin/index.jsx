import "core-js/es6"
import ReactDOM from "react-dom"
import React,{Component} from "react"
import injectTapEventPlugin from "react-tap-event-plugin"
import {Provider} from "react-redux"
import {Router,Route} from "react-router"
import {SvgIcon,AppBar,IconButton,FlatButton,List,ListItem,Dialog,TextField} from "material-ui"
import {connect} from "react-redux"
import NotMatchPage from "./notmatch"
import Userinfo from "./userinfo"
import NewsPage from "./newspage"
import JiedaiPage from "./jiedai"
import ConfigPage from "./config"
import {store,onLogOut,onLoginOpen,onMenuChange,onLogin,onLoginClose,onLoaded} from "./store"
injectTapEventPlugin()
@connect(state=>({user:state.user}),dispatch=>({onLoginOpen:onLoginOpen(dispatch),onLogOut:onLogOut(dispatch)}))
class Head  extends React.Component{
	render(){return(
		<AppBar title={(this.props.user&&this.props.user.group=="admin")?"管理员主页":"个人主页"}
				style={Object.assign({},{background:this.props.user?this.props.user.group=="admin"?"#444":"#f5862b":"#3d69e3"},this.props.style)}
				iconElementLeft={
					<IconButton onClick={()=>window.location="/"}>
						<SvgIcon>
							<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
							<path d="M0 0h24v24H0z" fill="none"/>
						</SvgIcon>
					</IconButton>
				}
				iconElementRight={
					<FlatButton label={this.props.user?"注销":"登录"} onTouchTap={this.props.user?this.props.onLogOut:this.props.onLoginOpen}/>
				} />
	)}
}

@connect(state=>({user:state.user}),dispatch=>({choose:(item)=>onMenuChange(item)}))
class Menus extends Component{
	render(){return(
		<List style={this.props.style}>{
			(this.props.user&&this.props.user.group=="admin"?
				["个人信息","新闻管理","借贷管理","网站设置"]:
				["个人信息"]
			).map(item=>
				<ListItem primaryText={item} key={item} onTouchTap={()=>this.props.choose(item)} />
			)
		}</List>
	)}
}

@connect(state=>({loginshow:state.loginshow}),dispatch=>({onLogin:onLogin(dispatch),onLoginClose:onLoginClose(dispatch),onLoaded:onLoaded(dispatch)}))
class LoginDlg  extends Component{
	constructor(props){
		super(props)
		if(props.onLoaded)props.onLoaded()
	}
	render(){return(
		<Dialog title="登录"
				actions={[{text:"取消"},{text:"登录",onTouchTap:()=>this.props.onLogin({account:this.refs.account.getValue(),password:this.refs.password.getValue()}),ref:"submit"}]}
				actionFocus="submit" open={this.props.loginshow}
				onRequestClose={this.props.onLoginClose}
				autoDetectWindowHeight={true}
				autoScrollBodyContent={true}>
			<TextField fullWidth={true} floatingLabelText="账号" ref="account"/>
			<TextField fullWidth={true} floatingLabelText="密码" ref="password" type="password" />
		</Dialog>
	)}
}

class App extends Component{
	render(){return(
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
	)}
}
ReactDOM.render(<App />,document.querySelector("#app"))