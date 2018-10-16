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
function showTeams(result){
    $(".collection").html('');
    result.sort(compare);
    console.log(result);
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
    console.log(result);
    for (var i = 0; i<result.length; i++) {
        $(".collapsible").append(
            `<li>
            <div class="collapsible-header">
              <div class="col l11 s10 rnd1ques">${result[i].quesname}</div>
              <div class="col l1 s2 rnd1quesno">Q${i+1}</div>
            </div>
            <div class="collapsible-body rnd1body">
              <div class="row" style="margin:0;">
                <div class="col s12 l4">
                  <a class="col s8 l10 white z-depth-0 rndb btn-large offset-s2 waves-effect waves-light">
                    <span class="col pd0 s8 l10">Download</span>
                    <i class="material-icons pd0 col s3 l2">file_download</i>
                  </a>
                  <a class="col s4 l5 white z-depth-0 rndb offset-s2 waves-effect waves-light btn" href="${result[i].link}" download>EXE</a>
                  <a class="col s4 l5 white z-depth-0 rndb waves-effect waves-light btn" href="${result[i].link}" download>JAR</a>
                </div>
                <div class="col s12 l4 offset-l4">
                
                <a class="col s8 l10 white offset-l2 z-depth-0 rndb btn-large offset-s2 waves-effect waves-light tooltipped" data-tooltip="Upload answer"> 
                    <div id="submitans" onclick="submitQues(${i+1})" class="col pd0 s8 l10">Submit</div>
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
    fileInput2.type=text;
    fileInput2.name="questionnumber"
    fileInput2.value=num-1;
    fileInput.type = 'file';
    fileInput.name = 'answer';
    fileInput.click()
    fileInput.onloadend=function(){
        var xhr=new XMLHttpRequest();
        xhr.open("POST",URL,true);
        var formData = new FormData(uploadForm);
        xhr.onreadystatechange=function(){
            if(xhr.responseText=="OK"){

            } else{
                
            }
        }
        xhr.send(formData);
    }
}
