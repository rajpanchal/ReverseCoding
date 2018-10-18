window.joined=false; window.created=false; window.rnd1=false
var leaderBoard=[];
// swal('We are stopping server for just 5 mins.','','info')
$(window).on('load', function () {
    M.AutoInit()
    // var socket=io.connect('URL');
    // socket.on('event',function(data){
    //     leaderBoard=data;
    // })
    // $('select').formSelect();
    window.token=Cookies.get('token')
    if(window.token) {
        $.ajax({
            url:'https://shielded-plains-85651.herokuapp.com/dashboard', 
            type:'post', 
            headers:{'Authorization':token}
        }).done(function(e){
            // console.log(e)
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
            // swal('Note', 'For windows users, if you are facing any .ddl missing error, install this software \n https://www.dll-files.com/libgcc_s_dw2-1.dll.html ', 'warning')
            // swal('Binary files have been updated.','Download and try again if you were unable to run exe files','info')
            swal('Event will end at 12:00:00 AM!','','info')
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

    

    $('#ld_pgno').on('change', function (e) {
        // // console.log(e)
        // var optionSelected = $("option:selected", this);
        // var valueSelected = this.value;
        // changeld(value);
        changeld($('#ld_pgno').val());
    });


})

function btnreset(){
    $(".dashboard_td").css("background-color", "#FFFFFF");
    $(".dashboard_data").css("color","#0D47A1");

    $(".ld_td").css("background-color", "#FFFFFF");
    $(".ld_data").css("color","#0D47A1");

    $(".rnd1_td").css("background-color", "#FFFFFF");
    $(".rnd1_data").css("color","#0D47A1");

    $(".create_team_td").css("background-color", "#FFFFFF");
    $(".create_team_data").css("color",(created||joined)?"#bdbdbd":"#0D47A1");

    $(".invites_td").css("background-color", "#FFFFFF");
    $(".invites_data").css("color",(joined)?"#bdbdbd":"#0D47A1");
    
    $('.create_team_td').css('cursor',(created||joined)?'not-allowed':'pointer')
    $('.invites_td').css('cursor',(joined)?'not-allowed':'pointer')

    // if(rnd1){
    //     $(".create_team_td").hide();
    //     $(".invites_td").hide();
    //     $(".rnd1_td").show();
    //     $(".ld_td").show();
    // }
    if(joined){
        $(".create_team_td").hide();
        $(".invites_td").hide();
        $(".rnd1_td").show();
        $(".ld_td").show();
    }
    else if(created) {
        $(".create_team_td").hide();
        $(".invites_td").show();
        $(".rnd1_td").show();
        $(".ld_td").show();
    }
    else{
        $(".create_team_td").show();
        $(".invites_td").show();
        $(".rnd1_td").hide();
        $(".ld_td").hide();
    }

    // console.log(created||joined)
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
        // console.log(++i)
        // console.log(elem.email,reg.test(elem.email))
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

function hideall(callback){
    $(".main_s11").fadeOut('fast', function(){
        $(".main_s2").fadeOut('fast', function(){
            $(".invites1").fadeOut('fast', function(){
                $(".main_s4").fadeOut('fast', function(){
                    $(".ldboard").fadeOut('fast', function(){
                        if(callback) callback()
                    });
                });
            });
        });
    });
}

function showrn1(){
    if($('.main_s4').css('display')!=="none") return
    hideall(function(){
        $(".main_s4").fadeIn('slow');
        btnreset()
        $(".rnd1_td").css("background-color", "#0D47A1");
        $(".rnd1_data").css("color","#FFFFFF");
    });
    //    FETCH
    var xhr=new XMLHttpRequest();
        xhr.open("GET","https://rcpcapi.acmvit.in/question/get",true);
        
        xhr.setRequestHeader('Authorization','Bearer '+token);
        xhr.onreadystatechange=function(){
            // console.log(this);
            if(this.readyState==4 && this.status==200){
                x=JSON.parse(xhr.responseText)
                // console.log(x)
                showQues(x.questions)
            } else if(this.readyState==4 && (this.status==500 || this.status==406)){
                swal("Error","Try again.","error");
            }
        }
        xhr.send();
}

function showld(){
    if($('.ldboard').css('display')!=="none") return
    hideall(function(){
        $(".ldboard").fadeIn('slow');
        btnreset()
        $(".ld_td").css("background-color", "#0D47A1");
        $(".ld_data").css("color","#FFFFFF");
    });
    var num=1;
    var xhr=new XMLHttpRequest();
        xhr.open("GET","https://rcpcapi.acmvit.in/team/leaderboard?page="+num.toString(),true);
        
        xhr.setRequestHeader('Authorization','Bearer '+token);
        xhr.onreadystatechange=function(){
            if(this.readyState==4 && this.status==200){
                x=JSON.parse(xhr.responseText)
                showTotalPages(x.totalPages+1)
                showTeams(x.data,0)
            } else if(this.readyState==4 && this.status==500){
                swal("Error","Try again.","error");
            }
        }
        xhr.send();
    
}

//SHOW TOTAL PAGES
function showTotalPages(num){
    // console.log(num);
    var i=1;
    txt='<li class="waves-effect" id="ld_pgu" onclick="pageUp(false)"><a href="#!"><i class="material-icons">chevron_left</i></a></li>'
    do{
        txt+=`<li class="waves-effect ld_pg" id="ld_pg${i}" onclick="selectPage(${i})"><a href="#!">${i}</a></li>`
        i++
    }while(i<num)
    txt+='<li class="waves-effect" id="ld_pgd" onclick="pageUp(true)"><a href="#!"><i class="material-icons">chevron_right</i></a></li>'
    $('#ld_pg').html(txt)
    selectPage(1)
}

//CHANGE LD BASED ON PAGE NUM
function changeld(num){
    var xhr=new XMLHttpRequest();
        xhr.open("GET","https://rcpcapi.acmvit.in/team/leaderboard?page="+num.toString(),true);
        
        xhr.setRequestHeader('Authorization','Bearer '+token);
        xhr.onreadystatechange=function(){
                    if(this.readyState==4 && this.status==200){
                        x=JSON.parse(xhr.responseText)
                        showTeams(x.data,num-1)
                    } else if(this.readyState==4 && this.status==500){
                        swal("Error","Try again.","error");
                    }
                }
            
        
        xhr.send();
}

function start(){
    swal('Note', 'Do not add any helper text or extra spaces to your output.', 'warning').then(function(){
        rnd1=true;
        showDashboard()
      });
}

function selectPage(e){
    if(!$('#ld_pg'+e)[0]) return
    $('.ld_pg').removeClass('active');
    $('#ld_pg'+e).addClass('active');
    changeld(e);
}
function pageUp(up){
    // console.log(up)
    id=$('.ld_pg.active').attr('id')
    ide=Number(id[id.length-1])
    if(ide)
    up?selectPage(ide+1):selectPage(ide-1)
}