/** * @author xuld */imports("Controls.Button.SplitButton");using("Controls.Button.MenuButton");var SplitButton = MenuButton.extend({		xtype: 'splitbutton',		tpl: '<span class="x-splitbutton x-buttongroup">\				<button class="x-button">&nbsp;</button>\				<button class="x-button"><span class="x-button-menu x-button-menu-down"></span></button>\			</span>',		init: function () {		this.button = this.find('.x-button');		this.menuButton = this.find('.x-button:last-child');		this.menuButton.on('click', this.toggleMenu, this);		this.setMenu(new Menu(this.find('.x-menu')).appendTo(this.node));		this.menuButton.appendTo(this.node);		this.menu.on('click', this.onSelectItem, this);	}	}).defineMethods('button', 'setText setHtml getText getHtml');