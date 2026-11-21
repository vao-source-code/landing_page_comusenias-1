import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { SupportModalService } from 'src/app/services/support-modal.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public contactForm = this.formBuilder.group({
    email:['',[Validators.email]]
  });

  showMessage: boolean = false; // Variable de estado para mostrar el mensaje
  message: string = ''; // Mensaje a mostrar

  constructor(
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private supportModalService: SupportModalService
  ) { }

  openSupportModal(): void {
    this.supportModalService.open();
  }

  ngOnInit(): void {
  
  }

  onSubmit(){
    if (this.contactForm.valid) {
      const email = this.contactForm.get('email')!.value;
      const emailObj= {
        id:'',
        email:email
      }
      this.firebaseService.saveEmail(emailObj)
        .then(() => {
          this.showMessage = true;
          this.message = 'Correo electrónico guardado correctamente.';
          // Ocultará el mensaje después de 5 segundos
          setTimeout(() => {
            this.showMessage = false;
          }, 5000);
        })
        .catch(error => {
          this.showMessage = true;
          this.message = 'Error al guardar el correo electrónico: ' + error;
          // Ocultará el mensaje después de 5 segundos
          setTimeout(() => {
            this.showMessage = false;
          }, 5000);
        });

        this.contactForm.reset();
    }
  }

}
