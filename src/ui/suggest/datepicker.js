/**
 * @author 
 */



//#include ui/part/icon.css
//#include ui/suggest/picker.js
//#include ui/composite/monthcalender.js


var DatePicker = Picker.extend({
	
	dataStringFormat: 'yyyy/M/d',
	
	dropDownWidth: 'auto',
	
	menuButtonTpl: '<button class="ui-button" type="button"><span class="ui-icon ui-icon-calendar"></span></button>',
	
	createDropDown: function(existDom){
		return new MonthCalender(existDom).on('selecting', this.onItemClick, this);
	},
	
	onItemClick: function(value) {
		if(this.trigger('selecting', value)) {
			var old = this.getValue();
			this.setValue(value).hideDropDown();
			if(old !== value){
				this.trigger('change');
			}
			
			return;
		}
		
		return false;
	},
	
	selectItem: function (value) {
		this.onItemClick(value);
		return this;
	},
	
	updateDropDown: function(){
		var d = new Date(this.getText());
		if(!isNaN(d.getYear()))
			this.dropDown.setValue(d);
	},
	
	getValue: function(){
		return new Date(this.getText());
	},
	
	setValue: function(value){
		return this.setText(value.toString(this.dataStringFormat));
	}

});


