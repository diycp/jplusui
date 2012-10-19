/** * @author  */using("Controls.Container.Tabbable");using("Controls.Core.TabbableControl");/** * 表示 {@link tabControls} 中的项。 */var TabPage = ContainerControl.extend({		xtype: 'tabpage',		tpl: '<div class="x-control"></div>',		header: function () {		return this.tab;	},		container: function(){		return new Dom(this.node);	},		init: function(options){		var tab = options.tab;		if(tab) {			delete options.tab;		} else {			tab = Dom.parse('<li class="x-tabbable-item"><a href="javascript:;"></a></li>');		}				this.tab = tab;		tab.dataField().control = this;		this.hide();	},		select: function(){		this.parentControl.setSelectedTab(this);		return this;	}});/** * TAB 选项卡。 */var TabControl = TabbableControl.extend({		xtype: 'tabcontrol',		createHeader: function(){		return Dom.create('ul', 'x-' + this.xtype + '-header x-tabbable');	},		initChild: function (item) {		if(!(item instanceof TabPage)) {			item = new TabPage(item);		}				return item;	},		doAdd: function(childControl, refControl){		this.header().insertBefore(childControl.header(), refControl ? this.item(refControl.index()).header() : null);		this.container().insertBefore(childControl.container(), refControl);		if(childControl.header().hasClass('x-tabbable-selected')){			this.setSelectedTab(childControl);		}	},		doRemove: function(childControl){		this.header().removeChild(childControl.header());		this.container().removeChild(childControl.container());		if(this.selectedTab === childControl){			this.setSelectedTab(this.item(childControl.index()));		}	},	init: function (options) {				// 生成顶部。		this.toggleHeader(true);				// 委托头部选择信息。		var tabbale = this.header().delegate('.x-tabbable-item', options.selectEvent || 'click', function(e){			var tabPage = this.dataField().control;			if(tabPage) {				e.preventDefault();				tabPage.select();			}		});				var panels = this.container().children().hide();				tabbale.children().each(function(value, index){			var tabPage = new TabPage({				tab: Dom.get(value),					node: panels[index]			});			  			tabPage.parentControl = this;			tabPage.container().dataField().namedItem = tabPage;			if(tabPage.tab.hasClass('x-tabbable-selected')) {				this.setSelectedTab(tabPage);			}		}, this);				this.select();	},		baseToggleTab: function(from, to){		if(from){			from.header().removeClass('x-tabbable-selected');			from.container().hide();		}				if(to){			to.header().addClass('x-tabbable-selected');			to.container().show();		}	}});