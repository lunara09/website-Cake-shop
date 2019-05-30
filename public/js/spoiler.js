$(document).ready(function(){
    $('.spoiler-links').click(function(){
     $(this).parent().children('p.spoiler-body').toggle('normal');
     return false;
    });
});
