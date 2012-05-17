_search_domain = 'travelmenu.ru';

$(function(){
	searchForms.init();
	var _h = 0;
	$('.bottom').each(function(){
		if ($(this).outerHeight() > _h) _h = $(this).outerHeight();
	});
	
	$('.tab-holder').css({
		paddingBottom: _h+'px',
		height: $('.tabs-area').height() - $('.links-holder').height() - $('.links-holder').offset().top
	});
	
	initTabs($('.tabs-area'));	
});

searchForms = {
	buildNum: 0,
	list: [],
	container: null,
	initialized: false,
	preloadScripts: true,
	selectmenuOptions: {
		style:'dropdown', 
		maxHeight: 100, 
		transferClasses: true
	},
	initForm: function(){
		if ($('#hotel').length) searchForms.hotel.init();
		if ($('#tour').length) searchForms.tour.init();
		if ($('#flight').length) searchForms.flight.init();
	},
	init: function(){
		if(searchForms.initialized)
		{
			return;
		}
		searchForms.initialized = true;
		searchForms.container = $('#sidebar .form-container');
		
		searchForms.initForm();
		$('.button').button();
		
		$('form.search-form .button').bind('click', function(){
			var _form = $(this).parents('.search-form');
			if (_form.hasClass('search-tour')) {
				$('input[ name="p[]"]').remove();
				for (var i = $('#searchFormTourChildCount').val()*1; i > 0; i--){
					$('<input type="hidden" name="p[]" value="7" />').insertAfter($('#searchFormTourChildCount'));
				};
				
				if ($('[name="dt"]:checked').length) $('[name="dt"]:eq(0)').remove(); // гибкие даты
				if ($('[name="nt"]:checked').length) $('[name="nt"]:eq(0)').remove();
				
			} else if (_form.hasClass('search-flight')){
				_form.find(':submit').button('disable');
				window.open('http://' +_search_domain + _form.attr('action') + '?'+ searchForms.flight.getParams(), "");
				return false;
			} else {
				for (var i = $('#sfhChildrenCount').val()*1; i > 0; i--){
					$('<input type="hidden" name="oc[0][]" value="7" />').insertAfter($('#sfhChildrenCount'));
				};
			}
			_form.find(':submit').button('disable');
			window.open('http://'+ _search_domain + _form.attr('action') + '?'+ _form.serialize(), "");
			return false;
		});
		$('.offers a').click(function(){
			window.open(this.href);
			return false;
		})
		initSearchForm();
	},
	hotel: {
		
	},
	tour: {
		
	},
	flight: {
		
	}
}
function initSearchForm(){
	
	var blockLocationSelect = $('#block_location_select');
	var blockLocationInput = $('#block_location_input');
	var selectorCity = $('#selector_city');
	var selectorCountry = $('#selector_country');
	var hotelSearchFormAutocompleteCountryCode = $('#hotelSearchFormAutocompleteCountryCode');
	var hotelSearchFormAutocompleteCityId = $('#hotelSearchFormAutocompleteCityId');
	

	
	selectorCountry.change(function() {
		var countryCode = $(this).val();
		if (countryCode) {
			$('#ct').val('');
		} else {
			$('#cn').val('');
			$('#ct').val('');
			hotelSearchFormAutocompleteCountryCode.val('');
		}
		loadCities(countryCode);
	});
	
	selectorCity.change(function() {
		var countryCode = selectorCountry.val();
		var cityId = $(this).val();
		
		$('#cn').val(countryCode);
		$('#ct').val(cityId);
		hotelSearchFormAutocompleteCountryCode.val(countryCode);
		hotelSearchFormAutocompleteCityId.val(cityId);
		searchForms.hotel.loadGeoLocations();
	});
	
	function loadCities(countryCode, defCityId) {
		if (countryCode) {
			var data = {cc: countryCode, buildNum: searchForms.buildNum, language: $('#currentLanguage').text()};
			if (location.href.match(/nocache=/i)) {
				data.nocache = 1;
			}
			$.ajax({
				async   : true,
				type    : "GET",
				url     : "/a_ajax/location.getCountryCities",
				dataType: "json",
				data    : data,
				success : function(data) {
					selectorCity.children().not(':first').remove();
					for (var i in data) {
						var option = $('<option></option>').val(data[i].id).text(data[i].name);
						if (defCityId && defCityId == data[i].id) {
							option.attr('selected', 'selected');
						}
						option.appendTo(selectorCity);
					}
					selectorCity.removeAttr('disabled');
				}
			});
		} else {
			clearCities();
		}
		searchForms.hotel.loadGeoLocations();
	}
	
	function clearCities() {
		selectorCity.val('').attr('disabled', 'disabled').children().not(':first').remove();
	}
	
	//$('#sfhStars, #sftStars').tmstars();
	
	$('input.datepicker').each(function(){
		dateInput = $(this);
		var date;
		var currentDate = new Date();
		
		dateInput.click(function(){
			date = $(this).val();
		});
		
		dateInput.blur(function(){
			_this = $(this);
			var flag = true;
			var val = _this.val();
			var mas = val.split('.');
			if(mas.length == 3){
				if(mas[2].length > 4 || mas[2] < currentDate.getFullYear()){
					_this.val(date);
					flag = false;
				} else if (mas[1].length > 2 || mas[1] <= currentDate.getMonth() || mas[2] < 13) {
					_this.val(date);
					flag = false;
				}
				if(flag){
					var newDate = new Date();
					var year = mas[2];
					var month = mas[1].toString();
					var dayCount = new Date(year, month, 0).getDate();
					if (mas[0] <= 0 || mas[0] > dayCount){
						_this.val(date);
						flag = false;
					}
				}
			} else {
				_this.val(date);
			}
		});
	});
	
	var handleNights = handleMinMax($('select[name="nf"]'), $('select[name="nt"]'), 0)
	handleNights.init();
	var handleStars = handleMinMax($('#sftStars1, #sfhStars1'), $('#sftStars2, #sfhStars2'), 0)
	handleStars.init();
}

function initPriceSlider(_form){
	var _slider = _form.find('.price-slider');
	var _inpMin = _form.find('[name="pf"]');
	var _inpMax = _form.find('[name="pt"]');
	var _more = _form.find('.slider .right');
	var _less = _form.find('.slider .left');
	var slider = rangeSlider({
		element: _slider,
		bounds: {
			min: parseInt(_slider.attr('min'), 10),
			max:  parseInt(_slider.attr('max'), 10)
		},
		defaultValues: {
			min:  parseInt(_slider.attr('defmin'), 10), 
			max:  parseInt(_slider.attr('defmax'), 10)
		},
		//name: 'classSorter',
		step: 500,
		changing: function(ui){
			_inpMin.val(ui.values.min);
			_inpMax.val(ui.values.max);
		},
		changed: function(ui){
		}
	});
	slider._create();
	_inpMin.val(_slider.attr('defmin')).blur(function(){
		slider.min(this.value);
	});
	_inpMax.val(_slider.attr('defmax')).blur(function(){
		slider.max(this.value);
	});
	_more.click(function(){
		slider.max(slider.ui.values.max + slider.options.step);
		return false;
	});
	_less.click(function(){
		slider.min(slider.ui.values.min - slider.options.step);
		return false;
	});
}

