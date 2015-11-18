var MyView = Mn.ItemView.extend({
	tagName 	: 'tr',
	initialize: function(){
		//in this case fetch does not re-render the view, 
		//but works when call this.render() manually after fetch success
		//this.model = new MyModel();

		this.model.fetch();
	},
	modelEvents : {
		'change': 'render'
	},
	model: new MyModel(),// in this case fetch re-render the view
	template	: function(sModel){
		var tpl =  '<td><%= name %></td>\
					<td><%= balance %></td>\
					<td><%= age %></td>\
					<td><%= eyeColor %></td>\
					<td><%= gender %></td>\
					<td><%= company %></td>\
					<td><%= email %></td>\
					<td><%= phone %></td>\
					<td><%= address %></td>';
		return _.template(tpl)(sModel);
	}
});


var App = Mn.Application.extend({
	regions: {
		a1Region: '.a1'
	}
});
var app = new App();
var myView = new MyView();
app.on('start', function() {
  this.a1Region.show(myView);
});
$(document).ready(function(){ app.start(); });