import React from "react"
import {SvgIcon,AppBar,IconButton,FlatButton} from "material-ui"
import {connect} from "react-redux"
import request from "superagent"
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
					<FlatButton label={this.props.user?"注销":"登录"} onTouchTap={this.props.user?this.props.onLogoutBtn:this.props.onLoginBtn}/>
				} />
	)}
}
export default connect(
	state=>({user:state.user}),
	dispatch=>({
		onLoginBtn:()=>dispatch({type:"loginshow"}),
		onLogoutBtn:()=>{
			request
				.get("/user/logout")
				.end(function(err,res){
					dispatch({type:"logout"})
				})
		}
	})
)(Head)