import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BackgroundComponent } from '../components/background/background';
import { NavbarComponent } from '../components/navbar/navbar';
import { Title } from '@angular/platform-browser';
import { NgIf } from '@angular/common';
import { ParticlesBackgroundComponent } from '../components/particles-background-component/particles-background-component';
import { Creator } from './pages/creator/creator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BackgroundComponent, NavbarComponent, NgIf, ParticlesBackgroundComponent,Creator],
  templateUrl: './app.html',
  styleUrls: ['./app.css'] // Corrected from styleUrl to styleUrls
})
export class App implements OnInit {
  showWelcome = false; // Start with the welcome modal hidden

  constructor(private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle("Arun R");
  }

  @HostListener('document:keydown.escape')
  handleEscape(): void {
    this.closeWelcome();
  }

  closeWelcome(): void {
    this.showWelcome = false;
  }

  openWelcome(): void {
    this.showWelcome = true;
  }

  onOverlayClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('welcome-modal')) {
      this.closeWelcome();
    }
  }

moveWelcome(event: MouseEvent): void {
  const welcomeBox = document.querySelector('.welcome-box') as HTMLElement;
  if (!welcomeBox) return;

  const boxRect = welcomeBox.getBoundingClientRect();
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  // Find the closest point on the box to the mouse
  const nearestX = Math.max(boxRect.left, Math.min(mouseX, boxRect.right));
  const nearestY = Math.max(boxRect.top, Math.min(mouseY, boxRect.bottom));

  // Vector from mouse to closest point on box
  const dx = nearestX - mouseX;
  const dy = nearestY - mouseY;

  const distance = Math.sqrt(dx * dx + dy * dy);
  const threshold = 120;
  const repulseStrength = 120;

  // Only apply movement if mouse is within threshold distance
  if (distance < threshold && distance > 0.001) {
    // Normalize the vector
    const normX = dx / distance;
    const normY = dy / distance;

    // Current center of the box
    const currentX = boxRect.left + boxRect.width / 2;
    const currentY = boxRect.top + boxRect.height / 2;

    // Move center away
    const targetX = currentX + normX * repulseStrength;
    const targetY = currentY + normY * repulseStrength;

    // Keep inside viewport bounds
    const boundedX = Math.max(boxRect.width / 2, Math.min(targetX, window.innerWidth - boxRect.width / 2));
    const boundedY = Math.max(boxRect.height / 2, Math.min(targetY, window.innerHeight - boxRect.height / 2));

    // Apply style
    welcomeBox.style.left = `${boundedX}px`;
    welcomeBox.style.top = `${boundedY}px`;
    welcomeBox.style.position = 'absolute';
    welcomeBox.style.transform = 'translate(-50%, -50%)';
  }
}


}
