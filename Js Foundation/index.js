// let person={
//     fname:'dhruv',
//     lname:'sahu',

//     get fullname(){
//         return(`${this.fname} ${this.lname}`);
//     },

//     set fullname(value){
//         if(typeof value!= String){
//             throw new Error("you dont pass an number");
//         }
//         let p=value.split(' ');
//         this.fname=p[0];
//         this.lname=p[1];
//     }

// }
// try{

//     person.fullname="rahul kumar";

// }
// catch (e){
//     alert(e);
// };
// console.log(person.fullname);

// let body = document.querySelector('body');
// let h1 = document.createElement('h1');
// h1.innerText ="hello kaise ho sare";
// body.insertAdjacentElement('afterbegin',h1);
// function print(){
//     console.log("hello dunia");
// }
// h1.addEventListener('click',print);
// h1.removeEventListener('click',print);

let select = document.querySelectorAll('a');
let selectthird = select[2];

console.log(selectthird);
selectthird.addEventListener = ('click', function(event){
    event.preventDefault();

    
    console.log('Maza Aa Gaya');
});
