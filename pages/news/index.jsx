import ReactDOM from "react-dom"
import React,{Component} from "react"
import {MenuItem} from "material-ui"
import {Header,Footer} from "../index/component"
import {News} from "./component"
import injectTapEventPlugin from "react-tap-event-plugin"
injectTapEventPlugin()

ReactDOM.render(
	<div style={{fontFamily:"microsoft yahei,simhei"}}>
		<Header/>
		<News />
		<Footer/>
	</div>
,document.querySelector("#app"))