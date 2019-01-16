import * as dat from 'dat.gui';
import { config } from "./config";
import Particle from "./entities/particle";
import Field from "./entities/field";
import context from "./canvas";

const { radius, speed, color, distance, amount, lineOpacity } = config;

const field = new Field(
  context,
  [...Array(amount)].map(() => new Particle(radius, color, speed)),
  distance,
  color,
  lineOpacity,
);

(function render() {
  field.clear();
  field.updateAllParticles();
  field.connectAllParticles();
  if (config.showParticles)
    field.drawAllParticles();

  requestAnimationFrame(render);
})();

// DAT.GUI part, not important on production

window.onload = function () {
  const gui = new dat.GUI();

  const lines = gui.addFolder("Lines");
  const particles = gui.addFolder("Particles");

  lines.add(field, "lineOpacity", 0, 1, 0.05);
  lines.add(field, "minDistance", 0, 500, 1);
  lines.addColor(field, "lineColor");

  const GUIcolor = particles.addColor(config, "color");
  GUIcolor.onChange(() => {
    field.particles.map(particle => {
      particle.color = config.color;
    })
  });

  const GUIspeed = particles.add(config, "speed", 0, 300);
  GUIspeed.onFinishChange(() => {
    field.particles.map(particle => {
      const speed = particle.calculateSpeedByAxes(config.speed);
      particle.speed = speed;
    })
  });

  const GUIradius = particles.add(config, "radius", 1, 5, 0.1);
  GUIradius.onChange(() => {
    field.particles.map(particle => {
      particle.radius = config.radius;
    })
  });

  const GUIamount = particles.add(config, "amount", 10, 500, 1);
  GUIamount.onFinishChange(() => {
    field.particles = [...Array(config.amount)].map(
      () => new Particle(config.radius, config.color, config.speed)
    );
  });

  particles.add(config, "showParticles", true, false);

  const GUIinsane = particles.add(config, "insane", true, false);
  let interval;
  GUIinsane.onChange(() => {
    if (config.insane) {
      interval = setInterval(() => {
        field.particles.map(particle => {
          const speed = particle.calculateSpeedByAxes(config.speed);
          particle.speed = speed;
        })
      }, config.insaneInterval);
    }
    else
      clearInterval(interval);
  });

  const GUIinsaneInterval = particles.add(config, "insaneInterval", 100, 2000);
  GUIinsaneInterval.onChange(() => {
    if (config.insane) {
      clearInterval(interval);
      interval = setInterval(() => {
        field.particles.map(particle => {
          const speed = particle.calculateSpeedByAxes(config.speed);
          particle.speed = speed;
        })
      }, config.insaneInterval);
    }
    else
      clearInterval(interval);
  });

  lines.open();
  particles.open();
}


