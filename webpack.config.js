var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var config={
	entry:{
		index:'./pages/index',
		admin:'./pages/admin'
	},
	plugins:[
		new webpack.optimize.CommonsChunkPlugin({name:"common",filename:"[name].js"})	
	],
	output: {
		path:'public',
		filename: '[name].js'
	},
	module:{
		loaders:[
			{test:/\.jsx?$/,loader:"babel",exclude:/node_modules/},
			{test: /\.(png|jpg)$/,loader:'url?limit=8192'}
		]
	},
	resolve: {
		extensions: ['', '.js','.jsx']
	}
}
for(var i in config.entry){
	config.plugins.push(new HtmlWebpackPlugin({
		minify:{removeComments:true,collapseWhitespace:true},
		template:'template.html',
		inject:true,
		title:i,
		hash:true,
		filename:i+'.html',
		chunks: ['common',i]
	}))
}
module.exports=config