// let a ={
//     length:1,
//     width:2,
//     height:15
// };
// for(let key in a){
//     console.log(key,a[key]);
// }

let arr=[-1,-2,3,5,8,7];

let final = arr     
                .filter(val=>val>=0)
                .map((val)=>{
                return {value:val}
                });

console.log(final);
