// var token = null;
var avail =null;
var pending=null;
var teamCreated = null;

function showDashboard(){
  if((created||joined)==false){
    swal('Team not yet created', "You need to have a team name first", "error").then(function(){
        $(".create_team_td").trigger('click')
      });
}
  btnreset()
  //ADDING
    $(".dashboard_td").css("background-color", "#0D47A1");
    $(".dashboard_data").css("color","#FFFFFF");
  
    hideall(function(){
      $(".main_s11").fadeIn('slow');
    })
    console.log(token)
    xhr2d=new XMLHttpRequest();
    xhr2d.open("POST",'https://shielded-plains-85651.herokuapp.com/dashboard',false);
    xhr2d.setRequestHeader('Content-type', 'application/json');
    xhr2d.setRequestHeader('Authorization', token);
    xhr2d.onreadystatechange = function(){
      // console.log(xhr2d.status);
      if(xhr2d.status==400){
      // console.log('Enter all details');
    } else if(xhr2d.status==404 || xhr2d.status==500 || xhr2d.status==401){
      Cookies.set('token','')
      window.location.reload()
    } else if(xhr2d.status==200){
          var x=JSON.parse(xhr2d.responseText)
          if(x.code=="TEAMCREATED"){
            // console.log(x)
            document.getElementById("team_name_ajax").innerHTML = x.teamname;
            $('#crtName').html('You are the only member')
            // document.getElementById("team_members_ajax").innerHTML = x.name;
            // $(".team_name_ajax").val(x.teamname);
            // $(".team_members_ajax").val(x.name);
            // console.log(x.teamname);
            // console.log(x.name);
            // console.log("TEAM CREATED ONLY YOU ARE MMBER");
          } else if(x.code=="NOTEAMS"){
            document.getElementById("team_name_ajax").innerHTML = "NOT IN ANY TEAM";
            // console.log("NO TEAM PRESENT");
          } else if(x.code=="TEAMJOINED"){
            // console.log(x)
            document.getElementById("team_name_ajax").innerHTML = x.team;
            $('.num').show()
            $('.numno').hide()
            $('#crtEmail').html(x.creater.email)
            $('#crtName').html(x.creater.name)
            $('#memEmail').html(x.member.email)
            $('#memName').html(x.member.name)
            // console.log("YOU ARE IN A TEAM OF 2");
            // console.log(x)
          }
    }
    }
    xhr2d.send();
}

function sendInvite(email){
  var sendtoemail=email;
  var xhr2s=new XMLHttpRequest();
  xhr2s.open('POST','https://shielded-plains-85651.herokuapp.com/sendinvite',true);
  xhr2s.setRequestHeader('Content-type', 'application/json');
  xhr2s.setRequestHeader('Authorization', token);
  xhr2s.onreadystatechange = function(){
  if(xhr2s.status==400){
    // console.log('FILL EMAIL');
  } else if(xhr2s.status==500){
    swal("Error","Try again.","error");
  }
  else if(xhr2s.status==404){
    swal({title:"Error",text:"Create a team first.",type:"error"}).then(function(){
      $(".create_team_td").trigger('click')
    });

  }
  else if(xhr2s.status==500){
    swal("Error","Try again.","error");
  }
  else if(xhr2s.status==200){
    swal("Success","Sent invite.","success");
    $('.invites_td').trigger('click')
        // var x=JSON.parse(xhr2s.responseText)
        // myNode=document.getElementsByClassName("appendable2")[0];
        // while (myNode.firstChild) {
        //   myNode.removeChild(myNode.firstChild);
        //   }
        // for(var i=0; i<x.invites.length; i++) {
        //   $(".appendable2").append(
        //     '<li class="collection-item"><div>' + x.invites[i].name +'<a href="#!" class="secondary-content"><img class="send_icon" src="images/baseline-remove_circle_outline-24px.svg" alt="Smiley face" align="middle"></a></div></li>'
        //   );
        // };
    }
  }
  xhr2s.send(JSON.stringify({
    sendtoemail:sendtoemail
  }));

}
function acceptInvite(i){
  var teamname=pending[i].teamname;
  xhr2a=new XMLHttpRequest();
  xhr2a.open("POST",'https://shielded-plains-85651.herokuapp.com/acceptinvite',true);
  xhr2a.setRequestHeader('Content-type', 'application/json');
  xhr2a.setRequestHeader('Authorization', token);
  xhr2a.onreadystatechange = function(){
  if(xhr2a.status==400){
    // // console.log('FILL EMAIL');
  } else if(xhr2a.status==500){
    swal("Error","Try again.","error");
  }
  else if(xhr2a.status==404){
    swal("Error","Try again.","error");
  }
  else if(xhr2a.status==500){
    // // console.log("ERROR")
  }
  else if(xhr2a.status==200){
    // // console.log(xhr2a.responseText)
    x=JSON.parse(xhr2a.responseText)
    // // console.log(x)
    // // console.log(x.code)
    // // console.log(x.code=="OK")
    if(x.code=="TEAMJOINED"){
      window.joined=true
      swal("Error","You have already joined a team.","error");
    } else if(x.code=="TEAMFILLEDORDELETED"){
      swal("Error","Team filled or deleted.","error");
    } else if(x.code=="OK"){
      swal("Success","Invite accepted.","success");
      window.joined=true
      $(".dashboard_td").trigger('click')
      //REDIRECT TO DASHBOARD AND CALL FOR TEAM AGAIN
    }
  }
}
  xhr2a.send(JSON.stringify({
    teamname:teamname
  }));
}

