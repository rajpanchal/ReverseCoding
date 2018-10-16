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
            $('.signup_').hide()
            $('.login_sam_btn').hide()
            $('.logout_btn').show()
            if(e.code==="TEAMJOINED") window.joined=true
            if(e.code==="TEAMCREATED") window.created=true
            $("#loader").fadeOut('fast');
            $("#content").fadeIn('fast');
            $(".sam_signup").fadeOut('fast');
            $(".raj_login").fadeOut('fast');
            $(".3_sections_raj_satyam").fadeIn(1000);
            showDashboard();
        })
    }
    else{
        $('.signup_').show()
        $('.login_sam_btn').show()
        $('.logout_btn').hide()
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
    
    $('.create_team_td').css('cursor',(created||joined)?'not-allowed':'pointer')
    $('.invites_td').css('cursor',(joined)?'not-allowed':'pointer')
    console.log(created||joined)
}

function fillavbl(a){
    $(".appendable1").html('')
    for (var i = 0; i <a.length; i++) {
        $(".appendable1").append(
            `<li>
            <div class="collapsible-header row" style="padding: 5px 3px; margin:0px ;font-size: 14px; color:#0D47A1">
                <span class="col s10 l9" style="text-align:left;"> ${a[i].name}</span>
                <a class="col s2 l3 tooltipped" data-position="bottom" data-tooltip="Send Invitation" style='text-align:right' onClick="sendInvite('${a[i].email}');return false;" class="secondary-content">
                    <i class="material-icons" style="cursor:pointer;font-size: 22px; color:#0D47A1">send</i>
                </a>
            </div>
            <div class="collapsible-body req" style='padding:0;text-align:center;'>
                <div class="row" style="margin:0; padding:0;">
                    <div class="col s12">${a[i].email}</div>
                </div>
            </div>
          </li>`);
        };
        $('.collapsible').collapsible();
        $('.tooltipped').tooltip();
}

function search(e){
    if(!e.value) return fillavbl(avail)
    reg=new RegExp(e.value+'.*');
    data=[];
    i=0;
    avail.forEach(function(elem){
        console.log(++i)
        console.log(elem.email,reg.test(elem.email))
        if(reg.test(elem.name) || reg.test(elem.email)) data.push(elem)
    });
    fillavbl(data)
}

function hideSignin(){
    $(".txtin").addClass('fadeOutUp')
    $(".fadeInUp").addClass('fadeOutDown')
    $(".fadeInRightBig").addClass('fadeOutRightBig')
    $(".fadeInLeftBig").addClass('fadeOutLeftBig')
    $(".sam_signup").fadeOut('fast');
}

function showSignin(){
    $('.raj_login').addClass('zoomOut')
    $('.raj_login ').fadeOut(500,function(){
        $(".fadeOutUp").removeClass('fadeOutUp')
        $(".fadeOutDown").removeClass('fadeOutDown')
        $(".fadeOutRightBig").removeClass('fadeOutRightBig')
        $(".fadeOutLeftBig").removeClass('fadeOutLeftBig')
        $('.sam_signup').show()
        $('.raj_login').removeClass('zoomOut')
    })
    
}