var token = null;
var avail =null;
var pending=null;

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
    console.log("ERROR")
  }
  else if(xhr2.status==404){
    console.log("CREATE TEAM")
  }
  else if(xhr2.status==500){
    console.log("ERROR")
  }
  else if(xhr2.status==200){
    console.log("SENT")

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
    console.log("ERROR")
  }
  else if(xhr2.status==404){
    console.log("CREATE TEAM")
  }
  else if(xhr2.status==500){
    console.log("ERROR")
  }
  else if(xhr2.status==200){

      x=JSON.parse(xhr2.responseText)

    if(x.code=="TEAMJOINED"){
      console.log("TEAM JOINED ALREADY")
    } else if(x.code=="OK"){
      console.log("ACCEPTED");

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
    console.log("ERROR")
  }
  else if(xhr2.status==500){
    console.log("ERROR")
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


    if(name!="" && regg.test(email_id)==true && regNoRegex.test(regno)==true && phoneNoRegex.test(phone_num) && password.length>7 && password==confpass){
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
                xhr2=new XMLHttpRequest();
                xhr2.open("POST",'https://shielded-plains-85651.herokuapp.com/dashboard',false);
                xhr2.setRequestHeader('Content-type', 'application/json');
                xhr2.setRequestHeader('Authorization', token);
                xhr2.onreadystatechange = function(){
                    if(xhr2.status==400){
                    console.log('Enter all details');
                  } else if(xhr2.status==404){
                    console.log("TRY AGAIN");
                  } else if(xhr2.status==500){
                    console.log('TRY AGAIN');
                  } else if(xhr2.status==200){
                    if(xhr2.responseText.code=="TEAMCREATED"){
                      console.log("TEAM CREATED ONLY YOU ARE MMBER")
                      console.log(xhr2.responseText.teamname, xhr2.responseText.name)
                    } else if(xhr2.responseText.code=="NOTEAMS"){
                      console.log("NO TEAM PRESENT")
                    } else if(xhr2.status=="TEAMJOINED"){
                      console.log("YOU ARE IN A TEAM OF 2");
                      console.log(xhr2.responseText.team, xhr2.responseText.creator, xhr2.responseText.member)
                    }
                  }
                }
                xhr2.send();
            }
            else if(xhr.status==404){
              console.log('ENTER ALLDETAILS')
            }
            else if(xhr.status==401){
              console.log('USER EXISTS')
            }
            else if(xhr.status==500){
              console.log("TRY AGAIN")
            }
        }
        xhr.send(JSON.stringify(obj));
    }
    else{
      document.getElementById("pass_append_su").innerHTML = "Password should me of minimum 8 characters";
      document.getElementById("email_append_su").innerHTML = "Use only VIT email id";
      console.log('Password should me of minimum 8 characters');
      console.log("Use only VIT Email");
    }
  });
