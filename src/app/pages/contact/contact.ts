import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class Contact {
  contactForm: FormGroup;
  successMessage = '';
  errorMessage = '';
  isLoading = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';
    
    if (this.contactForm.invalid) {
      this.errorMessage = 'Please fill all fields correctly.';
      return;
    }

    const formData = this.contactForm.value;
    this.isLoading = true;

    this.http.post('http://localhost:3000/send-email', formData).subscribe({
      next: (res) => {
        this.successMessage = 'I got your message! I will get back to you soon.';
        this.contactForm.reset();
        // console.log('✅ Message sent to backend', res);
      },
      error: (err) => {
        this.errorMessage = '❌ Failed to send message. Please try again.';
        console.error('❌ Backend error:', err);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
