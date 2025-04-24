const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
const numStars = 35;

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 2;
        this.dx = (Math.random() - 0.5) * 0.1;
        this.dy = (Math.random() - 0.5) * 0.1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x < 0 || this.x > canvas.width) this.dx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.dy *= -1;
    }
}

function createStars() {
    for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    requestAnimationFrame(animate);
}

createStars();
animate();

window.addEventListener("mousemove", (event) => {
    stars.forEach(star => {
        let dx = star.x - event.clientX;
        let dy = star.y - event.clientY;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
            star.dx += dx * 0.0002;
            star.dy += dy * 0.0002;
        }
    });
});

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = [];
    createStars();
});