function handleMinMax(min, max, minDif){
	return {
		init: function(){
			var _maxV = 0;
			max.find('option').each(function(){
				if (this.value*1 > _maxV) _maxV = this.value*1;
			});
			min.change(function(){
				if (this.value*1 > max.val()*1-minDif) {
					if (this.value*1  > _maxV) max.val(_maxV);
					else max.val(this.value*1 + minDif);
				}
			});
			max.change(function(){
				if (this.value*1 < min.val()*1+minDif) {
					if (this.value*1 < 1) min.val(1);
					else min.val(this.value*1 - minDif);
				}
			});
		}
	}
}


/**
 * TOUR SEARCH
 */
searchForms.tour = {
	initialized: false,
	init: function(){
		if(searchForms.tour.initialized)
		{
			return;
		}
		searchForms.tour.initialized = true;
		var form = $('#searchFormTour');
		if(form.size() == 0)
		{
			return false;
		}
		initPriceSlider(form);
	
		form.find('input[name="df"]').datepicker({
				showAnim: 'fadeIn',
				minDate: '+1d',
				maxDate: '+1y',
				changeMonth: true,
				buttonText: '',
				showOn: "both",
				dateFormat: 'dd.mm.yy',
				buttonImage: "images/bg-calendar.png",
				buttonImageOnly: true
			}
		);
		

		form.find('[name="p[]"]').remove();

		return true;
	}
}
searchForms.flight = {
	form: null,
	initialized: false,
	init: function(){
		if(searchForms.flight.initialized)
		{
			return;
		}
		searchForms.flight.initialized = true;
		var form = searchForms.flight.form = $('#searchFormFlight');
		if(form.size() == 0)
		{
			return false;
		}
		var self = this;
		var _form = this.form;
		initPriceSlider(_form);
		this.codes = [];
		this._date1 = $('#date1');
		this._date2 = $('#date2');
		var _lastDif, d1, d2;
		
		
		
		this.form.find('input#back').change(function(){
			checkBack(this.checked);
		});
		checkBack($('#back').attr('checked'));
		function checkBack(f){
			console.log(f, self._date2, self._date2.parents('.select'));
			if (f) self._date2.parents('.select').show();
			else self._date2.parents('.select').hide();
		}
		
		_form.find('.location').each(function(i){
			if ($.trim(this.value.toLowerCase()) == $(this).attr('title').toLowerCase()) $(this).addClass('text-tip');
			var field = $(this);
			this.ind = i;
			$(this).bind('focus', function(){
				if ($.trim($(this).val().toLowerCase()) == $(this).attr('title').toLowerCase())
				{
					$(this).val('');
				}
				$(this).removeClass('text-tip');
			}).blur(function(){
				if ($.trim($(this).val().toLowerCase()) == '')
				{
					$(this).val($(this).attr('title'));
					$(this).addClass('text-tip');
				}
				
			}).autocomplete({
						delay: 500,
						minLength: 2,
						source: function(request, response) {
							//field.addClass('text-loader');
							request.term = $.trim(request.term);
												var params = {
								q: request.term, 
								id: field.attr('id'), 
								limit: 20, 
								language: $('#currentLanguage').text()
							};
							$.getJSON('/a_search/air.getAirports', params, function(data, status, xhr) {
								response(data.info);
							});
						},
						select: function(event, ui) {
							var c = ui.item.code.toUpperCase();
							var v = ui.item.city + ', ' + ui.item.country + ', ' + ui.item.airport + ' (' + c + ')';
							$(this).val(v);
							self.codes[this.ind] = c;
							return false;
						}
					}).data('autocomplete')._renderItem = function(ul, item) {
						var v = $.trim(field.val().toLowerCase());
						return $('<li></li>')
						.data('item.autocomplete', item)
						.append('<a>' 
							+ (item.city.toLowerCase().indexOf(v) >=0 ? '<b>' + item.city + '</b>' : item.city) 
							+ ', ' 
							+ (item.country.toLowerCase().indexOf(v) >=0 ? '<b>' + item.country + '</b>' : item.country) 
							+ '<i>, ' 
							+ (item.airport.toLowerCase().indexOf(v) >=0 ? '<b>' + item.airport + '</b>' : item.airport) 
							+ ' (' 
							+ (item.code.toLowerCase().indexOf(v) >=0 ? '<b>' + item.code.toUpperCase() + '</b>' : item.code.toUpperCase()) 
							+ ')</i></a>')
							.appendTo(ul)
						;
					};
		});
		
		
		this._date1.datepicker({
			minDate: '+0d',
			maxDate: '+1y',
			buttonText: '',
			changeMonth: true,
			showOn: "both",
			dateFormat: 'dd.mm.yy',
			buttonImage: "images/bg-calendar.png",
			buttonImageOnly: true,
			onSelect: function(dateText, inst) {
				d1 = self._date1.datepicker('getDate').getTime();
				if(d1 >= d2){
					d2 = d1 + _lastDif;
					self._date2.datepicker('setDate', new Date(d2));
				}else _lastDif = d2 - d1;
			}
		});
		this._date2.datepicker({
			minDate: '+0d',
			maxDate: '+1y',
			buttonText: '',
			changeMonth: true,
			showOn: "both",
			dateFormat: 'dd.mm.yy',
			buttonImage: "images/bg-calendar.png",
			buttonImageOnly: true,
			onSelect: function(dateText, inst) {
				d2 = self._date2.datepicker('getDate').getTime();
				if (d1 >= d2)
				{
					d1 = d2 - _lastDif;
					self._date1.datepicker('setDate', new Date(d1));
				}else _lastDif = d2 - d1;
			}
		});
		d1 = self._date1.datepicker('getDate').getTime();
		d2 = self._date2.datepicker('getDate').getTime();
		_lastDif = d2 - d1;

		
		form.find(':disabled').not(':submit').removeAttr('disabled');
		form.find(':submit').button('enable');
	},
	getParams: function(){
		/*
		в одну сторону   af0=HRK&at0=KBP&dt0=08.04.2012&tm0=0	&tp=ONEWAY&bcc=-1&cl=ECONOMY&p[]=19&p[]=19&pf=&pt=
		с обратным       af0=HRK&at0=KBP&dt0=08.04.2012&tm0=0
						&af1=KBP&at1=HRK&dt1=09.04.2012&tm1=0	&tp=ROUNDTRIP&bcc=-1&cl=ECONOMY&p[]=19&p[]=19&pf=&pt=
		*/
		var trip1 = 'Subid='+$('.Subid').val()+'&af0='+this.codes[0]+'&at0='+this.codes[1]+'&dt0='+this._date1.val()+'&tm0=0&';
		var bcc = $('#bcc').is(':checked') ? 'bcc=0' : 'bcc=-1';
		var ages = ags($('#searchFormFlightAdultCount').val()*1, 19)+ags($('#searchFormFlightChildCount').val()*1, 7)
		
		function ags(n, val){
			if (n==0) return '';
			var _str = '';
			for (var i=0; i<n; i++){
				_str += ('&p[]='+val);
			}
			return _str;
		}
		
		if (this.form.find('#back').is(':checked')){
			var trip2 = 'af1='+this.codes[1]+'&at1='+this.codes[0]+'&dt1='+this._date2.val()+'&tm1=0&';
			return trip1+trip2+bcc+ages+'&tp=ROUNDTRIP&'+this.form.serialize();
		}else{
			return trip1+bcc+ages+'&tp=ONEWAY&'+this.form.serialize();
		}
	}
}
searchForms.hotel = {
	geoCache: {},
	loadGeoLocations : function() {
		var geoLocationSelector = $('#geoLocation');
		var geoDistanceSelector = $('#geoDistance');
		var geoLoader = $('#sfhGeoLoader');
		var geolocid = 0; 
		var cityId = $('#sfhLocationCityId').val();
		geoLocationSelector.attr('disabled', 'disabled');
		geoDistanceSelector.attr('disabled', 'disabled');
		var _geoLocs = {'0CNTR':'Центр','PPL':'Популярные места','AIRP':'Аэропорт','MUS':'Музеи','OPRA':'Оперы','AMUS':'Развлекательные центры','RSTN':'ЖД станции','MNMT':'Памятники','NOLOCATION':'Не выбрано','LOADING':'Загружается','NOITEMS':'Гео объектов не найдено'};
		if (!isNaN(cityId) && cityId > 0) 
		{
			geoLocationSelector.parents(':eq(1)').hide();
			geoLoader.fadeIn();
			geoLocationSelector.children().not(':first').remove();
			var drawList = function(){
				var geolocid = $('#sfh input[name="geoLocationId"]').val();
				/*var gl = new RegExp('[\\?&]gl=([^&#]*)').exec(window.location.href);
				if(gl)
				{
					geolocid = gl[1];
				}*/
				var currCategory = '';
				var optgroup = null;
				for (var i in searchForms.hotel.geoCache[cityId])
				{
					var item = searchForms.hotel.geoCache[cityId][i];
					var option = $('<option></option>');
					if (item.category == '0CNTR')
					{
						option.val(item.id).text('Центр');
					}
					else
					{
						if (currCategory != item.category)
						{
							currCategory = item.category;
							optgroup = $('<optgroup></optgroup>').attr('label', _geoLocs[currCategory]).appendTo(geoLocationSelector);
						}
						option.val(item.id).text(item.name);
					}
					if (geolocid == item.id)
					{
						option.attr('selected', 'selected');
					}
					option.appendTo(optgroup == null ? geoLocationSelector : optgroup);
				}
				geoLoader.hide();
				geoLocationSelector.parents(':eq(1)').fadeIn();
				geoLocationSelector.removeAttr('disabled');
				geoDistanceSelector.removeAttr('disabled');
			};
			var noCache = location.href.match(/nocache=/i);
			if(cityId in searchForms.hotel.geoCache && !noCache)
			{
				drawList();
				return;
			}
			else
			{
				var params = {
					cityid : cityId, 
					buildNum: searchForms.buildNum
				};
				if(noCache)
				{
					params.nocache = 1;
				}
				$.getJSON('/a_ajax/location.getGeoLocations', params, function(data) {
					if (data.error == 0)
					{
						searchForms.hotel.geoCache[cityId] = data.locations;
						drawList();
					}
					else
					{
						geoLoader.hide();
						geoLocationSelector.parents(':eq(1)').fadeIn();
					}
				});
			}
		}
	},
	form : null,
	initialized : false,
	init: function(){
		if(searchForms.hotel.initialized)
		{
			return true;
		}
		var form = searchForms.hotel.form = $('#sfh');
		if(form.size() == 0)
		{
			return false;
		}
		initPriceSlider(form);
		

		
		/*
		 * Dates
		 */
		var dateCI = $('#sfhDateCheckIn');
		var dateCO = $('#sfhDateCheckOut');
		var datePickerPropsCi = {
			showAnim: 'fold',
			minDate: '+0d',
			maxDate: '+1y',
			buttonText: '',
			changeMonth: true,
			showOn: "both",
			dateFormat: 'dd.mm.yy',
			buttonImage: "images/bg-calendar.png",
			buttonImageOnly: true,
			beforeShow: function(input, inst) {
				oldDate = $(this).datepicker('getDate');
			}	
		};
		var datePickerPropsCo = {
				showAnim: 'fold',
				minDate: '+1d',
				maxDate: '+1y',
				buttonText: '',
				changeMonth: true,
				showOn: "both",
				dateFormat: 'dd.mm.yy',
				buttonImage: "images/bg-calendar.png",
				buttonImageOnly: true,
				beforeShow: function(input, inst) {
					oldDate = $(this).datepicker('getDate');
				}	
		};
		if (searchForms.hotel.form.find('input[name="search_type"]').val() == 8) { // ski, allow sundays only
			$.extend(datePickerPropsCi, {
				beforeShowDay: function(date) {
					dayOfWeek = date.getDay();
					return [dayOfWeek == 0, ''];
				}
			});
			$.extend(datePickerPropsCo, {
				beforeShowDay: function(date) {
					dayOfWeek = date.getDay();
					return [dayOfWeek == 0 && date.getTime() - (new Date()).getTime() >= 7*24*60*60*1000, ''];
				}
			});
		}
		dateCI.datepicker($.extend({
				defaultDate: dateCI.val(),
				onSelect: function(dateText, inst) {
					var d1 = dateCI.datepicker('getDate');
					var d2 = dateCO.datepicker('getDate');
					var delta = d2 - oldDate;
					delta = (delta < 24*60*60*1000 ? 4*24*60*60*1000 : delta);
					if(d1 >= d2)
					{
						d2.setTime(d1.getTime() + delta);
						dateCO.datepicker('setDate', d2);
					}
				}
			},
			datePickerPropsCi
		));
		dateCO.datepicker($.extend({
				defaultDate: dateCO.val(),
				onSelect: function(dateText, inst) {
					var d1 = dateCI.datepicker('getDate');
					var d2 = dateCO.datepicker('getDate');
					var delta = oldDate - d1;
					delta = (delta < 24*60*60*1000 ? 4*24*60*60*1000 : delta);
					if(d1 >= d2)
					{
						d1.setTime(d2.getTime() - delta);
						dateCI.datepicker('setDate', d1);
					}
				}
			},
			datePickerPropsCo
		));
		
		/*
		 * LOCATION autocomplete
		 */
		var locationText = $('#sfhLocationText');
		var locationCountryCode = $('#sfhLocationCountryCode');
		var locationCityId = $('#sfhLocationCityId');
		var locationInput = $('#sfhLocationInput');
		var countrySelector = $('#sfhCountrySelector');
		var citySelector = $('#sfhCitySelector');
		var autocompleteCache = {};
		locationInput.bind('focus', function(){
			if($.trim(locationInput.val().toLowerCase()) == locationInput.attr('title').toLowerCase())
			{
				locationInput.val('');
			}
			locationInput.removeClass('text-tip');
		}).blur(function(){
			locationInputChange(false);
		}).autocomplete({
			delay: 500,
			autoFocus: true,
			minLength: 2,
			source: function(request, response) {
				locationInput.addClass('text-loader');
				request.term = $.trim(request.term);
				if(request.term in autocompleteCache && !location.href.match(/nocache=/i))
				{
					response(autocompleteCache[request.term]);
					locationInput.removeClass('text-loader');
					return;
				}
				var data = {
						limit: 10,
						text: locationInput.val(),
						buildNum: searchForms.buildNum,
						language: $('#currentLanguage').text()
				};
				if (location.href.match(/nocache=/i)) {
					data.nocache = 1;
				}
				lastXhr = $.getJSON('/a_search/hotel.loadLocations', data, function(data, status, xhr) {
					autocompleteCache[data.text] = data.list;
					if (xhr === lastXhr)
					{
						if(data.text == locationInput.val())
						{
							response(data.list);
						}
					}
					locationInput.removeClass('text-loader');
				});
			},
			select: function(event, ui) {
				locationCountryCode.val(ui.item.coc);
				locationCityId.val(ui.item.cid);
				//loadHotels(ui.item.cid);
				locationInput.val(ui.item.cit + ', ' + ui.item.cot);
				locationText.val($.trim(locationInput.val()));
				searchForms.hotel.loadGeoLocations();
				return false;
			},
			change: function(event, ui) {
				if (locationInput.val() == '') citySelector.parents(':eq(1)').hide();
				locationInputChange(false);
			}
		}).data('autocomplete')._renderItem = function(ul, item) {
			var v = $.trim(locationInput.val().toLowerCase());
			return $('<li></li>')
				.data('item.autocomplete', item)
				.append('<a>' 
					+ (item.cit.toLowerCase().indexOf(v) >=0 ? '<b>' + item.cit + '</b>' : item.cit) 
					+ ', ' 
					+ (item.cot.toLowerCase().indexOf(v) >=0 ? '<b>' + item.cot + '</b>' : item.cot) 
					+ '</a>')
					.appendTo(ul)
				;
		};
		function locationInputChange(_f){
			if($.trim(locationText.val().toLowerCase()) != $.trim(locationInput.val().toLowerCase()) || $.trim(locationInput.val().toLowerCase()) == '')
			{
				locationCountryCode.val('');
				locationCityId.val(0);
				locationText.val('');
				if (_f) locationInput.val(locationInput.attr('title'));
			}
			if($.trim(locationInput.val().toLowerCase()) == locationInput.attr('title').toLowerCase() || $.trim(locationInput.val().toLowerCase()) == ''){
				locationInput.addClass('text-tip');
			}
		}
		//locationInputChange(true);
		/*
		 * LOCATION selectors
		 */
		var enterLocationBlock = $('#sfhEnterLocationBlock');
		var chooseLocationBlock = $('#sfhChooseLocationBlock');
		var citiesLoader = $('#search-form-choose-cities-loader');
		var anyCityText = citySelector.find('option:first').text();
		var otherCityText = $('#sfhMoreCitiesText').text();
		var citiesExpanded = false;
		var citiesCache = {};
		var onCitySelectorChange = function(){};
		var renderCities = function(){
			var countryCode = countrySelector.val();
			//citySelector = $('<select class="big-select big" id="sfhCitySelector"></select>');
			citySelector.empty();
			$('<option value="0" title="title"></option>').text(anyCityText).appendTo(citySelector);
			var totalCount = 0;
			var visibleCount = 0;
			for(var i in citiesCache[countryCode])
			{
				totalCount++;
				var tacc = citiesCache[countryCode][i];
				
				if(citiesExpanded || (tacc.rated != undefined && tacc.rated) || locationCityId.val() == tacc.id)
				{
					$('<option></option>').attr('value', tacc.id).text(tacc.name).appendTo(citySelector);
					visibleCount++;
				}
			}
			
			if(visibleCount == 0)
			{
				for(var i in citiesCache[countryCode])
				{
					var tacc = citiesCache[countryCode][i];
					$('<option></option>').attr('value', tacc.id).text(tacc.name).appendTo(citySelector);
				}
				citiesExpanded = true;
			}
			else if(visibleCount != totalCount)
			{
				$('<option value="+"></option>').text(otherCityText).appendTo(citySelector);
			}
			citySelector.val(locationCityId.val())//.bind('change', onCitySelectorChange)//.insertAfter(citiesLoader);
			citiesLoader.hide();
			citySelector.parents(':eq(1)').show();
		};
		
		onCitySelectorChange = function(){
			
			if($(this).val() == '+')
			{
				citySelector.parents(':eq(1)').hide();
				citiesExpanded = true;
				citySelector.empty();
				citiesLoader.show().animate({top: '+=0px'}, 500, function(){
					renderCities();
				});
			}
			else
			{
				locationCityId.val($(this).val());
				//loadHotels($(this).val());
				locationInput.val($(this).find('option[value="' + $(this).val() + '"]').text() + ', ' + countrySelector.find('option[value="' + countrySelector.val() + '"]').text());
				locationText.val(locationInput.val());
				//console.log('onCitySelectorChange');
				searchForms.hotel.loadGeoLocations();
			}
		};
		
		var loadCities = function(){
			var countryCode = $.trim(countrySelector.val());
			if(countryCode.length == 0)
			{
				return;
			}
			citySelector.empty();
			citiesLoader.show();
			
			var params = {
				cc: countryCode, 
				buildNum: searchForms.buildNum, 
				language: $('#currentLanguage').text()
			};
			var noCache = location.href.match(/nocache=/i);
			if(noCache)
			{
				params.nocache = 1;
			}
			
			if(!noCache && countryCode in citiesCache)
			{
				renderCities();
			}
			else
			{
				$.ajax({
					async   : true,
					type    : 'GET',
					url     : '/a_ajax/location.getCountryCities',
					dataType: 'json',
					data    : params,
					cache   : !noCache,
					success : function(data) {
						if (countrySelector.val() == data.country_code) {
							citiesCache[data.country_code] = data.list;
							renderCities();
						}
						
					}
				});
			}
			
		};
		var loadHotels = function(_id){
			$.ajax({
				async   : true,
				type    : 'GET',
				url     : '/a_search/tour.getCityHotels?cityId='+_id,
				dataType: 'json',
				//data    : params,
				//cache   : !noCache,
				success : function(data) {
					/*if (countrySelector.val() == data.country_code) {
						citiesCache[data.country_code] = data.list;
						renderHotels();
					}*/
					//console.log(data);
				}
			});
		}
		
		/*
		 * Country selector
		 */
		countrySelector.bind('change', function(){
			citiesExpanded = false;
			citySelector.parents(':eq(1)').hide();
			locationCountryCode.val($(this).val());
			locationCityId.val(0);
			locationInput.val(countrySelector.find('option[value="' + countrySelector.val() + '"]').text());
			locationText.val(locationInput.val());
			loadCities();
			searchForms.hotel.loadGeoLocations();
			
		});
		citySelector.bind('change', onCitySelectorChange)//.insertAfter(citiesLoader);
		/*
		 * City selector
		 */
		/*citySelector.selectmenu($.extend({
			change: function(event, data){
				locationCityId.val($(this).val());
			} 
		}, searchForms.selectmenuOptions));*/
		
		
		/*
		 * Choose location link
		 */
		$('#sfhChooseLocationLink').click(function(){
			enterLocationBlock.hide();
			chooseLocationBlock.show();
			
			if ($.trim(locationText.val().toLowerCase()) != $.trim(locationInput.val().toLowerCase())){
				countrySelector.val('');
				citySelector.parents(':eq(1)').hide();
			}
			else {
				countrySelector.val(locationCountryCode.val());
				//if(citySelector.find('option').size() == 1)
			//	{
					loadCities();
			//	}
			}
			return false;
		});
		
		if(enterLocationBlock.is(':hidden'))
		{
			$('#sfhChooseLocationLink').click();
		}
		else
		{
			/*
			 * Enter location link
			 */
			$('#sfhEnterLocationLink').click(function(){
				chooseLocationBlock.hide();
				enterLocationBlock.fadeIn();
				return false;
			});
		}
		
		
		searchForms.hotel.loadGeoLocations();

		form.find(':disabled').not(':submit,#geoLocation,#geoDistance').removeAttr('disabled');
		form.find(':submit').button('enable');

		return true;
	}
}



