const selectTag=document.querySelectorAll("select");
translateBtn=document.querySelectorAll("button");

selectTag.forEach((tag,id)=>{
    for (const countrie_code in countries) {
        let selected;
        if(id==0 && countrie_code=="en-GB"){
            selected="selected";
        }else if(id==1 && countrie_code=="hi-IN"){
            selected="selected";
        }
        let option=`<Option value="${countrie_code}">${countries[countrie_code]}</Option>`;
        tag.insertAdjacentHTML("beforeend",option);
    }
});

function translateText(){
    let inputText=document.getElementById("inputText").value;
    console.log(inputText);
    let dropdownId1=document.getElementById("dropDown1").value;
    let dropdownId2=document.getElementById("dropDown2").value;
    abc(inputText,dropdownId1,dropdownId2);   
}

function abc(inputText,dropdownId1,dropdownId2){
    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

let set=document.getElementById("setText");

const raw = JSON.stringify({
  "contents": [
    {
      "parts": [
        {
          "text": `${inputText}`
        }
      ]
    }
  ]
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};
let url=`https://api.mymemory.translated.net/get?q=${inputText}&langpair=${dropdownId1}|${dropdownId2}`;
fetch(url)
  .then((response) => response.json())
  .then((result) => {
    console.log(result);
    
    let res=result.responseData.translatedText
    set.innerHTML=res
  console.log(res);
  
  })
  .catch((error) => {
    console.error("Error:", error);
    document.getElementById("translateText").innerHTML = "Translation failed.";
});
}
