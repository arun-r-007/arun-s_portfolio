import { AfterViewInit, Component } from '@angular/core';

declare var particlesJS: any;

@Component({
  selector: 'app-particles-background',

  templateUrl: './particles-background-component.html',
  styleUrl: './particles-background-component.css'
})
export class ParticlesBackgroundComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 100,
          density: { enable: true, value_area: 800 }
        },
        color: { value: "#ffff00" },
        shape: {
          type: "star",
          stroke: { width: 0, color: "#ffff00" },
          polygon: { nb_sides: 5 }
        },
        opacity: {
          value: 0.8,
          random: true,
          anim: { enable: true, speed: 1, opacity_min: 0.4, sync: false }
        },
        size: {
          value: 5,
          random: true,
          // anim: { enable: true, speed: 2, size_min: 1, sync: false }
        },
        line_linked: {
          enable: true,
          distance: 100,
          color: "#ffff00",
          opacity: 0.6,
          width: 1.5
        },
        move: {
          enable: true,
          speed: 1,        ///
          direction: "none",       
          random: true,
          straight: false,
          out_mode: "bounce",   //
          bounce: false,
          attract: { enable: true, rotateX: 600, rotateY: 1200 }
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "bubble" },
          onclick: { enable: true, mode: "remove" },
          resize: true
        },
        modes: {
          grab: { distance: 400, line_linked: { opacity: 1 } },
          bubble: { distance: 300, size: 8, duration: 2, opacity: 8, speed: 2 },
          repulse: { distance: 100, duration: 0.4 },
          push: { particles_nb: 4 },
          remove: { particles_nb: 10 }
        }
      },
      retina_detect: true
    });
  }
}
