import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min';

@Component({
  selector: 'app-background',
  templateUrl: './background.html',
  styleUrls: ['./background.css']
})
export class BackgroundComponent implements OnInit, OnDestroy {
  @ViewChild('vantaBg', { static: true }) vantaRef!: ElementRef;
  private vantaEffect: any = null;
  isDarkMode: boolean = true;

  ngOnInit(): void {
    this.initVanta();
  }

  ngOnDestroy(): void {
    this.destroyVanta();
  }

  initVanta(): void {
  if (!this.vantaRef?.nativeElement) return;

  const isMobile = window.innerWidth <= 600;

  this.vantaEffect = NET({
    el: this.vantaRef.nativeElement,
    THREE: THREE,
    mouseControls: true,
    touchControls: true,
    gyroControls: true,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: this.isDarkMode ? 0xffff00 : 0x000000,
    backgroundColor: this.isDarkMode ? 0x303030 : 0xFFFAFA,

    // 📱 Lighter config for mobile
    points: isMobile ? 10.00 : 10.00,
    maxDistance: isMobile ? 17.00 : 20.00,
    spacing: isMobile ? 20.00 : 15.00
  });

  setTimeout(() => {
    if (this.vantaEffect?.linesMesh?.material) {
      this.vantaEffect.linesMesh.material.color.setHex(this.isDarkMode ? 0xffff00 : 0x000000);
      this.vantaEffect.points?.forEach((mesh: any) => {
        if (mesh.material?.color) {
          mesh.material.color.setHex(this.isDarkMode ? 0x303030 : 0xffffff);
        }
      });
    }
  }, 100);
}


  destroyVanta(): void {
    if (this.vantaEffect) {
      this.vantaEffect.destroy();
      this.vantaEffect = null;
    }

    // 🧹 Remove leftover canvas (some Vanta versions leave it behind)
    const canvas = this.vantaRef.nativeElement.querySelector('canvas');
    if (canvas) {
      canvas.remove();
    }
  }

  toggleTheme(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.isDarkMode = !input.checked;

    // Optional: sound effect
    const audio = new Audio("data:audio/mpeg;base64,<FULL_BASE64_HERE>");
    audio.play().catch(err => console.error('Audio failed', err));

    // Optional: vibration
    if (navigator.vibrate) navigator.vibrate(50);

    // Restart background
    this.destroyVanta();
    this.initVanta();
  }
}
