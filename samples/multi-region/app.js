var Panel = Mn.LayoutView.extend({

	initialize: function(options){
		this.title = options.title || '';
	},

	regions: {
		body: '.panel-body'
	},

	template: function(sModel){
		var tpl = '\
	        <div class="panel panel-default">\
	            <div class="panel-heading">\
	                <h3 class="panel-title"><%= title %></h3>\
	            </div>\
	            <div class="panel-body"></div>\
	        </div>';

	    return _.template(tpl)(sModel)
	},

	templateHelpers: function(){
		var self = this;
		return {title: self.title}
	}

});

var App = Mn.Application.extend({
	regions: {
		content: {
			selector: '.container',
			regionClass : Mn.MultiRegion.extend()
		}
	}
});
var app = new App();

var pane1 = new Panel({title: 'Panel 1'});
var pane2 = new Panel({title: 'Panel 2'});
var pane3 = new Panel({title: 'Panel 3'});
var pane4 = new Panel({title: 'Panel 4'});

app.on('start', function() {
  this.content.show(pane1);
  this.content.show(pane2);
  this.content.show(pane3);
  this.content.show(pane4);
});
$(document).ready(function(){ app.start(); });