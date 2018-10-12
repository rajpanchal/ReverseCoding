var token = null;

//REGEX
const regNoRegex=new RegExp('^1[0-9]{1}[A-Z]{3}[0-9]{4}$');
const phoneNoRegex=new RegExp('^[1-9]{1}[0-9]{9}$');

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


    if(name!="" && email_id!="" && regNoRegex.test(regno)==true && phoneNoRegex.test(phone_num) && password.length>8 && password==confpass){
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
                  if(xhr2.status==200){
                    console.log('DETAILS OF TEAM')
                  } else if(xhr2.status==400){
                    console.log('Enter all details');
                  } else if(xhr2.status==404){
                    console.log("TRY AGAIN");
                  } else if(xhr2.status==500){
                    console.log('TRY AGAIN');
                  } else if(xhr2.status==200){
                    if(xhr.responseText.code=="TEAMCREATED"){
                      console.log("TEAM CREATED ONLY YOU ARE MMBER")
                    } else if(xhr2.responseText.code=="NOTEAMS"){
                      console.log("NO TEAM PRESENT")
                    } else if(xhr2.status=="TEAMJOINED"){
                      console.log("YOU ARE IN A TEAM OF 2");
                      console.log(xhr2.responseText)
                    }
                  }
                }
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
      console.log('ENTER ALL DETAILS')
    }
  });

  $(".main_login").click(function(){
    var email_id = $("#email_si").val();
    var password = $("#password_si").val();
    var obj = { "email": email_id, "password": password};
    if(password!="" && email_id!=""){
        var xhr=new XMLHttpRequest();
        xhr.open('POST','https://shielded-plains-85651.herokuapp.com/login', false);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onreadystatechange = function(){
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
                  if(xhr2.status==200){
                    console.log('DETAILS OF TEAM')
                  } else if(xhr2.status==400){
                    console.log('Enter all details');
                  } else if(xhr2.status==404){
                    console.log("TRY AGAIN");
                  } else if(xhr2.status==500){
                    console.log('TRY AGAIN');
                  } else if(xhr2.status==200){
                    if(xhr.responseText.code=="TEAMCREATED"){
                      console.log("TEAM CREATED ONLY YOU ARE MMBER")
                    } else if(xhr2.responseText.code=="NOTEAMS"){
                      console.log("NO TEAM PRESENT")
                    } else if(xhr2.status=="TEAMJOINED"){
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

  $(".logout_btn").click(function(){
    $(".3_sections_raj_satyam").css("display","none");
    $(".sam_signup").css("display","none");
    $(".raj_login").css("display","block");
    token=null;
  });



    // // console.log(name, email_id, regno, password, confpass);

    
    //     // $.post("", obj,
    //     // function(data,status){
    //     //     alert("Data: " + data + "\nStatus: " + status);
    //     // });

    //     console.log(obj);
    //     // $.ajax({
    //     // 	type: 'POST',
    //     //   beforeSend: function(request) {
    //     //     request.setRequestHeader("Content-Type", "application/json");
    //     //   },
    //     // 	url: 'http://shielded-plains-85651.herokuapp.com/signup',
    //     // 	data: JSON.stringify(obj),
    //     // 	success: function(data){
    //     // 		if(data.status == "OK"){
    //     // 			console.log("Posted successfully!");
    //           $(".sam_signup").css("display","none");
    //           $(".raj_login").css("display","none");
    //           $(".3_sections_raj_satyam").css("display","block");
    //     // 		}
    //     // 		else if(data == "USEREXISTS"){
    //     // 			console.log("Entry already exists! Y in the world u gave details all over again :(");
    //     // 		}
    //     //     else {
    //     //       console.log("Error");
    //     //     }
    //     // 	}
    //     // });
 
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
    if(xhr.responseText.code=="TEAMCREATED"){
      console.log("TEAM CREATED ONLY YOU ARE MMBER")
    } else if(xhr2.responseText.code=="NOTEAMS"){
      console.log("NO TEAM PRESENT")
    } else if(xhr2.status=="TEAMJOINED"){
      console.log("YOU ARE IN A TEAM OF 2");
      console.log(xhr2.responseText)
    }
    }
    }
    xhr2.send();
  });


  $(".create_team").click(function(){
    var team_name = $(".team_name_new").val();
    console.log(team_name);
    if(team_name !=""){
      xhr2=new XMLHttpRequest();
    xhr2.open("POST",'https://shielded-plains-85651.herokuapp.com/addteam',false);
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
    if(xhr.responseText.code=="OK"){
      console.log("TEAM CREATED")
    } else if(xhr2.responseText.code=="INATEAMORTEAMCREATED"){
      console.log("IN A TEAM OR TEAM CREATED")
    } else if(xhr2.status=="TEAMNAMEEXIST"){
      console.log("TEAM NAME EXISTS")
    }
    }
    }
    } else{
      console.log("ENTER TEAM NAME")
    }
    xhr2.send(JSON.stringify({"teamname":team_name}));
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
  
  function getAvailable(){
    xhr2=new XMLHttpRequest();
    xhr2.open("POST",'https://shielded-plains-85651.herokuapp.com/getavail',true);
    xhr2.setRequestHeader('Content-type', 'application/json');
    xhr2.setRequestHeader('Authorization', token);
    xhr2.onreadystatechange = function(){
    if(xhr2.status==500){
      console.log(xhr2.result)
      console.log('TRY AGAIN');
    } else if(xhr2.status==200){
      console.log("FILL AVAILABLE")
    }
    }
    xhr2.send(); 
  }
  
  function getPending(){
    xhr2=new XMLHttpRequest();
    xhr2.open("POST",'https://shielded-plains-85651.herokuapp.com/getavail',true);
    xhr2.setRequestHeader('Content-type', 'application/json');
    xhr2.setRequestHeader('Authorization', token);
    xhr2.onreadystatechange = function(){
    if(xhr2.status==500){
      console.log('TRY AGAIN');
    }else if(xhr2.status==500){
      console.log('TRY AGAIN');
    }  
    else if(xhr2.status==200){
      if(xhr2.responseText.code=="TEAMJOINED"){
        console.log("TEAM JOINED CNT CHANGE")
      }
      else{
        console.log("FILL LIST")
        console.log(xhr2.responseText.pending)
        console.log(xhr2.responseText.invitesSent)
      }
    }
    }
    xhr2.send(); 
  }
  
  function sendinvite(email){
    xhr2=new XMLHttpRequest();
    xhr2.open("POST",'https://shielded-plains-85651.herokuapp.com/sendinvite',true);
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
      console.log(xhr2.responseText.invites)
    }
  }
    xhr2.send(JSON.stringify({
      sendtoemail:email
    })); 
  }

  function sendinvite(email){
    xhr2=new XMLHttpRequest();
    xhr2.open("POST",'https://shielded-plains-85651.herokuapp.com/sendinvite',true);
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
      console.log(xhr2.responseText.invites)
    }
  }
    xhr2.send(JSON.stringify({
      sendtoemail:email
    })); 
  }

  function acceptinvite(teamname){
    xhr2=new XMLHttpRequest();
    xhr2.open("POST",'https://shielded-plains-85651.herokuapp.com/sendinvite',true);
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
      if(xhr2.responseText.code=="TEAMJOINED"){
        console.log("TEAM JOINED ALREADY")
      } else if(xhr2.responseText.code=="OK"){
        console.log("ACCEPTED");
        //REDIRECT TO DASHBOARD AND CALL FOR TEAM AGAIN
      }
    }
  }
    xhr2.send(JSON.stringify({
      teamname:teamname
    })); 
  }

  function rejectinvite(teamname){
    xhr2=new XMLHttpRequest();
    xhr2.open("POST",'https://shielded-plains-85651.herokuapp.com/sendinvite',true);
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
      //remove form list
    }
  }
    xhr2.send(JSON.stringify({
      teamname:teamname
    }));
  } 
});
//   }
//   // $(".main_login").click(function(){
//   //   email_id = $("#email_si").val();
//   //   var password = $("#password_si").val();
//   //   $("#email_si").val("");
//   //   $("#password_si").val("");

