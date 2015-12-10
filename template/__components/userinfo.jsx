import React from "react"
import {Card,CardTitle,CardHeader,Avatar} from "material-ui"
import {connect} from "react-redux"
class UserInfo extends React.Component{
	render(){return(
		<Card style={{width:500}}>
			<CardTitle title="个人信息" />
			<CardHeader title={this.props.user?this.props.user.account:""} subtitle={this.props.user?this.props.user.group:""} avatar={<Avatar>{this.props.user&&this.props.user.account?this.props.user.account[0].toUpperCase():"I"}</Avatar>} />
		</Card>
	)}
}
export default connect(
	state=>({user:state.user})
)(UserInfo)