﻿/**
 * @author xuld
 */

var IToolTip = {
	
	/**
	 * 当指针在具有指定工具提示文本的控件内保持静止时，工具提示保持可见的时间期限。-1表示不自动隐藏。 0 表示始终不显示。
	 * @type Number
	 */
	autoDelay: -1,
	
	/**
	 * 工具提示显示之前经过的时间。
	 * @type Number
	 */
	initialDelay: 1000,
	
	/**
	 * 指针从一个控件移到另一控件时，必须经过多长时间才会出现后面的工具提示窗口。
	 * @type Number
	 */
	reshowDelay: 100,
	
	/**
	 * 显示时使用的特效持续时间。
	 */
	duration: -1,
	
	getArrowType: function(){
		var arrow = this.find('>.x-arrow');
		return 'top';
	},
	
	setArrowType: Function.empty,
	
	getArrowSize: function(){
		return {
			x: 0,
			y: 0	
		};
	},
	
	getArrowOffset: function(){
		return {
			x: 0,
			y: 0	
		};
	},
	
	initToolTip: Function.empty,
	
	onHide: Function.empty,
	
	onShow: function(x, y){
		
		if(this.autoDelay > 0) {
			me.timer = setTimeout(this.hide.bind(this), this.autoDelay);
		}
		
	},
	
	showAt: function(x, y){
		if(!this.parent('body')){
			this.appendTo();
		}
		if(this.autoDelay) {
			this.show(this.duration, this.onShow);
			this.setPosition(x, y);
		}
		
		return this;
	},
	
	showBy: function(ctrl, offsetY, offsetX){
		ctrl = Dom.get(ctrl);
		if(!this.parent('body')){
			this.appendTo(ctrl.parent());
		}
		var arrowType = this.getArrowType(),
			targetPosition = ctrl.getPosition(),
			targetSize = ctrl.getSize();
		offsetY = offsetY || 0;
		offsetX = offsetX || 0;
		
		if(arrowType !== 'none') {
			this.show();
			var arrowOffset = this.getArrowOffset(),
				arrowSize = this.getArrowSize();
			switch(arrowType){
				case 'top':
					offsetX += (targetSize.x - arrowSize.x) / 2 - arrowOffset.x;
					offsetY += targetSize.y + arrowSize.y;
					break;
				case 'left':
					offsetX += targetSize.x + arrowSize.x;
					offsetY += (targetSize.y) / 2 - arrowOffset.y;
					break;
				case 'right':
					offsetX -= this.getSize().x + arrowSize.x;
					offsetY += (targetSize.y) / 2 - arrowOffset.y;
					break;
				case 'bottom':
					offsetX += (targetSize.x - arrowSize.x) / 2 - arrowOffset.x;
					offsetY -= arrowSize.y + this.getSize().y;
					break;
			}
			this.hide();
			
		}
		
		this.initToolTip(ctrl);
		return this.showAt(targetPosition.x + offsetX, targetPosition.y + offsetY);
	},
	
	/**
	 * 设置某个控件工具提示。
	 */
	setToolTip: function(ctrl, caption, direction, offsetY, offsetX){
		ctrl = Dom.get(ctrl);
		ctrl.on('mouseover', function(){
			var me = this;
			if(me.timer)
				clearTimeout(me.timer);
			if(me.initialDelay >= 0){
				me.timer = setTimeout(function(){
					me.timer = 0;
					if(caption)
						me.setText(caption);
					if(direction)
						me.setArrowType(direction);
					me.showBy(ctrl, offsetY, offsetX);
				}, me.initialDelay);
			}
		}, this);
		
		ctrl.on('mouseout', this.close, this);
		
		
		return this;
		
	},
	
	close: function(){
		var me = this;
		if(me.timer) {
			clearTimeout(me.timer);
			me.timer = 0;
		}
		me.hide(me.duration, this.onHide, 'opacity');
		return this;
	}
	
};



