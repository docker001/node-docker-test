var koa    = require('koa'),
	router = require('koa-router')(),
	logger = require('koa-logger'),
	mongo  = require('koa-mongo'),
	serve  = require('koa-static'),
	path   = require('path'),
	parse  = require('co-body'),
	session = require('koa-session-store')
var app = koa()
app.keys=['imtoy']
router
	.get('/user/getInfo',function*(){
		this.body=this.session.user||{error:"not login"}
	})
	.post('/user/login',function*(){
		var user=yield this.mongo.collection("users").findOne(yield parse.json(this))
		this.session.user=user
		this.body=user||{error:"用户名或密码错误"}
	})
	.get('/user/logout',function*(){
		this.session=null
		this.body={status:"ok"}
	})
	.get('/user/init',function*(next){
		if(yield this.mongo.collection("users").findOne({account:"admin"}))return
		var result={}
		result.indexes=yield this.mongo.collection("users").ensureIndex({account:1},{unique: true})
		result.creatAdmin=yield this.mongo.collection("users").insert({account:"admin",password:"admin",group:"admin"})
		result.creatTest=yield this.mongo.collection("users").insert({account:"test",password:"test",group:"user"})
		this.body=result
	})
app
	.use(mongo({host:process.env["MONGODB_PORT_27017_TCP_ADDR"]||'localhost',port:process.env["MONGODB_PORT_27017_TCP_PORT"]||27017,user:process.env["MONGODB_USERNAME"]||'',pass:process.env["MONGODB_PASSWORD"]||' ',db:process.env["MONGODB_INSTANCE_NAME"]||'test'}))
	.use(session({store:"cookie"}))
	.use(logger())
	.use(router.routes())
	.use(router.allowedMethods())
	.use(serve("public"))
	.listen(3000)
console.log("start app success on port 3000")