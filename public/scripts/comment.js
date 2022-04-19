async function comment(event) {
    event.preventDefault();

    const comment_text = document.querySelector('#comment').value.trim();

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (comment_text) {
        const response = await fetch('/api/comments/create', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();

        } else {
            alert(response.statusText);
            $('#comment-form').css("display") = "block";
        }
    }
}

document.querySelector('.comment-form').addEventListener('submit', comment);