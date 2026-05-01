
let btn=document.getElementById("btn");
btn.addEventListener('click',()=>{
    let ip=document.getElementById("ip").value;
    let res=document.getElementById("output");
    let rate=document.getElementById("rate").value;
    let gstAmount=(ip*rate)/100;
    if(rate==="5"){
        let amt=parseInt(gstAmount)+parseInt(ip);
        res.innerText="Net Amount="+amt;
    }
    else if(rate==="12"){
        let amt=parseInt(gstAmount)+parseInt(ip);
        res.innerText="Net Amount="+amt;
    }
    else if(rate==="18"){
        let amt=parseInt(gstAmount)+parseInt(ip);
        res.innerText="Net Amount="+amt;
    }
    else if(rate==="28"){
        let amt=parseInt(gstAmount)+parseInt(ip);
        res.innerText="Net Amount="+amt;
    }
});
