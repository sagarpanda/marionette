var MyModel = Backbone.Model.extend({
	defaults: {
	    "id": "",
	    "balance": "",
	    "picture": "",
	    "age": 0,
	    "eyeColor": "",
	    "name": "",
	    "gender": "",
	    "company": "",
	    "email": "",
	    "phone": "",
	    "address": "",
	    "about": "",
	    "registered": "",
	    "latitude": 0,
	    "longitude": 0,
	    "greeting": "",
	    "favoriteFruit": ""
	},
	url: 'data.json'/*,
	parse : function(response, options) {
		console.log(options);
		return response;
	}*/
})