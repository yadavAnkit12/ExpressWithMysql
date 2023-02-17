

let parameterBox=document.getElementById("parameterBox")
parameterBox.style.display='none'



let addParamvalue=1

let paramsradio=document.getElementById("paramsradio")
paramsradio.addEventListener("click",()=>{
    document.getElementById("requestJsonBox").style.display='none'
    document.getElementById("parameterBox").style.display='block'
})

let jsonradio=document.getElementById("jsonradio")
jsonradio.addEventListener("click",()=>{
    document.getElementById("requestJsonBox").style.display='block'
    document.getElementById("parameterBox").style.display='none'

})

let addParam=document.getElementById("addParam")
addParam.addEventListener("click",()=>{
    addParamvalue=addParamvalue+1
    let div=document.createElement("div")
    div.innerHTML=`
    <br>
    <div class="form-row">
    <label for="url" class="col-sm-2 col-form-label">Parameter ${addParamvalue}</label>
    <div class="col-md-4">
      <input type="text" class="form-control" id="parameterkey${addParamvalue}" placeholder="Enter Parameter ${addParamvalue} Key">
    </div>
    <div class="col-md-4">
      <input type="text" class="form-control" id="parametervalue${addParamvalue}" placeholder="Enter Parameter ${addParamvalue} Value">
    </div>
    <button type="button" id="addParam" class="btn btn-primary delete">-</button>
  </div>
    `
    parameterBox.appendChild(div)

})

let submit=document.getElementById("submit")
submit.addEventListener("click",()=>{
    let method = document.querySelector("input[name='requestType']:checked").value
    let contentType = document.querySelector("input[name='contentType']:checked").value
    let urlField = document.getElementById("urlField").value
  
    // document.getElementById("responseJsonText").value = "Please Wait......"
    console.log("method",urlField)
    if(method=="GET"){
        fetch(urlField)
        .then(res=>res.json())
        .then(res=>{
          document.getElementById("responseJsonText").value=res
        })
    }
    else{
      if(contentType=='Custom Parameters'){
      let data={}
      for(let i=1;i<=addParamvalue;i++){
        let key=document.getElementById(`parameterkey${i}`).value
        let value=document.getElementById(`parametervalue${i}}`).value
        data[key]=value
      }
    }
    else{
      data=document.getElementById("responseJsonText").value
    }
      fetch(urlField,{
        method:method,
        headers:{
          'Content-Type':'application/json; charset=UTF=8'
        },
        body:JSON.stringify(data)
      }).then(res=>res.json())
      .then(res=>{
        document.getElementById("responseJsonText").value=JSON.stringify(res)

      })
               
    }


})