//   //   var obj = { "email": email_id, "password": password};
//   //   console.log(obj);

//   //   // $.ajax({
//   //   //   type: 'POST',
//   //   //   beforeSend: function(request) {
//   //   //     request.setRequestHeader("Content-Type", "application/json");
//   //   //   },
//   //   //   url: 'http://shielded-plains-85651.herokuapp.com/login',
//   //   //   data: JSON.stringify(obj),
//   //   //   success: function(data){
//   //   //     if(data.status == "OK"){
//   //   //       console.log("Posted successfully!");
//   //         $(".raj_login").css("display","none");
//   //         $(".3_sections_raj_satyam").css("display","block");
//   //   //     }
//   //   //     else if(data == "Enter all details"){
//   //   //       console.log("Enter all details");
//   //   //     }
//   //   //     else{
//   //   //       console.log("Error");
//   //   //     }
//   //   //   },
//   //   //   error: function(data){
//   //   //     if(data.responseText == "REGISTER"){
//   //   //       console.log("Credentials Invalid or Incomplete Details");
//   //   //     }
//   //   //   },
//   //   //   complete: function(resp) {
//   //   //       token = resp.getResponseHeader("Authorization");
//   //   //   }
//   //   // });
//   // });


//   // $(".main_s11").css("display", "block");
//   // $(".dashboard_td").css("background-color", "#0D47A1");
//   // $(".dashboard_data").css("color","#FFFFFF");

