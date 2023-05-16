function showComment() {
  // checks to see if the user is logged in or not
  fetch("/checkUser")
    .then((res) => res.json())
    .then((data) => {
      console.log("data :>> ", data);
      if (data.userName) {
        const commentEl = document.getElementById("comment");
        commentEl.classList.remove("comment-hide");
        commentEl.classList.add("comment-visible");
      } else {
        window.location.href = "/login";
      }
    });
}
