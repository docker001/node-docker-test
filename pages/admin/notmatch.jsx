import React from "react"
import {Card,CardMedia,CardTitle} from "material-ui"
export default class NoMatchPage extends React.Component{
	render(){return(
		<Card style={{width:800,margin:"auto"}}>
			<CardMedia overlay={<CardTitle title="404" subtitle="Not Found"/>}>
				<img src={require("./404.jpg")}/>
			</CardMedia>
		</Card>
	)}
}