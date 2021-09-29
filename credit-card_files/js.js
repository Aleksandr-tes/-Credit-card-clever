$(document).ready(function(){


	equalheight = function(container){
	 var currentTallest = 0,
	  currentRowStart = 0,
	  rowDivs = new Array(),
	  $el,
	  topPosition = 0;

	 $(container).each(function() {
	  $el = $(this);
	  $($el).height('auto')
	  topPostion = $el.position().top;

	  if (currentRowStart != topPostion) {
	   for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
	    rowDivs[currentDiv].height(currentTallest);
	   }
	   rowDivs.length = 0; // empty the array
	   currentRowStart = topPostion;
	   currentTallest = $el.height();
	   rowDivs.push($el);
	  } 
	  else {
	   rowDivs.push($el);
	   currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
	  }
	  for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
	   rowDivs[currentDiv].height(currentTallest);
	  }
	 });
	}


	$(window).on('load', function(){
		if($(".main_news_content").length) {
			equalheight($(".main_news_content"));
		}
	});

	$(window).on('resize', function(){
		if($(".main_news_content").length) {
			equalheight($(".main_news_content"));
		}
	});
	

	$(document).on('click', '.js-login', function(e){
		e.preventDefault();
		$('.menu-dd').toggleClass('show');
	});


	if ($(".part_item")) {

		$(".part_item").click(function() {

			if ($(this).hasClass("is-active")) {
				$(this).removeClass("is-active");
			}

			else {
				$(".part_item").removeClass("is-active is-uneven");
				$(this).addClass("is-active");
			}		

			if ($(this).index() % 2 == 1) {
				$(this).addClass('is-uneven');
			}

			$(".part_item").parent(".part_box").children(".part_item__inner").remove();
			$(this).children(".part_item__inner").addClass("is-opened");

		});

	}

	if ($('.currency_slider').length != 0) {
		var swiper = new Swiper('.currency_slider', {
		    paginationClickable: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
		  	},
		    spaceBetween: 30,
		});
	}
	

	if ($(".mobile_header").text() != "") {
		$(".mobile_header").prev("h1").addClass("desktop_header");
	}	
	

});

