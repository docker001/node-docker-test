var router = require('koa-router')()
var parse  = require('co-body')
router
	.get('/getInfo',function*(){
		this.body=this.session.user||{error:"not login"}
	})
	.post('/login',function*(){
		var data=yield parse.json(this)
		var user=yield this.mongo.collection("users").findOne({account:data.account,password:data.password})
		this.session.user=user
		this.body=user||{error:"用户名或密码错误"}
	})
	.get('/logout',function*(){
		this.session=null
		this.body={status:"ok"}
	})
	.get('/init',function*(){
		if(yield this.mongo.collection("users").findOne({account:"admin"}))return
		var result={}
		result.indexes=yield this.mongo.collection("users").ensureIndex({account:1},{unique: true})
		result.creatAdmin=yield this.mongo.collection("users").insert({account:"admin",password:"admin",group:"admin"})
		result.creatTest=yield this.mongo.collection("users").insert({account:"test",password:"test",group:"user"})
		this.body=result
	})
module.exports=router