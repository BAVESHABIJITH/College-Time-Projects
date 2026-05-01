let userInput=document.getElementById("date");
userInput.max=new Date().toISOString().split("T")[0];
let res=document.getElementById('res');
function calcAge(){
    let DOB=new Date(userInput.value);
    let d1=DOB.getDate();
    let m1=DOB.getMonth()+1;
    let y1=DOB.getFullYear();
    let today=new Date();
    let d2=today.getDate();
    let m2=today.getMonth()+1;
    let y2=today.getFullYear();
    let d3,y3,m3;
    y3=y2-y1;
    if(m2>=m1){
        m3=m2-m1;
    }
    else{
        y3--;
        m3=12+m2-m1;
    }
    if(d2>=d1){
        d3=d2-d1;
    }
    else{
        m3--;
        d3=getDaysInMonth(y1,m1)+d2-d1;
    }
    if(m3<0){
        m3=11;
        y3--;
    }
    res.innerHTML=`You are ${y3} Years , ${m3} Month and ${d3} Days Old`;
}
function getDaysInMonth(year,month){
    return new Date(year,month,0).getDate();
}