$(document).ready(function() {
	var query_string = {};
	  var query = window.location.search.substring(1);
	  var vars = query.split("&");
	  for (var i=0;i<vars.length;i++) {
	    var pair = vars[i].split("=");
	    if (typeof query_string[pair[0]] === "undefined") {
	      query_string[pair[0]] = decodeURIComponent(pair[1]);
	    } else if (typeof query_string[pair[0]] === "string") {
	      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
	      query_string[pair[0]] = arr;
	    } else {
	      query_string[pair[0]].push(decodeURIComponent(pair[1]));
	    }
	  }

	//плэйсхрлдеры
	$("#search_form_find").addClass("pholder");
	$("#search_form_find").val("Поиск по сайту");

	$("#search_form_find").focus(function(){
		if ($(this).val() === "Поиск по сайту") {$(this).val(""); $(this).removeClass("pholder");}
	});
	$("#search_form_find").blur(function(){
		if ($(this).val() === "") {$(this).val("Поиск по сайту"); $(this).addClass("pholder");}
	});
	//Проверка на повтор номера телефона
	$('body').on("change", "input.phone_field", function(){
		var current_phone_elem_number = $("input.phone_field").index($(this));
		console.log(current_phone_elem_number);
		$(this).parents("form").find("input.phone_field").each(function(){
			console.log('each done');
			var this_phone_elem_number = $("input.phone_field").index($(this));
			if (this_phone_elem_number != current_phone_elem_number) {
				console.log('this val = '+$(this).val());
				console.log('cur val = '+$("input.phone_field:eq("+current_phone_elem_number+")").val());
				if ($(this).val() == $("input.phone_field:eq("+current_phone_elem_number+")").val()) {
					console.log('same val');
					$("input.phone_field:eq("+current_phone_elem_number+")").after('<div class="form_item_error">Данный номер уже введен в поле '+$(this).prev().text()+'</div>');
					$("input.phone_field:eq("+current_phone_elem_number+")").next(".form_item_error").slideDown(100);

					if (!$(this).parents('form').hasClass('js-step1'))
						if (!$(this).parents("form").find("input.form-submit").hasClass("disabled")) $(this).parents("form").find("input.form-submit").fadeTo(300, 0.5).addClass("disabled").prop('disabled', true);
				}
				else {
					$("input.phone_field").next(".form_item_error").remove();
					if (!$(this).parents('form').hasClass('js-step1'))
						if ($(this).parents("form").find("input.form-submit").hasClass("disabled")) $(this).parents("form").find("input.form-submit").fadeTo(300, 1).removeClass("disabled").prop('disabled', false);
				}
			}
		});
	});

	$('.phone_field').mask('+373 (999)999-99');
	$('#time').mask('99:99');
	$('#date').mask('99.99.9999');
	$('body').on("change keyup input click", ".numeric_field", function() {
	    if (this.value.match(/[^0-9]/g)) {
	        this.value = this.value.replace(/[^0-9]/g, '');
	    }
	});
	$('body').on("change keyup input click", ".alphabetical_field", function() {
	    if (this.value.match(/[^a-zA-Zа-яА-Я- ]/g)) {
	        this.value = this.value.replace(/[^a-zA-Zа-яА-Я- ]/g, '');
	    }
	});
	$("body").on("focus", "input, textarea",function(){if (($(this).val() == '')||($(this).val() == '+373 (___)___-__-__')||($(this).val() == '__:__')) {$(this).prev(".place_holder").animate({fontSize: "11px", top: "1px"}, 100);}});
	$("body").on("blur", "input, textarea",function(){if (($(this).val() == '')||($(this).val() == '+373 (___)___-__-__')||($(this).val() == '__:__')) {$(this).prev(".place_holder").animate({fontSize: "15px", top: "18px"}, 100);}});
	$("body").on("click", ".place_holder",function(){$(this).next("input, textarea").focus();});
    //плэйсхрлдеры

	//главный слайдер
	$('.main_slider').each(function(){
		var $this = $(this),
			slides_count = $(".ms_slide", $this).length;
		$(".ms_slide:eq(0), .ms_text:eq(0)", $this).show();
		for (var i = 1; i <= slides_count; i++) {
			$(".main_slider_controls", $this).append('<div class="slide_btn"></div>');
		}
		$(".slide_btn:eq(0)", $this).addClass("active");
	});

	var change_slide = function(next_slide) {
		var $parent;
		if ($('.tab-personal').css('display') != 'none')
			$parent = $('.tab-personal');
		else
			$parent = $('.tab-corporate');
		if ($(".ms_slide", $parent).is(":animated") == false) {
			var cur_slide = $(".ms_slide", $parent).index($(".ms_slide:visible", $parent));
			$(".ms_slide:eq("+cur_slide+")", $parent).fadeOut(1000);
			$(".ms_slide:eq("+next_slide+")", $parent).fadeIn(1000);
			$(".ms_text:eq("+cur_slide+")", $parent).fadeOut(1000);
			$(".ms_text:eq("+next_slide+")", $parent).fadeIn(1000);
			$(".slide_btn", $parent).removeClass("active");
			$(".slide_btn:eq("+next_slide+")", $parent).addClass("active");
		}
	}
	$(".slide_btn").click(function(){
		var $parent = $(this).parents('.main_slider');
		if ($(this).hasClass("active") == false) {
			clearInterval(MainSliderTimer);
			var new_slide = $(".slide_btn", $parent).index($(this));
			change_slide(new_slide);
		}
	});

	var MainSliderTimer = setInterval(function(){
		var $parent;
		if ($('.tab-personal').css('display') != 'none')
			$parent = $('.tab-personal');
		else
			$parent = $('.tab-corporate');
		var cur_slide = $(".ms_slide", $parent).index($(".ms_slide:visible", $parent));
		var slides_count = $(".ms_slide", $parent).length;
		var new_slide = (cur_slide+1 < slides_count)?cur_slide+1:0;
		change_slide(new_slide);
	}, 5000);
	//главный слайдер

	//Калькуляторы
	$(".value_select .value_item").click(function(){
		if ($(this).hasClass("active") == false) {
			var text = '';
			switch ($(this).children("input").val()) {
				case "RPM": text = 'Рублей ПМР'; break;
				case "RUB": text = 'Рублей РФ'; break;
				case "EUR": text = 'Евро'; break;
				case "USD": text = 'Долларов США'; break;
				case "MDL": text = 'Лей РМ'; break;
			}
			$(".value_select .value_item").removeClass("active");
			$(this).addClass("active");
			$(this).children("input").attr( "checked", "checked");
			$(".cash_field_desc").text(text);

			if ($(this).parents('form').attr('id') == 'credit') {
				$('#credit .cash_slider_wrap').empty();
				if ($('.permanent_checker .permanent_checker_box').hasClass('checked')) {
					switch ($(this).children("input").val()) {
						case "RPM":
							$('#credit .cash_slider_wrap').html('<div class="steps steps_usd"><span>2 220</span><span>13 200</span><span>27 200</span><span>40 200</span><span>53 200</span><span>66 600</span></div> <div class="cash_slider" id="cash_slider"></div>');
							$("#cash_slider").slider({
								range: "min",
								min: 2200,
								max: 66600,
								step: 1000,
								value: 20000,
								slide: function( event, ui ) {
									$( "input#sum" ).val(ui.value );
								}
								// change: function(event, ui) {
								// 	$( "input#sum" ).val(ui.value );
								// }
							});

							$( "input#sum" ).val("20000");
							$("input#sum").change(function(){
								$("#cash_slider").slider("value",$(this).val());
							});
							break;
						case "RUB":
							break;
						case "EUR":
							$('#credit .cash_slider_wrap').html('<div class="steps steps_usd"><span>188</span><span>1 100</span><span>2 200</span><span>3 400</span><span>4 500</span><span>5 634</span></div> <div class="cash_slider" id="cash_slider"></div>');
							$("#cash_slider").slider({
								range: "min",
								min: 188,
								max: 5634,
								step: 100,
								value: 2000,
								slide: function( event, ui ) {
									$( "input#sum" ).val(ui.value );
								}
								// change: function(event, ui) {
								// 	$( "input#sum" ).val(ui.value );
								// }
							});
							$( "input#sum" ).val("2000");
							$("input#sum").change(function(){
								$("#cash_slider").slider("value",$(this).val());
							});
							break;
						case "USD":
							$('#credit .cash_slider_wrap').html('<div class="steps steps_usd"><span>200</span><span>1 100</span><span>2 300</span><span>3 500</span><span>4 800</span><span>6 000</span></div> <div class="cash_slider" id="cash_slider"></div>');
							$("#cash_slider").slider({
								range: "min",
								min: 200,
								max: 5000,
								step: 100,
								value: 2000,
								slide: function( event, ui ) {
									$( "input#sum" ).val(ui.value );
								}
								// change: function(event, ui) {
								// 	$( "input#sum" ).val(ui.value );
								// }
							});
							$( "input#sum" ).val("2000");
							$("input#sum").off('change');
							$("input#sum").on('change', function(){
								$("#cash_slider").slider("value",$(this).val());
							});


							break;
					}
				}
				else {
					switch ($(this).children("input").val()) {
						case "RPM":
							$('#credit .cash_slider_wrap').html('<div class="steps steps_usd"><span>2 220</span><span>10 000</span><span>20 000</span><span>30 000</span><span>40 000</span><span>55 500</span></div> <div class="cash_slider" id="cash_slider"></div>');
							$("#cash_slider").slider({
								range: "min",
								min: 2220,
								max: 55500,
								step: 1000,
								value: 20000,
								slide: function (event, ui) {
									$("input#sum").val(ui.value);
								}
								// change: function(event, ui) {
								// 	$( "input#sum" ).val(ui.value );
								// }
							});
							$("input#sum").val("20000");
							$("input#sum").change(function () {
								$("#cash_slider").slider("value", $(this).val());
							});

							break;
						case "RUB":
							break;
						case "EUR":
							$('#credit .cash_slider_wrap').html('<div class="steps steps_usd"><span>188</span><span>1 000</span><span>2 000</span><span>3 000</span><span>4 000</span><span>4 695</span></div> <div class="cash_slider" id="cash_slider"></div>');
							$("#cash_slider").slider({
								range: "min",
								min: 188,
								max: 4695,
								step: 100,
								value: 2000,
								slide: function (event, ui) {
									$("input#sum").val(ui.value);
								}
								// change: function(event, ui) {
								// 	$( "input#sum" ).val(ui.value );
								// }
							});
							$("input#sum").val("2000");
							$("input#sum").change(function () {
								$("#cash_slider").slider("value", $(this).val());
							});
							break;
						case "USD":
							$('#credit .cash_slider_wrap').html('<div class="steps steps_usd"><span>200</span><span>1 000</span><span>2 000</span><span>3 000</span><span>4 000</span><span>5 000</span></div> <div class="cash_slider" id="cash_slider"></div>');
							$("#cash_slider").slider({
								range: "min",
								min: 200,
								max: 5000,
								step: 100,
								value: 2000,
								slide: function (event, ui) {
									$("input#sum").val(ui.value);
								}
								// change: function(event, ui) {
								// 	$( "input#sum" ).val(ui.value );
								// }
							});
							$("input#sum").val("2000");
							$("input#sum").change(function () {
								$("#cash_slider").slider("value", $(this).val());
							});
							break;
					}
				}
			}
			if ($(this).parents('form').attr('id') == 'deposit') {
				$('#credit .cash_slider_wrap').empty();
				switch ($(this).children("input").val()) {
					case "RPM":
						// $('#deposit .cash_slider_wrap').html('<div class="steps steps_usd step_rpm"><span>3 000</span><span>750 000</span><span>1 500 000</span><span>2 000 000</span></div> <div class="cash_slider" id="cash_slider"></div>');
						// $("#cash_slider").slider({
						// 	range: "min",
						// 	min: 3000,
						// 	max: 2000000,
						// 	step: 10000,
						// 	value: 200000,
						// 	slide: function( event, ui ) {
						// 		$( "input#sum" ).val(ui.value );
						// 	},
						// 	change: function(event, ui) {
						// 		$( "input#sum" ).val(ui.value );
						// 	}
						// });
						// $( "input#sum" ).val("200000");
						// $("input#sum").change(function(){
						// 	$("#cash_slider").slider("value",$(this).val());
						// });
						$('#deposit .cash_slider_wrap').html('<div class="steps steps_usd step_rpm"><span>3 000</span><span>50 000</span><span>100 000</span><span>250 000</span><span>500 000</span><span>1 000 000</span><span>2 000 000</span></div> <div class="cash_slider" id="cash_slider"></div>');

						var amounts = [3000, 50000, 100000, 250000, 500000, 1000000, 2000000]
						sliderValFunc(amounts, 'RPM')
						break;
					case "MDL":
						// $('#deposit .cash_slider_wrap').html('<div class="steps steps_usd step_rpm"><span>3 000</span><span>750 000</span><span>1 500 000</span><span>2 000 000</span></div> <div class="cash_slider" id="cash_slider"></div>');
						// $("#cash_slider").slider({
						// 	range: "min",
						// 	min: 3000,
						// 	max: 2000000,
						// 	step: 10000,
						// 	value: 200000,
						// 	slide: function( event, ui ) {
						// 		$( "input#sum" ).val(ui.value );
						// 	},
						// 	change: function(event, ui) {
						// 		$( "input#sum" ).val(ui.value );
						// 	}
						// });
						// $( "input#sum" ).val("200000");
						// $("input#sum").change(function(){
						// 	$("#cash_slider").slider("value",$(this).val());
						// });
						$('#deposit .cash_slider_wrap').html('<div class="steps steps_usd step_rpm"><span>3 000</span><span>50 000</span><span>100 000</span><span>250 000</span><span>500 000</span><span>1 000 000</span><span>2 000 000</span></div> <div class="cash_slider" id="cash_slider"></div>');

						var amounts = [3000, 50000, 100000, 250000, 500000, 1000000, 2000000]
						sliderValFunc(amounts, 'MDL')
						break;
					case "RUB":
						// $('#deposit .cash_slider_wrap').html('<div class="steps steps_usd step_rub"><span>10 000</span><span>2 000 000</span><span>4 000 000</span><span>6 000 000 </span></div> <div class="cash_slider" id="cash_slider"></div>');
						// $("#cash_slider").slider({
						// 	range: "min",
						// 	min: 10000,
						// 	max: 6000000,
						// 	step: 10000,
						// 	value: 100000,
						// 	slide: function( event, ui ) {
						// 		$( "input#sum" ).val(ui.value );
						// 	},
						// 	change: function(event, ui) {
						// 		$( "input#sum" ).val(ui.value );
						// 	}
						// });
						// $( "input#sum" ).val("100000");
						// $("input#sum").change(function(){
						// 	$("#cash_slider").slider("value",$(this).val());
						// });
						$('#deposit .cash_slider_wrap').html('<div class="steps steps_usd step_rub"><span>10 000</span><span>1 000 000</span><span>2 000 000</span><span>3 000 000</span><span>4 000 000</span><span>5 000 000</span><span>6 000 000</span></div> <div class="cash_slider" id="cash_slider"></div>');

						var amounts = [10000, 1000000, 2000000, 3000000, 4000000, 5000000, 6000000]
						sliderValFunc(amounts, 'RUB')
						break;
					case "EUR":
						// $('#deposit .cash_slider_wrap').html('<div class="steps steps_usd fix"><span>300</span><span>33 000</span><span>78 000</span><span>120 000</span><span>160 000</span><span>200 000</span></div> <div class="cash_slider" id="cash_slider"></div>');
						// $("#cash_slider").slider({
						// 	range: "min",
						// 	min: 300,
						// 	max: 200000,
						// 	step: 1000,
						// 	value: 10000,
						// 	slide: function( event, ui ) {
						// 		$( "input#sum" ).val(ui.value );
						// 	},
						// 	change: function(event, ui) {
						// 		$( "input#sum" ).val(ui.value );
						// 	}
						// });
						// $( "input#sum" ).val("10000");
						// $("input#sum").change(function(){
						// 	$("#cash_slider").slider("value",$(this).val());
						// });
						$('#deposit .cash_slider_wrap').html('<div class="steps steps_usd fix"><span>300</span><span>5 000</span><span>10 000</span><span>25 000</span><span>50 000</span><span>100 000</span><span>200 000</span></div> <div class="cash_slider" id="cash_slider"></div>');

						var amounts = [300, 5000, 10000, 25000, 50000, 100000, 200000]
						sliderValFunc(amounts)
						break;
					case "USD":
						// $('#deposit .cash_slider_wrap').html('<div class="steps steps_usd fix"><span>300</span><span>33 000</span><span>78 000</span><span>120 000</span><span>160 000</span><span>200 000</span></div> <div class="cash_slider" id="cash_slider"></div>');
						// $("#cash_slider").slider({
						// 	range: "min",
						// 	min: 300,
						// 	max: 200000,
						// 	step: 1000,
						// 	value: 10000,
						// 	slide: function( event, ui ) {
						// 		$( "input#sum" ).val(ui.value );
						// 	},
						// 	change: function(event, ui) {
						// 		$( "input#sum" ).val(ui.value );
						// 	}
						// });
						// $( "input#sum" ).val("10000");
						// $("input#sum").change(function(){
						// 	$("#cash_slider").slider("value",$(this).val());
						// });

						$('#deposit .cash_slider_wrap').html('<div class="steps steps_usd fix"><span>300</span><span>5 000</span><span>10 000</span><span>25 000</span><span>50 000</span><span>100 000</span><span>200 000</span></div> <div class="cash_slider" id="cash_slider"></div>');

						var amounts = [300, 5000, 10000, 25000, 50000, 100000, 200000]
						sliderValFunc(amounts)
						break;
				}
			}
		}
	});



	// slider value func

	function sliderValFunc(amounts, currency){
		var value = 1;
		var amounts = amounts
		var sectionsCount = $('#deposit .cash_slider_wrap .steps > span').length-1;

		$('#cash_slider').slider({
	        range: "min",
	        min: 1,
	        max: 900,
	        step: 1,
	        slide: function( event, ui ) {

	            if(sectionsCount){

	                while(amounts.length-1 > sectionsCount)
	                    amounts.shift();

	                var section = 900/sectionsCount;

	                for(i=1; i<amounts.length; i++){
	                    if (ui.value <= i*section) {
	                        value = amounts[i-1] + (ui.value-section*(i-1))/section*(amounts[i]-amounts[i-1]);
	                        break;
	                    }
	                }
	            }

	            value = Math.round(value/1000)*1000

	            if(currency == 'RUB') {
	            	if(value == 17000) {
		                value = 10000
		            }
	            }
	            else {
		            if(value == 0) {
		                value = 300
		            }
		        }

	            $( "input#sum" ).val( value )
	        }
	    })
        console.log(query_string['SUM']);
		if(currency == 'RUB' || currency == 'RPM' || currency == 'MDL') {
			if (query_string['SUM']) {
				$("input#sum").val(query_string['SUM']);
		    	$("#cash_slider").slider('option', 'value', sliderVal(query_string['SUM']));
			}
			else {
				$("input#sum").val("100000");
		    	$("#cash_slider").slider('option', 'value', sliderVal(100000));
			}
	    }
	    else {
	    	if (query_string['SUM']) {
				$("input#sum").val(query_string['SUM']);
		    	$("#cash_slider").slider('option', 'value', sliderVal(query_string['SUM']));
			}
	    	else {
		    	$("input#sum").val("10000");
		    	$("#cash_slider").slider('option', 'value', sliderVal(10000));
	    	}
	    }

	    $("input#sum").on('change', function(){
	        if (this.value.match(/[^0-9]/g)) {
	            this.value = this.value.replace(/[^0-9]/g, '')
	        }
	        else {
	            $("#cash_slider").slider('option', 'value', sliderVal($(this).val()))
	        }
	    })


	     function sliderVal(value) {
	        if(sectionsCount){
	            while(amounts.length-1 > sectionsCount)
	                amounts.shift();
	            var section = 900/sectionsCount;
	            for(i=1; i<amounts.length; i++){
	                if (value <= amounts[i]) {
	                    value = section*(i-1) + Math.floor((value - amounts[i-1])/(amounts[i] - amounts[i-1])*section);
	                    break;
	                }
	            }
	        }
	        return value;
	    }
	}




	$(".pay_select .value_item").click(function(){
		if ($(this).hasClass("active") == false) {
			$(this).parent("div").children(".value_item").removeClass("active");
			$(this).addClass("active");
			$(this).children("input").prop( "checked", true);
		}
	});
	$(".time_select .value_item").click(function(){
		if ($(this).hasClass("active") == false) {
			$(".select_deposit_timing").hide();
			if ($(this).children("input").attr("value") == "*") $(".select_deposit_timing").show();
			$(this).parent("div").children(".value_item").removeClass("active");
			$(this).addClass("active");
			$(this).children("input").prop( "checked", true);
		}
	});
	$(".permanent_checker").click(function(){
		if ($(this).children(".permanent_checker_box").hasClass("checked") == false) {
			$(this).children(".permanent_checker_box").addClass("checked");
			$(this).children("input").prop("checked", true);
		}
		else {
			$(this).children(".permanent_checker_box").removeClass("checked");
			$(this).children("input").prop("checked", false);
		}
	});

	$("#cash_slider").slider({
		range: "min",
		min: 200,
		max: 5000,
		step: 100,
		value: 2000,
		slide: function( event, ui ) {
			$( "input#sum" ).val(ui.value );
		}
	});
	$("input#sum").change(function(){
	    $("#cash_slider").slider("value",$(this).val());

	    console.log($(this).val())
	});
	$("#time_slider").slider({
		range: "min",
		min: 6,
		max: 24,
		step: 1,
		value: 12,
		slide: function( event, ui ) {
			$( "input#cash-time" ).val(ui.value );
		}
	});
	$("input#cash-time").change(function(){
	    $("#time_slider").slider("value",$(this).val());
	});
	//Калькуляторы

	//Офисы и отделения
	$(".dep_menu").click(function(){
		if ($(this).text() == "Офисы на карте") {
			$(this).text("Все офисы Банка");
			$(".dep_map").show();
			$(document).trigger('reinitmap');
			$(".dep_lists").hide();
			$(".dep_checkers").css("display", "inline-block");
		}
		else {
			$(this).text("Офисы на карте");
			$(".dep_map, .dep_checkers").hide(); $(".dep_lists").show();
		}
	});

	$(".dep_area_select .das_active").text($(".dep_area_select .daso_item.active").text());

	$(".dep_area_select .daso_item").click(function(){
		if (!$(this).hasClass("active")) {
			$(".dep_area_select .daso_item").removeClass("active");
			$(this).addClass("active");
			$(".dep_area_select .das_active").text($(this).text());
			$(".dep_area_select .das_options").slideUp(100);
			window.location.href = $(this).find('a').attr('href');
			return false;
		}
	});

	$(".das_options").perfectScrollbar({
		width: "191px",
		height: "293px",
		swipePropagation: false,
		useBothWheelAxes: true,
	});

	if ($(".dep_head_checker").hasClass("active")) {$(".dep_mark.dep_central").show();}
	if ($(".dep_ofice_checker").hasClass("active")) {$(".dep_mark.dep_child").show();}
	if ($(".dep_exchange_checker").hasClass("active")) {$(".dep_mark.dep_exchange").show();}
	$(".dep_checker_btn").click(function(){
		$(this).parent(".filter_checker").toggleClass("active");
		if ($(this).parent(".filter_checker").hasClass("active")) {
			$(document).trigger('rebuildmaplist');

			//кусок для монет
			if ($(this).parent(".filter_checker").hasClass("dep_invest_checker")) {$(".invest_coins_box, .invest_h").show();}
			if ($(this).parent(".filter_checker").hasClass("dep_memory_checker")) {$(".memory_coins_box, .memory_h").show();}
			if ($(this).parent(".filter_checker").hasClass("dep_set_checker")) {$(".set_coins_box, .set_h").show();}
		}
		else {
			$(document).trigger('rebuildmaplist');

			//кусок для монет
			if ($(this).parent(".filter_checker").hasClass("dep_invest_checker")) {$(".invest_coins_box, .invest_h").hide();}
			if ($(this).parent(".filter_checker").hasClass("dep_memory_checker")) {$(".memory_coins_box, .memory_h").hide();}
			if ($(this).parent(".filter_checker").hasClass("dep_set_checker")) {$(".set_coins_box, .set_h").hide();}
		}
	});
	$(".dep_mark > .dep_mark_bg").click(function(){
		if ($(this).next(".dep_mark_desc").is(":hidden")) {
			$(".dep_mark_desc").fadeOut(100);
			$(this).next(".dep_mark_desc").fadeIn(100);
		}
	});
	$(".mark_close").click(function(){
		$(this).parent(".dep_mark_desc").fadeOut(100);
	});
	//Офисы и отделения

	//Архив
	/*$(".arch_type_select .ats_active").text($(".arch_type_select .atso_item:eq(0)").text());
	$(".arch_type_select .atso_item:eq(0)").addClass("active");
	$(".arch_period_select .aps_active").text($(".arch_period_select .apso_item:eq(0)").text());
	$(".arch_period_select .apso_item:eq(0)").addClass("active");
	$(".arch_year_box:eq(0)").show();

	$(".item_select .item_select_option").click(function(){
		if (!$(this).hasClass("active")) {
			console.log($(this).attr("id"));
			$(this).parent(".item_select_options").children(".item_select_option").removeClass("active");
			$(this).addClass("active");
			$(this).parent(".item_select_options").parent(".item_select").children(".item_select_active").text($(this).text());
			if ($(this).attr("id") == "year_arch") {$(".arch_quarter_title").hide(100);}
			if ($(this).attr("id") == "quarter_arch") {$(".arch_quarter_title").show(100);}
			if ($(this).hasClass("apso_item")) {
				var select_num = $(".apso_item").index($(this));
				$(".arch_year_box").hide();
				$(".arch_year_box:eq("+select_num+")").show();
			}
		}
	});*/

	//Архив

	//МОНЕТЫ
	if ($(".dep_invest_checker").hasClass("active")) {$(".invest_coins_box, .invest_h").show();}
	if ($(".dep_memory_checker").hasClass("active")) {$(".memory_coins_box, .memory_h").show();}
	if ($(".dep_set_checker").hasClass("active")) {$(".set_coins_box, .set_h").show();}

	var set_slider_init = function(box, visible_count, item_width) {
		switch (visible_count) {
			case 4: box.attr("class", "set_coins_box"); box.addClass("slider-4-width"); break;
			case 3: box.attr("class", "set_coins_box"); box.addClass("slider-3-width"); break;
			case 2: box.attr("class", "set_coins_box"); box.addClass("slider-2-width"); break;
			case 1: box.attr("class", "set_coins_box"); box.addClass("slider-1-width"); break;
		}
		var items_count = box.children(".set_coins_slider").children(".scs_inner").children(".set_coins_item").length;
		box.children(".set_coins_slider").children(".scs_inner").width(items_count*item_width);
		box.children(".set_coins_slider").children(".scs_inner").css("marginLeft","0");
	}

	var set_slider_visible_items_count = 0;
	if ($(window).width() > 1282) {
		$(".set_coins_box").each(function(){
			var slider_id = $(this).attr("id");
			set_slider_init($("#"+slider_id+""), 4, 320); set_slider_visible_items_count = 4;
		});
	}
	else if (($(window).width() <= 1282)&&($(window).width() >= 1007)) {
		$(".set_coins_box").each(function(){
			var slider_id = $(this).attr("id");
			set_slider_init($("#"+slider_id+""), 3, 320); set_slider_visible_items_count = 3;
		});
	}
	else if (($(window).width() < 1007)&&($(window).width() >= 757)) {
		$(".set_coins_box").each(function(){
			var slider_id = $(this).attr("id");
			set_slider_init($("#"+slider_id+""), 2, 360); set_slider_visible_items_count = 2;
		});
	}
	else if ($(window).width() < 757) {
		$(".set_coins_box").each(function(){
			var slider_id = $(this).attr("id");
			set_slider_init($("#"+slider_id+""), 1, 300); set_slider_visible_items_count = 1;
		});

		//селектор наборов
		$(".set_coins_box").hide();
		$(".set_coins_box:eq(0)").show();
		$(".scsl_item").removeClass("active");
		$(".scsl_item:eq(0)").addClass("active");
	}

	$(window).on("resize", function(){
		if ($(window).width() > 1282) {
			if (!$(".slider-4-width").length) {
				$(".set_coins_box").each(function(){
					var slider_id = $(this).attr("id");
					set_slider_init($("#"+slider_id+""), 4, 320); set_slider_visible_items_count = 4;
				});
			}
			$(".set_coins_box").show();
		}
		else if (($(window).width() <= 1282)&&($(window).width() >= 1007)) {
			if (!$(".slider-3-width").length) {
				$(".set_coins_box").each(function(){
					var slider_id = $(this).attr("id");
					set_slider_init($("#"+slider_id+""), 3, 320); set_slider_visible_items_count = 3;
				});
			}
			$(".set_coins_box").show();
		}
		else if (($(window).width() < 1007)&&($(window).width() >= 742)) {
			if (!$(".slider-2-width").length) {
				$(".set_coins_box").each(function(){
					var slider_id = $(this).attr("id");
					set_slider_init($("#"+slider_id+""), 2, 360); set_slider_visible_items_count = 2;
				});
			}
			$(".set_coins_box").show();
		}
		else if ($(window).width() < 742) {
			if (!$(".slider-1-width").length) {
				$(".set_coins_box").each(function(){
					var slider_id = $(this).attr("id");
					set_slider_init($("#"+slider_id+""), 1, 300); set_slider_visible_items_count = 1;
				});
			}

			//селектор наборов
			$(".set_coins_box").hide();
			$(".set_coins_box:eq(0)").show();
			$(".scsl_item").removeClass("active");
			$(".scsl_item:eq(0)").addClass("active");
		}
	});

	$("body").on("click", ".scs_btn", function(){$(".scs_list").slideToggle(100);});
	$("body").on("click", ".scsl_item", function(){
		if (!$(this).hasClass("active")) {
			var element = $(".scsl_item").index($(this));
			$(".scsl_item").removeClass("active");
			$(".set_coins_box").hide();
			$(this).addClass("active");
			$(".set_coins_box:eq("+element+")").show();
			$(".scs_list").slideUp(100);
		}
	});

	var slider_init = function(box) {
		var coins_content = box.html();
		box.html('<div class="slider_controls sc_left"></div><div class="slider_controls sc_right"></div><div class="coins_slider_wrap"><div class="coins_slider_inner">'+coins_content+'</div></div>');
		var items_count = box.children(".coins_slider_wrap").children(".coins_slider_inner").children(".coins_item").length;
		box.children(".coins_slider_wrap").children(".coins_slider_inner").width(items_count*300);
	}
	var slider_off = function(box) {
		var coins_content = box.children(".coins_slider_wrap").children(".coins_slider_inner").html();
		box.html(coins_content);
	}
	if ($(window).width() <= 742) {
		slider_init($(".invest_coins_box"));
		slider_init($(".memory_coins_box"));
	}
	$(window).on("resize", function(){
		if ($(window).width() <=742) {
			if (!$(".coins_slider_wrap").length) {
				slider_init($(".invest_coins_box"));
				slider_init($(".memory_coins_box"));
			}
		}
		else {
			if ($(".coins_slider_wrap").length) {
				slider_off($(".invest_coins_box"));
				slider_off($(".memory_coins_box"));
			}
		}
	});

	$("body").on("click", ".sc_left", function(){
		var box = $(this).parent("div").children(".coins_slider_wrap").children(".coins_slider_inner");
		if (!box.is(":animated")) {
			var cur_pos = parseInt(box.css("marginLeft"));
			$(".coins_ext_info:visible").slideUp(100);
			if ((cur_pos+300)<=0) {box.animate({marginLeft: cur_pos + 300}, 200);}
		}

		var box = $(this).parent("div").children(".set_coins_slider").children(".scs_inner");
		if (!box.is(":animated")) {
			var item_width = box.children(".set_coins_item").width() + 22;
			var cur_pos = parseInt(box.css("marginLeft"));
			$(".coins_ext_info:visible").slideUp(100);
			if ((cur_pos+item_width)<=0) {box.animate({marginLeft: cur_pos + item_width}, 200);}
		}
	});
	$("body").on("click", ".sc_right", function(){
		var box = $(this).parent("div").children(".coins_slider_wrap").children(".coins_slider_inner");
		if (!box.is(":animated")) {
			var box_width = box.width();
			var cur_pos = parseInt(box.css("marginLeft"));
			$(".coins_ext_info:visible").slideUp(100);
			if ((cur_pos-300)>-box_width) {box.animate({marginLeft: cur_pos - 300}, 200);}
		}

		var box = $(this).parent("div").children(".set_coins_slider").children(".scs_inner");
		if (!box.is(":animated")) {
			var item_width = box.children(".set_coins_item").width() + 22;
			var box_width = box.width();
			var cur_pos = parseInt(box.css("marginLeft"));
			$(".coins_ext_info:visible").slideUp(100);
			if ((cur_pos-(item_width*set_slider_visible_items_count))>-box_width) {box.animate({marginLeft: cur_pos - item_width}, 200);}
		}
	});


	$("body").on("click", '.coins_rotate', function(){
		var avers = $(this).parent(".coins_image").children(".coin_avers");
		var revers = $(this).parent(".coins_image").children(".coin_revers");
		var animation_check_1 = avers.children("a").children("img").is(":animated");
		var animation_check_2 = revers.children("a").children("img").is(":animated");
		if (!animation_check_1 && !animation_check_2) {
			if (avers.children("a").children("img").is(":visible")) {
				var avers_height = avers.children("a").children("img").height();
				var avers_width = avers.children("a").children("img").width();
				revers.show();
				var revers_height = revers.children("a").children("img").height();
				var revers_width = revers.children("a").children("img").width();
				avers.children("a").children("img").height(avers_height);
				revers.children("a").children("img").height(revers_height);
				revers.children("a").children("img").width(0);
				avers.children("a").children("img").animate({width: "0px"}, 100, function(){
					avers.hide();
					avers.children("a").children("img").width(avers_width);
					revers.children("a").children("img").animate({width: revers_width}, 100);
				});
			}
			else {
				avers.show();
				var avers_height = avers.children("a").children("img").height();
				var avers_width = avers.children("a").children("img").width();
				var revers_height = revers.children("a").children("img").height();
				var revers_width = revers.children("a").children("img").width();
				avers.children("a").children("img").height(avers_height);
				revers.children("a").children("img").height(revers_height);
				avers.children("a").children("img").width(0);
				revers.children("a").children("img").animate({width: "0px"}, 100, function(){
					revers.hide();
					revers.children("a").children("img").width(revers_width);
					avers.children("a").children("img").animate({width: avers_width}, 100);
				});
			}
		}
	});
	$("body").on("click", ".coins_info_link", function(){
		var box = $(this).parent(".coins_info").children(".coins_ext_info");
		if (!box.is(":animated")) {
			if (box.is(":hidden")) {
				box.slideDown(100);
				$(this).text("Свернуть");
			}
			else {
				box.slideUp(100);
				$(this).text("Подробнее");
			}
		}
		return false;
	});

	//увеличение
	$("body").on("click", ".coins_image a", function(){
		$(".ci_sides span").removeClass("active");
		var side = ($(this).parent("div").hasClass("coin_avers"))?"cic_avers":"cic_revers";
		var avers = $(this).parent("div").parent(".coins_image").children(".coin_avers").children("a").attr("href");
		var revers = $(this).parent("div").parent(".coins_image").children(".coin_revers").children("a").attr("href");
		$(".cic_avers").empty().html('<img src="'+avers+'" />');
		$(".cic_revers").empty().html('<img src="'+revers+'" />');
		$("."+side+"").show(); $("."+side+"_show").addClass("active");
		$(".forms_wrap").fadeIn("1000", function(){$(".coins_wrap_item").fadeIn(100);});
		return false;
	});
	$("body").on("click", ".image_window_close", function(){
		$(".coins_wrap_item").fadeOut("100", function(){$(".forms_wrap").fadeOut(1000);});
	});
	$("body").on("click", ".ci_sides span", function(){
		if (!$(".ci_content").is(":animated")) {
			if (!$(this).hasClass("active")) {
				if ($(this).hasClass("cic_revers_show")) {
					$(".ci_sides span").removeClass("active");
					$(this).addClass("active");
					var avers_height = $(".cic_avers img").height();
					var avers_width = $(".cic_avers img").width();
					$(".cic_revers").show();
					var revers_height = $(".cic_revers img").height();
					var revers_width = $(".cic_revers img").width();
					$(".cic_avers img").height(avers_height);
					$(".cic_revers img").height(revers_height);
					$(".cic_revers img").width(0);
					$(".cic_avers img").animate({width: "0px"}, 100, function(){
						$(".cic_avers").hide();
						$(".cic_avers img").width(avers_width);
						$(".cic_revers img").animate({width: revers_width}, 100);
					});
				}
				else {
					$(".ci_sides span").removeClass("active");
					$(this).addClass("active");
					var revers_height = $(".cic_revers img").height();
					var revers_width = $(".cic_revers img").width();
					$(".cic_avers").show();
					var avers_height = $(".cic_avers img").height();
					var avers_width = $(".cic_avers img").width();
					$(".cic_revers img").height(revers_height);
					$(".cic_avers img").height(avers_height);
					$(".cic_avers img").width(0);
					$(".cic_revers img").animate({width: "0px"}, 100, function(){
						$(".cic_revers").hide();
						$(".cic_revers img").width(revers_width);
						$(".cic_avers img").animate({width: avers_width}, 100);
					});
				}
			}
		}
	});
	//МОНЕТЫ

	//Формы заявки
		//Селект
		$(".form_page_item.form_select").each(function(){
			var list = $(this).children(".fpi_select");
			$(this).children("select").children("option").each(function(){
				list.children(".fpi_options").append('<div class="fpio_item">'+$(this).text()+'</div>');
			});
		});
		$(".fpi_select").each(function(){
			$(this).children(".fpi_active").text($(this).children(".fpi_options").children(".fpio_item:eq(0)").text());
			$(this).children(".fpi_options").children(".fpio_item:eq(0)").addClass("active");
		});
		$(".fpi_select .fpio_item:eq(0)").addClass("active");
		$("body").on("click", ".fpi_select",function(){
			var this_index = $(".fpi_select").index($(this));
			$(".fpi_options").each(function(){
				var cur_index = $(".fpi_options").index($(this));
				if (cur_index != this_index) $(this).slideUp(100);
			});
			$(this).children(".fpi_options").slideToggle(100);
			return false;
		});
		$("body").on("click", ".dep_area_select",function(){
			var this_index = $(".dep_area_select").index($(this));
			$(".das_options").each(function(){
				var cur_index = $(".das_options").index($(this));
				if (cur_index != this_index) $(this).slideUp(100);
			});
			$(this).children(".das_options").slideToggle(100, function(){$('.das_options').perfectScrollbar('update');});
			return false;
		});
		$("body").on("click", ".arch_type_select",function(){
			$(".aps_options").slideUp(100);
			var this_index = $(".arch_type_select").index($(this));
			$(".ats_options").each(function(){
				var cur_index = $(".ats_options").index($(this));
				if (cur_index != this_index) $(this).slideUp(100);
			});
			$(this).children(".ats_options").slideToggle(100);
			return false;
		});
		$("body").on("click", ".arch_period_select",function(){
			$(".ats_options").slideUp(100);
			var this_index = $(".arch_period_select").index($(this));
			$(".aps_options").each(function(){
				var cur_index = $(".aps_options").index($(this));
				if (cur_index != this_index) $(this).slideUp(100);
			});
			$(this).children(".aps_options").slideToggle(100);
			return false;
		});
		$(window).click(function(){
			$(".fpi_options").slideUp(100);
		});
		$("body").on("mousedown", ".dep_area_select, .arch_type_select, .arch_period_select",function(){
			return false;
		});
		$(window).mousedown(function(e){
			$(".das_options, .ats_options, .aps_options").slideUp(100);
			//return false;
		});
		$("body").on("click", ".fpi_select .fpio_item",function(){
			if (!$(this).hasClass("active")) {
				$(this).parent(".fpi_options").children(".fpio_item").removeClass("active");
				$(this).addClass("active");
				$(this).parent(".fpi_options").parent(".fpi_select").children(".fpi_active").text($(this).text());
				var this_index = $(this).parent(".fpi_options").children(".fpio_item").index($(this));
				var select_val = $(this).parent(".fpi_options").parent(".fpi_select").next("select").children("option:eq("+this_index+")").attr("value");
				$(this).parent(".fpi_options").parent(".fpi_select").next("select").val(select_val);
				$(".fpi_select .fpi_options").slideUp(100);

				var $select = $(this).parents('.form_page_item:eq(0)').find('select');
				$('option', $select).removeAttr('selected');
				$('option:eq(' + this_index + ')', $select).attr('selected', 'selected');
				$select.val($('option:eq(' + this_index + ')', $select).val());
				console.log($select);
				$select.trigger('change');

				return false;
			}
		});

		//Радио
		$("body").on("click", ".fpi_radio",function(){
			$(this).parent(".form_page_item").children('.fpi_radio').children('.fpi_icon').removeClass("checked");
			$(this).children('.fpi_icon').addClass("checked");
			$(this).children('input').attr("checked", "checked");
			$(this).children('input').trigger('change');
			console.log('ok!');
			if ($(this).parent(".form_page_item").hasClass("deposit_crnc_item")) {
				switch ($(this).children(".fpi_text").text()) {
					case "Доллар США": $(".deposit_summ_item .fpi_right_desc").text("долларов США"); break;
					case "Евро": $(".deposit_summ_item .fpi_right_desc").text("евро"); break;
					case "Рубль ПМР": $(".deposit_summ_item .fpi_right_desc").text("рублей ПМР"); break;
				}
			}
			if ($(this).parent(".form_page_item").hasClass("credit_crnc_item")) {
				switch ($(this).children(".fpi_text").text()) {
					case "Доллар США": $(this).parent(".form_page_item").parent(".form_page_item_items_box_single_item").children(".deposit_summ_item").children(".fpi_right_desc").text("долларов США"); break;
					case "Евро": $(this).parent(".form_page_item").parent(".form_page_item_items_box_single_item").children(".deposit_summ_item").children(".fpi_right_desc").text("евро"); break;
					case "Рубль ПМР": $(this).parent(".form_page_item").parent(".form_page_item_items_box_single_item").children(".deposit_summ_item").children(".fpi_right_desc").text("рублей ПМР"); break;
				}
			}
			if ($(this).parent(".form_page_item").hasClass("form_citizenship_item_radio")) {
				switch ($(this).children(".fpi_text").text()) {
					case "ПМР":
						if (!$(".form_citizenship_item_text").hasClass("form_page_item_disabled"))
						$(".form_citizenship_item_text").addClass("form_page_item_disabled");
						$(".form_citizenship_item_text input").prop('disabled', true);
						$(".form_citizenship_item_text input").attr('data-required', 'false');
						$(".form_citizenship_item_text input").parent().find('.form_item_error').remove();
					break;
					case "Иное":
						$(".form_citizenship_item_text").removeClass("form_page_item_disabled");
						$(".form_citizenship_item_text input").prop('disabled', false);
						$(".form_citizenship_item_text input").attr('data-required', 'true');
					break;
				}
			}

		});

		//подсказка
		$("#confirm_popup").click(function(){
			if ($(this).prev(".confirm_text").is(":hidden")) {$(this).prev(".confirm_text").fadeIn(100);}
			else {$(this).prev(".confirm_text").fadeOut(100);}
			return false;
		});
		$(".confirm_text").click(function(){return false;});

		//Файлы
		var file_api = ( window.File && window.FileReader && window.FileList && window.Blob ) ? true : false;
		$("body").on("click", ".add_file_link", function(){
			return false;
		});
	    $(".form-file").change(function(){
	    	var file_box = $(this).next(".fia_file");
	        var file_name;
	        if( file_api && $(this)[ 0 ].files[ 0 ] ) file_name = $(this)[ 0 ].files[ 0 ].name;
	        else file_name = $(this).val().replace( "C:\\fakepath\\", '' );
	        if(!file_name.length) return;
	        $(this).prev(".add_file_link").css({"opacity":"0", "position":"absolute", "left":"-30000px"});
	        $(this).css({"left":"-30000px"});
	        file_box.show().children(".fiaf_name").text(file_name);
	    }).change();
	    $("body").on("click", ".fiaf_del", function(){
	    	$(this).parent(".fia_file").hide();
	    	$(this).parent(".fia_file").parent(".form_item_attachments").children(".add_file_link").css({"opacity":"1", "position":"relative", "left":"0px"});
	    	$(this).parent(".fia_file").parent(".form_item_attachments").children(".form-file").css({"left":"0px"});
	    });
	    //еще файлы
	    $("body").on("change", ".pageform-file", function(){
	    	var file_box = $(this).parent(".fpifi_file_add").next(".fpifi_file_desc");
	        var file_name;
	        if( file_api && $(this)[ 0 ].files[ 0 ] ) file_name = $(this)[ 0 ].files[ 0 ].name;
	        else file_name = $(this).val().replace( "C:\\fakepath\\", '' );
	        if(!file_name.length) return;
	        $(this).parent(".fpifi_file_add").css({"opacity":"0", "position":"absolute", "left":"-30000px"});
	        $(this).parent(".fpifi_file_add").parent(".fpifi_file").next(".fpifi_controls").children(".fpifi_del").removeClass("disabled");
	        file_box.show().text(file_name);
	    }).change();
	    $("body").on("click", ".fpifi_del", function(){
	    	if (!$(this).hasClass("disabled")) {
	    		var files_count_check = $(this).parent("div").parent("div").parent("div").find(".fpi_file_item").length;
		    	if (files_count_check == 1) {
		    		$(this).parent(".fpifi_controls").prev(".fpifi_file").children(".fpifi_file_desc").hide();
			    	$(this).parent(".fpifi_controls").prev(".fpifi_file").children(".fpifi_file_add").css({"opacity":"1", "position":"relative", "left":"0px"});
			    	$(this).addClass("disabled");
		    	}
		    	else {
		    		$(this).parent(".fpifi_controls").parent(".fpi_file_item").remove();
		    	}
		    }
	    });
	    $("body").on("click", ".fpifi_add", function(){
	    	var files_count_check = $(".fpi_file_item").length;
	    	var new_item = $(".fpi_file_item:eq(0)").clone();
	    	new_item.find("input").attr("name", new_item.find("input").attr("name")+"_"+files_count_check);
	    	new_item.find(".fpifi_del").removeClass("disabled");
	    	$(this).parent(".fpifi_controls").parent(".fpi_file_item").parent(".fpi_files_box").append(new_item);
	    });
	    //добавление кусков формы
	    $("body").on("click", ".fpic_add", function(){
	    	var forms_count_check = $(".form_page_item_items_box_single_item").length;
	    	var new_item = $(this).parent(".fpi_controls").parent(".form_page_item_items_box_single_item").parent(".form_page_item_items_box").children(".form_page_item_items_box_single_item:eq(0)").clone();
	    	new_item.find("input").attr("name", new_item.find("input").attr("name")+"_"+forms_count_check).val('');
	    	new_item.find("select").attr("name", new_item.find("select").attr("name")+"_"+forms_count_check);
	    	new_item.find(".fpic_del").removeClass("disabled");
	    	//$(this).parent(".fpi_controls").parent(".form_page_item_items_box_single_item").parent(".form_page_item_items_box").append(new_item);
			new_item.insertAfter('.form_page_item_items_box_single_item:last');
	    	$('.phone_field').mask('+373 (999)999-99');
			$('#time').mask('99:99');
			$('#date').mask('99.99.9999');
	    });
	    $("body").on("click", ".fpic_del", function(){
	    	if (!$(this).hasClass("disabled")) {
	    		$(this).parent(".fpi_controls").parent(".form_page_item_items_box_single_item").remove();
	    	}
	    });

	    //Обратная связь, доступность кнопки отправки
	    // var feedback_check = 0;
	    // $("#feedback_form input.form-submit").addClass("disabled").prop('disabled', true);
	    // $("body").on("change","#feedback_form input, #feedback_form textarea",function(){
	    // 	check_btn_avalibility();
	    // });

	    var check_btn_avalibility = function() {
	    	feedback_check = 0;
	    	$("#feedback_form input.form-text").each(function(){
	    		if (!$(this).val()) feedback_check = 1;
	    	});
            if ($("#feedback_form input.form-check").prop("checked") === false) feedback_check = 1;
	    	if (!$("#feedback_form textarea").val()) feedback_check = 1;
	    	if (!feedback_check) {
	    		if ($("#feedback_form input.form-submit").hasClass("disabled")) $("#feedback_form input.form-submit").fadeTo(300, 1).removeClass("disabled").prop('disabled', false);
	    	}
	    	else {
	    		if (!$("#feedback_form input.form-submit").hasClass("disabled")) $("#feedback_form input.form-submit").fadeTo(300, 0.5).addClass("disabled").prop('disabled', true);
	    	}
	    }

	//Формы заявки

	//хлам

		//Табы на странице товара
		$(".product_tabs li:eq(0) a").addClass("active");
		$(".ptc_item:eq(0)").show();
		$(".product_tabs a").click(function(){
			if ($(this).hasClass("active") == false) {
				var new_tab = $(".product_tabs a").index($(this));
				$(".product_tabs a").removeClass("active");
				$(this).addClass("active");
				$(".ptc_item").hide();
				$(".ptc_item:eq("+new_tab+")").show();
			}
			return false;
		});

		//ховер описания товара на странице товара
		$(".ibm_item").hover(function(){
			$(this).find(".ibmi_txt").stop().fadeIn(100);
		},function(){
			$(this).find(".ibmi_txt").stop().fadeOut(100);
		});

		//подсказка в таблице вкладов
		$(".deposit_desc").click(function(){
			if (!$(this).children(".dd_popup").is(":visible")) {
				$(".dd_popup").stop().fadeOut(100);
				$(this).children(".dd_popup").stop().fadeIn(100);
			}
		});
		$(".deposit_name > span").click(function(){
			if (!$(this).next(".deposit_desc").children(".dd_popup").is(":visible")) {
				$(".dd_popup").stop().fadeOut(100);
				$(this).next(".deposit_desc").children(".dd_popup").stop().fadeIn(100);
			}
		});
		$(".popup_close").click(function(){
			$(this).parent(".dd_popup").stop().fadeOut(100);
		});

		//анимация на странице вакансий
		$(".job_name").click(function(){
			var box = $(this).next(".job_text");
			if (!box.is(":animated")) {
				if (box.is(":hidden")) {
					$(this).children('.job_icon').rotate({animateTo:180, duration: 300});
					box.slideDown(100);
				}
				else {
					$(this).children('.job_icon').rotate({animateTo:0, duration: 300});
					box.slideUp(100);
				}
			}
		});
		$("a[rel=send_resume]").click(function(){
			$(".forms_wrap").fadeIn(1000, function(){$("#send_resume_form").fadeIn(300);});
			return false;
		});
		$("#feedback, a[rel=feedback_form]").click(function(){
			$(".forms_wrap").fadeIn(1000, function(){$("#feedback_form").fadeIn(300);});
			return false;
		});
		$("#vote_checker_form").click(function(){
			$(".forms_wrap").fadeIn(1000, function(){$("#checker_form").fadeIn(300);});
			return false;
		});
		$("#show_confirm").click(function(){
			$(".forms_wrap").fadeIn(1000, function(){$("#confirm_message").fadeIn(300);});
			return false;
		});
		$("body").on("click", ".form_close", function(){
			$(".form_wrap_item").fadeOut("100", function(){$(".forms_wrap").fadeOut(1000);});
		});
		$(".image_captcha_refresh").click(function(){
			$(this).children('.icf_icon').rotate(-360);
			$(this).children('.icf_icon').rotate({animateTo:0, duration:500});
		});
		$("body").on("click", ".form_item_checker", function(){
			$(this).children('.fic_icon').toggleClass("checked");
			var input = $(this).children('input');
			input.prop("checked", !input.prop("checked")).change();
		});

		//главное меню на главной
		var cur_active = $(".main_menu li").index($(".main_menu li.active"));
		$(".sub_menu_wrap .sub_menu_inner:eq("+cur_active+")").show();
		$(".main_menu li a").click(function(){
			$("#menu_about").removeClass("active");
			var new_active = $(".main_menu li").index($(this).parent("li"));
			$(".main_menu li").removeClass("active");
			$(this).parent("li").addClass("active");
			$(".sub_menu_wrap .sub_menu_inner").hide();
			$(".sub_menu_wrap .sub_menu_inner:eq("+new_active+")").show();
			if (new_active == 0) {
				$('.tab-personal').show();
				$('.tab-corporate').hide();
			}
			else {
				$('.tab-personal').hide();
				$('.tab-corporate').show();
			}
			return false;
		});
		$("#menu_about").click(function(){
			$(".main_menu li").removeClass("active");
			$(this).addClass("active");
			$(".sub_menu_wrap .sub_menu_inner").hide();
			$(".sub_menu_wrap .sub_menu_inner:eq(2)").show();
			return false;
		});

	if (parseInt($(window).width()) <= 760) {
		$('img').each(function(){
			var mobile = $(this).data('mobile');
			if (mobile != undefined && mobile.length > 0) {
				$(this).attr('src', mobile);
				if (!$(this).parents('.ib_item').length) {
					$(this).css({
					 width: 'auto',
					 height: 'auto'
					 });
				}
				else {
					$(this).attr('width', '140');
					$(this).attr('height', '170');
				}
			}
		});
	}
	//console.log($(window).width());

	// $(document).click(function (event) {
	// 	if (!$(event.target).closest('.menu-dd').length && !$(event.target).hasClass('js-login') && $('.menu-dd').hasClass('show')) {
	// 		$('.js-login').click();
	// 	}
	// });




	  if (query_string['TERM']) {
	  	$(".time_select .value_item input[value='"+query_string['TERM']+"']").parent(".value_item").click();
	  }
	  else {
	  	$(".time_select .value_item:eq(0)").addClass("active");
	  	$(".time_select .value_item:eq(0)").children("input").prop( "checked", true);
	  }
	  if (query_string['PERCENTAGE']) {
	  	$(".pay_select .value_item input[value='"+query_string['PERCENTAGE']+"']").parent(".value_item").click();
	  }
	  else {
	  	$(".pay_select .value_item:eq(0)").addClass("active");
	  	$(".pay_select .value_item:eq(0)").children("input").prop( "checked", true);
	  }

      /*
	$(".value_select .value_item:eq(0), .time_select .value_item:eq(0), .pay_select .value_item:eq(0)").addClass("active");
	$(".value_select .value_item:eq(0), .time_select .value_item:eq(0), .pay_select .value_item:eq(0)").children("input").prop( "checked", true);
	*/
});