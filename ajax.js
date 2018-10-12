var token = null;

$(document).ready(function(){
  $(".login_sam_btn").click(function(){
    $(".sam_signup").css("display","none");
    $(".raj_login").css("display","block");
  });

  $(".signup_btn_1").click(function(){

    var name = $("#name_su").val();
    var email_id = $("#emailid_su").val();
    var regno = $("#regno_su").val();
    var phone_num = $("#phone_no_su").val();
    var password = $("#password_su").val();
    var confpass = $("#confpassword_su").val();

    // console.log(name, email_id, regno, password, confpass);

    var obj = { "name": name, "email": email_id, "regno": regno, "phone": phone_num, "password": password, "confpass": confpass};
        // $.post("", obj,
        // function(data,status){
        //     alert("Data: " + data + "\nStatus: " + status);
        // });

        console.log(obj);
        // $.ajax({
        // 	type: 'POST',
        //   beforeSend: function(request) {
        //     request.setRequestHeader("Content-Type", "application/json");
        //   },
        // 	url: 'http://shielded-plains-85651.herokuapp.com/signup',
        // 	data: JSON.stringify(obj),
        // 	success: function(data){
        // 		if(data.status == "OK"){
        // 			console.log("Posted successfully!");
              $(".sam_signup").css("display","none");
              $(".raj_login").css("display","none");
              $(".3_sections_raj_satyam").css("display","block");
        // 		}
        // 		else if(data == "USEREXISTS"){
        // 			console.log("Entry already exists! Y in the world u gave details all over again :(");
        // 		}
        //     else {
        //       console.log("Error");
        //     }
        // 	}
        // });
  });

  $(".logout_btn").click(function(){
    $(".3_sections_raj_satyam").css("display","none");
    $(".sam_signup").css("display","none");
    $(".raj_login").css("display","block");
  });

  $(".main_login").click(function(){
    email_id = $("#email_si").val();
    var password = $("#password_si").val();
    $("#email_si").val("");
    $("#password_si").val("");

    var obj = { "email": email_id, "password": password};
    console.log(obj);

    // $.ajax({
    //   type: 'POST',
    //   beforeSend: function(request) {
    //     request.setRequestHeader("Content-Type", "application/json");
    //   },
    //   url: 'http://shielded-plains-85651.herokuapp.com/login',
    //   data: JSON.stringify(obj),
    //   success: function(data){
    //     if(data.status == "OK"){
    //       console.log("Posted successfully!");
          $(".raj_login").css("display","none");
          $(".3_sections_raj_satyam").css("display","block");
    //     }
    //     else if(data == "Enter all details"){
    //       console.log("Enter all details");
    //     }
    //     else{
    //       console.log("Error");
    //     }
    //   },
    //   error: function(data){
    //     if(data.responseText == "REGISTER"){
    //       console.log("Credentials Invalid or Incomplete Details");
    //     }
    //   },
    //   complete: function(resp) {
    //       token = resp.getResponseHeader("Authorization");
    //   }
    // });
  });


  $(".main_s11").css("display", "block");
  $(".dashboard_td").css("background-color", "#0D47A1");
  $(".dashboard_data").css("color","#FFFFFF");

  $(".dashboard").click(function(){


    // $.ajax({
    //   type: 'POST',
    //   beforeSend: function(request) {
    //     request.setRequestHeader("Content-Type", "application/json");
    //     request.setRequestHeader("Authorization", token);
    //   },
    //   url: 'http://shielded-plains-85651.herokuapp.com/dashboard',
    //   data: JSON.stringify({"email": email_id}),
    //   success: function(data){
    //     if(data.status == "TEAMCREATED"){
    //       console.log("Posted successfully!");
    //       console.log(data.teamname);
    //       console.log(data.name);
    //     }
    //     else if(data.status == "NOTEAMS"){
    //       console.log("U HAVE NO TEAM")
    //     }
    //     else if(data.status == "TEAMJOINED"){
    //       console.log(data.team, data.creator, data.member);
    //       creator_email = data.creator.email;
    //     }
    //     else if(data == "Enter all details"){
    //       console.log("Enter all details");
    //     }
    //     else{
    //       console.log("Error");
    //     }
    //   },
    //   complete: function(resp) {
    //       token = resp.getResponseHeader("Authorization");
    //   }
    // });

    //REMOVAL
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

  });

  $(".create_team").click(function(){
    var team_name = $(".team_name_new").val();
    console.log(team_name);
    // $.ajax({
    //   type: 'POST',
    //   beforeSend: function(request) {
    //     request.setRequestHeader("Content-Type", "application/json");
    //     request.setRequestHeader("Authorization", token);
    //   },
    //   url: 'http://shielded-plains-85651.herokuapp.com/addteam',
    //   data: JSON.stringify({"email": email_id, "teamname": team_name}),
    //   success: function(data){
    //     if(data.status == "TEAMNAMEEXIST"){
    //       console.log("TeamName already Exists, plz choose a diff name");
    //     }
    //     else if(data.status == "OK"){
    //       console.log("TEAM SUCCESFULLY CREATED");
    //     }
    //     else if(data.status == "INORTEAMCREATED"){
    //       console.log("U are already in a team or U already created a team. Plz delete lastly created team.");
    //     }
    //     else{
    //       console.log("Error");
    //     }
    //   },
    //   complete: function(resp) {
    //       token = resp.getResponseHeader("Authorization");
    //   }
    // });

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

  $(".invites").click(function(){
    // $.ajax({
    //   type: 'POST',
    //   beforeSend: function(request) {
    //     request.setRequestHeader("Content-Type", "application/json");
    //     request.setRequestHeader("Authorization", token);
    //   },
    //   url: 'http://shielded-plains-85651.herokuapp.com/pending',
    //   data: JSON.stringify({"email": email_id}),
    //   success: function(data){
    //     if(data.status == "TEAMJOINED"){
    //       console.log("U are already in a team");
    //     }
    //     else if(data.status == "OK"){
    //       console.log(data.pending, data.sent);
    //       var i = (data.pending).length;
    //
    //     }
    //     else if(data.status == "TEAMFILLEDORDELETED"){
    //       console.log("Already maximum 2 members joined in he team");
    //     }
    //     else if(data.status == "OK"{
    //       console.log("")
    //     })
    //     else{
    //       console.log("Error");
    //     }
    //   },
    //   complete: function(resp) {
    //       token = resp.getResponseHeader("Authorization");
    //   }
    // });

    // $.ajax({
    //   type: 'POST',
    //   beforeSend: function(request) {
    //     request.setRequestHeader("Content-Type", "application/json");
    //     request.setRequestHeader("Authorization", token);
    //   },
    //   url: 'http://shielded-plains-85651.herokuapp.com/pending',
    //   data: JSON.stringify({"creatorname": creator_email}),
    //   success: function(data){
    //     if(data.status == "TEAMJOINED"){
    //       console.log("U are already in a team");
    //     }
    //     else if(data.status == "OK"){
    //       console.log(data.pending, data.sent);
    //     }
    //     else{
    //       console.log("Error");
    //     }
    //   },
    //   complete: function(resp) {
    //       token = resp.getResponseHeader("Authorization");
    //   }
    // });

    //REMOVAL
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
  })
});
