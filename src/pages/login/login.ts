import {
  NavController,
  LoadingController,
  AlertController, App  } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';
import { SignupPage } from '../signup/signup';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { EmailValidator } from '../../validators/email'; 
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginForm;
  loading: any;
  rootPage: any;

  constructor(public nav: NavController, public authData: AuthData, public formBuilder: FormBuilder,
    public alertCtrl: AlertController, public loadingCtrl: LoadingController, private _app: App) {

    /**
     * Creates a ControlGroup that declares the fields available, their values and the validators that they are going
     * to be using.
     *
     * I set the password's min length to 6 characters because that's Firebase's default, feel free to change that.
     */
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  /**
   * If the form is valid it will call the AuthData service to log the user in displaying a loading component while
   * the user waits.
   *
   * If the form is invalid it will just log the form value, feel free to handle that as you like.
   */
  loginUser(): void {
    if (!this.loginForm.valid){
      //console.log(this.loginForm.value);
    } else {
      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password).then( authData => {

        // this.loading.dismiss().then( () => {
        //   this.nav.setRoot(TabsPage);
        // });
        // this.loading.dismiss().then( () => {
        //   this.nav.setRoot(TabsPage);
        // });
        this.nav.push(TabsPage, {}, {animate: false});
        // this.nav.pop();
      }, error => {
        // this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });

        // });
          alert.present();
        //console.log(error);
      });

      // this.loading = this.loadingCtrl.create();
      // this.loading.present();
    }
  }

  goToSignup(): void {
    this.nav.push(SignupPage);
  }

  goToResetPassword(): void {
    this.nav.push(ResetPasswordPage);
  }

}
