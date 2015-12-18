import React from "react"
import {Dialog,TextField} from "material-ui"
import {connect} from "react-redux"
import request from "superagent"
class LoginDlg  extends React.Component{
	constructor(props){
		super(props)
		if(props.onLoaded)props.onLoaded()
	}
	render(){return(
		<Dialog title="登录"
				actions={[{text:"取消"},{text:"登录",onTouchTap:()=>this.props.onLogin({account:this.refs.account.getValue(),password:this.refs.password.getValue()}),ref:"submit"}]}
				actionFocus="submit" open={this.props.loginshow}
				onRequestClose={this.props.onDlgClose}
				autoDetectWindowHeight={true}
				autoScrollBodyContent={true}>
			<TextField fullWidth={true} floatingLabelText="账号" ref="account"/>
			<TextField fullWidth={true} floatingLabelText="密码" ref="password" type="password" />
		</Dialog>
	)}
}
export default connect(
	state=>({loginshow:state.loginshow}),
	dispatch=>({
		onLogin:(user)=>{
			request
				.post("/user/login")
				.send(user)
				.end(function(err,res){
					if(!res.body||res.body.error)return alert(res.error)
					dispatch({type:"login",user:res.body})
				})
		}
		,onDlgClose:()=>dispatch({type:"loginhide"})
		,onLoaded:()=>{
			request
				.get("/user/getInfo")
				.end(function(err,res){
					if(!res.body||res.body.error)return dispatch({type:"loginshow"})
					dispatch({type:"login",user:res.body})
				})
		}
	})
)(LoginDlg)