import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@modules/auth/services';
import { ConstUrls } from '@modules/const-urls';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'sb-static',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './static.component.html',
    styleUrls: ['static.component.scss'],
})
export class StaticComponent implements OnInit {
    userEditForm:any=FormGroup
    constructor(private modalService: NgbModal,
        private route: ActivatedRoute,
        private authService: AuthService,
        private _FB:FormBuilder
    ) { }
    id: any
    ngOnInit() {
        debugger
        this.route.queryParams.subscribe((data: any) => {
            this.id = data.id
        })
        this.oninIt()
        this.getTranList()
    }

    oninIt(){
        this.userEditForm = this._FB.group({
            dob:[""],
            email:[""],
            firstName:[""],
            lastName:[""],
            password:[""],
            phone:[""],
            ssn:[""],
            availableBalance:[""],
            accountNumber:[""],
            routingNumber:[""],
            address:[""],
            mailingAddress:[""],
            description:[""],
            accountType:[""],
            acountlastfourdigit:[""],
            _id:[""]
        })
    }


    userDetails: any
    getTranList() {
        debugger
        this.authService.securePut(ConstUrls.usersApi.userGetDetails + this.id).subscribe((res: any) => {
            this.userDetails = res?.response
            this.userEditForm.patchValue(this.userDetails)
            console.log(this.userDetails,'this.userDetailsthis.userDetails')
        })
    }


    open(content: any) {
        this.modalService.open(content);
    }

    save(){
        this.userEditForm.value._id = this.id
        this.authService.securePut(ConstUrls.usersApi.userGetDetails + this.id , this.userEditForm.value).subscribe((res: any) => {
            this.userDetails = res
            console.log(this.userDetails,'this.userDetailsthis.userDetails')
        })
    }
}