function rejectInvite(i){
  var teamname=pending[i].teamname;
  xhr21=new XMLHttpRequest();
  xhr21.open("POST",'https://shielded-plains-85651.herokuapp.com/rejectinvite',true);
  xhr21.setRequestHeader('Content-type', 'application/json');
  xhr21.setRequestHeader('Authorization', token);
  xhr21.onreadystatechange = function(){
  if(xhr21.status==400){
    // console.log('FILL TEAMNAME');
  } else if(xhr21.status==500){
    swal("Error","Try again.","error");
  }
  else if(xhr21.status==200){
    // console.log("DENIED")
    $('.invites_td').trigger('click')
    // pending=pending.splice(i, 1)
    // myNode=document.getElementsByClassName("appendable3")[0];
    // while (myNode.firstChild) {
    //   myNode.removeChild(myNode.firstChild);
    // }
    // for(var i=0; i<x.pending.length; i++) {
    //   $(".appendable3").append(
    //     '<li class="collection-item" style="padding-bottom: none;"><div>' + x.pending[i].name + '</div><div class="row"><div class="col s6 l6"><a href="#!"><span class="accept" onClick="acceptInvite('+i+');return false;">Accept</span></a></div><div class="col s6 l6"><a href="#!"><span onClick="rejectInvite('+i+');return false;" class="decline">Decline</span></a></div></div></li>');
    // };
    
  }
}
  xhr21.send(JSON.stringify({
    teamname:teamname
  }));
}

//REGEX
const regNoRegex=new RegExp('^1[0-9]{1}[A-Z]{3}[0-9]{4}$');
const phoneNoRegex=new RegExp('^[1-9]{1}[0-9]{9}$');
const regg = /^[a-zA-Z]+\.[a-zA-Z]*201[5678][a-zA-Z]?@vitstudent.ac.in$/;
const regg2 = /^[a-zA-Z]+\.[a-zA-Z]*201[5678][a-zA-Z]?@vit.ac.in$/;
// const regg2 = /[a-zA-Z]+\.+201[5678]@vit.ac.in$/;
// const regg = /$[a-zA-Z]+\.[a-zA-Z]*201[5678][a-zA-Z]?@vitstudent.ac.in$/;
// const regg2 = /$[a-zA-Z]+\.[a-zA-Z]*201[5678][a-zA-Z]?@vit.ac.in$/;
// const regg = /[a-zA-Z]+\.+201[5678]@vitstudent.ac.in$/;

