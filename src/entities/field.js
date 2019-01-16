export default class Field {
  context;
  particles = [];
  minDistance = 0;
  lineColor = "#000000";
  lineOpacity = 0;

  constructor(context, particles, minDistance, lineColor, lineOpacity) {
    this.context = context;
    this.particles = particles;
    this.minDistance = minDistance;
    this.lineColor = lineColor;
    this.lineOpacity = lineOpacity;
  }

  drawParticle(particle) {
    this.context.fillStyle = particle.color;
    this.context.beginPath();
    this.context.arc(
      particle.position.x, 
      particle.position.y, 
      particle.radius, 
      0, 
      2 * Math.PI, 
      false
    );
    this.context.fill();
    this.context.closePath();
  }

  drawAllParticles() {
    this.particles.forEach(particle => {
      this.drawParticle(particle);
    })
  }

  connectTwoParticles(first, second, distance) {
    const hexOpacity = Math.round((1 - (distance / this.minDistance)) * this.lineOpacity * 255).toString(16);

    this.context.strokeStyle = this.lineColor + (hexOpacity.length < 2 ? "0" + hexOpacity : hexOpacity);
    this.context.beginPath();
    this.context.moveTo(first.position.x, first.position.y);
    this.context.lineTo(second.position.x, second.position.y);
    this.context.stroke();
    this.context.closePath();
  }

  connectAllParticles() {
    for (let i = 0; i < this.particles.length - 1; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const current = this.particles[i];
        const another = this.particles[j];

        const diff = {
          x: Math.abs(current.position.x - another.position.x),
          y: Math.abs(current.position.y - another.position.y),
        }
        
        const distance = Math.sqrt(Math.pow(diff.x, 2) + Math.pow(diff.y, 2));

        if (distance < this.minDistance)
          this.connectTwoParticles(current, another, distance);
      }
    }
  }

  updateAllParticles() {
    this.particles.forEach(particle => {
      particle.update();
    })
  }

  clear() {
    this.context.clearRect(0, 0, field.width, field.height);
  }
}