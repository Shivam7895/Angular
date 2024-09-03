import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@modules/auth/services';
import { ConstUrls } from '@modules/const-urls';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

interface Alert {
	type: string;
	message: string;
}
const ALERTS: Alert[] = [
	{
		type: 'success',
		message: 'This is an success alert',
	},
	{
		type: 'info',
		message: 'This is an info alert',
	},
]
@Component({
    selector: 'sb-tables',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './tables.component.html',
    styleUrls: ['tables.component.scss'],
})
export class TablesComponent implements OnInit {
    
    constructor( private modalService: NgbModal,
        private _FB:FormBuilder,
        private authService:AuthService) {}
    ngOnInit() {
     this.OnInIt()
    }


    open(content:any) {
		this.modalService.open(content);
	}

    saveData:any
    userForm :any = FormGroup
    vv:boolean =false
    submitted = false
    registerUser(){
        debugger
        if(this.userForm.invalid){
            this.submitted = true
            return
        }

        let payload ={
            "phone": "9698",
            "email": "rp32@gmail.com",
            "firstName": "string",
            "lastName": "string",
            "password": "secret"
          }
         console.log(this.userForm.value, 'valuevaluevalue')
    this.authService.securePost(ConstUrls.adminAuthApi.register,this.userForm.value).subscribe((res:any)=>{
     this.saveData = res
     alert("Record Added")
    },(err:any)=>{
        alert(err?.error?.message)
    })
}

OnInIt(){
  this.userForm =  this._FB.group({
        email:['',[Validators.required]],
        firstName:['', [Validators.required]],
        lastName:['', [Validators.required]],
        password:['', [Validators.required]],
        conPass:[''],
        phone:['',[Validators.required]]
    })
}

}
