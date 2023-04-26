import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private http: HttpClient
  ) {}

  ngOnInit() {}

  async login() {
    // Validar los campos de entrada
    if (!this.email || !this.password) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor ingresa tu correo electrónico y contraseña.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }
  
    const url = 'http://localhost:8085/apk/looo';

    const data = { email: this.email, password: this.password };
    this.http.post(url, data).subscribe(
      async (response) => {
        console.log(response)
        // Si la solicitud se realiza correctamente, redirigir al usuario a la página principal de la aplicación
        this.router.navigateByUrl('/tabs');
      },
      async (error) => {
        // Si hay un error en la solicitud, mostrar un mensaje de error utilizando el servicio AlertController de Ionic
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Ocurrió un error al intentar iniciar sesión. Por favor intenta de nuevo más tarde.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    );
  }
}
