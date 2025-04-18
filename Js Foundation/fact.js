let number =6;
let a = (num)=>{
    let arr = Array.from(Array(number).keys());
    let c = arr.slice(1).reduce((a,b)=>{
        return a*b;
    },2)
    console.log(c);
}
a(5);