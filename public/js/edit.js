
const update = async () => {
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();
    const url = window.location.pathname.split('/');
    const blog_id = Number.parseInt(url[url.length - 1]);
    console.log(blog_id);
    if (title && content) {
        const response = await fetch(`/api/blogs/edit/${blog_id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (response.ok) {
            document.location.replace(`/dashboard`)
        } else {
            alert(response.statusText);
        }
    }
}

const del = async () => {
    const url = window.location.pathname.split('/');
    const blog_id = Number.parseInt(url[url.length - 1]);
    const response = await fetch(`/api/blogs/delete/${blog_id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        document.location.replace(`/dashboard`)
    } else {
        alert(response.statusText);
    }
}

const updateBtn = document.querySelector('#update');
updateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    update();
})

const deleteBtn = document.querySelector('#delete');
deleteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    del();
})