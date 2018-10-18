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
    $(".ld_coll").html('');
    console.log(result);
    for (var i = 0; i<result.length; i++) {
        $(".ld_coll").append(
            `<li class="collection-item row" style="margin:0">
            <div class="col s2">${i+1}</div>
            <div class="col s7">${result[i].name}</div>
            <div class="col s3">${result[i].score}</div>
          </li>`);
    };
}
function showQues(result){
    $(".quesRn").html('');
    console.log("QUESTIONS")
    console.log(result);
                
    // result.sort(compare2);
    for (var i = 0; i<result.length; i++) {
        $(".quesRn").append(
            `<li>
            <div class="collapsible-header">
              <div class="col l12 s12 rnd1ques">Question: ${result[i].number}</div>
            <!--  <div class="col l1 s2 rnd1quesno">Q${i+1}</div> -->
            </div>
            <div class="collapsible-body rnd1body">
              <div class="row" style="margin:0;">
                <div class="col s12 l4">
                  <a class="col s10 l12 white z-depth-0 rndb btn-large offset-s1 waves-effect waves-light">
                    <span class="col pd0 s9 l10">Download</span>
                    <i class="material-icons pd0 col s3 l2">file_download</i>
                  </a>
                  <a class="col s3 l4 white z-depth-0 rndb offset-s1 waves-effect waves-light btn" href="https://rcpcapi.acmvit.in${result[i].executable.win}" download>EXE</a>
                  <a class="col s4 l4 white z-depth-0 rndb waves-effect waves-light btn" href="https://rcpcapi.acmvit.in${result[i].executable.linux}" download>LINUX</a>
                  <a class="col s3 l4 white z-depth-0 rndb waves-effect waves-light btn" href="https://rcpcapi.acmvit.in${result[i].executable.mac}" download>MAC</a>
                </div>
                <div class="col s12 l4 offset-l4">
                
                <a class="col s10 l12 white offset-l0 z-depth-0 rndb btn-large offset-s1 waves-effect waves-light tooltipped" data-tooltip="Upload answer"> 
                    <div id="submitans" onclick="viewModal(${result[i].number})" class="col pd0 s9 l10">Submit</div>
                    <i class="material-icons pd0 col s3 l2">file_upload</i>
                  </a>
                  <div class="col s10 l12 offset-l0 offset-s1" style="text-align: center; color: white; font-size: 15px;">Attempts: ${result[i].attemptCount}</div>
                </div>                
                </div>
            </div>
          </li>`);
    };
}

function viewModal(num){
    $('#quesno').html(num)
    window.modInstance= M.Modal.init($('#modal1')[0]);
    window.modInstance.open()
    $('#sendRes').show()
    $('#recRes').hide()
    $('#resSub').show()
}

function submitQues(){
    num=$('#quesno').html()
    lang=$('#qtyp').val()
    console.log(num,lang)
    file=$('#qfile')[0].files[0]
    fls=$('#qfile')[0].files[0].name.split('.')
    fls=fls[fls.length-1]
    if((lang=='cpp' || lang=='c') && !(fls=='cpp' || fls=='c')) return swal("Error","Invalid extention.","error");
    if((lang=='python2' || lang=='python3') && !(fls=='py')) return swal("Error","Invalid extention.","error");
    var formData = new FormData();
    if(!num || !lang || !file) return swal("Error","Fill all fields.","error");
    formData.append('que', num);
    formData.append('lang', lang);
    formData.append('file', file);
    $.ajax({
        url:'https://rcpcapi.acmvit.in/attempt/submit',
        type:'POST',
        data: formData,
        processData: false,
        contentType: false,
        headers: {
            "Authorization":'Bearer '+token
        },
        beforeSend:function(){
            $('#loading').show()
        }
    }).done(function(data){
        console.log(data)
        console.log(data.error)
        a=''
        if(data.testCases){
            data.testCases.forEach((elem,i) => {
                a+=`<div>Test Case ${i+1}: `
                if(elem){
                    a+=`<span style="color:green">Passed</span></div>`
                }
                else a+=`<span style="color:red">Failed</span></div>`
            });

            $('#rectest').html(a);
            $('#recPoints').html(data.score)

            $('#loading').hide()
            $('#sendRes').hide()
            $('#recRes').show()
            $('#resSub').hide()
        }
        else{
            $('#loading').hide()
            swal('Something is wrong with your code.', data.error||'Please verify your language and code', 'error')
        }
    }).catch(function(e){
        $('#loading').hide()
        swal("Error","Try again.","error");
    })
}

function submiQues(num){
    var uploadForm = document.createElement('form');
    uploadForm.enctype="multipart/form-data";
    // var fileInput = uploadForm.appendChild(document.createElement('input'));
    // var fileInput2 = uploadForm.appendChild(document.createElement('input'));
    // fileInput2.type="text";
    // fileInput2.name="que"
    // fileInput2.value=num;
    // fileInput.type = 'file';
    // fileInput.name = 'answer';
    // fileInput.click()
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
        
        xhr.setRequestHeader('Authorization','Bearer '+token);
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
