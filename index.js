let btn = document.querySelector("#btn");
let count = 0;

// Function to display the count
function updateCounter() {
  let cnt = document.querySelector("#p");
  cnt.textContent = count;
}

// Function to display blog details
function Display(BlogDetails) {
  let displayDiv = document.querySelector("#display");
  let li = document.createElement("li");
  li.style.listStyle = "none";
  displayDiv.appendChild(li);

  let titleNode = document.createElement("p");
  let titleText = document.createTextNode(BlogDetails.title);
  titleNode.appendChild(titleText);
  li.appendChild(titleNode);

  let img = document.createElement("img");
  img.src = BlogDetails.imageUrl;
  img.alt = BlogDetails.title;
  img.style.width = "200px";
  img.style.height = "200px";
  li.appendChild(img);

  let descriptionNode = document.createElement("p");
  let descriptionText = document.createTextNode(BlogDetails.description);
  descriptionNode.appendChild(descriptionText);
  li.appendChild(descriptionNode);

  let editBtn = document.createElement("button");
  let editText = document.createTextNode("Edit");
  editBtn.appendChild(editText);
  li.appendChild(editBtn);
  editBtn.style.margin = "10px";

  editBtn.addEventListener("click", function (event) {
    displayDiv.removeChild(event.target.parentElement);
    axios
      .delete(`https://crudcrud.com/api/c4c977be201844cc8959e74f12ab98f4/blogDetails/665b493119f3e403e81e1aa7`)
      .then((res) => {
        console.log(res);
        count -= 1;
        updateCounter();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  let deleteButton = document.createElement("button");
  let deleteText = document.createTextNode("Delete");
  deleteButton.appendChild(deleteText);
  li.appendChild(deleteButton);

  deleteButton.addEventListener("click", function (event) {
    displayDiv.removeChild(event.target.parentElement);
    axios
      .delete(`https://crudcrud.com/api/c4c977be201844cc8959e74f12ab98f4/blogDetails/665b493119f3e403e81e1aa7`)
      .then((res) => {
        console.log(res);
        count -= 1;
        updateCounter();
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

// Function to handle form submission
btn.addEventListener("click", function (event) {
  event.preventDefault();

  let imageUrl = document.querySelector("#image").value;
  let title = document.querySelector("#title").value;
  let description = document.querySelector("#description").value;

  let BlogDetails = {
    imageUrl: imageUrl,
    title: title,
    description: description,
  };

  axios
    .post("https://crudcrud.com/api/c4c977be201844cc8959e74f12ab98f4/blogDetails", BlogDetails)
    .then((res) => {
      console.log(res);
      Display(res.data);
      count += 1;
      updateCounter();
    })
    .catch((err) => {
      console.log(err);
    });
});

// Load existing blog details on page load
window.addEventListener("DOMContentLoaded", function () {
  axios
    .get("https://crudcrud.com/api/c4c977be201844cc8959e74f12ab98f4/blogDetails")
    .then((res) => {
      res.data.forEach(element => {
        Display(element);
        count += 1;
      });
      updateCounter();
    })
    .catch((err) => {
      console.log(err);
    });
});
