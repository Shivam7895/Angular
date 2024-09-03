import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@modules/auth/services';

@Component({
    selector: 'sb-top-nav-user',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav-user.component.html',
    styleUrls: ['top-nav-user.component.scss'],
})
export class TopNavUserComponent implements OnInit {
    constructor(public userService: UserService,private router:Router) {}
    isLocalStorage:any  =false
    localstorageData:any
    ngOnInit() {
        this.getLocalStorage()
    }


    getLocalStorage(){
        debugger
 this.localstorageData =  localStorage.getItem('email')
 if(this.localstorageData){
    this.isLocalStorage = true
 }else{
    this.isLocalStorage = false
 }
    }
    

    logOut(){
        localStorage.clear()
        this.isLocalStorage = false
        this.router.navigate(['/auth/login'])
    }
}
