let addToy = false;
const  collection = document.getElementById("toy-collection")
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  fetchToys()
});

function fetchToys(){
  fetch(`http://localhost:3000/toys`)
  .then(resp=>resp.json())
  .then(data=>{
    for(i=0;i<data.length;i++){
    // const  collection = document.getElementById("toy-collection")
    // collection.innerHTML = ' '
    let container = document.createElement("div")
    container.classList.add("card")
    let name = document.createElement("h2")
    let img = document.createElement("img")
    img.classList.add("toy-avatar")
    let likes = document.createElement("p")
    let likebtn = document.createElement("button")
    likebtn.classList.add("like-btn")
    likebtn.id = data[i].id
    //like event
    likebtn.addEventListener("click",()=>{
      console.log(likes.textContent.charAt(0))
      let currentlikes = Number(likes.textContent.charAt(0)) + 1
      fetch(`http://localhost:3000/toys/${likebtn.id}`,{
        method:"PATCH",
        headers:
    {
      "Content-Type": "application/json",
      'Accept': "application/json"
    },
    
    body: JSON.stringify({
      likes: currentlikes 

    })})
    .then(() => {
      collection.innerHTML = ''; 
      fetchToys(); 
    });})



    likebtn.textContent = `Like ❤️`
    name.textContent = data[i].name
    img.src = data[i].image
    likes.textContent = `${data[i].likes} likes`
    collection.appendChild(container)
      container.appendChild(name)
      container.appendChild(likes)
      container.appendChild(img)
      container.appendChild(likebtn)
  }
  })
 
}

let postForm = document.querySelector("form")
postForm.addEventListener("submit",(e)=>{
  e.preventDefault()
  
  fetch(`http://localhost:3000/toys`,{
    method:"POST",
    headers:
{
  "Content-Type": "application/json",
  'Accept': "application/json"
},

body: JSON.stringify({
 name:e.target.name.value,
 image:e.target.image.value,
 likes: 0,
})
  })
  //.then(response => response.json())
  .then(() => {
    collection.innerHTML = ''; 
    fetchToys(); 
  });

}
)

