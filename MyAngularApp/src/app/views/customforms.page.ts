import { Component, signal } from '@angular/core'; 
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms'; 
import { corporateEmailValidator } from '../../validators/corporate-email.validator'; 
import { noWhitespaceValidator } from '../../validators/no-whitespace.validator'; 
// import { RouterOutlet } from '@angular/router'; 

const VALIDATION_MESSAGES: any = {
  required: () => 'This field is required.',
  minlength: (err: any) => `Minimum ${err.requiredLength} characters required.`,
  maxlength: (err: any) => `Maximum ${err.requiredLength} characters allowed.`,
  pattern: () => 'Invalid format. Only letters and numbers allowed.',
  whitespace: () => 'Cannot contain only spaces.',
  corporateEmail: () => 'Please use a valid corporate email address.'
};


@Component({
  selector: 'app-custom-forms',
  // imports: [RouterOutlet],
  // templateUrl: './app.html',  
  template: ` 
    <h2 style="font-family: 'Courier New', Courier, monospace;">Topic: Reactive Forms</h2> 
    <form [formGroup]="profileForm" (ngSubmit)="handleSubmit()">
      <label>
        Input Name 
        <input type="text" formControlName="name" />
      </label>
      <label>
        Input Email 
        <input type="email" formControlName="email" />
      </label>
      <button type="submit">Submit</button>
    </form>
    
    <hr><hr>

    <h2 style="font-family: Georgia, 'Times New Roman'; color: darkgoldenrod;">Profile Form</h2> 
    <p style="font-family: Cambria, Cochin, Georgia, Times,; font-style: italic; color: blueviolet;">Name: {{ profileForm.value.name }}</p>
    <p style="font-family: Cambria, Cochin, Georgia, Times,; font-style: italic; color: blueviolet;">Email: {{ profileForm.value.email }}</p>

    <hr>

    <h2 style="font-family: 'Courier New', Courier, monospace;">Topic: Validating Forms</h2> 
    <form [formGroup]="deviceForm" (ngSubmit)="handleUpload()">
      <div>
        <label>Enter computer brand name:</label>
        <input type="text" formControlName="brandName" [class.is-invalid]="getControlError('brandName')" />
        @if (getControlError('brandName'); as errorMessage) {
          <div class="error-text">{{ errorMessage }}</div>
        }
      </div>

      <div>
        <label>Enter model name:</label>
        <input type="text" formControlName="model" [class.is-invalid]="getControlError('model')" />
        @if (getControlError('model'); as errorMessage) {
          <div class="error-text">{{ errorMessage }}</div>
        }
      </div>

      <div>
        <label>Enter brand email:</label>
        <input type="text" formControlName="brandEmail" [class.is-invalid]="getControlError('brandEmail')" />
        @if (getControlError('brandEmail'); as errorMessage) {
          <div class="error-text">{{ errorMessage }}</div>
        }
      </div>

      <button type="submit" [disabled]="deviceForm.invalid">Upload</button>
    </form>

    // Error handling 
    @if (deviceForm.get('brandName')?.touched) {
      <div style="color: red;">
        @if (deviceForm.get('brandName')?.hasError('required')) {
          <small>Brand name is required</small>
        }
        @if (deviceForm.get('brandName')?.hasError('minlength')) {
          <small>Minimum 2 characters required</small>
        }
        @if (deviceForm.get('brandName')?.hasError('whitespace')) {
          <small>Cannot contain only spaces</small>
        }
      </div>
    } 
  `,  
  styles: [`
    .error-text {
      color: #d32f2f;
      font-size: 0.75rem;
      margin-top: 4px;
      font-weight: 500;
    }

    input.is-invalid {
      border: 1px solid #d32f2f !important;
      background-color: #fff8f8;
    }

    /* Optional: add a shake animation for errors */
    .is-invalid {
      animation: shake 0.2s ease-in-out;
    }
    
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-2px); }
      75% { transform: translateX(2px); }
    }  
  `], 
  // styleUrl: './app.css', 
  imports: [ReactiveFormsModule]
})


export class CustomForms {
  profileForm = new FormGroup({
    name: new FormControl(''), 
    email: new FormControl(''), 
  }); 

  deviceForm = new FormGroup({
    
    brandName: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-Z0-9 ]+$/),
        noWhitespaceValidator
      ]
    }),
 
    
    model: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern(/^[a-zA-Z0-9\- ]+$/),
        noWhitespaceValidator
      ]
    }),
 
    
    brandEmail: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.maxLength(100),
        corporateEmailValidator
      ]
    })
 
  });


  handleSubmit() {
    alert(
      this.profileForm.value.name + ' | ' + this.profileForm.value.email
    ); 
  } 

  handleUpload() {
    alert(
      'Db stored device details\n' + 
      this.deviceForm.value.brandName + 
      ' :: ' + this.deviceForm.value.model + 
      '\n' + 'Domain email: ' + 
      this.deviceForm.value.brandEmail
    );
  } 


  getControlError(controlName: string): string | null {
    const control = this.deviceForm.get(controlName);
    if (control && control.touched && control.errors) {
      const firstErrorKey = Object.keys(control.errors)[0];
      const errorValue = control.errors[firstErrorKey];
      return VALIDATION_MESSAGES[firstErrorKey] 
        ? VALIDATION_MESSAGES[firstErrorKey](errorValue) 
        : 'Invalid input.';
    }
    return null;
  }
}
