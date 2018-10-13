var token = null;
var avail =null;
var pending=null;
var teamCreated = null;

function showDashboard(){
  $(".create_team_td").css("background-color", "#FFFFFF");
  $(".create_team_data").css("color","#0D47A1");
  $(".invites_td").css("background-color", "#FFFFFF");
  $(".invites_data").css("color","#0D47A1");

  //ADDING
    $(".dashboard_td").css("background-color", "#0D47A1");
    $(".dashboard_data").css("color","#FFFFFF");

    $(".invites1").css("display","none");
    $(".main_s11").css("display", "block");
    $(".main_s2").css("display", "none");
    console.log(token)
    xhr2=new XMLHttpRequest();
    xhr2.open("POST",'https://shielded-plains-85651.herokuapp.com/dashboard',false);
    xhr2.setRequestHeader('Content-type', 'application/json');
    xhr2.setRequestHeader('Authorization', token);
    xhr2.onreadystatechange = function(){
      console.log(xhr2.status);
      if(xhr2.status==400){
      console.log('Enter all details');
    } else if(xhr2.status==404){
      swal("Error","Try again.","error");
    } else if(xhr2.status==500){
      swal("Error","Try again.","error");
    } else if(xhr2.status==200){
          var x=JSON.parse(xhr2.responseText)
          if(x.code=="TEAMCREATED"){
            console.log(x)
            document.getElementById("team_name_ajax").innerHTML = x.teamname;
            document.getElementById("team_members_ajax").innerHTML = x.name;
            // $(".team_name_ajax").val(x.teamname);
            // $(".team_members_ajax").val(x.name);
            console.log(x.teamname);
            console.log(x.name);
            console.log("TEAM CREATED ONLY YOU ARE MMBER");
          } else if(x.code=="NOTEAMS"){
            document.getElementById("team_name_ajax").innerHTML = "NOT IN ANY TEAM";
            console.log("NO TEAM PRESENT");
          } else if(x.code=="TEAMJOINED"){
            document.getElementById("team_name_ajax").innerHTML = x.team;
            document.getElementById("team_members_ajax").innerHTML = x.creator.name + ", " + x.member.name;
            console.log("YOU ARE IN A TEAM OF 2");
            console.log(x)
          }
    }
    }
    xhr2.send();
}

function sendInvite(i){
  var sendtoemail=avail[i].email;
  var xhr2=new XMLHttpRequest();
  xhr2.open('POST','https://shielded-plains-85651.herokuapp.com/sendinvite',true);
  xhr2.setRequestHeader('Content-type', 'application/json');
  xhr2.setRequestHeader('Authorization', token);
  xhr2.onreadystatechange = function(){
  if(xhr2.status==400){
    console.log('FILL EMAIL');
  } else if(xhr2.status==500){
    swal("Error","Try again.","error");
  }
  else if(xhr2.status==404){
    swal({title:"Error",text:"Create a team first.",type:"error"}).then(function(){
      $(".main_s2").css("display", "block");
        $(".dashboard_td").css("background-color", "#FFFFFF");
        $(".dashboard_data").css("color","#0D47A1");
        $(".create_team_td").css("background-color", "#FFFFFF")
        $(".create_team_data").css("color","#0D47A1");
        $(".invites1").css("display","none");
    });

  }
  else if(xhr2.status==500){
    swal("Error","Try again.","error");
  }
  else if(xhr2.status==200){
    swal("Success","Sent invite.","success");

      var x=JSON.parse(xhr2.responseText)
      myNode=document.getElementsByClassName("appendable2")[0];
      while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
        }
      for(var i=0; i<x.invites.length; i++) {
        $(".appendable2").append(
          '<li class="collection-item"><div>' + x.invites[i].name +'<a href="#!" class="secondary-content"><img class="send_icon" src="images/baseline-remove_circle_outline-24px.svg" alt="Smiley face" align="middle"></a></div></li>'
        );
      };
    }
  }
  xhr2.send(JSON.stringify({
    sendtoemail:sendtoemail
  }));

}
function acceptInvite(i){
  var teamname=pending[i].teamname;
  xhr2=new XMLHttpRequest();
  xhr2.open("POST",'https://shielded-plains-85651.herokuapp.com/acceptinvite',true);
  xhr2.setRequestHeader('Content-type', 'application/json');
  xhr2.setRequestHeader('Authorization', token);
  xhr2.onreadystatechange = function(){
  if(xhr2.status==400){
    console.log('FILL EMAIL');
  } else if(xhr2.status==500){
    swal("Error","Try again.","error");
  }
  else if(xhr2.status==404){
    swal("Error","Try again.","error");
  }
  else if(xhr2.status==500){
    console.log("ERROR")
  }
  else if(xhr2.status==200){

      x=JSON.parse(xhr2.responseText)

    if(x.code=="TEAMJOINED"){
      swal("Error","You have already joined a team.","error");
    } else if(x.code=="TEAMFILLEDORDELETED"){
      swal("Error","Team filled or deleted.","error");
    } else if(x.code=="OK"){
      console.log("ACCEPTED");
      showDashboard();
      //REDIRECT TO DASHBOARD AND CALL FOR TEAM AGAIN
    }
  }
}
  xhr2.send(JSON.stringify({
    teamname:teamname
  }));
}

