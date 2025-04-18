const displaywhowon = document.querySelector(".display-who-play");

const allbox = document.querySelectorAll(".box");
const Reset = document.querySelector(".Reset");


let currentplayer;

let allboxes;



let winningposition =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


function initgame(){
    currentplayer ="X";
    allboxes =["","","","","","","","",""];
    //ui per empty nahi kerna padegait
    allbox.forEach((box,index)=>{
        box.innerText="";
        allbox[index].style.pointerEvents="all";
        // box.classList =`box, box${index+1}`;

        box.classList.remove("win"); 
     });
    // one more thing to do

    Reset.classList.remove("active");
    console.log('a');
    displaywhowon.innerHTML = `Current Player -${currentplayer}`;


}
initgame();

function checkGameOver(){
    let answer=""
    winningposition.forEach((position)=>{
        // all 3 boxes should be non empty and have same value


        if(allboxes[position[0]]!="" && allboxes[position[1]]!="" && allboxes[position[2]]!="" &&(allboxes[ position[0]]===allboxes[position[1]]) && (allboxes[ position[0]]===allboxes[position[2]]) ){

            if(allboxes[position[0]]=="X"){
                answer="X";
            }
            else{
                answer="0";
            }

            allbox.forEach((box)=>{
                box.style.pointerEvents="none";
            });
            allbox[position[0]].classList.add("win");
            allbox[position[1]].classList.add("win");
            allbox[position[2]].classList.add("win");
        }





    });

    if(answer!=""){
        displaywhowon.innerText=`Winner Player -${answer}`;
        Reset.classList.add("active");
        return;
    }

    // lets check wheather there is a tie

    let fillcount =0;

   try{
    allboxes.forEach((box)=>{
        if(box!==""){
            fillcount++;

        }
    })
   }
   catch (err){
    console.log(err);
   }
    console.log(fillcount)
    // board is filled there is a tie
    if(fillcount===9){
        displaywhowon.innerText ="Game Tied !";
        Reset.classList.add("active");
    }


     
    

}
function swapTurn(){
    if(currentplayer==="X"){
        currentplayer="0";
    }
    else{
        currentplayer="X";
    }
    displaywhowon.innerText=`Current Player -${currentplayer}`;
}

function handleclick(index){
    if(allboxes[index]===""){
        allbox[index].innerText =currentplayer;
        allboxes[index]=currentplayer;
        allbox[index].style.pointerEvents ="none";
        // swap kero Turn;
        swapTurn();
        
        // check kero ki jeet gaye ya nahi
        checkGameOver();
    }
}

allbox.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleclick(index);
    })

});

Reset.addEventListener("click",initgame);

