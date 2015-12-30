import ReactDOM from "react-dom"
import React,{Component} from "react"
import {Provider} from "react-redux"
import {connect} from "react-redux"
import injectTapEventPlugin from "react-tap-event-plugin"
import {Header,Section1,Section2,Section3,Footer} from "./component"

injectTapEventPlugin()

ReactDOM.render(
	<div style={{background:"url("+require("./bg.jpg")+")",backgroundAttachment:"fixed",fontFamily:"microsoft yahei,simhei"}}>
		<Header/>
		<Section1/>
		<Section2/>
		<Section3/>
		<Footer/>
	</div>
,document.querySelector("#app"))