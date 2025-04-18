const slider=document.querySelector(".slider");
const number = document.querySelector(".number");
let password="";
let passwordlength =10;
setpasswordlen();

function  setpasswordlen(){
    slider.value=passwordlength;
    number.innerHTML =passwordlength;
    const min =slider.min;
    const max = slider.max;
    slider.style.backgroundSize =((passwordlength-min)*100/(max-min))+"% 100%"
    
    

}
let indicator =document.querySelector(".indicator");
setcolor("#ccc");

function setcolor(color){
    indicator.style.backgroundColor=color;
    //shadow homework  
    indicator.style.boxShadow=`0px 0px 12px 1px ${color}`

}

function genrandint(min, max){
    return Math.floor(Math.random()*(max-min)) +min;

}

function getRandomNumber(){
    return genrandint(0,9);
}

function getLowerCase(){
    return String.fromCharCode(genrandint(97,126));
}

function getUpperCase(){
    return String.fromCharCode(genrandint(65,91));
}
const symbol ='~`!@#$%^&*()_={[}|:;"<,>.?/';
function getsymbol(){
    return symbol.charAt(genrandint(0,symbol.length));
}

let include1 = document.querySelector("#include1");
let include2 = document.querySelector("#include2");
let include3 = document.querySelector("#include3");
let include4 = document.querySelector("#include4");
function calcstrength(){
    let hasuppercase = false;
    let haslowercase =false;
    let hasnum =false;
    let hassym = false;
    if(include1.checked) hasuppercase =true;
    if(include2.checked) haslowercase=true;
    if(include3.checked) hasnum =true;
    if(include4.checked) hassym =true;

    if(haslowercase && haslowercase && (hasnum||hassym) && passwordlength>=8 ){
        setcolor("#0f0");
    }
    else if((haslowercase||hasuppercase) && (hasnum || hassym) && passwordlength>=6){
        setcolor("#0ff0");
    }
    else{
        setcolor("#f00");
    }
}

let copyimg = document.querySelector(".copyimg");
let passwordinput = document.querySelector(".passwordinput");
let copymsg =document.querySelector(".datacopymsg");
async function copycontent(){
    try{
        await navigator.clipboard.writeText(passwordinput.value);
        copymsg.innerText ="copied";

    }
    catch (e){
        copymsg.innerText="failed";

    }

    copymsg.classList.add("active");

  setTimeout(() => {
    copymsg.classList.remove("active");
    
  }, 2000);
     
}


let generatebtn = document.querySelector(".generatepass");

slider.addEventListener('input',(e)=>{
    passwordlength =e.target.value;
    setpasswordlen();

})

let displaytext =document.querySelector(".displaytext");

displaytext.addEventListener('click',()=>{
    if(passwordinput.value){
        copycontent();

    }

})
let checkboxcount=0;
let allcheckbox = document.querySelectorAll("input[type=checkbox]");



function handlecheckboxchange(){
    checkboxcount=0;
    allcheckbox.forEach((checkbox)=>{
        if(checkbox.checked)
            checkboxcount++;
    });

    if(passwordlength<checkboxcount){
        passwordlength =checkboxcount;
        setpasswordlen();
    }
}



allcheckbox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handlecheckboxchange);
})


function shuffle(array){
    // fisher yates method
    for(let i=array.length-1; i>0; i--){
        const j = Math.floor(Math.random()*(i+1));

        const temp = array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let str="";
    array.forEach((el)=>
        (str+=el)
    );
    return str;

}


generatebtn.addEventListener('click',()=>{
    // None of the checkbox are selected
    if(checkboxcount<=0) 
        return;

    if(passwordlength<checkboxcount){
        passwordlength =checkboxcount;
        setpasswordlen();
    }

    password ="";

    // if(include1.checked){
    //     password+=getUpperCase();

    // }

    // if(include2.checked){
    //     password+=getLowerCase();

    // }

    // if(include3.checked){
    //     password+=getRandomNumber()
    // }
    // if(include4.checked){
    //     password+= getsymbol();
    // }

    let fun= [];
    if(include1.checked){
        fun.push(getUpperCase);

    }

    if(include2.checked){
        fun.push(getLowerCase);
    }
    if(include3.checked){
        fun.push(getRandomNumber);
    }
    if(include4.checked){
        fun.push(getsymbol);
    }

    for(let i =0; i<fun.length; i++){
        password+=fun[i]();

    }

    for(let i=0; i<passwordlength-fun.length; i++){
       let randomidx = genrandint(0, fun.length);

       password+=fun[randomidx]();
    }


    // shuffle the password
    password =shuffle(Array.from(password));
    passwordinput.value =password;
    calcstrength()

})