$(document).ready(function(){
  //SWITCH TO LOGIN
  $(".login_sam_btn").click(function(){
    hideSignin()
    $(".raj_login").fadeIn('slow');
  });

  //SIGNUP BUTTON
  $(".signup_btn_1").click(function(){

    var name = $("#name_su").val();
    var email_id = $("#emailid_su").val();
    var regno = $("#regno_su").val();
    var phone_num = $("#phone_no_su").val();
    var password = $("#password_su").val();
    var confpass = $("#confpassword_su").val();

    if(name=="" || email_id=="" || regno=="" || phone_num=="" || password=="" || confpass=="")
    {
      swal("Incomplete","Please fill all details.","error");
      return false;
    }
    if(!regg.test(email_id) &&  !regg2.test(email_id)) {
      swal("Error","Enter a valid VIT mail ID","error");
      return false;
    }
    if(password.length <8){
      swal("Error","Password must have atleast 8 characters","error");
      return false;
    }
    if((password !== confpass)){
      swal("Error","Passwords do not match.","error");
      return false;
    }
    if(!phoneNoRegex.test(phone_num)){
      swal("Error","Invalid phone number.","error");
      return false;
    }
    if(!regNoRegex.test(regno)){
      swal("Error","Invalid registration number.","error");
      return false;
    }

    if(name!="" && (regg.test(email_id)==true || regg2.test(email_id)==true) && regNoRegex.test(regno)==true && phoneNoRegex.test(phone_num) && password.length>7 && password==confpass){
      $('#userExists').html('Registering...');
      var obj = { "name": name, "email": email_id, "regno": regno, "phone": phone_num, "password": password};
      var xhr8=new XMLHttpRequest();
        xhr8.open('POST','https://shielded-plains-85651.herokuapp.com/signup', false);
        xhr8.setRequestHeader('Content-type', 'application/json');
        xhr8.onreadystatechange = function() {//Call a function when the state changes.
            $('#userExists').html('');
            if(xhr8.status == 200) {
                token = xhr8.getResponseHeader('Authorization');
                Cookies.set('token', token, { expires: 7 });
                window.location.reload()
            }
            else if(xhr8.status==404){
              // console.log('ENTER ALLDETAILS')
            }
            else if(xhr8.status==401){
              // console.log('USER EXISTS')
              document.getElementById("userExists").innerHTML = "User already exists";
            }
            else if(xhr8.status==500){
              swal("Error","Try again.","error");
            }
        }
        xhr8.send(JSON.stringify(obj));
    }
  });
  $(".logout_btn").click(function(){
    $('.signup_').show()
    $('.login_sam_btn').show()
    $('.logout_btn').hide()
    $(".3_sections_raj_satyam").fadeOut('fast');
    $(".raj_login").fadeOut('fast');
    $(".sam_signup").fadeIn('slow');
    window.token=null;
    Cookies.set('token', '');

  });

    $(".create_btn").click(function(){

    $(".main_s2").fadeIn('slow');
    $(".dashboard_td").css("background-color", "#FFFFFF");
    $(".dashboard_data").css("color","#0D47A1");
    $(".create_team_td").css("background-color", "#0D47A1")
    $(".create_team_data").css("color","#FFFFFF");

  })


  $(".main_login").click(function(){
    // console.log($('#loginbtn').html('Logging in...'))
    var email_id = $("#email_si").val();
    var password = $("#password_si").val();
    if(password<8) {
      swal("Error","Password must have atleast 8 characters.","error");
      return false;
    }
    else if(!regg.test(email_id) &&  !regg2.test(email_id)){
      swal("Error","Enter a valid VIT mail ID","error");
      return false;
    }
    var obj = { "email": email_id, "password": password};
    if(password.length>7 && (regg.test(email_id)==true || regg2.test(email_id)==true)){
        var xhr9=new XMLHttpRequest();
        xhr9.open('POST','https://shielded-plains-85651.herokuapp.com/login', false);
        xhr9.setRequestHeader('Content-type', 'application/json');
        xhr9.onreadystatechange = function(){
        $('#loginbtn').html('Login >')
          if(xhr9.status == 200) {
            token = xhr9.getResponseHeader('Authorization');
                Cookies.set('token', token, { expires: 7 });
                window.location.reload()
              }
               else if(xhr9.status==500){
                swal("Error","Try again.","error");
              } else if(xhr9.status==404){
                swal("Error","Invalid credentials.","error");
                // console.log("INCORRECT COMBO");
              } else{
                swal("Error","Try again.","error");
              }
            }

        xhr9.send(JSON.stringify(obj));
    }
    // else{
    //   // console.log("ENTER ALL DETAILS");
    //
    //   // document.getElementById("email_append_si").innerHTML = "Enter only VIT Email Id";
    //   // document.getElementById("pass_append_si").innerHTML = "Password should be of minimum 8 characters";
    //
    //     if((regg.test(email_id)==true || regg2.test(email_id)==true)==false && password<8){
    //         document.getElementById("email_append_si").innerHTML = "Enter only VIT Email Id";
    //         document.getElementById("pass_append_si").innerHTML = "Password should be of minimum 8 characters";
    //     }
    //     else if((regg.test(email_id)==true || regg2.test(email_id)==true)==true && password<8)
    //     {
    //       document.getElementById("pass_append_si").innerHTML = "Password should be of minimum 8 characters";
    //     }
    //     else if((regg.test(email_id)==true || regg2.test(email_id)==true)==false && password>7)
    //     {
    //       document.getElementById("email_append_si").innerHTML = "Enter only VIT Email Id";
    //     }
    //   }
    // }

  });



  $(".dashboard_td").click(function(){
    showDashboard();
  });


  $(".create_team_td").click(function(){
    if(created||joined===true) return
    //REMOVAL
      btnreset()
    //ADDING
      $(".create_team_td").css("background-color", "#0D47A1");
      $(".create_team_data").css("color","#FFFFFF");

      $(".invites1").fadeOut('fast', function(){
        $(".main_s11").fadeOut('fast', function(){
          $(".main_s2").fadeIn('slow');
        });
      });
      
    });

    $("#submit_team").click(function(){
      var team_name = $(".team_name_new").val();
      // console.log(team_name);
      if(team_name !=""){
        xhr22=new XMLHttpRequest();
            xhr22.open("POST",'https://shielded-plains-85651.herokuapp.com/addteam',false);
            xhr22.setRequestHeader('Content-type', 'application/json');
            xhr22.setRequestHeader('Authorization', token);
            xhr22.onreadystatechange = function(){
              // console.log(xhr22.responseText);
              // console.log(xhr22.status)
            if(xhr22.status==400){
              swal("Error","Try again.","error");
            } else if(xhr22.status==404){
              swal("Error","Try again.","error");
            } else if(xhr22.status==500){
              swal("Error","Try again.","error");
            } else if(xhr22.status==200){
              x=JSON.parse(xhr22.responseText)
            if(x.code=="OK"){
              $(".team_name_new").val('');
              // console.log("TEAM CREATED");
              // showDashboard();
              swal('Success','Team Created! Please logout n login again', 'success')
              window.created=true
              $(".logout_btn").trigger('click')
              // $(".dashboard_td").trigger('click')
            } else if(x.code=="INATEAMORTEAMCREATED"){
              $(".exception1").fadeIn('slow');
              $(".exception2").css("margin-bottom", "0");
              document.getElementById("append_create_team_ajax").innerHTML = "In a team or team created.";
              // console.log("IN A TEAM OR TEAM CREATED")
              window.created=true
              showDashboard()
            } else if(x.code=="TEAMNAMEEXIST"){
              // console.log("TEAM NAME EXISTS");
              // document.getElementById("append_create_team_ajax2").innerHTML = "Team Name already exists.";
              swal("Error","Team name already exists.","error");
            }
            }
            }
            xhr22.send(JSON.stringify({"teamname":team_name}));
        } else{
          // console.log("ENTER TEAM NAME");
          document.getElementById("append_create_team_ajax2").innerHTML = "Enter team name";
        }
      });


  $(".delete_team").click(function(){
    xhr23=new XMLHttpRequest();
    xhr23.open("POST",'https://shielded-plains-85651.herokuapp.com/addteam',false);
    xhr23.setRequestHeader('Content-type', 'application/json');
    xhr23.setRequestHeader('Authorization', token);
    xhr23.onreadystatechange = function(){
    if(xhr23.status==400){
      // console.log('Enter all details');
    } else if(xhr23.status==401){
      // console.log("TEAM FILLED");
    } else if(xhr23.status==500){
      // console.log('TRY AGAIN');
    } else if(xhr23.status==200){
      // console.log("DELETED")
    }
    }
    xhr23.send();
  });

  $('.invites_td').click(function(){
    if(joined==true) return
    btnreset()

    //ADDING
    $(".invites_td").css("background-color", "#0D47A1");
    $(".invites_data").css("color","#FFFFFF");

    $(".main_s11").fadeOut('fast', function(){
      $(".main_s2").fadeOut('fast', function(){
        $(".invites1").fadeIn('slow');
      });
    });
    
    
    xhr24=new XMLHttpRequest();
    xhr24.open("POST",'https://shielded-plains-85651.herokuapp.com/getavail',true);
    xhr24.setRequestHeader('Content-type', 'application/json');
    xhr24.setRequestHeader('Authorization', token);
    xhr24.onreadystatechange = function(){
    if(xhr24.status==500){
      swal("Error","Try again.","error");     return 0;
    } else if(xhr24.status==200){
      if(xhr24.responseText==='') return
      x=JSON.parse(xhr24.responseText)
      // console.log(x.result)
      avail=x.result;
      // console.log(typeof x)
      myNode=document.getElementsByClassName("appendable1")[0];
      while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
        }
      fillavbl(x.result)
      
      // console.log("FILL AVAILABLE")
      }
    }
    xhr24.send();
    xhr7=new XMLHttpRequest();
    xhr7.open("POST",'https://shielded-plains-85651.herokuapp.com/pending',true);
    xhr7.setRequestHeader('Content-type', 'application/json');
    xhr7.setRequestHeader('Authorization', token);
    xhr7.onreadystatechange = function(){
    if(xhr7.status==500){
      swal("Error","Try again.","error");
    }else if(xhr7.status==500){
      swal("Error","Try again.","error");
    }
    else if(xhr7.status==200){
      if(xhr7.responseText=='') return
      x=JSON.parse(xhr7.responseText)
      // console.log(x);
      if(x.code=="TEAMJOINED"){
        swal({
            title:"Error",
            text:"Team joined. Cannot change now.",
            type:"error"}).then(function(){
              window.joined=true
              showDashboard()
            });

      }
      else{
        // console.log("FILL LIST")
        // console.log(x.pending)
        // console.log(x.sent)
            pending=x.pending;
            myNode=document.getElementsByClassName("appendable2")[0];
            if(x.sent.length==0) $('.appendable2').html('<div style="font-size:17px; color: #0D47A1; text-align:center;padding: 20px 0;">You have sent no invitation.</div>')
            if(x.sent.length>0)
            while (myNode.firstChild) {
              myNode.removeChild(myNode.firstChild);
            }
            for(var i=0; i<x.sent.length; i++) {

                $(".appendable2").append(
                  '<li class="collection-item" style="padding-left: 4px; font-size: 14px;"><div>' + x.sent[i].name +'</div></li>'
                );
              };
            myNode=document.getElementsByClassName("appendable3")[0];
            if(x.pending.length==0) $('.appendable3').html('<div style="font-size:17px; color: #0D47A1; text-align:center;padding: 20px 0;">You got no invitation.</div>')
            if(x.pending.length>0)
            while (myNode.firstChild) {
              myNode.removeChild(myNode.firstChild);
            }
          for(var i=0; i<x.pending.length; i++) {
            $(".appendable3").append(
              '<li class="collection-item" style="padding-bottom: none;"><div>' + x.pending[i].creater.name + '</div><div class="row" style="margin: 0;"><div class="col s6 l6"><a href="#!"><span class="accept" onClick="acceptInvite('+i+');return false;">Accept&nbsp;&nbsp;<i style="vertical-align: bottom; font-size: 21px;"class="material-icons">check</i></span></a></div><div class="col s6 l6"><a href="#!"><span onClick="rejectInvite('+i+');return false;" class="decline">Decline&nbsp;&nbsp;<i style="vertical-align: bottom; font-size: 21px;"class="material-icons">delete</i></span></a></div></div></li>');
          };
        }
      }
    }
    xhr7.send();
  });
});


  // // console.log("hi");
        // var text = "Raj";
        // for (var i = 0; i <=10; i++) {
        //      $(".appendable1").append(
        //        '<li class="collection-item"><div>' + text + '<a href="#!" class="secondary-content"><img class="send_icon" src="images/baseline-send-24px (1).svg" alt="Smiley face" align="middle"></a></div></li>');
        // };
  // // console.log("kk");
  //
  //       for(var i=0; i<=10; i++) {
  //         $(".appendable2").append(
  //           '<li class="collection-item"><div>' + text +'<a href="#!" class="secondary-content"><img class="send_icon" src="images/baseline-remove_circle_outline-24px.svg" alt="Smiley face" align="middle"></a></div></li>'
  //         );
  //       };
  //   // console.log("kk2");
  //
  //   for(var i=0; i<=10; i++) {
  //     $(".appendable3").append(
  //       '<li class="collection-item" style="padding-bottom: none;"><div>' + text + '</div><div class="row"><div class="col s6 l6"><a href="#!"><span class="accept">Accept</span></a></div><div class="col s6 l6"><a href="#!"><span class="decline">Decline</span></a></div></div></li>');
  //   };
