var koa    = require('koa'),
	router = require('koa-router')(),
	logger = require('koa-logger'),
	mongo  = require('koa-mongo'),
	serve  = require('koa-static'),
	gzip  = require('koa-gzip'),
	cache  = require('koa-static-cache'),
	parse  = require('co-busboy'),
	path = require('path'),
	session = require('koa-session-store'),
	routerDB = require('./router/db'),
	fs = require('fs'),
	routerUser =require('./router/user'),
	proxy = require('koa-proxy')
var app = koa()
app.keys=['imtoy']
router
	.use('/user',routerUser.routes(),routerUser.allowedMethods())
	.use('/db',routerDB.routes(),routerDB.allowedMethods())
	.post('/upload',function*(){
		var parts = parse(this,{autoFields:true})
		var part
		this.body=[]
		while(part = yield parts){
			var stream=fs.createWriteStream(path.join('upload',Math.random().toString().substring(2)+path.extname(part.filename)))
			part.pipe(stream)
			this.body.push({name:part.filename,path:stream.path})
		}
	})
app
	.use(mongo({
		host:process.env["MONGODB_PORT_27017_TCP_ADDR"]||'localhost',
		port:process.env["MONGODB_PORT_27017_TCP_PORT"]||27017,
		user:process.env["MONGODB_USERNAME"]||'',
		pass:process.env["MONGODB_PASSWORD"]||' ',
		db:process.env["MONGODB_INSTANCE_NAME"]||'test'
	}))
	.use(session({store:"cookie"}))
	.use(logger())
	.use(gzip())
	.use(router.routes())
	.use(router.allowedMethods())
	.use(cache("public"))
	.use(serve("public"))
	//.use(proxy({host:'http://localhost:8080'}))
	.listen(80)
console.log("start app success on port 80")