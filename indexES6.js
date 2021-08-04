console.log("This is project 2 section in website console with class");

class Library{
    constructor(name,author,type){
        this.name=name;
        this.author=author;
        this.type=type;
}
}

class Display{
    
    add(){
        console.log("adding to UI");
        let tableBody1=document.getElementById('tableBody');

          let detail=localStorage.getItem('detail');
          let  detailObj
          if(detail==null){
              detailObj=[];
          }
          else{
              detailObj=JSON.parse(detail);
          }
          let html ="";
          
         detailObj.forEach(function(element,index){
             console.log(element);
           html += `<tr>
                                <th scope="row">${index+1}</th>
                                <td>${element.name}</td>
                                <td>${element.author}</td>
                                <td>${element.type}</td>
                                <td><button id="${index}" class="btn btn-primary" onclick="deleteDetail(this.id)">Delete</button></td>
                                
            
                            </tr>`;
             
          });
        
        if(detailObj.length!=0){

            tableBody1.innerHTML =html;
        }
        else{
            tableBody1.innerHTML=`No book were alloted still: so  issue your book for study!!`;
        }
    }

    clear(){
      let FormSubmit=document.getElementById('FormSubmit');
      FormSubmit.reset();
    }
    validation(book){
      if(book.name.length < 2 || book.author.length <2){
          return false;
      }
      else{
          return true;
      }

    }
    show(type,displayMessage){
      let showMessage=document.getElementById('message');
        let textBold;
        if(type=='success'){
            textBold='success:';
        }
        else{
            textBold='Error:';
        }
        showMessage.innerHTML=`<div class="alert alert-${type} alert-dismissible fade show" role="alert">
        <strong>${textBold}</strong> ${displayMessage}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
      setTimeout(function () {
        message.innerHTML=''
      },5000)
      
    }

}
// We have to declear display object globally because we use the add() function of Display class  here: so that after refressing webpage add()function show all detail stored in local stoage
let display=new Display();
display.add();

// delete Book allotted Detail from the localstorage by programm 

function deleteDetail(index){
    let detail=localStorage.getItem('detail');
    let  detailObj
    if(detail==null){
        detailObj=[];
    }
    else{
        detailObj=JSON.parse(detail);
    }
 let l=detailObj.splice(index,1);
 console.log(l);
 localStorage.setItem('detail',JSON.stringify(detailObj));
display.add();

}


// listening the event when somebody just click on add book button in form section:
let FormSubmit=document.getElementById('FormSubmit');
FormSubmit.addEventListener('submit',listenFormEvent);

function listenFormEvent(e){
    console.log("This is form submit");
    let name=document.getElementById('bookName').value;
    console.log(name);
    let author=document.getElementById('author').value;
    let type;
    let fiction=document.getElementById('fiction');
    let programming=document.getElementById('programming');
    let cooking=document.getElementById('cooking');
  
    if(fiction.checked){
        type=fiction.value;
    }
    else if(programming.checked){
        type=programming.value;
    }
    else if(cooking.checked){
        type=cooking.value;
    }
   // making the object of Library class
    book=new Library(name,author,type);

    console.log(book);
    let detail=localStorage.getItem('detail');
    if(detail==null){
        detailObj=[];
    }
    else{
        detailObj=JSON.parse(detail);
    }
   
    detailObj.push(book);
    localStorage.setItem('detail',JSON.stringify(detailObj));


    // console.log(display.validation(book))
    // let display=new Display();
     if(display.validation(book)){
         display.add();

       
         display.clear();
         display.show('success','You have successfully allotted book!!')
     }
     else{
         display.show('danger',' atleast 2 character needed in each content !!');
     }
    e.preventDefault();
}

