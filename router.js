Router.map(function(){
	//POS
	this.route('posBoard',{path : '/pos'});
	this.route('test', {path: '/test'});

	//Grid in admin
	this.route('itemView', {path: '/item/:id?'});
	this.route('categoryView',{path : '/category/:id?'});
	this.route('supplierView', {path : '/supplier/:id?'});
	this.route('unitView', {path : '/unit/:id?'});
	this.route('quickCatView', {path : '/quickCategory/:id?'});
	this.route('quickButtonView', {path : '/quickButton/:id?'});
	this.route('quickNoteView', {path : '/quickNote/:id?'});
	this.route('salesView',{path : '/sales/:id?'});
	this.route('deviceView',{path : '/device/:id?'});
	this.route('userView',{path : '/user/:id?'});
	this.route('taxView',{path : '/tax/:id?'});

	//Generic admin page
	this.route('itemAdmin', {path: '/admin/item'});
	this.route('supplierAdmin', {path: '/admin/supplier'});
	this.route('unitAdmin', {path : '/admin/unit'});
	this.route('categoryAdmin', {path : '/admin/category'});
	this.route('salesAdmin', {path : '/admin/sales'});
	this.route('adjustAdmin', {path : '/admin/adjust'});
	this.route('receiveAdmin', {path : '/admin/receive'});
	this.route('quickCatAdmin', {path : '/admin/quickCategory'});
	this.route('quickButtonAdmin', {path : '/admin/quickButton'});
	this.route('quickNoteAdmin', {path : '/admin/quickNote'});
	this.route('deviceAdmin', {path : '/admin/device'});
	this.route('userAdmin', {path : '/admin/user'});
	this.route('taxAdmin', {path : '/admin/tax'});
	this.route('login', {path : '/'});

	//BI
	this.route('inventoryIntel', {path : '/analysis/inventory'});
	this.route('salesIntel', {path : '/analysis/sales'});
});
