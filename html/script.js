function back() {
    window.location.href = "game-mode.html"
}

function start() {
    document.body.style.transition = 'opacity 0.4s ease';
    document.body.style.opacity = 0;

    setTimeout(() => {
        window.location.href = "game-layout.html";
    }, 400);
}