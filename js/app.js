jQuery.noConflict();

(function($) {

    window.velocityRun = window.velocityRun || {};

    velocityRun = function(data){
      $.each( data, function( parentKey, parent ) {
        Pname = parent.name || '';
        Pscene = parent.scene || '';
        Tname = (Pscene !== '' ? Pscene +" " + Pname : Pname);
        Selected = $(Tname);

        Psegment = parent.segment || {};

        $.each( Psegment, function(segmentKey, segment){

          isPropertyExist = segment.properties || false;
          isOptionExist = segment.options || false;

          Psegment[segmentKey]['elements'] = Selected;

          $velocityAnimate = $(Tname);
          if(isPropertyExist && isOptionExist && Psegment.length == 1){
            // $velocityAnimate = $velocityAnimate.velocity(segment.properties, segment.options);
          }

        });

        if(Psegment.length > 1){
          console.log(Psegment);

          setInterval(function() {
            $.Velocity.RunSequence(Psegment);
          }, 1000);
        }

      });
    }


}(jQuery, window, document));

(function($) {
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

        $('nav a, a[data-trigger=page]').click(function(e) {
          selectQ = $(this).attr("href");
          selectID = "#" + selectQ;
          if ($(selectID).length && selectID != "#home") {
            $('.modalpage').removeClass("modalshow");
            $('nav a').removeClass("active");
            $(this).addClass("active");
            $('.modalpage' + selectID).scrollTop(0);
            $('.modalpage' + selectID).addClass("modalshow");
            $('body').addClass("freeze");
            $('nav').addClass("freeze_nav");
            $('nav').addClass("navbar-page");
          } else {
            $('nav a').removeClass("active");
            $('.modalpage').removeClass("modalshow");
            $('body').removeClass("freeze");
            $('nav').removeClass("freeze_nav");
          }
          e.preventDefault();
        });


        $('#contact-send').click(form_registration);

        function form_registration() {

          var input_data = $('#contact-form').serialize();
          $.ajax({
            type: 'post',
            url: 'contact.php',
            data: input_data,
            dataType: 'json',
            success: function(msg) {
              console.log(msg);
              $('#contact-form').find('input, textarea').removeClass('error');
              if (msg.Status) {
                alert('Sent!');
                $('#contact-form').reset();
              } else {
                r = 'Form Invalid!\n';
                $.each(msg.Info, function(k, v){
                  r += '\n' + v;
                  $('#contact-form').find('input[name='+k+']').addClass('error');
                })
                alert(r);
              }
            },
            error: function() {
              console.log('Error!');
            }
          });
          return false;
        }

        $('a[data-trigger=modal]').click(function(e) {
          selectQ = $(this).attr("href");
          selectID = "#" + selectQ;
          $('.modalcover').fadeIn( "slow" );
          $('.modalpopup' + selectID).fadeIn( "slow" );

          $('body').addClass("freeze");
          $('nav').addClass("freeze_nav");
          e.preventDefault();
        });

        $(function(){
          $('.gallery.gallery-works').mixItUp();  
        });


        var dashlightbulbto = 0;
        var dashlightbulbdelay = 0;

        $(".dashlightbulb").find('path').each(function(){
          dashFrom = "data-_dashlightbulb";
          dashTo = "data-end";
          $(this).attr(dashFrom, "@class:dashlightbulbactivate");
          $(this).attr(dashTo, "@class:dashlightbulbactivate");
          $(this).attr("data-edge-strategy", "reset");

          k = "stroke-dashoffset .3s ease-in-out "+dashlightbulbdelay+'s';
          this.style.WebkitTransition = k;
          this.style.MozTransition = k;
          dashlightbulbdelay += .05;
        });



        var animateData = [
          {
            scene: ".core",
            name: ".p1-brain",
            segment: [
              {
                properties: { scale: 0.9, translateY: "10px" },
                options: { easing: [0, 40, 100], duration: 1000, loop: true }
              }
            ]
          },
          {
            scene: ".core",
            name: ".p2-bulb-1",
            segment: [
              {
                properties: { rotateZ: [ "3", "swing", "-3" ] },
                options: { easing: "swing", duration: 2200, loop: true }
              }
            ]
          },
          {
            scene: ".core",
            name: ".p2-bulb-2",
            segment: [
              {
                properties: { rotateZ: [ "3", "swing", "-3" ] },
                options: { easing: "swing", duration: 2000, loop: true }
              }
            ]
          },
          {
            scene: ".core",
            name: ".p2-bulb-3",
            segment: [
              {
                properties: { rotateZ: [ "3", "swing", "-3" ] },
                options: { easing: "swing", duration: 2500, loop: true }
              }
            ]
          },
          // {
          //   scene: ".core",
          //   name: ".p1-machine",
          //   segment: [
          //     {
          //       properties: { translateY: 300 },
          //       options: { easing: "swing", duration: 500 }
          //     },
          //     {
          //       properties: { translateX: 600 },
          //       options: { easing: "swing", duration: 500 }
          //     }
          //   ]
          // }
        ];

 
        var isMobile = {
            Android: function() {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function() {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function() {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function() {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function() {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function() {
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
            }
        };
 
        var $data_circle = [];
        window.onload = function() {
            velocityRun(animateData);
  $('.ismobile').css({display: "none"});
  $('.isnotmobile').css({display: "none"});
if(!isMobile.any()) {
            // run vertical animation
            skrollr.init({
              easing: {
                sin: function(p) {
                  a = Math.sin((Math.PI /2 ) * p);
                  return a;
                },

                sin2: function(p) {
                  a = Math.sin(p * ((Math.PI/2) + (p)));
                  return a;
                },

                sin3: function(p) {
                  a = Math.sin(p * ((Math.PI/2) + (.5 + p)));
                  return a;
                },

                cos: function(p) {
                  a = Math.cos((Math.PI / 2 ) * p);
                  return a;
                },

                acos: function(p) {
                  a = Math.cos((Math.PI / 2 ) * (1 - p));
                  return a;
                },
              },
              forceHeight: true,
              smoothScrolling: true,
              constants: {
                  dashlightbulb: 8265,
                  p1circles: 800
              }
            });
  $('.isnotmobile').css({display: "block"});
  $('head').append('<link rel="stylesheet" href="style-animate.css" type="text/css" />');
  $data_circle[0] = 5576;
  $data_circle[1] = 13990;
  $data_circle[2] = 18278;
}
else {
  $('body > .container').css({
        position: "relative"
    });
  $('body > .container .core > div.footer .copyright-container .content').css({
        height: "auto"
    });
  $('.navbar').addClass("mobile");
  $('.p1.p1-logo').addClass("mobile");
  $('.p2.p2-text1').addClass("mobile");
  $('.p2.p2-text2').addClass("mobile");
  $('.p3.p3-text').addClass("mobile");
  $('.ismobile').css({display: "block"});
  $data_circle[0] = 589;
  $data_circle[1] = 1389;
  $data_circle[2] = 2263;
}

            // hide loading
            $('.coverbefore').hide();

            // fancybox
            $('.fancybox').fancybox();

$("#review").fancybox({
  'scrolling'   : 'no',
  'titleShow'   : false,
  'width'           : 550,
  'onClosed'    : function() {
      $("#review_error").hide();
  }
});

$("#review_form").submit(function(e){
  if ($("#wreview_name").val().length < 1 || $("#wreview_email").val().length < 1 || $("#wreview_message").val().length < 1) {
      $("#review_error").show();
      $.fancybox.resize();
      return false;
  }

  $.fancybox.showLoading();

  var $form = $( this ).serializeObject();

        $.post("api2/?insert=review",
        {
          insert: "review",
          data: $form
        },
        function(data,status){

    var scope = angular.element(
    document.
    getElementById("reviewContainer")).
    scope();
    scope.$apply(function () {
        scope.fetch();
    });
            $.fancybox.hideLoading();
            $.fancybox.close();
        });

  return false;
});

            // accordion
            $( ".accordion" ).click(function() {
              $( this ).toggleClass( "collapse" );
              $( this ).next( "div.accordion-content" ).slideToggle( "fast" );
            });


            $(window).scroll(function (event) { 
              $('.scrollpos').html($(window).scrollTop()); 
              $('.contentpos').html(parseInt($("#body-container").css('top'))); 
            });

            $('div[data-circle]').on('click',function (e) {
              e.preventDefault();
              $target = 0;

              switch($(this).attr('data-circle')) {
                  case 'page2':
                      $target = $data_circle[0];
                      break;
                  case 'page3':
                      $target = $data_circle[1];
                      break;
                  case 'page4':
                      $target = $data_circle[2];
                      break;
                  default:
                      break;
              }

              var target = this.hash;
              // var $target = $(target);

              $('html, body').stop().animate({
                  'scrollTop': $target
              }, 900, 'swing', function () {});
            });

            $('.arrowUp').click(function(){
              $("html, body").animate({ scrollTop: 0 }, 600);
              return false;
            });
        }


}(jQuery, window, document));

(function($){
  //contact animation

  //breakdown the labels into single character spans
  $(".flp label").each(function(){
    var sop = '<span class="ch">'; //span opening
    var scl = '</span>'; //span closing
    //split the label into single letters and inject span tags around them
    $(this).html(sop + $(this).html().split("").join(scl+sop) + scl);
    //to prevent space-only spans from collapsing
    $(".ch:contains(' ')").html("&nbsp;");
  })

  var gde;
  //animation time
  var flpSelector = ".flp input, .flp textarea";
  $(flpSelector).focus(function(){
    //calculate movement for .ch = half of input height
    // var tm = $(this).outerHeight()/2 * -1 + "px";
    var tm = $(".flp input").outerHeight()/2 * -1 + "px";
    //label = next sibling of input
    //to prevent multiple animation trigger by mistake we will use .stop() before animating any character and clear any animation queued by .delay()
    $(this).next().addClass("focussed").children().stop(true).each(function(i){
      gde = i*50;//delay
      $(this).delay(gde).animate({top: tm}, 100, 'easeOutCubic');
    })
  });
  $(flpSelector).blur(function(){
  //animate the label down if content of the input is empty
  if($(this).val() == "")
  {
    $(this).next().removeClass("focussed").children().stop(true).each(function(i){
      gde = i*50;
      $(this).delay(gde).animate({top: 0}, 200, 'easeOutCubic');
    })
  }
  })
  $(flpSelector).each(function(){
    $(this).val('');
  });

}(jQuery));


angular.module('squareft', ['ngSanitize'])
  .filter('sumByKey', function() {
    return function(data, key) {
        if (typeof(data) === 'undefined' || typeof(key) === 'undefined') {
            return 0;
        }

        var sum = 0;
        for (var i = data.length - 1; i >= 0; i--) {
            sum += parseInt(data[i][key]);
        }

        return sum / data.length;
    };
})
.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
})
  .controller('reviewCtrl', ['$scope', '$filter', '$http',
    function($scope, $filter, $http) {
  $scope.posts = [  
   {  
    "id":"1",
    "rating":"5",
    "message":"Nice",
    "date":"2015-07-03 16:32:00",
    "name":"joseph",
    "email":"josephyrodan@gmail.com",
    "security":"ff7dd3390bf09a84341ce5838e511ca8"
   }
  ];
  $scope.reviewAverage = $filter('sumByKey')($scope.posts, 'rating');
  $scope.reviewLength = $scope.posts.length;

  $scope.fetch = function(){
    $http.get("http://squareft.org/api2/?data=review")
    .success(function (response) {
      $scope.posts = response;
      $scope.reviewAverage = $filter('sumByKey')(response, 'rating');
      $scope.reviewAverage = $filter('sumByKey')(response, 'rating');
      $scope.reviewLength = response.length;
    });
  };

  $scope.fetch();

  $scope.range = function(n) {
    return new Array(n);
  };
}])
  .controller('wreview', ['$scope', '$filter', '$http',
    function($scope, $filter, $http) {
  $scope.wreview = {
      name: '',
      email: '',
      message: '',
  };
}]);