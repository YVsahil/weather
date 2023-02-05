const temperature=document.querySelector(".weather1");
const cityfilled=document.querySelector(".weather2 p");
const datefilled=document.querySelector(".weather2 span");
const emojifilled=document.querySelector(".weather3 img");
const weatherfilled=document.querySelector(".weather3 span");
const searchfilled=document.querySelector(".searchfield");
const form=document.querySelector("form");
let target="kathmandu";
const fetchdata=async()=>{
  try {
    const URL=`https://api.weatherapi.com/v1/current.json?key=8dfd8aec0e82455894292115233001&q=${target}`;
    const res=await fetch(URL);
    const data=await res.json();
    console.log(data);
    //destructuring
    const{current:{temp_c,
    condition:{text,icon},
    },
    location:{name,localtime},
    }=data;
    updatedom(temp_c,name,localtime,text,icon);
  } catch (error) {
    alert("location not found");
    console.log(error);
  }
};

function updatedom(temp_c,name,localtime,text,icon){
    const exacttime=localtime.split(" ")[1]
    const exactdate=localtime.split(" ")[0]
    const exactday=getbyday(new Date(exactdate).getDay());
    temperature.innerText=temp_c;
    cityfilled.innerText=name;
    datefilled.innerText=`${exacttime} - ${exactday} ${exactdate}`;
    emojifilled.src=icon;
    weatherfilled.innerHTML=text;
}
fetchdata(target);

function getbyday(num){
    switch(num){
        case 0:
            return "sunday";
        case 1:
            return "Monday";
        case 2:
            return "tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            return "ON moon";
    }
}
const search=(e)=>{
    e.preventDefault();
    target=searchfilled.value;
    console.log(target);
    fetchdata(target);
}
form.addEventListener("submit",search);



