var App = Mn.Application.extend({
	regions: {
		a1Region: '.a1',
		a2Region: '.a2'
	}
});
var app = new App();

var MenuLayout = Mn.LayoutView.extend({
	tagName: 'ul',
	className: 'nav nav-pills',
	ui: {
		home 	: '.m_home',
		aboutus : '.m_aboutus',
	},
	activeEl: null,
	template: _.template('<li role="presentation" class="m_home">\
							<a href="#/home">Home</a></li>\
						  <li role="presentation" class="m_aboutus"><a href="#/aboutus">AboutUs</a></li>'),
	setActive: function(cls){
		if (this.ui[cls]) {
			if (this.activeEl) {
				this.activeEl.removeClass('active');
			};
			this.ui[cls].addClass('active');
			this.activeEl = this.ui[cls];
		};
	},
	onRender: function(){
		Backbone.history.start();
	}
});
var menuLayout = new MenuLayout();


var HomeLayout = Mn.LayoutView.extend({
	template: _.template('<h4>My Home Page</h4><p>Home page text goes here...</p>')
});


var AboutLayout = Mn.LayoutView.extend({
	template: _.template('<h4>My AboutUs Page</h4><p>AboutUs page text goes here...</p>')
});

var controller = {
	home: function(){
		var homeLayout = new HomeLayout();
		menuLayout.setActive('home');
		app.a2Region.show(homeLayout);
	},
	aboutus: function(){
		var aboutLayout = new AboutLayout();
		menuLayout.setActive('aboutus');
		app.a2Region.show(aboutLayout);
	}
};

var AppRouter = Mn.AppRouter.extend({
	controller : controller,
	appRoutes  : {
		"": "home",
		"home": "home",
		"aboutus": "aboutus"
	} 
});
var appRouter = null;
app.on('start', function() {
  appRouter = new AppRouter();
  this.a1Region.show(menuLayout);
  //this.a2Region.show(homeLayout);
});
$(document).ready(function(){ app.start(); });