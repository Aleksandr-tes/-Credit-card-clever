$(document).ready(function(){
   $(document).on('click', '.footer_menu a', function(e){
       var indx = $(this).parents('li').index();
       if (indx < 2) {
           $('.main_menu li:eq(' + indx + ') a').trigger('click');
           $(document).scrollTo('.main_menu', 300);
           e.preventDefault();
       }
   });

    if (location.href.indexOf('/branches/') >= 0 || location.href.indexOf('/sitemap/') >= 0) {
        $('.sub_menu_inner').hide();
    }
});