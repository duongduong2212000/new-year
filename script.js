const bgm = document.getElementById("bgm");
const sfx2500 = document.getElementById("sfx2500");
const sfxNext = document.getElementById("sfxNext");

const lion = document.getElementById("lion");
const resultBox = document.getElementById("result");

// Prize table with probabilities
const prizes = [
    { prize: 2500, chance: 5 },
    { prize: 1000, chance: 10 },
    { prize: "next", chance: 5 },
    { prize: 800, chance: 20 },
    { prize: 700, chance: 20 },
    { prize: 500, chance: 40 }
];

function randomPrize() {
    let roll = Math.random() * 100;
    let sum = 0;

    for (let p of prizes) {
        sum += p.chance;
        if (roll <= sum) return p.prize;
    }
}

document.querySelectorAll(".bag").forEach(bag => {
    bag.addEventListener("click", () => {

        // Hide lion
        lion.style.display = "none";

        let prize = randomPrize();

        if (prize === "next") {
            resultBox.innerHTML = "Next time!";
            sfxNext.play();
        } else {
            resultBox.innerHTML = `🎉 You won ₦${prize}! 🎉`;
            sfx2500.play();
            startFireworks();
        }

        // Zoom selected bag
        bag.style.transform = "scale(1.55)";
    });
});

document.getElementById("toggleMusic").addEventListener("click", () => {
    if (bgm.paused) bgm.play();
    else bgm.pause();
});

document.getElementById("playAgain").addEventListener("click", () => {
    location.reload();
});

// Fireworks effect
const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");

function startFireworks() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    let particles = [];

    for (let i = 0; i < 120; i++) {
        particles.push({
            x: innerWidth / 2,
            y: innerHeight / 2,
            speedX: (Math.random() - 0.5) * 9,
            speedY: (Math.random() - 0.5) * 9,
            life: 85
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            p.life--;

            ctx.fillStyle = "rgba(255,215,0," + p.life / 85 + ")";
            ctx.beginPath();
            ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
            ctx.fill();
        });

        particles = particles.filter(p => p.life > 0);
        if (particles.length > 0) requestAnimationFrame(animate);
    }

    animate();
}
