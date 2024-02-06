var icon=document.getElementById("toggle")
icon.onclick=function()
{
    document.body.classList.toggle("dark")
}
document.addEventListener("DOMContentLoaded", function() {
    function retrieveDataFromLocalStorage() {
        for (let postId = 1; postId <= 2; postId++) {
            const likeCount = localStorage.getItem(`post_${postId}_likes`) || 0;
            const comments = JSON.parse(localStorage.getItem(`post_${postId}_comments`)) || [];
            const likeCountDisplay = document.querySelector(`.blog-post[data-post-id="${postId}"] .like-count`);
            likeCountDisplay.textContent = likeCount;
            const commentsDisplay = document.querySelector(`.blog-post[data-post-id="${postId}"] .comments`);
            commentsDisplay.innerHTML = "";
            comments.forEach(comment => {
                const commentElement = document.createElement("div");
                commentElement.textContent = comment;
                commentsDisplay.appendChild(commentElement);
            });
        }
    }
    function updateLikeCount(postId, likeCount) {
        localStorage.setItem(`post_${postId}_likes`, likeCount);
        const likeCountDisplay = document.querySelector(`.blog-post[data-post-id="${postId}"] .like-count`);
        likeCountDisplay.textContent = likeCount;
    }
    function addComment(postId, commentText) {
        const comments = JSON.parse(localStorage.getItem(`post_${postId}_comments`)) || [];
        comments.push(commentText);
        localStorage.setItem(`post_${postId}_comments`, JSON.stringify(comments));
        retrieveDataFromLocalStorage(); // Update comments display
    }
    document.querySelectorAll(".like-btn").forEach(likeBtn => {
        likeBtn.addEventListener("click", function() {
            const postId = this.dataset.postId;
            let likeCount = parseInt(localStorage.getItem(`post_${postId}_likes`) || 0);
            likeCount++;
            updateLikeCount(postId, likeCount);
        });
    });
    document.querySelectorAll(".comment-form").forEach(commentForm => {
        commentForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const postId = this.dataset.postId;
            const commentInput = this.querySelector(".comment-input");
            const commentText = commentInput.value.trim();
            if (commentText !== "") {
                addComment(postId, commentText);
                commentInput.value = "";
            }
        });
    });
    retrieveDataFromLocalStorage();
});