var initTabs = function(tabsContainer){
	var tabs = tabsContainer.find('.tab-links li a');
	var tabsBlocks = tabsContainer.find('.tab');
	tabs.each(function(i, o){
		//var _sliderInited = false;
		var tab = $(o);
		tab.click(function(){
			if(tab.parent().hasClass('active'))
			{
				return false;
			}
			openTab(tab);
			/*if (!_sliderInited){
				_sliderInited = true;
				initPriceSlider($(this.hash));
			}*/
			return false;
		});
		if (tab.parent().hasClass('active')) {
			openTab(tab);
			/*if (!_sliderInited){
				_sliderInited = true;
				initPriceSlider($(this.hash));
			}*/
		}
	});
	function openTab(tab){
		tabs.parent().removeClass('active');
		tab.parent().addClass('active');
		tabsBlocks.hide()
		$(tab.get(0).hash).fadeIn();
	}
};
function handleTabsWidth(){
	var _w = $('.links-holder').width();
	var _wl = 0;
	$('.links-holder li').each(function(){
		_wl+= $(this).outerWidth(true);
	});
	_wl-= parseInt($('.links-holder li').css('marginLeft'));
	var _p = (_w-_wl)/($('.links-holder li').length*2);
	$('.links-holder li a').css('padding', '5px '+_p+'px');
}
function rangeSlider(options) {
	return {
		options: options,
		_values: null,

		// Created elements
		bar: null,
		leftHandle: null,
		rightHandle: null,
		innerBar: null,
		container: null,
		arrows: null,
		changing: function(){},
		changed: function(){},

		// Scroll management
		lastWheel : 0,
		lastScroll: 0,
		scrollCount: 0,

		_create: function(){
			$.extend({
				bounds: {min:0, max:10},
				defaultValues: {min:2, max:7},
				wheelMode: null,
				wheelSpeed: 4,
				arrows: false,
				step: 0.1,
				valueLabels: "", // 'show'
				formatter: function(value){
					return value;
				}
			}, this.options);
			this.round = this.options.step.toString().split('.')[1] ? this.options.step.toString().split('.')[1].length : 0;

			this._values = this.options.defaultValues;
			this.arrows = {left:null, right:null};
			this.changing = {min:false, max:false};
			this.changed = {min:false, max:false};
			this.f = false;

			this.leftHandle = $("<div class='ui-rangeSlider-handle  ui-rangeSlider-leftHandle' />")
				.bind('mousedown', $.proxy(this._mousedown, this))
				.css("position", "absolute");
			this.rightHandle = $("<div class='ui-rangeSlider-handle ui-rangeSlider-rightHandle' />")
				.bind('mousedown', $.proxy(this._mousedown, this))
				.css("position", "absolute");

			this.innerBar = $("<div class='ui-rangeSlider-innerBar' />")
				.css("position", "absolute")
				.css("top", 0)
				.css("left", 0);

			this.container = $("<div class='ui-rangeSlider-container' />")
				.css("position", "absolute");

			this.bar = $("<div class='ui-rangeSlider-bar' />").css("position", "absolute");


			$(document).bind('mousemove', $.proxy(this._mousemove, this))
			if (window.addEventListener) {document.addEventListener('mouseup', $.proxy(this._mouseup, this));}
			else if (window.attachEvent && !window.opera) {document.attachEvent("onmouseup", $.proxy(this._mouseup, this));}

			this.container
				.append(this.leftHandle)
				.append(this.rightHandle)
				.append(this.innerBar)
				.append(this.bar);

			this.element = this.options.element
				.append(this.container)
				.addClass("ui-rangeSlider");

			if (this.element.css("position") != "absolute"){
				this.element.css("position", "relative");
			}
			this._initWidth();
			this.ui = {};
			this.ui.values = {};
			this.ui.values.min = this.options.defaultValues.min;
			this.ui.values.max = this.options.defaultValues.max;
			this.ui.valuesLast = {
				min : this.ui.values.min,
				max : this.ui.values.max
			};
			this.leftHandle.css('left', this._getPos(this.options.defaultValues.min)).text(this.options.valueLabels ? this.options.formatter(this.ui.values.min): '');
			this.rightHandle.css('left', this._getPos(this.options.defaultValues.max)).text(this.options.valueLabels ? this.options.formatter(this.ui.values.max) : '');
			this._setBar();
		},

		_mousedown: function(e){
			this.activeHandle = $(e.target);
			this.f = true;
			this._m = this.activeHandle.hasClass('ui-rangeSlider-leftHandle') ? 'min' : 'max';
			return false;
		},

		_mousemove: function(e){
			if (this.f){
				if (this._m == 'min'){
					var _minBound = 0;
					var _maxBound = this.rightHandle.position().left - 2*this.rightHandle.outerWidth(true);
				} else {
					var _minBound = this.leftHandle.position().left + 2*this.rightHandle.outerWidth(true);
					var _maxBound = this.container.width();
				}
				var _l = e.pageX - this.container.offset().left;
				if (_l < _minBound) _l = _minBound;
				else if (_l > _maxBound) _l = _maxBound;
				this.ui.values[this._m] = this._getValues(_l);
				
				this.activeHandle.css('left',_l);
				this.activeHandle.text(this.options.valueLabels ? this.options.formatter(this._getValues(_l)) : '');
				this._setBar();
				if (typeof this.options.changing == 'function') this.options.changing(this.ui);
			}
			return false;
		},

		_mouseup: function(){
			if (this.f){
				this.f = false;
				if (this.ui.valuesLast[this._m] != this.ui.values[this._m]){
					this.ui.valuesLast[this._m] = this.ui.values[this._m];
					this.options.changed(this.ui);
				}
				return false;
			}
			
		},

		adjust: function(_v){
			return (Math.round(_v/this.options.step)*this.options.step).toFixed(this.round);
		},

		_initWidth: function(){
			this.container.css({width: this.element.width() - this.leftHandle.outerWidth()/* - this.rightHandle.outerWidth()*/,
								marginLeft: this.leftHandle.outerWidth()/2});
			this.innerBar.css({
				"width": this.container.width() - this.innerBar.outerWidth() + this.innerBar.width(),
				"marginLeft": -this.leftHandle.outerWidth()/2
			});
			this.leftHandle.css("marginLeft", -this.leftHandle.outerWidth()/2);
			this.rightHandle.css("marginLeft", -this.rightHandle.outerWidth()/2);
		},

		_getValues: function(_l){
			return this.adjust(_l/this.container.width()*(this.options.bounds.max - this.options.bounds.min) + this.options.bounds.min)*1;
		},

		_getPos: function(_v){
			return (_v - this.options.bounds.min)*this.container.width()/(this.options.bounds.max - this.options.bounds.min);
		},

		min: function(min){
			if (min < this.options.bounds['min']) min = this.options.bounds['min'];
			if (min > this.ui.values.max)  min = this.ui.values.max;
			this._setValue('min', min);
			this._initChangeEvent();
		},

		max: function(max){
			if (max > this.options.bounds['max']) max = this.options.bounds['max'];
			if (max < this.ui.values.min)  max = this.ui.values.min;
			this._setValue('max', max);
			this._initChangeEvent();
		},
		
		values: function(min, max){
			if (min != undefined && max != undefined){
				if (min < this.options.bounds[min]) min = this.options.bounds[min];
				if (max > this.options.bounds[max]) max = this.options.bounds[max];
				
				if (min > max)  min = max;
				
				this._setValue('min', min);
				this._setValue('max', max);
				this._initChangeEvent();
			}else{
				if (min != undefined) this.min(min);
				if (max != undefined) this.max(max);
			}
		},
		
		_setValue: function (m, val){
			var _handle = (m == 'min') ? this.leftHandle : this.rightHandle;
			this.ui.values[m] = val;
			this.ui.valuesLast[m] = val;
			_handle.css('left', this._getPos(val)).text(this.options.valueLabels ? this.options.formatter(val) : '');
			this._setBar();
		},
		_initChangeEvent: function(){
			if (typeof this.options.changing == 'function') this.options.changing(this.ui);
			this.options.changed(this.ui);
		},

		_setBar: function(){
			this.bar.css({left: this.leftHandle.position().left,
					width: this.rightHandle.position().left - this.leftHandle.position().left
			});
		},
		setBound: function(val, m){
			this.options.bounds[m] = val;
			this._setValue('min', this.ui.values.min);
			this._setValue('max', this.ui.values.max);
		}
	}
}
 /*
 * jQuery UI selectmenu
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI
 */

