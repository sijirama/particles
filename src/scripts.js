const m = document.getElementById("life").getContext("2d");

// draw to the canvas, c = color , x = xposition in canvas , y = y position in canvas
const draw = (x, y, c, s) => {
  m.fillStyle = c;
  m.fillRect(x, y, s, s);
};

const particles = [];

const particle = (x, y, c) => {
  return { x: x, y: y, vx: 0, vy: 0, color: c };
};

const random = () => {
  // generate random number between 50 and 450
  return Math.random() * 400 + 50;
};

const create = (number, color) => {
  const group = [];
  for (let i = 0; i < number; i++) {
    group.push(particle(random(), random(), color));
    particles.push(group[i]);
  }
  return group;
};

const rule = (particle1, particle2, g) => {
  for (let i = 0; i < particle1.length; i++) {
    fx = 0;
    fy = 0;

    for (let j = 0; j < particle2.length; j++) {
      a = particle1[i];
      b = particle2[j];

      dx = a.x - b.x; // x distance
      dy = a.y - b.y; // y disance

      d = Math.sqrt(dx * dx + dy * dy);

      if (d > 0 && d < 80) {
        F = g * (1 / d); // force between both objects.
        fx += F * dx;
        fy += F * dy;
      }
    }
    a.vx = (a.vx + fx) * 0.5;
    a.vy = (a.vy + fy) * 0.5;
    a.x += a.vx;
    a.y += a.vy;
    if (a.x <= 0 || a.x >= 495) {
      a.vx *= -1;
    }
    if (a.y <= 0 || a.y >= 495) {
      a.vy *= -1;
    }
  }
};

const yellow = create(200, "yellow");
const red = create(200, "red");
const green = create(200, "green");

const update = () => {
  rule(red, red, 0.1);
  rule(yellow, red, 0.15);
  rule(green, green, -0.7);
  rule(green, red, -0.2);
  rule(red, green, -0.1);
  m.clearRect(0, 0, 500, 500);
  draw(0, 0, "black", 500);
  for (let i = 0; i < particles.length; i++) {
    draw(particles[i].x, particles[i].y, particles[i].color, 5);
  }
  requestAnimationFrame(update);
};

update();

function reloadPage() {
  location.reload();
}
