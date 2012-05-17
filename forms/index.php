<?php //$arrivalCountries = {"pop":{"at":"Австрия","eg":"Египет","in":"Индия","id":"Индонезия","it":"Италия","mv":"Мальдивы","th":"Таиланд","fi":"Финляндия","fr":"Франция","ch":"Швейцария"},"all":{"ad":"Andorra","ai":"Anguilla","ag":"Antigua and Barbuda","ar":"Argentina","aw":"Aruba","at":"Austria","bs":"Bahamas","bb":"Barbados","be":"Belgium","bz":"Belize","bm":"Bermuda","bo":"Bolivia","br":"Brazil","vg":"British Virgin Islands","bg":"Bulgaria","kh":"Cambodia","ca":"Canada","ky":"Cayman Islands","cl":"Chile","cn":"China","co":"Colombia","cr":"Costa Rica","hr":"Croatia","cu":"Cuba","cy":"Cyprus","cz":"Czech Republic","dk":"Denmark","do":"Dominican Republic","ec":"Ecuador","eg":"Egypt","sv":"El Salvador","ee":"Estonia","fj":"Fiji","fi":"Finland","fr":"France","pf":"French Polynesia","de":"Germany","gr":"Greece","gd":"Grenada","gp":"Guadeloupe","gt":"Guatemala","hn":"Honduras","hk":"Hong Kong","hu":"Hungary","is":"Iceland","in":"India","id":"Indonesia","ie":"Ireland","il":"Israel","it":"Italy","jm":"Jamaica","jp":"Japan","jo":"Jordan","ke":"Kenya","lv":"Latvia","lt":"Lithuania","my":"Malaysia","mv":"Maldives","mt":"Malta","mu":"Mauritius","mx":"Mexico","me":"Montenegro","ma":"Morocco","mm":"Myanmar (Burma)","nl":"Netherlands","an":"Netherlands Antilles","ni":"Nicaragua","no":"Norway","om":"Oman","pa":"Panama","py":"Paraguay","pe":"Peru","ph":"Philippines","pl":"Poland","pt":"Portugal","pr":"Puerto Rico","ro":"Romania","ru":"Russia","kn":"Saint Kitts and Nevis","lc":"Saint Lucia","rs":"Serbia","sc":"Seychelles","sg":"Singapore","sk":"Slovakia","si":"Slovenia","es":"Spain","lk":"Sri Lanka","se":"Sweden","ch":"Switzerland","tz":"Tanzania","th":"Thailand","tt":"Trinidad and Tobago","tn":"Tunisia","tr":"Turkey","ua":"Ukraine","ae":"United Arab Emirates","gb":"United Kingdom","us":"United States","uy":"Uruguay","ve":"Venezuela","vn":"Vietnam"}}; ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<!--meta http-equiv="Content-Type" content="text/html; charset=utf-8" /-->
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
	<title>form</title>
	<link media="screen,projection" type="text/css" rel="stylesheet" href="css.css">
	
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js" type="text/javascript"></script>
	<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.11/jquery-ui.min.js" type="text/javascript"></script>
	<script src="js.js" type="text/javascript"></script>
</head>
<?php 
$wer = '{"pop":{"at":"Австрия","eg":"Египет","in":"Индия","id":"Индонезия","it":"Италия",
	"mv":"Мальдивы","th":"Таиланд","fi":"Финляндия","fr":"Франция","ch":"Швейцария"}, 
"all":{
	"at":"Австрия","ad":"Андорра","ar":"Аргентина","by":"Беларусь","bg":"Болгария","ba":"Босния и Герцеговина","br":"Бразилия",
	"gb":"Великобритания","hu":"Венгрия","vn":"Вьетнам","de":"Германия","gr":"Греция","dk":"Дания","do":"Доминиканская Республика",
	"eg":"Египет","il":"Израиль","in":"Индия","id":"Индонезия","jo":"Иордания","ie":"Ирландия","is":"Исландия","es":"Испания",
	"it":"Италия", "cy":"Кипр","cn":"Китай","cu":"Куба","lv":"Латвия","lt":"Литва","mk":"Македония","my":"Малайзия","mv":"Мальдивы",
	"mx":"Мексика", "nl":"Нидерланды","no":"Норвегия","ae":"Объединенные Арабские Эмираты","om":"Оман","pl":"Польша",
	"pt":"Португалия","ru":"Россия", "ro":"Румыния","sc":"Сейшельские острова","sg":"Сингапур","sk":"Словакия","si":"Словения",
	"us":"Соединенные Штаты Америки","th":"Таиланд", "tn":"Тунис","tr":"Турция","ua":"Украина","ph":"Филиппины","fi":"Финляндия",
	"fr":"Франция","hr":"Хорватия","me":"Черногория","cz":"Чехия", "ch":"Швейцария","se":"Швеция","lk":"Шри-Ланка","ee":"Эстония"}}'; 

$board = json_decode('{"AI":"Все включено","BB":"Завтрак","HB":"Завтрак и ужин","FB":"Завтрак, обед, ужин","RO":"Без питания"}');
$boardNone = "Все равно";
$arrivalCountries = json_decode($wer, true); 
$departCities = json_decode('{"pop":{"38218":"Москва","32930":"Санкт-Петербург"},"all":{"122706":"Екатеринбург","32170":"Казань","136420":"Нижний Новгород","44842":"Новосибирск","136423":"Пермь"}}', true); 

