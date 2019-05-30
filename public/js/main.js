function openMenu() {
    document.getElementById("sidebar").classList.toggle("active");
}

//Для соцсетей в футере
$(document).ready(function(){   
    $(".social").hover(function() {
        $(".social-image").css("opacity","0.5");
    });
    $(".social").mouseleave(function() {
        $(".social-image").css("opacity","1");
    });

    $(".social-image").hover(function() {
        $(this).css("opacity","1");
    });

    $(".social-image").mouseleave(function() {
        $(this).css("opacity","0.5");
    });
    

    
    $nav = $('#header');
    // $nav.css('width', $nav.outerWidth());
    $window = $(window);
    $h = $nav.offset().top;
    $window.scroll(function() {
        if ($window.scrollTop() > $h) {
            $nav.addClass('fixed');
            $nav.css('height', 150);
        } else {
            $nav.removeClass('fixed');
        }
    });
});