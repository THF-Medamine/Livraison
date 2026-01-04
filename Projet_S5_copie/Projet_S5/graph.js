 
let number= document.getElementById("number");
console.log(number.innerHTML);

 //DARK | LIGHT MODE 

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
} 