function rejectInvite(i){
  var teamname=pending[i].teamname;
  xhr2=new XMLHttpRequest();
  xhr2.open("POST",'https://shielded-plains-85651.herokuapp.com/rejectinvite',true);
  xhr2.setRequestHeader('Content-type', 'application/json');
  xhr2.setRequestHeader('Authorization', token);
  xhr2.onreadystatechange = function(){
  if(xhr2.status==400){
    console.log('FILL TEAMNAME');
  } else if(xhr2.status==500){
    swal("Error","Try again.","error");
  }
  else if(xhr2.status==200){
    console.log("DENIED")
    pending=pending.splice(i, 1)
    myNode=document.getElementsByClassName("appendable3")[0];
    while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }
    for(var i=0; i<x.pending.length; i++) {
      $(".appendable3").append(
        '<li class="collection-item" style="padding-bottom: none;"><div>' + x.pending[i].name + '</div><div class="row"><div class="col s6 l6"><a href="#!"><span class="accept" onClick="acceptInvite('+i+');return false;">Accept</span></a></div><div class="col s6 l6"><a href="#!"><span onClick="rejectInvite('+i+');return false;" class="decline">Decline</span></a></div></div></li>');
    };
  }
}
  xhr2.send(JSON.stringify({
    teamname:teamname
  }));
}

//REGEX
const regNoRegex=new RegExp('^1[0-9]{1}[A-Z]{3}[0-9]{4}$');
const phoneNoRegex=new RegExp('^[1-9]{1}[0-9]{9}$');
const regg = /[a-zA-Z]+\.[a-zA-Z]+201[5678]@vitstudent.ac.in$/;
const regg2 = /[a-zA-Z]+\.+201[5678]@vitstudent.ac.in$/;