$(".create_btn").click(function(){
  $(".logout_btn").click(function(){
    $(".3_sections_raj_satyam").css("display","none");
    $(".sam_signup").css("display","none");
    $(".raj_login").css("display","block");
    token=null;
  });
})


    $(".main_s11").css("display", "block");
    $(".dashboard_td").css("background-color", "#0D47A1");
    $(".dashboard_data").css("color","#FFFFFF");

  $(".main_login").click(function(){
    var email_id = $("#email_si").val();
    var password = $("#password_si").val();
    $("#email_si").val("");
    $("#password_si").val("");
    var obj = { "email": email_id, "password": password};
    if(password!="" && email_id!=""){
        var xhr=new XMLHttpRequest();
        xhr.open('POST','https://shielded-plains-85651.herokuapp.com/login', false);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onreadystatechange = function(){
          if(xhr.status == 200) {
            $(".raj_login").css("display","none");
            $(".3_sections_raj_satyam").css("display","block");
                token = xhr.getResponseHeader('Authorization');
                $(".raj_login").css("display","none");
                $(".3_sections_raj_satyam").css("display","block");
                xhr2=new XMLHttpRequest();
                xhr2.open("POST",'https://shielded-plains-85651.herokuapp.com/dashboard',false);
                xhr2.setRequestHeader('Content-type', 'application/json');
                xhr2.setRequestHeader('Authorization', token);
                xhr2.onreadystatechange = function(){
                  if(xhr2.status==400){
                    console.log('Enter all details');
                  } else if(xhr2.status==404){
                    console.log("TRY AGAIN");
                  } else if(xhr2.status==500){
                    console.log('TRY AGAIN');
                  } else if(xhr2.status==200){
                    console.log(xhr2.responseText);
                    if(xhr2.responseText.code=="TEAMCREATED"){
                      console.log(xhr2.responseText)
                      console.log("TEAM CREATED ONLY YOU ARE MMBER")
                    } else if(xhr2.responseText.code=="NOTEAMS"){
                      console.log("NO TEAM PRESENT")
                    } else if(xhr2.responseText.code=="TEAMJOINED"){
                      console.log("YOU ARE IN A TEAM OF 2");
                      console.log(xhr2.responseText)
                    }
                  }
                }
                xhr2.send();
              }
               else if(xhr.status==500){
                console.log("ERROR");
              } else if(xhr.status==404){
                console.log("INCORRECT COMBO");
              } else{
                console.log("TRY AGAIN")
              }
            }

        xhr.send(JSON.stringify(obj));
    }
    else{
      console.log("ENTER ALL DETAILS")
    }

  });


  $(".dashboard").click(function(){
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
        console.log("TRY AGAIN");
      } else if(xhr2.status==500){
        console.log('TRY AGAIN');
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
              document.getElementById("team_name_ajax").innerHTML = "NOT JOINED ANY TEAM";
              document.getElementById("team_members_ajax").innerHTML = x.name;
              console.log("NO TEAM PRESENT");
            } else if(x.code=="TEAMJOINED"){
              document.getElementById("team_name_ajax").innerHTML = x.team;
              document.getElementById("team_members_ajax").innerHTML = x.creator + ", " + x.member;
              console.log("YOU ARE IN A TEAM OF 2");
              console.log(x)
            }
      }
      }
      xhr2.send();
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
              console.log('Enter all details');
            } else if(xhr2.status==404){
              console.log("TRY AGAIN");
            } else if(xhr2.status==500){
              console.log('TRY AGAIN');
            } else if(xhr2.status==200){
              x=JSON.parse(xhr2.responseText)
            if(x.code=="OK"){
              console.log("TEAM CREATED")
            } else if(x.code=="INATEAMORTEAMCREATED"){
              $(".exception1").css("display","block");
              $(".exception2").css("margin-bottom", "0");
              document.getElementById("append_create_team_ajax").innerHTML = "In a team or team created.";
              console.log("IN A TEAM OR TEAM CREATED")
            } else if(x.code=="TEAMNAMEEXIST"){
              console.log("TEAM NAME EXISTS")
            }
            }
            }
            xhr2.send(JSON.stringify({"teamname":team_name}));
        } else{
          console.log("ENTER TEAM NAME")
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
      console.log('TRY AGAIN');
      return 0;
    } else if(xhr2.status==200){
      x=JSON.parse(xhr2.responseText)
      console.log(x.result)
      avail=x.result;
      console.log(typeof x)
      mynoNe=document.getElementsByClassName("appendable1")[0];
      while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
        }
      for (var i = 0; i <x.result.length; i++) {
           $(".appendable1").append(
             '<li class="collection-item" style="padding-left: 2px"><div><span style="max-width: 10px;">' + x.result[i].name + '</span><a onClick="sendInvite('+i+');return false;" class="secondary-content"><img class="send_icon" src="images/baseline-send-24px (1).svg" alt="Smiley face" align="right"></a></div></li>');
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
      console.log('TRY AGAIN');
    }else if(xhr.status==500){
      console.log('TRY AGAIN');
    }
    else if(xhr.status==200){
      x=JSON.parse(xhr.responseText)
      console.log(x);
      if(x.code=="TEAMJOINED"){
        console.log("TEAM JOINED CNT CHANGE")
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
                  '<li class="collection-item"><div>' + x.sent[i].name +'<a href="#!" class="secondary-content"><img class="send_icon" src="images/baseline-remove_circle_outline-24px.svg" alt="Smiley face" align="middle"></a></div></li>'
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
