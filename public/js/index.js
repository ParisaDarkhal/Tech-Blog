// this is added because after logging in, the url of the page was not updated to home
// Assuming you have a login form in your HTML with id "loginForm"
const loginForm = document.querySelector("#loginForm");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent the default form submission

  // Get the username and password from the form
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  try {
    // Send a POST request to the /login endpoint
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      // Login was successful, redirect to '/'
      window.location.href = "/";
    } else {
      // Login failed, display an error message
      const errorData = await response.json();
      console.log("Login failed:", errorData.message);
    }
  } catch (error) {
    console.log("An error occurred during login:", error);
  }
});

// to display comments
function showComment(post) {
  const blogId = post.id.split("-")[1];
  // checks to see if the user is logged in or not
  fetch("/checkUser")
    .then((res) => res.json())
    .then((data) => {
      if (data.userName) {
        const commentEl = document.getElementById(`comment-${blogId}`);
        commentEl.classList.remove("comment-hide");
        commentEl.classList.add("comment-visible");
      } else {
        window.location.href = "/login";
      }
    });
}

// to save new comment
async function saveComment(btn) {
  const blogId = btn.id;
  const commentText = document.getElementById(`commentText-${blogId}`);
  const commentVal = commentText.value;
  const response = await fetch("/posts/comment", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ comment: commentVal, blogId: blogId }),
  });
  const jsonData = await response.json();
  btn.parentElement.classList.remove("comment-visible");
  btn.parentElement.classList.add("comment-hide");
  let divEl = btn.parentElement.previousElementSibling;
  renderNewComment(jsonData, divEl);
}

function renderNewComment(data, divEl) {
  let newDiv = document.createElement("div");
  newDiv.innerHTML = `<div class="m-3 d-block bg-light">
  <hr/>
  <h4>Comment</h4>
  ${data.dbComment.content} 
  <span>Created by ${data.username} on ${new Date(
    data.dbComment.date
  ).toLocaleDateString()} at ${new Date(
    data.dbComment.date
  ).toLocaleTimeString()}</span></div>`;
  divEl.append(newDiv);
}