(function($) {

$.widget("ui.selectmenu", {
	_init: function() {
		var self = this, o = this.options;
		
		//quick array of button and menu id's
		this.ids = [this.element.attr('id') + '-' + 'button', this.element.attr('id') + '-' + 'menu'];
		
		//define safe mouseup for future toggling
		this._safemouseup = true;
		
		//create menu button wrapper
		this.newelement = $('<a class="'+ this.widgetBaseClass +' ui-widget ui-state-default ui-corner-all" id="'+this.ids[0]+'" role="button" href="#" aria-haspopup="true" aria-owns="'+this.ids[1]+'"></a>')
			.insertAfter(this.element);
		
		//transfer tabindex
		var tabindex = this.element.attr('tabindex');
		if(tabindex){ this.newelement.attr('tabindex', tabindex); }
		
		//save reference to select in data for ease in calling methods
		this.newelement.data('selectelement', this.element);
		
		//menu icon
		this.selectmenuIcon = $('<span class="'+ this.widgetBaseClass +'-icon ui-icon"></span>')
			.appendTo(this.newelement)
			.addClass( (o.style == "popup")? 'ui-icon-triangle-2-n-s' : 'ui-icon-triangle-1-s' );	

			
		//make associated form label trigger focus
		$('label[for='+this.element.attr('id')+']')
			.attr('for', this.ids[0])
			.bind('click', function(){
				self.newelement[0].focus();
				return false;
			});	

		//click toggle for menu visibility
		this.newelement
			.bind('mousedown', function(event){
				self._toggle(event);
				//make sure a click won't open/close instantly
				if(o.style == "popup"){
					self._safemouseup = false;
					setTimeout(function(){self._safemouseup = true;}, 300);
				}	
				return false;
			})
			.bind('click',function(){
				return false;
			})
			.keydown(function(event){
				var ret = true;
				switch (event.keyCode) {
					case $.ui.keyCode.ENTER:
						ret = true;
						break;
					case $.ui.keyCode.SPACE:
						ret = false;
						self._toggle(event);	
						break;
					case $.ui.keyCode.UP:
					case $.ui.keyCode.LEFT:
						ret = false;
						self._moveSelection(-1);
						break;
					case $.ui.keyCode.DOWN:
					case $.ui.keyCode.RIGHT:
						ret = false;
						self._moveSelection(1);
						break;	
					case $.ui.keyCode.TAB:
						ret = true;
						break;	
					default:
						ret = false;
						self._typeAhead(event.keyCode, 'mouseup');
						break;	
				}
				return ret;
			})
			.bind('mouseover focus', function(){ 
				$(this).addClass(self.widgetBaseClass+'-focus ui-state-hover'); 
			})
			.bind('mouseout blur', function(){  
				$(this).removeClass(self.widgetBaseClass+'-focus ui-state-hover'); 
			});
		
		//document click closes menu
		$(document)
			.mousedown(function(event){
				self.close(event);
			});

		//change event on original selectmenu
		this.element
			.click(function(){ this._refreshValue(); })
			.focus(function(){ this.newelement[0].focus(); });
		
		//create menu portion, append to body
		var cornerClass = (o.style == "dropdown")? " ui-corner-bottom" : " ui-corner-all"
		this.list = $('<div class="' + self.widgetBaseClass + '-menu ui-widget ui-widget-content'+cornerClass+'" aria-hidden="true" role="listbox" aria-labelledby="'+this.ids[0]+'" id="'+this.ids[1]+'"><div class="top"><div class="l"></div><div class="r"></div></div><div class="c"><ul></ul></div><div class="bottom"><div class="l"></div><div class="r"></div></div></div>').appendTo('body');				
		
		//serialize selectmenu element options	
		var selectOptionData = [];
		this.element
			.find('option')
			.each(function(){
				if ($(this).attr('title') != 'title') {
					selectOptionData.push({
						value: $(this).attr('value'),
						text: self._formatText(jQuery(this).text()),
						selected: $(this).attr('selected'),
						classes: $(this).attr('class'),
						parentOptGroup: $(this).parent('optgroup').attr('label'),
						position: 'static',
						left: 'auto'
					});
				} else {
					selectOptionData.push({
						value: $(this).attr('value'),
						text: self._formatText(jQuery(this).text()),
						selected: $(this).attr('selected'),
						classes: $(this).attr('class'),
						parentOptGroup: $(this).parent('optgroup').attr('label'),
						position: 'absolute',
						left: '-9999px'
					});
				}
			});		
				
		//active state class is only used in popup style
		var activeClass = (self.options.style == "popup") ? " ui-state-active" : "";
		
		//write li's
		for(var i in selectOptionData){
			var thisLi = $('<li role="presentation"><a href="#" tabindex="-1" role="option" aria-selected="false">'+ selectOptionData[i].text +'</a></li>')
				.data('index',i)
				.addClass(selectOptionData[i].classes)
				.css('position',selectOptionData[i].position)
				.css('left',selectOptionData[i].left)
				.data('optionClasses', selectOptionData[i].classes|| '')
				.mouseup(function(event){
						if(self._safemouseup){
							var changed = $(this).data('index') != self._selectedIndex();
							self.value($(this).data('index'));
							self.select(event);
							if(changed){ self.change(event); }
							self.close(event,true);
						}
					return false;
				})
				.click(function(){
					return false;
				});
				
				
			//optgroup or not...
			if(selectOptionData[i].parentOptGroup){
				var optGroupName = self.widgetBaseClass + '-group-' + selectOptionData[i].parentOptGroup;
				if(this.list.find('li.' + optGroupName).size()){
					this.list.find('li.' + optGroupName + ':last ul').append(thisLi);
				}
				else{
					$('<li role="presentation" class="'+self.widgetBaseClass+'-group '+optGroupName+'"><span class="'+self.widgetBaseClass+'-group-label">'+selectOptionData[i].parentOptGroup+'</span><ul></ul></li>')
						.appendTo(this.list)
						.find('ul')
						.append(thisLi);
				}
			}
			else{
				thisLi.appendTo(this.list.find('ul'));
			}
			
			//this allows for using the scrollbar in an overflowed list
			this.list.bind('mousedown mouseup', function(){return false;});
			
			//append icon if option is specified
			if(o.icons){
				for(var j in o.icons){
					if(thisLi.is(o.icons[j].find)){
						thisLi
							.data('optionClasses', selectOptionData[i].classes + ' ' + self.widgetBaseClass + '-hasIcon')
							.addClass(self.widgetBaseClass + '-hasIcon');
						var iconClass = o.icons[j].icon || "";
						
						thisLi
							.find('a:eq(0)')
							.prepend('<span class="'+self.widgetBaseClass+'-item-icon ui-icon '+iconClass + '"></span>');
					}
				}
			}
		}	
		
		//add corners to top and bottom menu items
		this.list.find('li:last').addClass("ui-corner-bottom");
		if(o.style == 'popup'){ this.list.find('li:first').addClass("ui-corner-top"); }
		
		//transfer classes to selectmenu and list
		if(o.transferClasses){
			var transferClasses = this.element.attr('class') || ''; 
			this.newelement.add(this.list).addClass(transferClasses);
		}
		
		//original selectmenu width
		var selectWidth = this.element.width();
		
		//set menu button width
		this.newelement.width( (o.width) ? o.width : selectWidth);
		
		//set menu width to either menuWidth option value, width option value, or select width 
		if(o.style == 'dropdown'){ this.list.width( (o.menuWidth) ? o.menuWidth : ((o.width) ? o.width : selectWidth)); }
		else { this.list.width( (o.menuWidth) ? o.menuWidth : ((o.width) ? o.width - o.handleWidth : selectWidth - o.handleWidth)); }	
		
		//set max height from option 
		if(o.maxHeight && o.maxHeight < this.list.height()){ this.list.height(o.maxHeight); }	
		
		//save reference to actionable li's (not group label li's)
		this._optionLis = this.list.find('li:not(.'+ self.widgetBaseClass +'-group)');
				
		//transfer menu click to menu button
		this.list
			.keydown(function(event){
				var ret = true;
				switch (event.keyCode) {
					case $.ui.keyCode.UP:
					case $.ui.keyCode.LEFT:
						ret = false;
						self._moveFocus(-1);
						break;
					case $.ui.keyCode.DOWN:
					case $.ui.keyCode.RIGHT:
						ret = false;
						self._moveFocus(1);
						break;	
					case $.ui.keyCode.HOME:
						ret = false;
						self._moveFocus(':first');
						break;	
					case $.ui.keyCode.PAGE_UP:
						ret = false;
						self._scrollPage('up');
						break;	
					case $.ui.keyCode.PAGE_DOWN:
						ret = false;
						self._scrollPage('down');
						break;
					case $.ui.keyCode.END:
						ret = false;
						self._moveFocus(':last');
						break;			
					case $.ui.keyCode.ENTER:
					case $.ui.keyCode.SPACE:
						ret = false;
						self.close(event,true);
						$(event.target).parents('li:eq(0)').trigger('mouseup');
						break;		
					case $.ui.keyCode.TAB:
						ret = true;
						self.close(event,true);
						break;	
					case $.ui.keyCode.ESCAPE:
						ret = false;
						self.close(event,true);
						break;	
					default:
						ret = false;
						self._typeAhead(event.keyCode,'focus');
						break;		
				}
				return ret;
			});
			
		//selectmenu style
		if(o.style == 'dropdown'){
			this.newelement
				.addClass(self.widgetBaseClass+"-dropdown");
			this.list
				.addClass(self.widgetBaseClass+"-menu-dropdown");	
		}
		else {
			this.newelement
				.addClass(self.widgetBaseClass+"-popup");
			this.list
				.addClass(self.widgetBaseClass+"-menu-popup");	
		}
		
		//append status span to button
		this.newelement.append('<span class="'+self.widgetBaseClass+'-status">'+ selectOptionData[this._selectedIndex()].text +'</span>');
		
		//hide original selectmenu element
		this.element.hide();
		
		//transfer disabled state
		if(this.element.attr('disabled') == true){ this.disable(); }
		
		//update value
		this.value(this._selectedIndex());
	},
	destroy: function() {
		this.element.removeData(this.widgetName)
			.removeClass(this.widgetBaseClass + '-disabled' + ' ' + this.namespace + '-state-disabled')
			.removeAttr('aria-disabled');
	
		//unbind click on label, reset its for attr
		$('label[for='+this.newelement.attr('id')+']')
			.attr('for',this.element.attr('id'))
			.unbind('click');
		this.newelement.remove();
		this.list.remove();
		this.element.show();	
	},
	_typeAhead: function(code, eventType){
		var self = this;
		//define self._prevChar if needed
		if(!self._prevChar){ self._prevChar = ['',0]; }
		var C = String.fromCharCode(code);
		c = C.toLowerCase();
		var focusFound = false;
		function focusOpt(elem, ind){
			focusFound = true;
			$(elem).trigger(eventType);
			self._prevChar[1] = ind;
		};
		this.list.find('li a').each(function(i){	
			if(!focusFound){
				var thisText = $(this).text();
				if( thisText.indexOf(C) == 0 || thisText.indexOf(c) == 0){
						if(self._prevChar[0] == C){
							if(self._prevChar[1] < i){ focusOpt(this,i); }	
						}
						else{ focusOpt(this,i); }	
				}
			}
		});
		this._prevChar[0] = C;
	},
	_uiHash: function(){
		return {
			value: this.value()
		};
	},
	open: function(event){
		var self = this;
		var disabledStatus = this.newelement.attr("aria-disabled");
		if(disabledStatus != 'true'){
			this._refreshPosition();
			this._closeOthers(event);
			this.newelement
				.addClass('ui-state-active');
			
			this.list
				.appendTo('body')
				.addClass(self.widgetBaseClass + '-open')
				.attr('aria-hidden', false)
				.find('li:not(.'+ self.widgetBaseClass +'-group):eq('+ this._selectedIndex() +') a')[0].focus();	
			if(this.options.style == "dropdown"){ this.newelement.removeClass('ui-corner-all').addClass('ui-corner-top'); }	
			this._refreshPosition();
			this._trigger("open", event, this._uiHash());
		}
	},
	close: function(event, retainFocus){
		if(this.newelement.is('.ui-state-active')){
			this.newelement
				.removeClass('ui-state-active');
			this.list
				.attr('aria-hidden', true)
				.removeClass(this.widgetBaseClass+'-open');
			if(this.options.style == "dropdown"){ this.newelement.removeClass('ui-corner-top').addClass('ui-corner-all'); }
			if(retainFocus){this.newelement[0].focus();}	
			this._trigger("close", event, this._uiHash());
		}
	},
	change: function(event) {
		this.element.trigger('change');
		this._trigger("change", event, this._uiHash());
	},
	select: function(event) {
		this._trigger("select", event, this._uiHash());
	},
	_closeOthers: function(event){
		$('.'+ this.widgetBaseClass +'.ui-state-active').not(this.newelement).each(function(){
			$(this).data('selectelement').selectmenu('close',event);
		});
		$('.'+ this.widgetBaseClass +'.ui-state-hover').trigger('mouseout');
	},
	_toggle: function(event,retainFocus){
		if(this.list.is('.'+ this.widgetBaseClass +'-open')){ this.close(event,retainFocus); }
		else { this.open(event); }
	},
	_formatText: function(text){
		return this.options.format ? this.options.format(text) : text;
	},
	_selectedIndex: function(){
		return this.element[0].selectedIndex;
	},
	_selectedOptionLi: function(){
		return this._optionLis.eq(this._selectedIndex());
	},
	_focusedOptionLi: function(){
		return this.list.find('.'+ this.widgetBaseClass +'-item-focus');
	},
	_moveSelection: function(amt){
		var currIndex = parseInt(this._selectedOptionLi().data('index'), 10);
		var newIndex = currIndex + amt;
		return this._optionLis.eq(newIndex).trigger('mouseup');
	},
	_moveFocus: function(amt){
		if(!isNaN(amt)){
			var currIndex = parseInt(this._focusedOptionLi().data('index'), 10);
			var newIndex = currIndex + amt;
		}
		else { var newIndex = parseInt(this._optionLis.filter(amt).data('index'), 10); }
		
		if(newIndex < 0){ newIndex = 0; }
		if(newIndex > this._optionLis.size()-1){
			newIndex =  this._optionLis.size()-1;
		}
		var activeID = this.widgetBaseClass + '-item-' + Math.round(Math.random() * 1000);
		
		this._focusedOptionLi().find('a:eq(0)').attr('id','');
		this._optionLis.eq(newIndex).find('a:eq(0)').attr('id',activeID)[0].focus();
		this.list.attr('aria-activedescendant', activeID);
	},
	_scrollPage: function(direction){
		var numPerPage = Math.floor(this.list.outerHeight() / this.list.find('li:first').outerHeight());
		numPerPage = (direction == 'up') ? -numPerPage : numPerPage;
		this._moveFocus(numPerPage);
	},
	_setData: function(key, value) {
		this.options[key] = value;
		if (key == 'disabled') {
			this.close();
			this.element
				.add(this.newelement)
				.add(this.list)
					[value ? 'addClass' : 'removeClass'](
						this.widgetBaseClass + '-disabled' + ' ' +
						this.namespace + '-state-disabled')
					.attr("aria-disabled", value);
		}
	},
	value: function(newValue) {
		if (arguments.length) {
			this.element[0].selectedIndex = newValue;
			this._refreshValue();
			this._refreshPosition();
		}
		return this.element[0].selectedIndex;
	},
	_refreshValue: function() {
		var activeClass = (this.options.style == "popup") ? " ui-state-active" : "";
		var activeID = this.widgetBaseClass + '-item-' + Math.round(Math.random() * 1000);
		//deselect previous
		this.list
			.find('.'+ this.widgetBaseClass +'-item-selected')
			.removeClass(this.widgetBaseClass + "-item-selected" + activeClass)
			.find('a')
			.attr('aria-selected', 'false')
			.attr('id', '');
		//select new
		this._selectedOptionLi()
			.addClass(this.widgetBaseClass + "-item-selected"+activeClass)
			.find('a')
			.attr('aria-selected', 'true')
			.attr('id', activeID);
			
		//toggle any class brought in from option
		var currentOptionClasses = this.newelement.data('optionClasses') ? this.newelement.data('optionClasses') : "";
		var newOptionClasses = this._selectedOptionLi().data('optionClasses') ? this._selectedOptionLi().data('optionClasses') : "";
		this.newelement
			.removeClass(currentOptionClasses)
			.data('optionClasses', newOptionClasses)
			.addClass( newOptionClasses )
			.find('.'+this.widgetBaseClass+'-status')
			.html( 
				this._selectedOptionLi()
					.find('a:eq(0)')
					.html() 
			);
			
		this.list.attr('aria-activedescendant', activeID)
	},
	_refreshPosition: function(){	
		//set left value
		this.list.css('left', this.newelement.offset().left);
		
		//set top value
		var menuTop = this.newelement.offset().top+3;
		var scrolledAmt = this.list[0].scrollTop;
		this.list.find('li:lt('+this._selectedIndex()+')').each(function(){
			scrolledAmt -= $(this).outerHeight();
		});
		
		if(this.newelement.is('.'+this.widgetBaseClass+'-popup')){
			menuTop+=scrolledAmt; 
			this.list.css('top', menuTop); 
		}	
		else { 
			menuTop += this.newelement.height();
			this.list.css('top', menuTop); 
		}
	}
});

$.extend($.ui.selectmenu, {
	getter: "value",
	version: "@VERSION",
	eventPrefix: "selectmenu",
	defaults: {
		transferClasses: true,
		style: 'popup', 
		width: null, 
		menuWidth: null, 
		handleWidth: 26, 
		maxHeight: null,
		icons: null, 
		format: null
	}
});

})(jQuery);


