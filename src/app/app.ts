import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BackgroundComponent } from '../components/background/background';
import { Title } from '@angular/platform-browser';
import { NavbarComponent } from '../components/navbar/navbar';





@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,BackgroundComponent,NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = '3d_portfolio';
  constructor(private titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle("It's me Arun R (ar)");
}
}
