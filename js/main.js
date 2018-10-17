function compare(a,b){
    const oba=a.score;
    const obb=b.score;
    let comp=0;
    if(oba>obb){
        comp=1;
    } else{
        comp=-1;
    }
    return comp;
}
function compare2(a,b){
    const oba=a.number;
    const obb=b.number;
    let comp=0;
    if(oba>obb){
        comp=1;
    } else{
        comp=-1;
    }
    return comp;
}
function showTeams(result){
    $(".collection").html('');
    console.log(result);
    result.sort(compare);
    for (var i = 0; i<result.length; i++) {
        $(".collection").append(
            `<li class="collection-item row">
            <div class="col s2">${i}</div>
            <div class="col s8">${result[i].team}</div>
            <div class="col s2">${result[i].score}</div>
          </li>`);
    };
}
function showQues(result){
    $(".collapsible").html('');
    console.log("QUESTIONS")
    console.log(result);
                
    result.sort(compare2);
    for (var i = 0; i<result.length; i++) {
        $(".collapsible").append(
            `<li>
            <div class="collapsible-header">
              <div class="col l11 s10 rnd1ques">${result[i].quesname}</div>
              <div class="col l1 s2 rnd1quesno">Q${i+1}</div>link
            </div>
            <div class="collapsible-body rnd1body">
              <div class="row" style="margin:0;">
                <div class="col s12 l4">
                  <a class="col s9 l12 white z-depth-0 rndb btn-large offset-s2 waves-effect waves-light">
                    <span class="col pd0 s9 l12">Download</span>
                    <i class="material-icons pd0 col s3 l2">file_download</i>
                  </a>
                  <a class="col s3 l4 white z-depth-0 rndb offset-s2 waves-effect waves-light btn" href="${result[i].executable.win}" download>EXE</a>
                  <a class="col s3 l4 white z-depth-0 rndb waves-effect waves-light btn" href="${result[i].executable.lin}" download>LIN</a>
                  <a class="col s3 l4 white z-depth-0 rndb waves-effect waves-light btn" href="${result[i].executable.mac}" download>MAC</a>
                </div>
                <div class="col s12 l4 offset-l4">
                
                <a class="col s8 l10 white offset-l2 z-depth-0 rndb btn-large offset-s2 waves-effect waves-light tooltipped" data-tooltip="Upload answer"> 
                    <div id="submitans" onclick="submitQues(${result[i].number})" class="col pd0 s8 l10">Submit</div>
                    <i class="material-icons pd0 col s3 l2">file_upload</i>
                  </a>
                </div>                
                </div>
            </div>
          </li>`);
    };
}
function submitQues(num){
    var uploadForm = document.createElement('form');
    uploadForm.enctype="multipart/form-data";
    var fileInput = uploadForm.appendChild(document.createElement('input'));
    var fileInput2 = uploadForm.appendChild(document.createElement('input'));
    fileInput2.type="text";
    fileInput2.name="que"
    fileInput2.value=num;
    fileInput.type = 'file';
    fileInput.name = 'answer';
    fileInput.click()
    $('.modal').modal();
    $('.modal').modal('open');
    $('.submit').click(function(){
        var lang=$('#sel').val();
        var fileInput3 = uploadForm.appendChild(document.createElement('input'));
        fileInput3.type="text";
        fileInput3.name="lang";
        fileInput3.value=lang;
        var xhr=new XMLHttpRequest();
        
        xhr.open("POST","https://rcpcapi.acmvit.in/attempt/submit",true);
        
        xhr.setRequestHeader('Authorization',token);
        var formData = new FormData(uploadForm);
        xhr.onreadystatechange=function(){
            if(this.readyState==4 && this.status==200){
                $('.modal').modal();
                $('.modal').modal('open');            
                $('.modal-content').html("Your response has been submitted");
                $('.modal-footer').html("SUBMITTED &#10004;");
            } 
            else if(this.readyState==4 && this.status==500){
                $('.modal').modal();
                $('.modal').modal('open');          
                $('.modal-content').html("Please try again later");
                $('.modal-footer').html("ERROR");  
            }
            else if(this.readyState==4 && this.status==406){
                $('.modal').modal();
                $('.modal').modal('open');            
                $('.modal-content').html("No question number");
                $('.modal-footer').html("ERROR");
            }
            else if(this.readyState==4 && this.status==404){
                $('.modal').modal();
                $('.modal').modal('open');            
                $('.modal-content').html("Invalid question");
                $('.modal-footer').html("ERROR");
                
            }
        }
        xhr.send(formData);
    })
        
    }
