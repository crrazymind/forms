window.forms_link = 'http://tmru.igor-sh.dev2.mrise.ru/forms'//  - link to the page with forms
$(document).ready(function(){
	$('.calendar').each(function(){
		$(this).datepicker({
			showOn: "button",
			dateFormat: 'dd/mm/yy',
			showAnim: 'fold',
			minDate: '+0d',
			maxDate: '+1y',
			changeMonth: true,
			changeYear: true,
			buttonImage: "http://www.travelmenu.ru/misc/i/search/bg-calendar.gif",
			buttonImageOnly: true

		});
		var _offset = parseInt($(this).attr('data-offset')) || 0;
		
		var _date = $(this).datepicker( "getDate" );
		$(this).val(_date.getDate() + _offset + '/' + ((parseInt(_date.getMonth())+1) < 10 ? ('0'+(parseInt(_date.getMonth())+1)) : (parseInt(_date.getMonth())+1)) + '/' + ((_date.getYear().toString().length < 4) ? ('20'+_date.getYear().toString().substr(1,2)) : _date.getYear()));
	});


	initTabs();
	initColorpicker();
	initSlider();
	checkNights();

	var formGenerator = FormGenerator();
	window.formGenerator = formGenerator;
	formGenerator.init();

	$('form').change(function(){
		formGenerator.update();
	});
	$('.main-font .font-mod').click(function(){
		$(this).toggleClass("activated");
		formGenerator.update();
		return false;
	});
	$('.offers-font .font-mod').click(function(){
		$(this).toggleClass("activated");
		formGenerator.update();
		return false;
	});

});
function checkNights(){
	var _n1 = $('#night1');
	var _n2 = $('#night2');
	var _n1o = _n1.find('option');
	var _n2o = _n2.find('option');
	function check(){
		if(parseInt(_n1.val()) >= parseInt(_n2.val())){
			var _s = _n2.find('option[value = '+_n1.val()+']');
			_n2o.attr('selected', false);
			_s.attr('selected', 'selected');
		}
		if(parseInt(_n2.val()) > parseInt(_n1.val())){
			var _s = _n1.find('option[value = '+_n1.val()+']');
			_n1o.attr('selected', '');
			_s.attr('selected', 'selected');
		}
	}
	check();
	
	$('form').change(function(){
		check();
	});
};
function initSlider(){
		$('#width-custom, #height-custom').each(function(){
			var _this = $(this);
			var _max = (this.id == 'width-custom') ? 350 : 700;
			var _t;
			var _sizeForm = $('input[name = "form-size"]');
			var _slider = $(this).parent().find('div.slider').slider({
				range: "min",
					value: 100,
					min: 150,
					max: _max,
					slide: function( event, ui ) {
						_this.val( ui.value );
						_sizeForm.attr('checked', false);
							if(_t)clearTimeout(_t);
							_t = setTimeout(function(){
								formGenerator.update();
							},300);
					}
				});
			if(_this.attr('id') == 'width-custom'){
				_this.val( 300 );
			}else{
				_this.val( 600 );
			}
			//_this.val( 500 );
			_slider.slider( "value" , _this.val() );
			_this.blur(function(){
				_slider.slider( "value" , _this.val() );
				_sizeForm.attr('checked', false);
			});
			_this.keyup(function(){
				if(_t)clearTimeout(_t);
				_t = setTimeout(function(){
					_slider.slider( "value" , parseInt(_this.val()) || 100 )
					_this.val(_slider.slider( "value" ));
					_sizeForm.attr('checked', false);
					formGenerator.update();
				},300);
			});
		});
		//$('#width-custom').slider( "value" , 300 );
		//$('#height-custom').slider( "value" , 600 );
}
	var ViewModel = function() {
		return {
			directValues : {
				id : $('#SubId'),
				ft : $('#form-ttl'),
				bg : $('#bgcolor'),
				bc : $('#brdcolor'),
				tc : $('#ttlcolor'),
				tbc : $('#tabcolor'),
				cr : $('#currency'),
				'ts[0]' : $('#tabtype1'),//h
				'ts[1]' : $('#tabtype2'),//t
				'ts[2]' : $('#tabtype3'),//f
				tf : $('#th'),
				tt : $('#tp'),
				tn1 : $('#night1'),
				tn2 : $('#night2'),
				tp : $('#tprice'),
				hp : $('#hprice'),
				fp : $('#aprice'),
				tb : $('#tback'),
				nc : $('#nochange'),
				fo : $('#food'),
				tfo : $('#tfood'),
				fc : $('#fc'),
				hc1 : $('#sfhStars1'),
				hc2 : $('#sfhStars2'),
				tc1 : $('#tStars1'),
				tc2 : $('#tStars2'),
				hr : $('#sfhRooms'),
				ha : $('#hotelPassengersCount'),
				hac : $('#hotelChildrenCount'),
				ta : $('#tourPassengersCount'),
				tac : $('#tourChildrenCount'),
				fa : $('#ticketsPassengersCount'),
				fac : $('#ticketsChildrenCount'),
				hl : $('#hlocation'),
				hn : $('#hname'),
				on : $('#offer-num'),
				o : $('#soffer'),
				ob : $('#adsbgcolor'),
				l :  $('#logo1')
			},
			dates :{
				td : $('#td'),
				hd1 : $('#hd1'),
				hd2 : $('#hd2'),
				fd1 : $('#fd1'),
				fd2 : $('#fd2')
			},
			sizeCheck :{
				cd : $('.size-selecter input:radio'),
				cw : $('#width-custom'),
				ch : $('#height-custom')
			},
			mainFont : {
				fm : $('.main-font .font-mod'),
				fs : $('#main-font-size'),
				ff : $('#main-font-family'),
				fc : $('#main-font-color')
			},
			offerFont : {
				fm : $('.offers-font .font-mod'),
				fs : $('#soffer-fs'),
				ff : $('#soffer-ff'),
				fc : $('#soffer-fc')
			},
			corners : {
				co : $('.corners-wrapper input[name=corners]:radio')
			}
		}
	}

	var FormGenerator = (function(){
		var FormGenerator = function () {
			var mainFont,
			iframeWrapper = '.aside .demo-holder',
			code = $('.codeplace textarea'),
			_temp = '<iframe src="%url%" style="width:%w%px;height:%h%px;border:none;"></iframe>',
			hotel={},
			avia = {},
			vm = ViewModel(),
			co,wh = null,
			ch = null,
			cw = null,
			s = null,
			date = new Date(),
			home_path = window.forms_link,
			requestString = home_path,
			params = {},
			obj = this
			
			this._updateModel = function(){
				requestString = home_path + '?';
				for(var _i in params){
					requestString += _i + '=' + params[_i].replace('#', '') + '&';
				}
							
				for(var _i in vm.dates){
					requestString += _i + '=' + this._returnDaysFromToday(vm.dates[_i].datepicker( "getDate" )) + '&';
				}
				requestString = requestString.substr(0, requestString.length-1);
				if(wh){
					requestString += '&wh=' + wh + '&s=' + s;
				}
				requestString += '&co=' + co;
				requestString += '&mf=' + mainFont;
				requestString += '&of=' + offerFont;
				requestString = encodeURI(requestString);
			};
			this._returnDaysFromToday = function(dateStr){
				var _date = new Date();
				var _d = dateStr - _date;				
				return Math.ceil(_d/(1000 * 60 * 60 * 24));
			},
			this._updateIframe = function(){
				this._updateValues();
				this._updateModel();
				this.formFrame.width(cw);
				this.formFrame.height(ch);
				if(this.formFrame.attr('src') != requestString){
					//console.dir(requestString.split('&'));
					this.formFrame.attr('src', requestString);
				}
				this._updateCode();
			};
			this._updateCheckbox = function(obj){
				$(obj).each(function(){
					if($(this).attr("checked") == "checked"){ // checkbox check because of no val
						$(this).val(1);
					}else{
						$(this).val(0);
					}
				});
			};
			this._updateCode = function(){
				var template = _temp;
				template = template.replace('%url%', requestString);
				template = template.replace('%w%', wh.split('|')[0]);
				template = template.replace('%h%', wh.split('|')[1]);
				//console.log(template);
				code.val(template);
			};
			this._updateValues = function(){
				this._updateCheckbox([vm.directValues.l, vm.directValues.tp, vm.directValues.hp, vm.directValues.fp, vm.directValues.tb, vm.directValues.nc, vm.directValues.o, vm.directValues.hl, vm.directValues.hn]);
				for(var _i in vm.directValues){
					params[_i] = vm.directValues[_i].val();
				}
				wh = null; // get size from radios and sliders
				vm.sizeCheck.cd.each(function(){
					if($(this).attr('checked') == "checked"){
						wh = $(this).val();
						ch = wh.split('|')[1]*1;
						cw = wh.split('|')[0]*1;
						s = 1;
					}
				});
				if(!wh){ // dimension sliders values
					ch = vm.sizeCheck.ch.val()*1;
					cw = vm.sizeCheck.cw.val()*1;
					wh = cw +'|'+ ch;
					s ='';
				}
				
				vm.corners.co.each(function(){ // check corners
					if($(this).attr('checked') == "checked"){
						co = $(this).val();
					}
				});
				mainFont = 'font: '+ vm.mainFont.fs.val() + 'px ' +  vm.mainFont.ff.val() + ';';
				offerFont = 'font: '+ vm.offerFont.fs.val() + 'px ' +  vm.offerFont.ff.val() + ';';
				//console.log(vm.mainFont.fc.val());
				mainFont += "color:|" + vm.mainFont.fc.val().replace(/#/g, '') + ';';
				offerFont += "color:|" + vm.offerFont.fc.val().replace(/#/g, '') + ';';
				vm.mainFont.fm.each(function(){ 
					if($(this).hasClass('activated')){
						switch ($(this).attr('href')){
							case 'bold':
								mainFont += 'font-weight:bold;';
								break;
							case 'italic':
								mainFont += 'font-style:italic;';
								break;
							case 'underline':
								mainFont += 'text-decoration:underline;';
								break;
						}
						
					}
				});
				vm.offerFont.fm.each(function(){ 
					if($(this).hasClass('activated')){
						switch ($(this).attr('href')){
							case 'bold':
								offerFont += 'font-weight:bold;';
								break;
							case 'italic':
								offerFont += 'font-style:italic;';
								break;
							case 'underline':
								offerFont += 'text-decoration:underline;';
								break;
						}
						
					}
				});
				
			};
			return {
				init : function(){
					this._element = $(this);
					this.updateValues();
					this.createIframe('formFrame');
					this.update();
				},
				update : function(){
					obj._updateIframe();
					this.requestString = requestString;
				},
				updateValues : function(){
					obj._updateValues();
				},
				createIframe : function (id){
					var _id = id || 'formFrame';
					if($('#'+_id).length === 0){
						var _iframe = $('<iframe class="generated-form" style="width:100%; height:800px;"></iframe>'); // calc height
						_iframe.attr('id', _id);
						_iframe.attr('src', requestString);
						$(iframeWrapper).append(_iframe);
						obj.formFrame = _iframe; // add existence check
					}else{
						var _iframe = $('#'+_id);
						obj.formFrame = _iframe; // add existence check
					}
				}
			};
		};
		return function () {
			return new FormGenerator();
		};
	})();

function initColorpicker(){
	$('.colorpick').each(function(){
		var _ico = $(this).find('.colorSelector');
		var _field = $(this).find('input:text');
		var _form =  _field.parents('form');
		var _t;
		_ico.css('backgroundColor', _field.val());
		_ico.ColorPicker({
			onBeforeShow: function () {
				$(this).ColorPickerSetColor(_field.val());
				_ico.css('backgroundColor', _field.val());
			},
			onShow: function (colpkr) {
				$(colpkr).fadeIn(500);
				return false;
			},
			onHide: function (colpkr) {
				$(colpkr).fadeOut(500);
				return false;
			},
			onChange: function (hsb, hex, rgb) {
				_field.val('#' + hex);
				_ico.css('backgroundColor', '#' + hex);
				
				if(_t)clearTimeout(_t);
				_t = setTimeout(function(){
					_form.trigger("change");
				},300);
				
			}
		});
		_field.bind('keyup', function(){
			$(this).ColorPickerSetColor(_field.val());
			_ico.css('backgroundColor', '#' + $(this).ColorPickerGetColor(_field.val()));
			
			if(_t)clearTimeout(_t);
			_t = setTimeout(function(){
				_form.trigger("change");
			},300);
		});
	});
}

function initTabs() {
	$('.tabs-titles ul').each(function(){
		var _list = $(this);
		var _links = _list.find('a');

		_links.each(function() {
			var _link = $(this);
			var _href = _link.attr('href');
			var _tab = $(_href);

			if(_link.hasClass('active')) _tab.show();
			else _tab.hide();

			_link.click(function(){
				_links.filter('.active').each(function(){
					$($(this).removeClass('active').attr('href')).hide();
				});
				_link.addClass('active');
				_tab.fadeIn();
				return false;
			});
		});
	});
}