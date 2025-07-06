import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BackgroundComponent } from '../components/background/background';
import { NavbarComponent } from '../components/navbar/navbar';
import { Title } from '@angular/platform-browser';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BackgroundComponent, NavbarComponent, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  showWelcome = true;

  constructor(private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle("It's me Arun R (ar)");
    // 👇 Remove auto-close
  }

  @HostListener('document:keydown.escape')
  handleEscape(): void {
    this.closeWelcome();
  }

  closeWelcome(): void {
    this.showWelcome = false;
  }

  onOverlayClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('welcome-modal')) {
      this.closeWelcome();
    }
  }
}
