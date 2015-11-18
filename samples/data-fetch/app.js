var MyCollection = Backbone.Collection.extend({
	model: MyModel,
	urlRoot: '../../data/',
	//comparator: 'name',
	url: function(){
		console.log('url',arguments);
		return this.urlRoot + 'person.json'
	},
	parse: function(response, options){
		return response.body;
	}
});
var myCollection = new MyCollection();
myCollection.fetch();

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

var EmptyView = Mn.ItemView.extend({
	tagName 	: 'tr',
	template	: function(sModel){
		var tpl =  '<td>No record found</td>\
					<td></td>\
					<td></td>\
					<td></td>\
					<td></td>\
					<td></td>\
					<td></td>\
					<td></td>\
					<td></td>';
		return _.template(tpl)(sModel);
	}
});

var CollectionView = Mn.CompositeView.extend({
	tagName		: 'div',
	className	: '',
	childView 	: MyView,
	loading 	: true,
	//emptyView 	: EmptyView,
	childViewContainer: "tbody",
	collectionEvents: {
		'request' : 'showLoading',
		'sync'	  : 'hideLoading'
	},
	template 	: function(sModel){
		var tpl = '<table class="table table-condensed table-hover"><thead>\
				<tr><th>Name</th>\
				<th>Balance</th>\
				<th>Age</th>\
				<th>EyeColor</th>\
				<th>Gender</th>\
				<th>Company</th>\
				<th>Email</th>\
				<th>Phone</th>\
				<th>Address</th></tr></thead>\
				<tbody></tbody></table><div class="loading"></div>';
		return _.template(tpl)();
	},
	showLoading: function(){
		console.log('showLoading', this.loading);
		//this.$el.addClass('loading');
	},
	hideLoading: function() {
		this.loading = false;
		this.$el.find('.loading').html('');
		console.log('hideLoading', this.loading);
		//this.$el.removeClass('loading');
	},
	onShow: function(){
		console.log('onShow',this.loading);
		if (this.loading) {
			this.$el.find('.loading').html('loading...');
		};
	}
});

var App = Mn.Application.extend({
	regions: {
		a1Region: '.a1',
		a2Region: '.a2'
	}
});
var app = new App();
var myCollectionView = new CollectionView({collection: myCollection});
app.on('start', function() {
  this.a1Region.show(myCollectionView);
});
$(document).ready(function(){ app.start(); });