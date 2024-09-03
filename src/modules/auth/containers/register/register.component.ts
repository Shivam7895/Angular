import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '@modules/auth/services';
import { ConstUrls } from '@modules/const-urls';

@Component({
    selector: 'sb-register',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './register.component.html',
    styleUrls: ['register.component.scss'],
})
export class RegisterComponent implements OnInit {

    constructor(
        private authService:AuthService,
        private _FB:FormBuilder
        ) {}
    ngOnInit() {
        this.ngOnInIt()
        console.log(this.userForm, 'userFormuserFormuserFormuserForm')
    }

    saveData:any
    userForm :any = FormGroup
    vv:boolean =false
    registerUser(){
        let payload ={
            "phone": "stering",
            "email": "pr32@gmail.com",
            "firstName": "string",
            "lastName": "string",
            "password": "secret"
          }
          console.log(this.userForm.value, 'valuevaluevalue')
    this.authService.securePost(ConstUrls.adminAuthApi.register,payload).subscribe((res:any)=>{
     this.saveData = res
    },(err:any)=>{

    })
}

ngOnInIt(){
  this.userForm =  this._FB.group({
        email:[''],
        firstName:[''],
        lastName:[''],
        password:[''],
        conPass:[''],
        phone:['']
    })
}
}
