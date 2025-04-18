//  factory function 
// costructor to generrate the obj
function Rectangle(len,wid){
    
    return obj1 ={
        length:len,
        width:wid,
        
        draw (){
        console.log("drawing rectangle");
        }
    }
}
let obje = Rectangle(5,4);
obje.color="yellow";
console.log(obje);
delete obje.color;
console.log(obje);

// constructo 
 
function constr (len,width){
    this.length=len;
    this.width=width;
    this.draw = function(){
        console.log("with the helo of constructor");
    }
}
let a = new constr(8,9);
console.log(a.length);
a.draw();
console.log(typeof a);