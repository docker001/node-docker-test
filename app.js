var koa = require('koa')
var route=require('koa-route')
var robe=require('robe')
var session = require('koa-generic-session')
var MongoStore = require('koa-generic-session-mongo')
var app = koa()
var key=require('./key')
app.keys = ['toy','key']
app.use(session({store:new MongoStore()}))
app.use(function*(next){
	if(!global.db)global.db=yield robe.connect('localhost/toy')
	yield next
})
app.use(route.get('/key/:id',key.getOne))
app.use(route.get('/key',key.get))
app.use(route.post('/key',key.post))
app.use(route.get('/',function*(){
	this.body="test"
}))
app.listen(80);