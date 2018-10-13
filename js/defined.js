$(window).on('load', function () {
    window.token=Cookies.get('token')
    if(window.token) {
        $(".sam_signup").fadeOut('fast');
        $(".raj_login").fadeOut('fast');
        $(".3_sections_raj_satyam").fadeIn(1000);
        showDashboard();
    }
    else{
        $(".3_sections_raj_satyam").css("display","none");
        $(".raj_login").css("display","none");
        $(".sam_signup").css("display","block");
    }
}) 