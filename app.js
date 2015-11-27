var koa    = require('koa'),
	router = require('koa-router')(),
	logger = require('koa-logger'),
	mongo  = require('koa-mongo'),
	serve  = require('koa-static'),
	path   = require('path'),
	parse  = require('co-body')
var app = koa()
router
	.get('/data',function*(next){
		this.body=yield this.mongo.collection('data').find().sort({time:1}).toArray()
	})
	.post('/data',function*(next){
		var data =(yield parse(this)).data
		data=JSON.parse(data)
		data.time=new Date()
		this.body=yield this.mongo.collection('data').insert(data)
	})
app
	.use(mongo({host:process.env["MONGODB_PORT_27017_TCP_ADDR"]||'localhost',port:process.env["MONGODB_PORT_27017_TCP_PORT"]||27017,user:process.env["MONGODB_USERNAME"]||'',pass:process.env["MONGODB_PASSWORD"]||' ',db:process.env["MONGODB_INSTANCE_NAME"]||'test'}))
	.use(logger())
	.use(router.routes())
	.use(router.allowedMethods())
	.use(serve("public"))
	.listen(80)
console.log("start app success on port 80")