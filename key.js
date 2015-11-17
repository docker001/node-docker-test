module.exports={
	getOne:function*(id){
		this.body=yield db.collection('key').findOne({_id:id})
	},
	get:function*(){
		this.body=yield db.collection('key').find()
	},
	post:function*(){
		this.body=yield db.collection('key').insert({number:Math.random()})
	},
	delete:function*(){

	}
}