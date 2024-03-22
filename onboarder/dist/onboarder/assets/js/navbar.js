$(".menu > ul > li > a").on("click", function(e) {
    
    // removes active from already active
    $(this).siblings().removeClass("active");
    
    // adds active to clicked
    $(this).toggleClass("active");
})
