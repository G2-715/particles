import {config} from "../config";

export default class Particle {
  radius;
  color;
  speed = {
    x: 0,
    y: 0
  };
  position = {
    x: 0,
    y: 0
  };

  constructor(radius, color, speed) {
    this.radius = radius;
    this.color = color;
    this.speed = this.calculateSpeedByAxes(speed);
    this.position = this.calculateRandomPosition()
  }

  calculateSpeedByAxes(speed) {
    const angle = Math.random() * 2 * Math.PI;
    const x = Math.cos(angle) * speed;
    const y = Math.sin(angle) * speed;
 
    return { x, y };
  }

  calculateRandomPosition() {
    return {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight
    }
  }

  checkPosition() {
    if (this.position.x >= window.innerWidth || this.position.x <= 0)
      this.speed.x *= -1;
    if (this.position.y >= window.innerHeight || this.position.y <= 0)
      this.speed.y *= -1;
  }

  update() {
    this.checkPosition();

    this.position.x += this.speed.x / 60;
    this.position.y += this.speed.y / 60;
  }
}