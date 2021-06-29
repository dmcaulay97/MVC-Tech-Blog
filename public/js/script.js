const commentContent = document.querySelector('#content');
const newCommentBtn = document.querySelector('#newCommentBtn');
console.log(content);

const createComment = async () => {
    const content = commentContent.value.trim();
    const url = window.location.pathname.split('/');
    const blog_id = Number.parseInt(url[url.length - 1]);

    const response = await fetch('/api/comments/', {
        method: 'POST',
        body: JSON.stringify({ content, blog_id }),
        headers: {
            'Content-Type': 'application/json',
        }
    })

    if (response.ok) {
        document.location.replace(`/comments/${blog_id}`)
    }
}

newCommentBtn.addEventListener('click', (e) => {
    e.preventDefault();
    createComment()
})