$hotelOffers = json_decode('{
"Отели Барселоны":{
	"price": "от 3 951 р.",
	"link": "#"
}, 
"Отели Берлина":{
	"price": "от 7 894 р.",
	"link": "#"
}, 
 "Отели Вены":{
	"price": "от 9 132 р.",
	"link": "#"
}, 
 "Отели Барселоны1":{
	"price": "от 3 951 р.",
	"link": "#"
}, 
 "Отели Берлина1":{
	"price": "от 7 894 р.", 
	"link": "#"
}, 
 "Отели Вены1":{
	"price": "от 9 132 р.",
	"link": "#"
},  
 "Отели Берлина2":{
	"price": "от 7 894 р.",
	"link": "#"
}
 }');
$tourOffers = json_decode('{
"Испания":{
	"price": "от 3 951 р.",
	"link": "#"
},
"Италия":{
	"price": "от 7 894 р.",
	"link": "#"
},
"Иордания":{
	"price": "от 9 132 р.",
	"link": "#"
},
"Испания1":{
	"price": "от 3 951 р.",
	"link": "#"
},
"Италия1":{
	"price":  "от 7 894 р.",
	"link": "#"
},
"Иордания1":{
	"price": "от 9 132 р.",
	"link": "#"
},
"Италия2":{
	"price": "от 7 894 р.",
	"link": "#"
}
}');
$flightOffers = json_decode('{
"Москва-Барселона":{
	"price": "от 3 951 р.",
	"link": "#"
},
"Москва-Берлин":{
	"price": "от 7 894 р.",
	"link": "#"
},
"Москва-Вена":{
	"price": "от 9 132 р.",
	"link": "#"
},
"Москва-Барселона1":{
	"price": "от 3 951 р.",
	"link": "#"
},
"Москва-Берлин1":{
	"price": "от 7 894 р.",
	"link": "#"
},
"Москва-Вена1":{
	"price": "от 9 132 р.",
	"link": "#"
},
"Москва-Берлин2":{
	"price": "от 7 894 р.",
	"link": "#"
}
}');
?>

<?php /* 
$_GET[s] = '1';			// standart sizes
//--------------not nessesary----------------------------------------------------------- 
$_GET[ts] = array('t', 'h', 'f');			// tabs
$_GET[wh] = '768|90';	// width-height



$_GET[bg] = '007aae';		// bg =done!
$_GET[bc]='0000FF';			// border =done!
$_GET[co]=1;				// corners =done!
$_GET[l]=1;					// logo =done!
$_GET[o]=1;					// offers
$_GET[on] = 5;				// offers count
$_GET[ob]='006A9E';			// offers bg
$_GET[of]='';				// offers font
$_GET[ft]='Title%20here';	// title
$_GET[tc]='007aae';			// title
$_GET[id]='SubId';			// SubId
$_GET[cr]='ru';				// curr 

		//----туры
					//?   Признак «Гибкие даты вылета»;
$_GET[tb] = 1;		//Питание (в случае подключения данного значения, по умолчанию оно должно быть заполнено значением «Не важно»);
					//Куда (город) - нету;
					//Куда (отель) - нету;
$_GET[tp] = 1;		//Цена

		//----отели
$_GET[hn] = 1;		//Название отеля;
$_GET[hb] = 1;		//Питание; =done!
$_GET[hl] = 1;		//Рядом с; + Не далее;
$_GET[hp] = 1;		//Цена =done!

		//----перелеты  
$_GET[fp] = 1;		//Цена   =done!

*/


//--------------not nessesary-----------------------------------------------------------




$arr = array_unique($_GET['ts']);
$toursFrom = true;
$toursAdults = true;
$class = true;
$wideScheme = ($_GET[s] && ($_GET[wh] == '768|90' || $_GET[wh] == '468|60')) ? true : false;

if ($_GET[s]){
	$_GET[ft] = '';
	switch ($_GET[wh]) {
	case '240|400':
		$_GET[tp] = '';
		$_GET[hp] = '';
		$_GET[fp] = '';	
		$_GET[o] = 1;	
		$_GET[on] = 3;
		break;
	case '250|250':		
	case '300|250':
	case '336|280':
	case '768|90':
		$_GET[o] = '';
		$_GET[tp] = '';
		$_GET[tfo] = '1';
		$toursFrom = false;
		$toursAdults = false;
		$class = false;
		$_GET[hn] = '';
		$_GET[hb] = '';
		
		$_GET[hl] = '';
		$_GET[hr] = '';
		$_GET[hp] = '';
		
		$_GET[fp] = '';
		
		break;
	}
} else {
	
	//---------------------отели
	if (in_array('h', $arr)){
		if (!$_GET[hd1]) $_GET[hd1] = '14';	//даты заезда и выезда =done!
		if (!$_GET[hd2]) $_GET[hd2] = '21';	//даты заезда и выезда =done!
		if (!$_GET[hc1]) $_GET[hc1] = '3';		//class =done!
		if (!$_GET[hc2]) $_GET[hc2] = '5';		//class =done!
		if (!$_GET[ha]) $_GET[ha] = '2';		//adults =done!
		if (!$_GET[hac]) $_GET[hac] = '0';		//children =done!
		if (!$_GET[hr]) $_GET[hr] = '1'; 		//rooms   
	}

	 //----------------------туры
	if (in_array('t', $arr)){
		if (!$_GET[tf]) $_GET[tf] = 38218;		//откуда =done!
		if (!$_GET[tt]) $_GET[tt] = 'eg';		//куда =done!
		if (!$_GET[td]) $_GET[td] = 14;			//дата вылета
		if (!$_GET[tn1]) $_GET[tn1] = '5';		//ночей =done!
		if (!$_GET[tn2]) $_GET[tn2] = '12';		//ночей =done!
		if (!$_GET[ta]) $_GET[ta] = '2';		//adults-children =done!
		if (!$_GET[tac]) $_GET[tac] = '0';		//adults-children =done!
		if (!$_GET[tc1]) $_GET[tc1] = '3';		//class =done!
		if (!$_GET[tc2]) $_GET[tc2] = '5';		//class =done!
	}

	//---------------------перелеты   
	if (in_array('f', $arr)) {
		if (!$_GET[fd1]) $_GET[fd1] = '7';		//даты вылета и возвращения =done!
		if (!$_GET[fd2]) $_GET[fd2] = '14';		//даты вылета и возвращения =done!
		if (!$_GET[fc]) $_GET[fc] = 'ECONOMY';			//class =done!
		if (!$_GET[fa]) $_GET[fa] = '3';		//adults-children  =done!
		if (!$_GET[fac]) $_GET[fac] = '0';		//adults-children  =done!
	} 
	//if ($_GET[o] && !$_GET[on]) {$_GET[on] = 3;}
	if (!$_GET[tfo]) $_GET[tfo] = 1;
	if (!$_GET[fo]) $_GET[fo] = 1;

}
if (!$_GET[mf]) $_GET[mf] = 'font: bold 12px/13px Arial,Helvetica,sans-serif;color:#fff';

