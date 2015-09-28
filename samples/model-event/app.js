var MyModel = Backbone.Model.extend()
var myModel = new MyModel({name:"FooBar"});

var MyView = Mn.ItemView.extend({
	modelEvents: {
		'change': 'render'
	},
	template: function(sModel){
		var tpl = 'Hi <%= name %>!!!';
		return _.template(tpl)(sModel);
	}
});

var FormView = Mn.ItemView.extend({
	tagName: 'form',
	ui:{
		name: 'input.name'
	},
	events:{
		"input input.name": "doUpdate",
	},
	template: function(sModel){
		var tpl = '<input class="name" value="<%= name %>" />';
		return _.template(tpl)(sModel);
	},
	doUpdate: function(){
		var val = this.ui.name.val();
		this.model.set('name',val);
	}
})
var App = Mn.Application.extend({
	regions: {
		a1Region: '.a1',
		a2Region: '.a2'
	}
});
var app = new App();
var myView = new MyView({model:myModel});
var formView = new FormView({model:myModel});
app.on('start', function() {
  this.a1Region.show(myView);
  this.a2Region.show(formView);
});
$(document).ready(function(){ app.start(); });