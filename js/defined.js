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

function fillavbl(a){
    $(".appendable1").html('')
    for (var i = 0; i <a.length; i++) {
        $(".appendable1").append(
            `<li>
            <div class="collapsible-header row" style="padding: 5px 3px; margin:0px ;font-size: 14px; color:#0D47A1">
                <span class="col s10" style="text:align:left;"> ${a[i].name}</span>
                <a class="col s2" style='text-align:right' onClick="sendInvite(${i});return false;" class="secondary-content">
                    <i class="material-icons" style="cursor:pointer;font-size: 22px; color:#0D47A1">send</i>
                </a>
            </div>
            <div class="collapsible-body" style='padding:4%!important; padding-top:4%;padding-bottom:4%;text-align:center;'>
                <div class="row" style="margin:0; padding:0;">
                    <div class="col s12">${a[i].email}</div>
                </div>
            </div>
          </li>`);
        };
        $('.collapsible').collapsible();
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