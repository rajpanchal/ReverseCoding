window.joined=false; window.created=false
$(window).on('load', function () {
    window.token=Cookies.get('token')
    if(window.token) {
        $.ajax({
            url:'https://shielded-plains-85651.herokuapp.com/dashboard', 
            type:'post', 
            headers:{'Authorization':token}
        }).done(function(e){
            console.log(e)
            $("#loader").fadeOut('fast');
            $("#content").fadeIn('fast');
            $(".sam_signup").fadeOut('fast');
            $(".raj_login").fadeOut('fast');
            $(".3_sections_raj_satyam").fadeIn(1000);
            showDashboard();
            if(e.code==="TEAMJOINED"){
                $('.create_team_data').css({color:'#bdbdbd '})
                $('.invites_data').css({color:'#bdbdbd '})
                window.joined=true
                console.log(1)
            }
            if(e.code==="TEAMCREATED"){
                $('.create_team_data').css({color:'#bdbdbd '})
                window.created=true
            }
            
        })
    }
    else{
        $("#loader").fadeOut('fast');
        $(".3_sections_raj_satyam").fadeOut('fast');
        $(".raj_login").fadeOut('fast');
        $("#content").fadeIn('fast');
        $(".sam_signup").fadeIn('slow')
    }

    
}) 

function btnreset(){
    $(".dashboard_td").css("background-color", "#FFFFFF");
    $(".dashboard_data").css("color","#0D47A1");

    $(".create_team_td").css("background-color", "#FFFFFF");
    $(".create_team_data").css("color",(created||joined)?"#bdbdbd":"#0D47A1");

    $(".invites_td").css("background-color", "#FFFFFF");
    $(".invites_data").css("color",(joined)?"#bdbdbd":"#0D47A1");
}