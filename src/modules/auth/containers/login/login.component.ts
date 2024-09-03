import { ConstUrls } from '@modules/const-urls';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '@modules/auth/services';
import { Router } from '@angular/router';

@Component({
    selector: 'sb-login',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginForm:any =FormGroup
    constructor(private authService:AuthService,
        private _FB:FormBuilder,
        private router:Router) {}
    ngOnInit() {
        localStorage.clear()
        this.ngOnInIt()
    }


    ngOnInIt(){
        this.loginForm =  this._FB.group({
            email:[''],
            password:[''],
              
          })
      }
    payload:any
    login(){
        debugger
        if(this.loginForm.value.email && this.loginForm.value.email){
            // this.payload ={
            //     "email": "admin@gmail.com",
            //     "password": "secret"
            //   }
            this.payload ={
                "email": this.loginForm.value.email,
                "password": this.loginForm.value.password
              }
            this.authService.securePost(ConstUrls.adminAuthApi.login, this.payload).subscribe((res:any)=>{
               console.log(res, 'resresresres')
               localStorage.setItem('email',res?.response?.email);
               localStorage.setItem('token',res?.response?.tokens[0]?.token);
               this.router.navigate(['/dashboard'])
              // localStorage.setItem('email',res.email);
            },(err:any)=>{
                alert('User not found')
            })
        }else{
            alert('Please Enter email and password')
        }
         
    }
}
