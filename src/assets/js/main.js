 $(document).ready(function() {

     $('#signupNowBtn').on('click', function(event) {
         event.preventDefault();
         event.stopPropagation();
         $('#loginModal').modal('show');
         $('#signupModal').modal('show');
     })


     $(window).scroll(function() {
         var scroll = $(window).scrollTop();
         if (scroll >= 500) {
             $("#main-nav").addClass("darkHeader");
             $("#main-nav").removeClass("bg-light");
         } else {
             $("#main-nav").removeClass("darkHeader");
             $("#main-nav").addClass("bg-light");
         }
     });

     $(".owl-carousel").owlCarousel({
         items: 1,
         stagePadding: 0,
         singleItem: true,
         autoplay: true,
         autoplayTimeout: 1500,
         autoplayHoverPause: true,
     });

     var chkInOptns = {
         minDate: new Date(),

     }
     $('#checkin').datepicker(chkInOptns);
     $('#checkout').datepicker(chkInOptns);



     // ===== Scroll to Top ==== 
     $(window).scroll(function() {
         if ($(this).scrollTop() >= 50) {
             $('.return-to-top').fadeIn(200);
         } else {
             $('.return-to-top').fadeOut(200);
         }
     });
     $('.return-to-top').click(function() {
         $('body,html').animate({
             scrollTop: 0
         }, 1000);
     });


     $('.slider-carousel').owlCarousel({
         items: 1,
         stagePadding: 0,
         singleItem: true,
     });


     $('.test-popup-link').magnificPopup({
         delegate: 'a',
         type: 'image',
         gallery: {
         enabled:true
        }

     });

     $("#telephone").intlTelInput({
         allowExtensions: true,
         autoFormat: false,
         autoHideDialCode: false,
         autoPlaceholder: false,
         defaultCountry: "auto",
         ipinfoToken: "yolo",
         nationalMode: false,
         numberType: "MOBILE",
         preventInvalidNumbers: true,
         utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/8.4.6/js/utils.js"
     });
 });