$(document).ready(function(){
  //SWITCH TO LOGIN
  $(".login_sam_btn").click(function(){
    $(".sam_signup").css("display","none");
    $(".raj_login").css("display","block");
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
      swal("Error","Invalid email.","error");
      return false;
    }
    if((password !== confpass) || password.length <8){
      swal("Error","Passwords donott match.","error");
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
      var obj = { "name": name, "email": email_id, "regno": regno, "phone": phone_num, "password": password};
      var xhr=new XMLHttpRequest();
        xhr.open('POST','https://shielded-plains-85651.herokuapp.com/signup', false);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onreadystatechange = function() {//Call a function when the state changes.
            if(xhr.status == 200) {
                token = xhr.getResponseHeader('Authorization');
                $(".sam_signup").css("display","none");
                $(".raj_login").css("display","none");
                $(".3_sections_raj_satyam").css("display","block");
                showDashboard();

            }
            else if(xhr.status==404){
              console.log('ENTER ALLDETAILS')
            }
            else if(xhr.status==401){
              console.log('USER EXISTS')
              document.getElementById("userExists").innerHTML = "User already exists";
            }
            else if(xhr.status==500){
              swal("Error","Try again.","error");
            }
        }
        xhr.send(JSON.stringify(obj));
    }
  });
  $(".logout_btn").click(function(){
    $(".3_sections_raj_satyam").css("display","none");
    $(".sam_signup").css("display","none");
    $(".raj_login").css("display","block");
    token=null;
  });

    $(".create_btn").click(function(){

    $(".main_s2").css("display", "block");
    $(".dashboard_td").css("background-color", "#FFFFFF");
    $(".dashboard_data").css("color","#0D47A1");
    $(".create_team_td").css("background-color", "#0D47A1")
    $(".create_team_data").css("color","#FFFFFF");

  })


  $(".main_login").click(function(){
    var email_id = $("#email_si").val();
    var password = $("#password_si").val();
    if(password<8) {
      swal("Error","Check your password.","error");
      return false;
    }
    if(!regg.test(email_id) &&  !regg2.test(email_id)){
      swal("Error","Check your email.","error");
      return false;
    }
    var obj = { "email": email_id, "password": password};
    if(password.length>7 && (regg.test(email_id)==true || regg2.test(email_id)==true)){
        $("#loginbtn").val('Logging in..');
        var xhr=new XMLHttpRequest();
        xhr.open('POST','https://shielded-plains-85651.herokuapp.com/login', false);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onreadystatechange = function(){
          if(xhr.status == 200) {
            token = xhr.getResponseHeader('Authorization');
                $("#loginbtn").val('Login >');
                $(".raj_login").css("display","none");
                $(".3_sections_raj_satyam").css("display","block");
                showDashboard();
              }
               else if(xhr.status==500){
                swal("Error","Try again.","error");
              } else if(xhr.status==404){
                swal("Error","Invalid credentials.","error");
                console.log("INCORRECT COMBO");
              } else{
                swal("Error","Try again.","error");
              }
            }

        xhr.send(JSON.stringify(obj));
    }
    // else{
    //   console.log("ENTER ALL DETAILS");
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



  $(".dashboard").click(function(){
    showDashboard();
  });


  $(".create_team").click(function(){
    //REMOVAL
      $(".dashboard_td").css("background-color", "#FFFFFF");
      $(".dashboard_data").css("color","#0D47A1");
      $(".invites_td").css("background-color", "#FFFFFF");
      $(".invites_data").css("color","#0D47A1");
    //ADDING
      $(".create_team_td").css("background-color", "#0D47A1");
      $(".create_team_data").css("color","#FFFFFF");

      $(".invites1").css("display","none");
      $(".main_s11").css("display", "none");
      $(".main_s2").css("display", "block");
    });

    $("#submit_team").click(function(){
      var team_name = $(".team_name_new").val();
      console.log(team_name);
      if(team_name !=""){
        xhr2=new XMLHttpRequest();
            xhr2.open("POST",'https://shielded-plains-85651.herokuapp.com/addteam',false);
            xhr2.setRequestHeader('Content-type', 'application/json');
            xhr2.setRequestHeader('Authorization', token);
            xhr2.onreadystatechange = function(){
              console.log(xhr2.responseText);
              console.log(xhr2.status)
            if(xhr2.status==400){
              swal("Error","Try again.","error");
            } else if(xhr2.status==404){
              swal("Error","Try again.","error");
            } else if(xhr2.status==500){
              swal("Error","Try again.","error");
            } else if(xhr2.status==200){
              x=JSON.parse(xhr2.responseText)
            if(x.code=="OK"){
              $(".team_name_new").val('');
              console.log("TEAM CREATED");
              showDashboard();

            } else if(x.code=="INATEAMORTEAMCREATED"){
              $(".exception1").css("display","block");
              $(".exception2").css("margin-bottom", "0");
              document.getElementById("append_create_team_ajax").innerHTML = "In a team or team created.";
              console.log("IN A TEAM OR TEAM CREATED")
            } else if(x.code=="TEAMNAMEEXIST"){
              console.log("TEAM NAME EXISTS");
              document.getElementById("append_create_team_ajax").innerHTML = "Team Name already exists.";
            }
            }
            }
            xhr2.send(JSON.stringify({"teamname":team_name}));
        } else{
          console.log("ENTER TEAM NAME");
          document.getElementById("append_create_team_ajax2").innerHTML = "Enter team name";
        }
      });


  $(".delete_team").click(function(){
    xhr2=new XMLHttpRequest();
    xhr2.open("POST",'https://shielded-plains-85651.herokuapp.com/addteam',false);
    xhr2.setRequestHeader('Content-type', 'application/json');
    xhr2.setRequestHeader('Authorization', token);
    xhr2.onreadystatechange = function(){
    if(xhr2.status==400){
      console.log('Enter all details');
    } else if(xhr2.status==401){
      console.log("TEAM FILLED");
    } else if(xhr2.status==500){
      console.log('TRY AGAIN');
    } else if(xhr2.status==200){
      console.log("DELETED")
    }
    }
    xhr2.send();
  });

  $(".invites").click(function(){
    $(".dashboard_td").css("background-color", "#FFFFFF");
    $(".dashboard_data").css("color","#0D47A1");
    $(".create_team_td").css("background-color", "#FFFFFF");
    $(".create_team_data").css("color","#0D47A1");

    //ADDING
    $(".invites_td").css("background-color", "#0D47A1");
    $(".invites_data").css("color","#FFFFFF");

    $(".main_s11").css("display", "none");
    $(".main_s2").css("display", "none");
    $(".invites1").css("display","block");
    xhr2=new XMLHttpRequest();
    xhr2.open("POST",'https://shielded-plains-85651.herokuapp.com/getavail',true);
    xhr2.setRequestHeader('Content-type', 'application/json');
    xhr2.setRequestHeader('Authorization', token);
    xhr2.onreadystatechange = function(){
    if(xhr2.status==500){
      swal("Error","Try again.","error");     return 0;
    } else if(xhr2.status==200){
      x=JSON.parse(xhr2.responseText)
      console.log(x.result)
      avail=x.result;
      console.log(typeof x)
      myNode=document.getElementsByClassName("appendable1")[0];
      while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
        }
      for (var i = 0; i <x.result.length; i++) {
           $(".appendable1").append(
             '<li class="collection-item" style="padding-left: 4px; font-size: 14px;"><div><span style="max-width: 10px;">' + x.result[i].name + '</span><a onClick="sendInvite('+i+');return false;" class="secondary-content"><img class="send_icon" src="images/baseline-send-24px (1).svg" alt="Smiley face" align="right"></a></div></li>');
           };
      console.log("FILL AVAILABLE")
      }
    }
    xhr2.send();
    xhr=new XMLHttpRequest();
    xhr.open("POST",'https://shielded-plains-85651.herokuapp.com/pending',true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('Authorization', token);
    xhr.onreadystatechange = function(){
    if(xhr.status==500){
      swal("Error","Try again.","error");
    }else if(xhr.status==500){
      swal("Error","Try again.","error");
    }
    else if(xhr.status==200){
      x=JSON.parse(xhr.responseText)
      console.log(x);
      if(x.code=="TEAMJOINED"){
        swal({
            title:"Error",
            text:"Team joined. Cannot change now.",
            type:"error"}).then(function(){
              showDashboard()
            });

      }
      else{
        console.log("FILL LIST")
        console.log(x.pending)
        console.log(x.sent)
            pending=x.pending;
            myNode=document.getElementsByClassName("appendable2")[0];
            while (myNode.firstChild) {
              myNode.removeChild(myNode.firstChild);
            }
            for(var i=0; i<x.sent.length; i++) {

                $(".appendable2").append(
                  '<li class="collection-item" style="padding-left: 4px; font-size: 14px;"><div>' + x.sent[i].name +'<a href="#!" class="secondary-content"><img class="send_icon" src="images/baseline-remove_circle_outline-24px.svg" alt="Smiley face" align="middle"></a></div></li>'
                );
              };
            myNode=document.getElementsByClassName("appendable3")[0];
            while (myNode.firstChild) {
              myNode.removeChild(myNode.firstChild);
            }
          for(var i=0; i<x.pending.length; i++) {
            $(".appendable3").append(
              '<li class="collection-item" style="padding-bottom: none;"><div>' + x.pending[i].creater.name + '</div><div class="row"><div class="col s6 l6"><a href="#!"><span class="accept" onClick="acceptInvite('+i+');return false;">Accept</span></a></div><div class="col s6 l6"><a href="#!"><span onClick="rejectInvite('+i+');return false;" class="decline">Decline</span></a></div></div></li>');
          };
        }
      }
    }
    xhr.send();
  });
});


  // console.log("hi");
        // var text = "Raj";
        // for (var i = 0; i <=10; i++) {
        //      $(".appendable1").append(
        //        '<li class="collection-item"><div>' + text + '<a href="#!" class="secondary-content"><img class="send_icon" src="images/baseline-send-24px (1).svg" alt="Smiley face" align="middle"></a></div></li>');
        // };
  // console.log("kk");
  //
  //       for(var i=0; i<=10; i++) {
  //         $(".appendable2").append(
  //           '<li class="collection-item"><div>' + text +'<a href="#!" class="secondary-content"><img class="send_icon" src="images/baseline-remove_circle_outline-24px.svg" alt="Smiley face" align="middle"></a></div></li>'
  //         );
  //       };
  //   console.log("kk2");
  //
  //   for(var i=0; i<=10; i++) {
  //     $(".appendable3").append(
  //       '<li class="collection-item" style="padding-bottom: none;"><div>' + text + '</div><div class="row"><div class="col s6 l6"><a href="#!"><span class="accept">Accept</span></a></div><div class="col s6 l6"><a href="#!"><span class="decline">Decline</span></a></div></div></li>');
  //   };
