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
  console.log(jsonData);
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
  ).toLocaleDateString()}</span></div>`;
  divEl.append(newDiv);
}
