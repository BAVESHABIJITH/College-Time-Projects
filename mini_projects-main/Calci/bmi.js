let btn=document.getElementById("btn");
btn.addEventListener('click',()=>{
    const height=parseInt(document.getElementById('height').value);
    const weight=parseInt(document.getElementById('weight').value);
    const res=document.getElementById('output');
    let height_status=false,weight_status=false;
    if(height===" "|| isNaN(height)|| (height<=0)){
        document.getElementById("height_error").innerHTML="Enter Valid Height";
    }
    else{
        document.getElementById("height_error").innerHTML="";
        height_status=true;
    }
    if(weight===" "|| isNaN(weight)|| (weight<=0)){
        document.getElementById("weight_error").innerHTML="Enter Valid Weight";
    }
    else{
        document.getElementById("weight_error").innerHTML="";
        weight_status=true;
    }
    if(height_status && weight_status){
        const bmi = (weight/((height*height)/10000)).toFixed(2);
        if(bmi<18.6){
            res.innerHTML="Under Weigth : "+ bmi;
        }
        else if(bmi>=18.6 && bmi<=24.9){
            res.innerHTML="Normal:"+bmi;
        }
        else{
            res.innerHTML="Over Weight:"+bmi;
        }
    }
    else{
        alert("Enter Valid Details");
    }
});