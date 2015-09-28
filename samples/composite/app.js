var MyCollection = Backbone.Collection.extend({
	model: MyModel
});
var myCollection = new MyCollection(person);

var MyView = Mn.ItemView.extend({
	tagName 	: 'tr',
	modelEvents : {
		'change': 'render'
	},
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

var CollectionView = Mn.CompositeView.extend({
	constructor : function(){ 
		console.log('constructor', arguments); 
		//this.constructor.__super__.constructor.apply(this, arguments);
		Mn.CompositeView.prototype.constructor.apply(this, arguments);
	},
	initialize 	: function(){ console.log('initialize'); },
	tagName		: 'table',
	className	: 'table table-condensed table-hover',
	childView 	: MyView,
	childViewContainer: "tbody",
	template 	: function(sModel){
		var tpl = '<thead>\
				<tr><th>Name</th>\
				<th>Balance</th>\
				<th>Age</th>\
				<th>EyeColor</th>\
				<th>Gender</th>\
				<th>Company</th>\
				<th>Email</th>\
				<th>Phone</th>\
				<th>Address</th></tr></thead>\
				<tbody></tbody>';
		return _.template(tpl)();
	}
});

var App = Mn.Application.extend({
	regions: {
		a1Region: '.a1',
		a2Region: '.a2'
	}
});
var app = new App();
myCollectionView
var myCollectionView = new CollectionView({collection: myCollection});
app.on('start', function() {
  this.a1Region.show(myCollectionView);
});
$(document).ready(function(){ app.start(); });