?>
<body>

<style> 
<?
$wh = preg_split('/\|/', $_GET[wh]); 
$width = $wh[0]; 
$height = $wh[1]; 
 
$w = $width*0.9-2;
$p = $w*0.015;
$bsw = $w-2*$p-2; 
$d = $w*0.03;

$hw = ($w - $d)/2;
$hsw = ($w - 4*$p - $d)/2 - 2;

$qw = ($hw - $d)/2;
$qws = $qw - 2*$p - 2;
if (!$_GET[tbc]) $_GET[tbc] = 'CCCCCC';		//tab bg
?>


.title {color:#<?php echo $_GET[tc]; ?>;}
<? if ($_GET[co]) { ?>
	.tabs-area, .tab-links li{ border-radius: 3px 3px 0 0; }
	.select{ border-radius: 4px;}
	.ui-corner-all { border-radius: 5px; }
	.offers{ border-radius: 5px; }
	.logo-holder{ border-radius: 0 4px 4px 0;}
<? } ?>
.tabs-area {
	width:<?php echo $width; ?>px;
	height: <?php echo $height; ?>px;
}
body, .tabs-area, .tab-links a, .tab-links .active a, .tabs-area .button.ui-state-default, .button.ui-state-hover{<?php echo str_replace('|', '#', $_GET[mf]); ?>;}
.offers,.offers a{<?php echo str_replace('|', '#', $_GET[of]) ?>;}

.offers{background:#<?php echo $_GET[ob]; ?>;}	

<? if ($_GET[tbc]) { ?>
	.tab-links li{background:#<?php echo $_GET[tbc]; ?>;}
<? } ?>
.tab-holder, .tab-links li.active {border-color:#<? echo ($_GET[bc]); ?>}
.tab-links li.active {background:#<?php echo $_GET[bg]; ?>;}
.tab-holder{background:#<?php echo $_GET[bg]; ?>;}
<?php if (!$wideScheme){ ?>
	.bottom{
		padding: 5%; 
		width: 90%;
	}
	.logo-holder{
		margin-left:-<?php echo $width*0.05; ?>px;
		width:<?php echo $hw+$width*0.05; ?>px;
	}
	.logo{
		margin-left:<?php echo $width*0.05; ?>px;
		width:<?php echo $hw; ?>px;
		height:<?php echo ceil(18*$width/300)+2*$p +2; ?>px;
	}

	select, input{
		height:<?php echo ceil(18*$width/300); ?>px;
		line-height:<?php echo ceil(18*$width/300); ?>px;
		padding:0;
	}
	.button,.ui-button .ui-button-text{
		height:<?php echo ceil(18*$width/300)+2*$p; ?>px;
		line-height:<?php echo ceil(18*$width/300)+2*$p; ?>px;
	}
	form, fieldset {width: 100%;margin-top:-4%;}
	.select {padding:<?php echo $p; ?>px;}
	.select-holder {width: 100%;}
	select, input {width: <?php echo $bsw; ?>px;}
	.left-half, .right-half{width: <?php echo $hw; ?>px;}

	.left-half .select, .right-half .select,
	.left-half select, .right-half select,
	.left-half input, .right-half input{width: <?php echo $hsw; ?>px;}

	.quad-left, .quad-right{width: <?php echo $qw; ?>px;}
	.quad-left .select, .quad-right .select,
	.quad-left select, .quad-right select,
	.quad-left input, .quad-right input{width: <?php echo $qws; ?>px;}
<?php } ?>
</style>
<?php if ($_GET[s]) $addClass = str_replace("|","-",$_GET[wh]); ?>
<div class="tabs-area <? if ($_GET[s]) echo 'size-'.$addClass; ?>">
	<?php if ($_GET[ft]) { ?>
		<p class="title"><?php echo $_GET[ft]; ?> </p>
	<?php } ?>
	<div class="links-holder"><ul class="tab-links">
		<?php
			$tabs = array();
			$tabs['t'] = array('link'=>'tour', 'name'=>'Туры');
			$tabs['h'] = array('link'=>'hotel', 'name'=>'Отели');
			$tabs['f'] = array('link'=>'flight', 'name'=>'Авиабилеты');
			$i = 0;			
			foreach ( $arr as $key => $val ){ 
				if ($val){ ?>
					<li <?php if ($i == 0){ $i = 1; echo 'class="active"';} ?>><a href="#<?php echo $tabs[$val]['link']; ?>"><?php echo $tabs[$val]['name']; ?></a></li>
			<?php } 
			} ?>
	</ul>
	<?php if ($wideScheme){ ?>
		<img class="logo" src="images/logo.png" alt="" />
	<?php } ?>
	</div>
	<?php if (!$wideScheme){ ?>
		<script type="text/javascript">
			handleTabsWidth();
		</script>
	<?php } ?>
	
	<div class="tab-holder">
		<?php if (in_array('h', $arr)) { ?> 
			<div class="tab search-form-container" id="hotel">
				
		<div class="search-form-holder">
			<form id="sfh" class="search-form search-hotel" method="get" action="/a_search/hotel.search">
				<fieldset>
					<input value="<?php echo $_GET[id] ?>" class="SubId" name="SubId" type="hidden" />
					<input value="" id="sfhLocationText" type="hidden" />
					<input name="cn" value="" id="sfhLocationCountryCode" type="hidden" />
					<input name="ct" value="0" id="sfhLocationCityId" type="hidden" />
					<input name="geoLocationId" value="0" type="hidden" />
					<div class="row">
					<label>Где</label>
					<div id="sfhEnterLocationBlock">
						<div class="select">
							<div class="select-holder">
								<input aria-haspopup="true" aria-autocomplete="list" role="textbox" value="" id="sfhLocationInput" autocomplete="off" class="text ui-widget-content ui-corner-all ui-autocomplete-input text-tip" title="Введите город, страну" placeholder="Введите город, страну" type="text">
							</div>
						</div>
					</div>
					</div>
				<?php if ($_GET[hn]) { ?>
					
					<div class="row">
						<label>Название отеля</label>
						<div class="select">
							<div class="select-holder">
								<input class="text ui-widget-content ui-corner-all" name="hn" maxlength="255" value="" type="text">
							</div>
						</div>
					</div>
				<?php } ?>
				<div class="row checkin ">
					<div class="left-half">
						<label>Дата заезда</label>
						<?php 
							$today = time();
							if ($_GET[hd1] && $_GET[hd2]) {
								$d1=$_GET[hd1];
								$d2=$_GET[hd2];
								//$d2=$dts[1];
								//$dts = preg_split('/-/', $_GET[hd]);
								//$d1=$dts[0]; 
								//$d2=$dts[1];
							}else{
								$d1=14; 
								$d2=21;
							}
						?>
						<div class="select">
							<div class="select-holder">
								<input id="sfhDateCheckIn" name="di" value="<?php echo date('d.m.Y', ($today+$d1*24*60*60)); ?>" class="datepicker text" type="text" />
							</div>
						</div>
					</div>
					<div class="right-half">
						<label>Дата выезда</label>
						<div class="select">
							<div class="select-holder">
								<input id="sfhDateCheckOut" name="do" value="<?php echo date('d.m.Y', ($today+$d2*24*60*60)); ?>" class="datepicker text" type="text" />
							</div>
						</div>
					</div>
				</div>
				
				<?php if ($class) { ?>
				<div class="row">
						<?php 
								$j++; $count--;
								//$k = preg_split("/-/", $_GET[hc]);
								$s1 = $_GET[hc1]; 
								$s2 = $_GET[hc2];
						?>
						<div class="left-half class">
							<label>Класс отеля</label>
							<? if ($_GET[fo]) { ?><div class="quad-left"> <? } ?>
								<div class="select">
									<div class="select-holder">
										<select id="sfhStars1" name="g[]">
											<?php for ($i=1; $i < 6; $i++){ ?>
												<option value="<?php echo $i; ?>" <?php if ($i == $s1){ echo 'selected="selected"'; } ?>><?php echo $i; ?>*</option>
											<?php } ?>
										</select>
									</div>
								</div>
							</div>
							<? if ($_GET[fo]) { ?>
								<div class="quad-right"> 
							<? } else { ?>
								<div class="right-half"> 
								<label>&nbsp;</label>
							<? } ?>
									<div class="select">
										<div class="select-holder">
											<select id="sfhStars2" name="g[]">
												<?php for ($i=1; $i < 6; $i++){ ?>
													<option value="<?php echo $i; ?>" <?php if ($i == $s2){ echo 'selected="selected"'; } ?>><?php echo $i; ?>*</option>
												<?php } ?>
											</select>
										</div>
									</div>
							<? if ($_GET[fo]) { ?>
								</div>
							<? } ?>
						</div>
				
				
				
						<?php if ($_GET[fo]){ ?>
							<div class="right-half">
								<label>Питание</label>
								<div class="select">
									<div class="select-holder">
										<select name="b">
											<option value=""><?php echo $boardNone; ?></option>
											<?php foreach ($board as $key => $value){ ?>
											<option value="<?php echo $key; ?>" <?php if ($_GET[fo] == $key){ echo 'selected="selected"'; } ?>><?php echo $value; ?></option>
											<?php } ?>
										</select>
									</div>
								</div>
							</div>
							<?php } else { ?>
								<input type="hidden" name="b" value="" />
							<?php } ?>
				</div>
				<?php } else { ?>
					<input type="hidden" name="b" value="" />
					<input type="hidden" name="g[]" value="3" />
					<input type="hidden" name="g[]" value="5" />
				<?php } ?>
				
				<div class="row" style="overflow:visible;">
				
						<?php 
							//$a = preg_split("/-/", $_GET[ha]);
							$a1 = $_GET[ha]; 
							$a2 = $_GET[hac];
						?>
						<div class="left-half">
							<div class="quad-left">
								<label style="position:relative;">
								&nbsp;<img src="images/adults.png" alt="" style="position:absolute;bottom:0;left:0;" />
								</label>
								<div class="select">
									<div class="select-holder">
										<select id="sfhPassengersCount" name="adc[0]">
											<?php for ($i=1; $i < 9; $i++){ ?>
												<option value="<?php echo $i; ?>" <?php if ($i == $a1){ echo 'selected="selected"'; } ?>><?php echo $i; ?></option>
											<?php } ?>
										</select>
									</div>
								</div>
							</div>
							<div class="quad-right">
								<label style="position:relative;">
								&nbsp;<img src="images/childs.png" alt="" style="position:absolute;bottom:0;left:0;" />
								</label>
								<div class="select">
									<div class="select-holder">
										<select id="sfhChildrenCount">
											<option value="0" <?php if (0 == $a2){ echo 'selected="selected"'; } ?>>-</option>
											<?php for ($i=1; $i < 4; $i++){ ?>
												<option value="<?php echo $i; ?>" <?php if ($i == $a2){ echo 'selected="selected"'; } ?>><?php echo $i; ?></option>
											<?php } ?>
										</select>
									</div>
								</div>
							</div>
						</div>
						<?php if ($_GET[hr]){ ?>
						<div class="right-half">
							<div class="quad-left"></div>
							<div class="quad-right">
								<label>Номера</label>
								<div class="select">
									<div class="select-holder">
										<select id="sfhRooms" name="r">
											<?php for ($i=1; $i < 5; $i++){ ?>
												<option value="<?php echo $i; ?>" <?php if ($i == $_GET[hr]){ echo 'selected="selected"'; } ?>><?php echo $i; ?></option>
											<?php } ?>
										</select>
									</div>
								</div>
							</div>
						</div>
						<?php } else {  ?>
							<input type="hidden" name="r" value="1" />
						<?php } ?>
				</div>

				<?php if ($_GET[hl]){ ?>
					<div class="row locations">
						<?php
							$w1 = $w-$qw-$d;
							$w2 = $w1 - 2*$p -2;
						?>
						<div class="left-half" style="width:<?php echo $w1; ?>px;">
							<label>Рядом с</label>
							<div class="select" style="width:<?php echo $w2; ?>px;">
								<div class="select-holder">
									<select class="select06" name="gl" id="geoLocation" disabled="disabled" style="width:<?php echo $w2; ?>px;">
										<option title="title">Не выбрано</option>
									</select>
								</div>
							</div>
						</div>
						<div class="quad-right">
							<label>Не далее</label>
							<div class="select">
								<div class="select-holder">
									<select id="geoDistance" name="gd" class="select06" disabled="disabled">
										<option value="1">1 км</option>
										<option value="3">3 км</option>
										<option value="5">5 км</option>
										<option value="10">10 км</option>
									</select>
								</div>
							</div>
						</div>
					</div>
				<?php } ?>

		<div class="bottom">
			
			<?php if ($_GET[hp]){ ?>
					<div class="row">
						<label>Цена за * пассажиров (<span class="changeCurrency">р.</span>)</label>
					</div>
					<div class="row">
						<div class="select left">
							<div class="select-holder">
								<input  class="cost-input text ui-widget-content ui-corner-all" name="pf" value="" maxlength="6" type="text">
							</div>
						</div>
						<div class="select right">
							<div class="select-holder">
								<input class="cost-input text ui-widget-content ui-corner-all" name="pt" value="" maxlength="6" type="text">
							</div>
						</div>
					</div>
					<div class="slider">
						<a href="#" class="price left">уменьшить цену</a>
						<div class="price-slider ui-slider-horizontal" max="500000" min="0" defmax="100000" defmin="0"></div>
						<a href="#" class="price right">увеличить цену</a>
					</div>
			<?php } ?>

			
				<div class="row" style="overflow:visible;">
					<?php if ($_GET[l] && !$wideScheme){ ?>
						<div class="left-half" style="overflow:visible;">
							<span class="logo-holder"><span class="logo">&nbsp;</span></span>
						</div>
						<div class="right-half">
					<?php } ?>
						<input type="submit" value="Искать" class="button" style="display:none;" />
						<a href="#" class="button"><?php echo $wideScheme ? "OK" : "Искать"; ?></a>
					<?php if ($_GET[l] && !$wideScheme){ ?>
						</div>
					<?php } ?>
				</div>
				<?php if ($_GET[o]) { ?>
					<div class="offers" style="">
						<?php 
							$i = 0;
							foreach ($hotelOffers as $key => $value){ 
								if ($i++ < $_GET[on]){
								$typ = (array) $value;
								 ?>
								<a href="<?php echo $typ['link']; ?>">
									<div class="name"><?php echo $key; ?></div>
									<div class="price"><?php echo $typ['price']; ?></div>
									<div class="dotted">&nbsp;</div>
								</a>
							<?php } 
							} ?>
					</div>
				<?php } ?>
			</div>
		</fieldset>
	</form>

				
				</div>
			</div> 
		<?php } ?>
		
		<?php if (in_array('t', $arr)) { ?> 
			<div class="tab search-form-container" id="tour">
				<form action="/a_search/tour.completed" class="search-form search-tour" id="searchFormTour">
					<fieldset>
					<input value="<?php echo $_GET[id] ?>" class="SubId" name="SubId" type="hidden" />
							<?php if ($toursFrom){ ?>
							<div class="row">
								<label>Откуда</label>
								<div class="select">
									<div class="select-holder">
										<select name="dci" class="big-select">
											<option value="" title="title">Выберите</option>
											<optgroup label="Популярные">
												<?php foreach ($departCities['pop'] as $code=>$name) { ?>
													<option value="<?php echo $code; ?>" <?php if ($_GET[tf] == $code) { ?> selected="selected" <?php } ?>>
														<?php echo $name; ?>
													</option>
												<?php } ?>
											</optgroup>
											<optgroup label="Другие">
												<?php foreach ($departCities['all'] as $code=>$name){ ?>
													<option value="<?php echo $code; ?>" <?php if ($_GET[tf] == $code) { ?> selected="selected" <?php } ?>>
														<?php echo $name; ?>
													</option>
												<?php } ?>
											</optgroup>
										</select>
									</div>
								</div>
							</div>
							<?php } else { ?>
								<input type="hidden" name="dci" value="38218" />
							<?php } ?>
							<div class="row">
								<label>Куда</label>
								<div class="select">
									<div class="select-holder">
										<select class="big-select" name="aco">
											<option value="" title="title">Выберите</option>
											<optgroup label="Популярные">
												<?php foreach ($arrivalCountries['pop'] as $code=>$name) { ?>
													<option value="<?php echo $code; ?>" <?php if ($_GET[tt] == $code) { ?> selected="selected" <?php } ?>>
														<?php echo $name; ?>
													</option>
												<?php } ?>
											</optgroup>
											<optgroup label="Другие">
												<?php foreach ($arrivalCountries['all'] as $code=>$name){ ?>
													<option value="<?php echo $code; ?>" <?php if ($_GET[tt] == $code) { ?> selected="selected" <?php } ?>>
														<?php echo $name; ?>
													</option>
												<?php } ?>
											</optgroup>
										</select>
									</div>
								</div>
							</div>
				
							<div class="row">
									<? $today = time();
										$dt = $today + $_GET[td]*24*3600;
									?>
									<div class="left-half">
										<label for="alt1122">Дата вылета</label>
										<div class="select">
											<div class="select-holder">
												<input type="text" id="alt1622" class="datepicker text" value="<?php echo date('d.m.Y', $dt); ?>" name="df" />
											</div>
										</div>
									</div>
									<div class="right-half  nights" >
										<?php 
											//$nts = preg_split('/-/', $_GET[tn]);
											$nf=$_GET[tn1]; 
											$nt=$_GET[tn2];
										?>
										<label>Ночей</label>
										<div class="quad-left" >
											<div class="select"><div class="select-holder"><select class="select01" name="nf">
											<?php for ($i=1; $i < 31; $i++){ ?>
												<option value="<?php echo $i; ?>" <?php if ($nf == $i){ echo 'selected="selected"'; } ?>><?php echo $i; ?></option>
											<?php } ?>
										</select></div></div>
										</div>
										<div class="quad-right" >
											<div class="select"><div class="select-holder"><select class="select01" name="nt">
											<?php for ($i=1; $i < 31; $i++){ ?>
												<option value="<?php echo $i; ?>" <?php if ($nt == $i){ echo 'selected="selected"'; } ?>><?php echo $i; ?></option>
											<?php } ?>
											</select></div></div>
										</div>
									</div>
								</div>
				<div class="row">
						<?php 
								$j++; $count--;
								//$k = preg_split("/-/", $_GET[tc]);
								$s1 = $_GET[tc1]; 
								$s2 = $_GET[tc2]
						?>
						<div class="left-half class">
							<label>Класс отеля</label>
							<? if ($_GET[tfo]) { ?><div class="quad-left"> <? } ?>
								<div class="select">
									<div class="select-holder">
										<select id="sfhStars1" name="g[]">
											<?php for ($i=1; $i < 6; $i++){ ?>
												<option value="<?php echo $i; ?>" <?php if ($i == $s1){ echo 'selected="selected"'; } ?>><?php echo $i; ?>*</option>
											<?php } ?>
										</select>
									</div>
								</div>
							</div>
							<? if ($_GET[tfo]) { ?>
								
								<div class="quad-right"> 
							<? } else { ?>
								<div class="right-half"> 
								<label>&nbsp;</label>
							<? } ?>
								<div class="select">
									<div class="select-holder">
										<select id="sfhStars2" name="g[]">
											<?php for ($i=1; $i < 6; $i++){ ?>
												<option value="<?php echo $i; ?>" <?php if ($i == $s2){ echo 'selected="selected"'; } ?>><?php echo $i; ?>*</option>
											<?php } ?>
										</select>
									</div>
								</div>
							<? if ($_GET[tfo]) { ?> </div> <? } ?>
						</div>
				
				
				
						<?php if ($_GET[tfo]){ ?>
							<div class="right-half">
								<label>Питание</label>
								<div class="select">
									<div class="select-holder">
										<select name="b">
											<option value=""><?php echo $boardNone; ?></option>
											<?php foreach ($board as $key => $value){ ?>
											<option value="<?php echo $key; ?>" <?php if ($_GET[tfo] == $key){ echo 'selected="selected"'; } ?>><?php echo $value; ?></option>
											<?php } ?>
										</select>
									</div>
								</div>
							</div>
							<?php } else { ?>
								<input type="hidden" name="b" value="" />
							<?php } ?>
				</div>
					<?php if($toursAdults){  ?>
						<div class="row">
								<?php  
									//$a = preg_split("/-/", $_GET[ta]);
									$a1 = $_GET[ta]; 
									$a2 = $_GET[tac];
								?>
								<div class="left-half">
									<div class="quad-left">
										<label style="position:relative;">
											&nbsp;<img src="images/adults.png" alt="" style="position:absolute;bottom:0;left:0;" />
										</label>
										<div class="select">
											<div class="select-holder">
												<select name="pad" id="searchFormTourAdultCount">
													<?php for ($i=1; $i < 9; $i++){ ?>
														<option value="<?php echo $i; ?>" <?php if ($i == $a1){ echo 'selected="selected"'; } ?>><?php echo $i; ?></option>
													<?php } ?>
												</select>
											</div>
										</div>
									</div>
									<div class="quad-right">
										<label style="position:relative;">
											&nbsp;<img src="images/childs.png" alt="" style="position:absolute;bottom:0;left:0;" />
										</label>
										<div class="select">
											<div class="select-holder">
												<select id="searchFormTourChildCount">
													<option value="0" <?php if (0 == $a2){ echo 'selected="selected"'; } ?>>-</option>
													<?php for ($i=1; $i < 4; $i++){ ?>
														<option value="<?php echo $i; ?>" <?php if ($i == $a2){ echo 'selected="selected"'; } ?>><?php echo $i; ?></option>
													<?php } ?>
												</select>
											</div>
										</div>
									</div>
								</div>
							</div>
					<?php } else {  ?>
						<input type="hidden" name="pad" value="2" />
					<?php }  ?>
								<div class="bottom">
					<?php if ($_GET[tp]){ ?>
					
						<div class="row">
							<label>Цена за * пассажиров (<span class="changeCurrency">р.</span>)</label>
						</div>
						<div class="row">
							<div class="select left">
								<input type="text" maxlength="6" value="" name="pf" class="cost-input text ui-widget-content ui-corner-all" />
							</div>
							<div class="select right">
								<input type="text" maxlength="6" value="" name="pt" class="cost-input text ui-widget-content ui-corner-all"/>
							</div>
						</div>
						<div class="slider">
							<a class="price left" href="#">уменьшить цену</a>
							<div defmin="0" defmax="100000" min="0" max="500000" class="price-slider ui-slider-horizontal"></div>
							<a class="price right" href="#">увеличить цену</a>
						</div>
					<?php } ?>


						<div class="row" style="overflow:visible;">
							<?php if ($_GET[l] && !$wideScheme){ ?>
								<div class="left-half" style="overflow:visible;">
									<span class="logo-holder"><span class="logo">&nbsp;</span></span>
								</div>
								<div class="right-half">
							<?php } ?>
								<input id="tosubmit" type="submit" value="Искать" class="button" style="display:none;">
								<a href="#" class="button"><?php echo $wideScheme ? "OK" : "Искать"; ?></a>
							<?php if ($_GET[l] && !$wideScheme){ ?>
								</div>
							<?php } ?>
						</div>
						<?php if ($_GET[o]) { ?>
					<div class="offers" style="">
						<?php 
							$i = 0;
							foreach ($tourOffers as $key => $value){ 
								if ($i++ < $_GET[on]){
								$typ = (array) $value;
								 ?>
								<a href="<?php echo $typ['link']; ?>">
									<div class="name"><?php echo $key; ?></div>
									<div class="price"><?php echo $typ['price']; ?></div>
									<div class="dotted">&nbsp;</div>
								</a>
							<?php }  
							} ?>
					</div>
				<?php } ?>
					</div>
					</fieldset>
				</form>

			</div> 
		<?php } ?>
		
		
		<?php if (in_array('f', $arr)) { ?> 

			<div class="tab search-form-container" id="flight">
				
		<form id="searchFormFlight" class="search-form search-flight" method="get" action="/a_search/air.search">
			<fieldset>
					<input value="<?php echo $_GET[id] ?>" class="SubId" name="SubId" type="hidden" />
				<div class="row">
					<label class="indent">Откуда</label>
					<div class="select">
						<div class="select-holder">
							<input id="sffROUNDTRIPDepLocation1" class="text isDeparture location" value="Введите город или аэропорт" title="Введите город или аэропорт" type="text">
						</div>
					</div>
				</div>
				<div class="row">
					<label class="indent">Куда</label>
					<div class="select">
						<div class="select-holder">
							<input id="sffROUNDTRIPArrLocation1" class="text isArrival location" value="Введите город или аэропорт" title="Введите город или аэропорт" type="text">
						</div>
					</div>
				</div>
				<div class="row">
					<div class="left-half">
						<?php 
							$today = time();
							//$dts = preg_split('/-/', $_GET[fd]);
							$d1=$_GET[fd1];
							$d2=$_GET[fd2];
						?>
						<label class="indent">Дата вылета</label>
						<div class="select">
							<div class="select-holder">
								<input id="date1" value="<?php echo date('d.m.Y', ($today+$d1*24*60*60)); ?>" class="text datepicker" type="text" />
							</div>
						</div>
					</div>
					<div class="right-half">
						<!--label class="indent">Дата возвращения</label-->
						
						<label for="back"><input class="check" id="back" type="checkbox" <?php if ($_GET[tb]){ ?> checked="checked"<? } ?> />Билет обратно</label>
						<div class="select">
							<div class="select-holder">
								<input id="date2" value="<?php echo date('d.m.Y', ($today+$d2*24*60*60)); ?>" class="text datepicker" type="text" />
							</div>
						</div>
					</div>
				</div>
				<input id="bcc" type="hidden" <?php if ($_GET[nc]){ ?> checked="checked"<? } ?> />
			<?php if ($class) { ?>
				<div class="row">
					<div class="left-half">
						<label>Класс</label>
						<div class="select">
							<div class="select-holder">
								<select id="sffClass" name="cl">
									<option value="ECONOMY" <?php if ($_GET[fc] == 'ECONOMY'){ ?> selected="selected"<?php } ?>>Эконом</option>
									<option value="BUSINESS" <?php if ($_GET[fc] != 'ECONOMY'){ ?> selected="selected"<?php } ?> >Бизнес</option>
								</select>
							</div>
						</div>
					</div>
					<?php /* ?>
					<div class="right-half" style="padding: 7px 0 0;">
						<input class="check" id="back" type="checkbox" <?php if ($_GET[tb]){ ?> checked="checked"<? } ?> />
						<label for="back">Билет обратно</label>
					</div>
					<div class="right-half">
						<input class="check" id="bcc" type="checkbox" <?php if ($_GET[nc]){ ?> checked="checked"<? } ?> />
						<label for="bcc">Без пересадок</label>
					</div>
					<?php */ ?>
					
					<div class="right-half">
						<?php if ($_GET[fa]){ 
							$a = preg_split("/-/", $_GET[fa]);
							$a1 = $a[0]; 
							$a2 = $a[1];
						?>
						<div class="left-half">
							<div class="quad-left">
								<label style="position:relative;">
									&nbsp;<img src="images/adults.png" alt="" style="position:absolute;bottom:0;left:0;" />
								</label>
								<div class="select">
									<div class="select-holder">
										<select id="searchFormFlightAdultCount">
											<?php for ($i=1; $i < 9; $i++){ ?>
												<option value="<?php echo $i; ?>" <?php if ($i == $a1){ echo 'selected="selected"'; } ?>><?php echo $i; ?></option>
											<?php } ?>
										</select>
									</div>
								</div>
							</div>
							<div class="quad-right">
								<label style="position:relative;">
									&nbsp;<img src="images/childs.png" alt="" style="position:absolute;bottom:0;left:0;" />
								</label>
								<div class="select">
									<div class="select-holder">
										<select id="searchFormFlightChildCount">
											<option value="0" <?php if (0 == $a2){ echo 'selected="selected"'; } ?>>-</option>
											<?php for ($i=1; $i < 4; $i++){ ?>
												<option value="<?php echo $i; ?>" <?php if ($i == $a2){ echo 'selected="selected"'; } ?>><?php echo $i; ?></option>
											<?php } ?>
										</select>
									</div>
								</div>
							</div>
						</div>
						<?php } ?>
					</div>
				</div>
			<?php } else { ?>
				<input type="hidden" name="" value="<?php echo $_GET[fc] ?>" />
				
				
			<?php } ?>
			<div class="bottom">
				<?php if ($_GET[fp]) { ?>
						<div class="row">
							<label>Цена за * пассажиров (<span class="changeCurrency">р.</span>)</label>
						</div>
						<div class="row">
							<div class="select left">
								<div class="select-holder">
									<input  class="cost-input text ui-widget-content ui-corner-all" name="pf" value="" maxlength="6" type="text">
								</div>
							</div>
							<div class="select right">
								<div class="select-holder">
									<input class="cost-input text ui-widget-content ui-corner-all" name="pt" value="" maxlength="6" type="text">
								</div>
							</div>
						</div>
						<div class="slider">
							<a href="#" class="price left">уменьшить цену</a>
							<div class="price-slider ui-slider-horizontal" max="500000" min="0" defmax="100000" defmin="0"></div>
							<a href="#" class="price right">увеличить цену</a>
						</div>
				<?php } ?>
				<div class="row" style="overflow:visible;">
					<?php if ($_GET[l] && !$wideScheme){ ?>
						<div class="left-half" style="overflow:visible;">
							<span class="logo-holder"><span class="logo">&nbsp;</span></span>
						</div>
						<div class="right-half">
					<?php } ?>
						<input id="tosubmit" type="submit" value="Искать" class="button" style="display:none;">
						<a href="#" class="button"><?php echo $wideScheme ? "OK" : "Искать"; ?></a>
					<?php if ($_GET[l] && !$wideScheme){ ?>
						</div>
					<?php } ?>
				</div>
				<?php if ($_GET[o]) { ?>
					<div class="offers" style="">
						<?php 
							$i = 0;
							foreach ($flightOffers as $key => $value){ 
								if ($i++ < $_GET[on]){
								$typ = (array) $value;
								 ?>
								<a href="<?php echo $typ['link']; ?>">
									<div class="name"><?php echo $key; ?></div>
									<div class="price"><?php echo $typ['price']; ?></div>
									<div class="dotted">&nbsp;</div>
								</a>
							<?php } 
							} ?>
					</div>
				<?php } ?>
			</div>
		</fieldset>
	</form>

				
			</div> 
		<?php } ?>
	</div>
</div>




</body> 
</html>
