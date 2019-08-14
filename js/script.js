(function($){
	"use strict";

	$(function(){

		/* ---------------------------------------------------- */
		/*	Revolution slider									*/
		/* ---------------------------------------------------- */

		$( window ).load(function() {
		  if ($('#slider1').length) {
				jQuery("#slider1").revolution({
		          sliderType:"standard",
		          sliderLayout:"auto",
		          delay:9000,
		          navigation: {
		              arrows:{enable:true} 
		          }, 
		          gridwidth:1170,
		          gridheight:780 
		        });
			}
		});

		// ie9 placeholder

		if($('html').hasClass('ie9')) {
			$('input[placeholder]').each(function(){
				$(this).val($(this).attr('placeholder'));
				var v = $(this).val();
				$(this).on('focus',function(){
					if($(this).val() === v){
						$(this).val("");
					}
				}).on("blur",function(){
					if($(this).val() == ""){
						$(this).val(v);
					}
				});
			});
			
		}

		// Elements position

		$(window).load(function(){

		  if(document.documentElement.clientWidth < 769) {

		    if ($('#section1').length) {

		    	var b1 = document.getElementById("section1");
			    var b2 = document.getElementById("section2");
			    b1.parentNode.insertBefore(b1, b2);

		    } 

		  }

		});

		$(window).resize(function() {

		  if(document.documentElement.clientWidth < 769) {

		    if ($('#section1').length) {

		    	var b1 = document.getElementById("section1");
			    var b2 = document.getElementById("section2");
			    b1.parentNode.insertBefore(b1, b2);

		    }

		  }

		});

		// Styleswicher

		$(window).on("load",function(){
			var sw = $('#styleswitcher'),
				swB = sw.children('.open_sw')

			var t = setTimeout(function(){
				sw.addClass('closed');	
				clearTimeout(t);
				sw.trigger('open/close');
			},700);

			sw.on('open/close',function(){
				var $this = $(this);
				swB.on('click',function(){
					$this.toggleClass('closed');
				});
			});

			$(".wrapper_container").click(function () {
	            $('#styleswitcher').addClass('closed');
	        });

		});

		// remove products from shopping cart
		
		$('.menu_holder').on('click','.close_product',function(){
			$(this).closest('li').animate({'opacity':'0'},function(){
				$(this).slideUp(500);
			});
		});

		/*Search_holder*/

		window.search_holder = function(){

			var searchHolder = $('.search-holder');

			if (searchHolder.length) {
				searchHolder.searchClick();
			}

		}

		search_holder();

		// Gallery carousel

	  	$.mad_global.mad_init_carousel();

		// tabs

		var tabs = $('.tabs');
		if(tabs.length){
			tabs.tabs({
				beforeActivate: function(event, ui) {
			        var hash = ui.newTab.children("li a").attr("href");
			   	},
				hide : {
					effect : "fadeOut",
					duration : 450
				},
				show : {
					effect : "fadeIn",
					duration : 450
				},
				updateHash : false
			});
		}

		// newsletter

	    var subscribe = $('[id^="newsletter"]');
	      subscribe.append('<div class="message_container_subscribe"></div>');
	      var message = $('.message_container_subscribe'),text;

	      subscribe.on('submit',function(e){
	        var self = $(this);
	        
	        if(self.find('input[type="email"]').val() == ''){
	          text = "Please enter your e-mail!";
	          message.html('<div class="alert_box warning"><p>'+text+'</p></div>')
	            .slideDown()
	            .delay(4000)
	            .slideUp(function(){
	              $(this).html("");
	            });

	        }else{
	          self.find('span.error').hide();
	          $.ajax({
	            type: "POST",
	            url: "bat/newsletter.php",
	            data: self.serialize(), 
	            success: function(data){
	              if(data == '1'){
	                text = "Your email has been sent successfully!";
	                message.html('<div class="alert_box success"><p>'+text+'</p></div>')
	                  .slideDown()
	                  .delay(4000)
	                  .slideUp(function(){
	                    $(this).html("");
	                  })
	                  .prevAll('input[type="email"]').val("");
	              }else{
	                text = "Invalid email address!";
	                message.html('<div class="alert_box error"></i><p>'+text+'</p></div>')
	                  .slideDown()
	                  .delay(4000)
	                  .slideUp(function(){
	                    $(this).html("");
	                  });
	              }
	            }
	          });
	        }
	        e.preventDefault();
	    });

	    // open dropdown

		$('#sort_button').css3Animate($('#sort_button').next('.sort_list'));

		// Price Scale

		var slider;
		if($('#price').length){
			slider = $('#price').slider({ 
			 	orientation: "horizontal",
				range: true,
				values: [ 0, 250 ],
				min: 0,
				max: 250,
				slide : function(event ,ui){
					$(this).next().find('.first_limit').val('$' + ui.values[0]);
					$(this).next().find('.last_limit').val('$' + ui.values[1]);
				}
			});
		}

		// Nav_List

	    jQuery(document).ready(function($) {
	      $('.navigation_grid .hasTooltip , #product_list.v_grid .hasTooltip').tooltip('hide'); 
	      // $('.Results select').styler();
	      var cc = $('list_grid');
	      if (cc == 'g') {
	        $('#product_list').addClass('v_list');
	        $('#product_list').removeClass('v_grid');
	        $('.Clist').addClass('active');
	        $('.Cgrid').removeClass('active');
	      } else {
	        $('#product_list').removeClass('v_list');
	        $('#product_list').addClass('v_grid');
	        $('.Cgrid').addClass('active');
	        $('.Clist').removeClass('active');    
	      }

	      $('.cgrid').click(function() {
	        console.log(1);
	        $(this).addClass('active');
	        $('.clist').removeClass('active');
	        $('#product_list').fadeOut(300, function() {
	          $(this).addClass('v_grid').removeClass('v_list').fadeIn(300);
	        });
	        // $.cookie('list_grid', '1' , { expires: 7, path: vmSiteurl });
	        return false;
	      });
	      
	      $('.clist').click(function() {
	        console.log(2);
	        $(this).addClass('active');
	        $('.cgrid').removeClass('active');              
	        $('#product_list').fadeOut(300, function() {
	          $(this).removeClass('v_grid').addClass('v_list').fadeIn(300);
	        });
	        // $.cookie('list_grid','g', { expires: 7, path: vmSiteurl });
	        return false;
	      }); 

	    });

		// load more

	    $(".more_news_button").click(function(){
	        $(".more_news").slideToggle("slow");
	        $(this).toggleClass("active");
	        return false;
	    });

		$('#closePopup').on('click', function() {
	      $('.popup_holder').fadeOut("slow");
	    });

	    $(document).mouseup(function (e) {

		    var container = $(".popup_holder");
		    if (container.has(e.target).length === 0){
		        container.fadeOut("slow");
		    }

		});

		$('#cockie_accept').on('click', function() {
	      $('.cookie').fadeOut("slow");
	    });

 		// Loader

		$("body").queryLoader2({
	        backgroundColor: '#fff',
	        barColor : '#2abfd4',
	        barHeight: 4,
	        deepSearch:true,
	        minimumTime:1000,
	        onComplete: function(){
	        	$(".loader").fadeOut('200');
	        }
      	});
    
		// Sticky menu

		$('body').Temp({
			sticky: true
		});

		/* ---------------------------------------------------- */
        /*	SmoothScroll										*/
        /* ---------------------------------------------------- */

		try {
			$.browserSelector();
			var $html = $('html');
			if ( $html.hasClass('chrome') || $html.hasClass('ie11') || $html.hasClass('ie10') ) {
				$.smoothScroll();
			}
		} catch(err) {}

		// accordion & toggle

		var aItem = $('.accordion:not(.toggle) .accordion_item'),
			link = aItem.find('.a_title'),
			$label = aItem.find('label'),
			aToggleItem = $('.accordion.toggle .accordion_item'),
			tLink = aToggleItem.find('.a_title');

			aItem.add(aToggleItem).children('.a_title').not('.active').next().hide();

		function triggerAccordeon($item) {
			$item
				.addClass('active')
				.next().stop().slideDown()
				.parent().siblings()
				.children('.a_title')
				.removeClass('active')
				.next().stop().slideUp();
		}

		if ($label.length) {
			$label.on('click',function(){
				triggerAccordeon($(this).closest('.a_title'))
			});
		} else {
			link.on('click',function(){
				triggerAccordeon($(this))
			});
		}
			

		tLink.on('click',function(){
			$(this).toggleClass('active')
					.next().stop().slideToggle();

		});

		// Load the first 3 list items from another HTML file
	    //$('#myList').load('externalList.html li:lt(3)');
	    $('#load_List .item:lt(6)').show();
	    var items =  12;
	    var shown =  6;
	    $('#load_More').click(function () {
	        shown = $('#load_List .item:visible').size()+5;
	        if(shown< items) {$('#load_List .item:lt('+shown+')').show();}
	        else {$('#load_List .item:lt('+items+')').show();
	             $('#load_More').hide();
	        }
	    });

		// contact form

		if ($('#contact_form').length){

			var cf = $('#contact_form');
			cf.append('<div class="message_container"></div>');

			cf.on("submit",function(event){

				var self = $(this),text;

				var request = $.ajax({
					url:"bat/mail.php",
					type : "post",
					data : self.serialize()
				});

				request.then(function(data){
					if(data == "1"){

						text = "Your message has been sent successfully!";

						cf.find('input:not([type="submit"]),textarea').val('');

						$('.message_container').html('<div class="alert_box success"><i class="fa fa-smile-o"></i><p>'+text+'</p></div>')
							.delay(150)
							.slideDown(300)
							.delay(4000)
							.slideUp(300,function(){
								$(this).html("");
							});

					}
					else{
						if(cf.find('textarea').val().length < 20){
							text = "Message must contain at least 20 characters!"
						}
						if(cf.find('input').val() == ""){
							text = "All required fields must be filled!";
						}
						$('.message_container').html('<div class="alert_box error"><i class="fa fa-exclamation-triangle"></i><p>'+text+'</p></div>')
							.delay(150)
							.slideDown(300)
							.delay(4000)
							.slideUp(300,function(){
								$(this).html("");
							});
					}
				},function(){
					$('.message_container').html('<div class="alert_box error"><i class="fa fa-exclamation-triangle"></i><p>Connection to server failed!</p></div>')
							.delay(150)
							.slideDown(300)
							.delay(4000)
							.slideUp(300,function(){
								$(this).html("");
							});
				});


				event.preventDefault();
			});

			
		}

		if ($('#contact_form2').length){

			var cf = $('#contact_form2');
			cf.append('<div class="message_container2"></div>');

			cf.on("submit",function(event){

				var self = $(this),text;

				var request = $.ajax({
					url:"bat/mail.php",
					type : "post",
					data : self.serialize()
				});

				request.then(function(data){
					if(data == "1"){

						text = "Your message has been sent successfully!";

						cf.find('input:not([type="submit"]),textarea').val('');

						$('.message_container2').html('<div class="alert_box success"><i class="fa fa-smile-o"></i><p>'+text+'</p></div>')
							.delay(150)
							.slideDown(300)
							.delay(4000)
							.slideUp(300,function(){
								$(this).html("");
							});

					}
					else{
						if(cf.find('textarea').val().length < 20){
							text = "Message must contain at least 20 characters!"
						}
						if(cf.find('input').val() == ""){
							text = "All required fields must be filled!";
						}
						$('.message_container2').html('<div class="alert_box error"><i class="fa fa-exclamation-triangle"></i><p>'+text+'</p></div>')
							.delay(150)
							.slideDown(300)
							.delay(4000)
							.slideUp(300,function(){
								$(this).html("");
							});
					}
				},function(){
					$('.message_container2').html('<div class="alert_box error"><i class="fa fa-exclamation-triangle"></i><p>Connection to server failed!</p></div>')
							.delay(150)
							.slideDown(300)
							.delay(4000)
							.slideUp(300,function(){
								$(this).html("");
							});
				});

				event.preventDefault();
			});

		}

		if ($('#contact_form3').length){
			var cf = $('#contact_form3');
			cf.append('<div class="message_container3"></div>');

			cf.on("submit",function(event){

				var self = $(this),text;

				var request = $.ajax({
					url:"bat/mail.php",
					type : "post",
					data : self.serialize()
				});

				request.then(function(data){
					if(data == "1"){

						text = "Your message has been sent successfully!";

						cf.find('input:not([type="submit"]),textarea').val('');

						$('.message_container3').html('<div class="alert_box success"><i class="fa fa-smile-o"></i><p>'+text+'</p></div>')
							.delay(150)
							.slideDown(300)
							.delay(4000)
							.slideUp(300,function(){
								$(this).html("");
							});

					}
					else{
						if(cf.find('textarea').val().length < 20){
							text = "Message must contain at least 20 characters!"
						}
						if(cf.find('input').val() == ""){
							text = "All required fields must be filled!";
						}
						$('.message_container3').html('<div class="alert_box error"><i class="fa fa-exclamation-triangle"></i><p>'+text+'</p></div>')
							.delay(150)
							.slideDown(300)
							.delay(4000)
							.slideUp(300,function(){
								$(this).html("");
							});
					}
				},function(){
					$('.message_container3').html('<div class="alert_box error"><i class="fa fa-exclamation-triangle"></i><p>Connection to server failed!</p></div>')
							.delay(150)
							.slideDown(300)
							.delay(4000)
							.slideUp(300,function(){
								$(this).html("");
							});
				});

				event.preventDefault();
			});
		}

		// jackbox

		if($(".jackbox[data-group]").length){
			jQuery(".jackbox[data-group]").jackBox("init",{
			    showInfoByDefault: false,
			    preloadGraphics: false, 
			    fullscreenScalesContent: true,
			    autoPlayVideo: false,
			    flashVideoFirst: false,
			    defaultVideoWidth: 960,
			    defaultVideoHeight: 540,
			    baseName: ".jackbox",
			    className: ".jackbox",
			    useThumbs: true,
			    thumbsStartHidden: false,
			    thumbnailWidth: 75,
			    thumbnailHeight: 50,
			    useThumbTooltips: false,
			    showPageScrollbar: false,
			    useKeyboardControls: true 
			});
		}

		// Isotope

		$( window ).load(function() {

		  	var $container = $('.isotope');
		    // filter buttons
		    $('#filters button').click(function(){
		    var $this = $(this);
		        // don't proceed if already selected
		        if ( !$this.hasClass('is-checked') ) {
		          $this.parents('#options').find('.is-checked').removeClass('is-checked');
		          $this.addClass('is-checked');
		        }
		      var selector = $this.attr('data-filter');
		      $container.isotope({  itemSelector: '.item', filter: selector });
		      return false;
		    }); 
		     
		});

		$( window ).load(function() {
			$.mad_core.isotope();
		});

		// Price Scale

		var slider;
		if($('#price').length){
			slider = $('#price').slider({ 
			 	orientation: "horizontal",
				range: true,
				values: [ 0, 250 ],
				min: 0,
				max: 250,
				slide : function(event ,ui){
					$(this).next().find('.first_limit').val('$' + ui.values[0]);
					$(this).next().find('.last_limit').val('$' + ui.values[1]);
				}
			});
		}

		// Quantity

		var q = $('.quantity');

		q.each(function(){
			var $this = $(this),
				button = $this.children('button'),
				input = $this.children('input[type="text"]'),
				val = +input.val();

			button.on('click',function(){
				if($(this).hasClass('minus')){
					if(val === 1) return false;
					input.val(--val);
				}
				else{
					input.val(++val);
				}
			});
		});

		// appear animation

	    function animate(){
	    	
	     $("[data-appear-animation]").each(function() {

	         var self = $(this);

	         self.addClass("appear-animation");

	         if($(window).width() > 800) {
	          self.appear(function() {

	           var delay = (self.attr("data-appear-animation-delay") ? self.attr("data-appear-animation-delay") : 1);

	           if(delay > 1) self.css("animation-delay", delay + "ms");
	           self.addClass(self.attr("data-appear-animation"));

	           setTimeout(function() {
	            self.addClass("appear-animation-visible");
	           }, delay);

	          }, {accX: 0, accY: -150});
	         } else {
	          self.addClass("appear-animation-visible");
	         }
	        });
	    }

	    animate();

	    $(window).on('resize',animate);

		//elevate zoom

		(function(){

			if($('#thumbnails').length){
				$('#thumbnails').each(function(){
					/* Max items counting */
					var max_items = $(this).attr('data-max-items');
					var tablet_items = max_items;
					if(max_items > 1){
						tablet_items = max_items - 1;
					}
					var mobile_items = 1;
					
					$('#thumbnails').owlCarousel({
						stagePadding : 45,
						items : max_items,
						margin : 25,
						URLhashListener : false,
						navSpeed : 800,
						nav : true,
						navText:false,
						responsive : {
					        0:{
					            items:mobile_items
					        },
					        481:{
					            items:tablet_items
					        },
					        980:{
					            items:max_items
					        }
					    }
				    });
				});
			    
			}

			if($('[data-zoom-image]').length){

				var button = $('.qv_preview');

				$("#zoom_image").elevateZoom({
					gallery:'thumbnails',
					galleryActiveClass: 'active',
					zoomType: "inner",
					cursor: "crosshair",
					responsive:true,
				    zoomWindowFadeIn: 500,
					zoomWindowFadeOut: 500,
					easing:true,
					lensFadeIn: 500,
					lensFadeOut: 500
				});

				button.on("click", function(e){
				  var ez = $('#zoom_image').data('elevateZoom');
					$.fancybox(ez.getGalleryList());
				  	e.preventDefault();
				});

			}

		})();

		// fancybox

		if ($('a.gallery').length) {
			$('a.gallery').fancybox();
		}

	    // custom select

		if ($('.custom_select').length) {
			$('.custom_select').mad_custom_select();
		}

		// social widgets

		$('.sw_button').on('click',function(){
			$(this).parent().toggleClass('opened').siblings().removeClass('opened')
		});

	    // twitter

	    if ($('#twitter').length) {
			$('#twitter').tweet({

			    modpath: 'plugins/twitter/',
			    username: "velikorodnov",
			    count: 2,
			    loading_text: 'loading twitter feed...'
			    /* etc... */

			});
		}

	    if ($('#twitter2').length) {
			$('#twitter2').tweet({

			    modpath: 'plugins/twitter/',
			    username: "velikorodnov",
			    count: 2,
			    loading_text: 'loading twitter feed...'
			    /* etc... */

			});
		}

		if($('#countdown').length){
			var newYear = new Date(); 
			newYear = new Date(newYear.getFullYear() + 2, -7, 1); 
			$('#countdown').countdown({
				until: newYear,
				layout:'<div class="row"><div class="col-sm-3 col-xs-6">'+
				'<dl class="count_item"><dt class="main_title">{d<}{dn}</dt><dd><h5>{dl}</h5></dd></dl></div> {d>}'+ 
					'<div class="col-sm-3 col-xs-6">'+
				'<dl class="count_item"><dt class="main_title">{hn}</dt><dd><h5>{hl}</h5></dd></dl></div>'+
				' <div class="col-sm-3 col-xs-6"><dl class="count_item"><dt class="main_title">{mn}</dt><dd><h5>{ml}</h5></dd></dl></div>'+
				' <div class="col-sm-3 col-xs-6"><dl class="count_item"><dt class="main_title">{sn}</dt><dd><h5>{sl}</h5></dd></dl></div></div>'
			}); 
		}
		

		/* ---------------------------------------------------- */
		/*	Google Maps											*/
		/* ---------------------------------------------------- */

		var myCenter = new google.maps.LatLng(17.433053, 78.412172);

		function loadMap() {
		  	var mapProp = {
			    center: myCenter,
			    zoom:5,
			    mapTypeId:google.maps.MapTypeId.ROADMAP,
			    styles:[
					
					{
					
					    "stylers": [
					
					        { "saturation": -97 }
					
					    ]
					
					},

				]

			};

			var map = document.getElementById('googleMap');

			if(map !== null){

		    	var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);

			}

            var marker = new google.maps.Marker({
               position:myCenter,
               map: map,
               icon: 'images/map_marker.png'
            });
            
            marker.setMap(map);

            //Zoom to 7 when clicked on marker
            google.maps.event.addListener(marker,'click',function() {
               map.setZoom(9);
               map.setCenter(marker.getPosition());
            });

		}
		google.maps.event.addDomListener(window, 'load', loadMap);

		function loadMap2() {

		  	var mapProp2 = {
				center:myCenter,
				zoom:5,
				mapTypeId:google.maps.MapTypeId.ROADMAP
			};

			var map2 = document.getElementById('googleMap2')

			if(map2 !== null){

		    	new google.maps.Map(document.getElementById("googleMap2"), mapProp2);

			}

			
		    
		}
		google.maps.event.addDomListener(window, 'load', loadMap2);

		    
		/* ---------------------------------------------------- */
		/*	Responsive menu										*/
		/* ---------------------------------------------------- */

		$.mad_core.run();

	});

})(jQuery);