//   // $(".dashboard").click(function(){


//   //   // $.ajax({
//   //   //   type: 'POST',
//   //   //   beforeSend: function(request) {
//   //   //     request.setRequestHeader("Content-Type", "application/json");
//   //   //     request.setRequestHeader("Authorization", token);
//   //   //   },
//   //   //   url: 'http://shielded-plains-85651.herokuapp.com/dashboard',
//   //   //   data: JSON.stringify({"email": email_id}),
//   //   //   success: function(data){
//   //   //     if(data.status == "TEAMCREATED"){
//   //   //       console.log("Posted successfully!");
//   //   //       console.log(data.teamname);
//   //   //       console.log(data.name);
//   //   //     }
//   //   //     else if(data.status == "NOTEAMS"){
//   //   //       console.log("U HAVE NO TEAM")
//   //   //     }
//   //   //     else if(data.status == "TEAMJOINED"){
//   //   //       console.log(data.team, data.creator, data.member);
//   //   //       creator_email = data.creator.email;
//   //   //     }
//   //   //     else if(data == "Enter all details"){
//   //   //       console.log("Enter all details");
//   //   //     }
//   //   //     else{
//   //   //       console.log("Error");
//   //   //     }
//   //   //   },
//   //   //   complete: function(resp) {
//   //   //       token = resp.getResponseHeader("Authorization");
//   //   //   }
//   //   // });

//   //   //REMOVAL
//   //   $(".create_team_td").css("background-color", "#FFFFFF");
//   //   $(".create_team_data").css("color","#0D47A1");
//   //   $(".invites_td").css("background-color", "#FFFFFF");
//   //   $(".invites_data").css("color","#0D47A1");

//   //   //ADDING
//   //     $(".dashboard_td").css("background-color", "#0D47A1");
//   //     $(".dashboard_data").css("color","#FFFFFF");

//   //     $(".invites1").css("display","none");
//   //     $(".main_s11").css("display", "block");
//   //     $(".main_s2").css("display", "none");

//   // });

