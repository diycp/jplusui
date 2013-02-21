/**
 * @author xuld
 */

//#include ui/part/icon.css
//#include ui/part/mask.css
//#include ui/part/closebutton.css
//#include ui/container/dialog.css
//#include fx/animate.js
//#include ui/core/containercontrol.js

/**
 * @class Dialog
 * @extends ContainerControl
 */
var Dialog = ContainerControl.extend({

    _centerType: 1 | 2,
	
	cssClass: 'ui-dialog',

	showDuration: -1,
	
	// 基本属性
		
	headerTpl: '<div class="{cssClass}-header"><a class="{cssClass}-close ui-closebutton">×</a><h4></h4></div>',

	onCloseButtonClick: function () {
	    this.close();
	},
	
	init: function(options){
		
		// 如果用户传入了一个已经存在的节点，并且这个节点不是 ui-dialog 。
		// 那么创建新的对话框容器，并且将节点作为这个对话框的内容。
		if (!Dom.hasClass(this.elem, 'ui-dialog')) {

			// 如果这个节点已经调用过 new Dialog, 则其父元素就是 ui-dialog-body  了。
			if (Dom.parent(this.elem, '.ui-dialog-body')) {
				this.elem = Dom.parent(Dom.parent(this.elem));
			} else {

				// 保存当前节点。
				var t = this.elem;

				// 创建新的对话框。
				this.elem = this.create(options);

				// 将节点加入到 body 中。
				Dom.append(this.body(), t);

		    }
		}
		
		// 关闭按钮。
		// 默认隐藏对话框。
		// 移除 script 脚本, 防止重复执行。
		Dom.on(this.elem, 'click', '.ui-dialog-close', this.onCloseButtonClick, this);
		Dom.setStyle(this.elem, 'display', 'none');
		Dom.query('script', this.elem).each(Dom.remove);

	},
	
	mask: function(opacity){
		var mask = this.maskNode || (this.maskNode = Dom.find('.ui-mask-dialog') || Dom.append(document.body, '<div class="ui-mask ui-mask-dialog"></div>'));

		if (opacity === null) {
			Dom.hide(mask);
		} else {
			Dom.show(mask);
			Dom.setSize(mask, Dom.getScrollSize(document));
			if (opacity != null)
				Dom.setStyle(mask, 'opacity', opacity);
		}
		return this;
	},
	
	setPosition: function(p){
		if(p.x != null) {
			this._centerType &= ~2;
			Dom.setStyle(this.elem, 'margin-left', 0);
		}
		
		if(p.y != null) {
			this._centerType &= ~1;
			Dom.setStyle(this.elem, 'margin-top', 0);
		}
		
		Dom.setPosition(this.elem, p);
		return this;
	},

	setSize: function (p) {
		Dom.setSize(this.elem, p);
		return this.center();
	},

	setContentSize: function (x, y) {
		Dom.setWidth(this.elem, 'auto');

		var body = this.body();
		Dom.setWidth(body, x)
		Dom.setHeight(body, y);
		return this.center();
	},

	setContent: function () {
		return ContainerControl.prototype.setContent.apply(this, arguments).center();
	},
	
	/**
	 * 重对齐当前对话框的位置以确保居中显示。
	 */
	center: function(){
		if(this._centerType & 1)
			this.dom.setStyle('margin-top', - this.dom.getHeight() / 2 + Dom.document.getScroll().y);
			
		if(this._centerType & 2)
			this.dom.setStyle('margin-left', -this.dom.getWidth() / 2 + Dom.document.getScroll().x);
			
		return this;
	},

	show: function (duration) {
		Dom.render(this.elem);

		this.dom.show({
			args: duration,
			duration: this.showDuration
		});
		return this.center();
	},
	
	showDialog: function(){
		return this.show.apply(this.mask(), arguments);
	},
	
	close: function (duration) {
	    var me = this;
	    if (this.trigger('closing')) {
	    	if (this.maskDom) this.maskDom.hide();
	    	this.dom.hide({
	    		args: duration,
	    		duration: this.showDuration,
	    		callback: function () {
	    			this.trigger('close');
	    		}
	    	});
	    }
		return this;
	}
	
});