//   $(".create_team").click(function(){
//     var team_name = $(".team_name_new").val();
//     console.log(team_name);
//     // $.ajax({
//     //   type: 'POST',
//     //   beforeSend: function(request) {
//     //     request.setRequestHeader("Content-Type", "application/json");
//     //     request.setRequestHeader("Authorization", token);
//     //   },
//     //   url: 'http://shielded-plains-85651.herokuapp.com/addteam',
//     //   data: JSON.stringify({"email": email_id, "teamname": team_name}),
//     //   success: function(data){
//     //     if(data.status == "TEAMNAMEEXIST"){
//     //       console.log("TeamName already Exists, plz choose a diff name");
//     //     }
//     //     else if(data.status == "OK"){
//     //       console.log("TEAM SUCCESFULLY CREATED");
//     //     }
//     //     else if(data.status == "INORTEAMCREATED"){
//     //       console.log("U are already in a team or U already created a team. Plz delete lastly created team.");
//     //     }
//     //     else{
//     //       console.log("Error");
//     //     }
//     //   },
//     //   complete: function(resp) {
//     //       token = resp.getResponseHeader("Authorization");
//     //   }
//     // });

//   //   //REMOVAL
//   //     $(".dashboard_td").css("background-color", "#FFFFFF");
//   //     $(".dashboard_data").css("color","#0D47A1");
//   //     $(".invites_td").css("background-color", "#FFFFFF");
//   //     $(".invites_data").css("color","#0D47A1");
//   //   //ADDING
//   //   $(".create_team_td").css("background-color", "#0D47A1");
//   //   $(".create_team_data").css("color","#FFFFFF");

//   //     $(".invites1").css("display","none");
//   //     $(".main_s11").css("display", "none");
//   //     $(".main_s2").css("display", "block");

//   // });

//   $(".invites").click(function(){
//     // $.ajax({
//     //   type: 'POST',
//     //   beforeSend: function(request) {
//     //     request.setRequestHeader("Content-Type", "application/json");
//     //     request.setRequestHeader("Authorization", token);
//     //   },
//     //   url: 'http://shielded-plains-85651.herokuapp.com/pending',
//     //   data: JSON.stringify({"email": email_id}),
//     //   success: function(data){
//     //     if(data.status == "TEAMJOINED"){
//     //       console.log("U are already in a team");
//     //     }
//     //     else if(data.status == "OK"){
//     //       console.log(data.pending, data.sent);
//     //       var i = (data.pending).length;
//     //
//     //     }
//     //     else if(data.status == "TEAMFILLEDORDELETED"){
//     //       console.log("Already maximum 2 members joined in he team");
//     //     }
//     //     else if(data.status == "OK"{
//     //       console.log("")
//     //     })
//     //     else{
//     //       console.log("Error");
//     //     }
//     //   },
//     //   complete: function(resp) {
//     //       token = resp.getResponseHeader("Authorization");
//     //   }
//     // });

//     // $.ajax({
//     //   type: 'POST',
//     //   beforeSend: function(request) {
//     //     request.setRequestHeader("Content-Type", "application/json");
//     //     request.setRequestHeader("Authorization", token);
//     //   },
//     //   url: 'http://shielded-plains-85651.herokuapp.com/pending',
//     //   data: JSON.stringify({"creatorname": creator_email}),
//     //   success: function(data){
//     //     if(data.status == "TEAMJOINED"){
//     //       console.log("U are already in a team");
//     //     }
//     //     else if(data.status == "OK"){
//     //       console.log(data.pending, data.sent);
//     //     }
//     //     else{
//     //       console.log("Error");
//     //     }
//     //   },
//     //   complete: function(resp) {
//     //       token = resp.getResponseHeader("Authorization");
//     //   }
//     // });

//     //REMOVAL
//     $(".dashboard_td").css("background-color", "#FFFFFF");
//     $(".dashboard_data").css("color","#0D47A1");
//     $(".create_team_td").css("background-color", "#FFFFFF");
//     $(".create_team_data").css("color","#0D47A1");

//     //ADDING
//     $(".invites_td").css("background-color", "#0D47A1");
//     $(".invites_data").css("color","#FFFFFF");

//   $(".main_s11").css("display", "none");
//   $(".main_s2").css("display", "none");
//   $(".invites1").css("display","block");
//   }
// })
