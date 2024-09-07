import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
    userEditForm: any = FormGroup
    transactionForm: any = FormGroup
    constructor(private modalService: NgbModal,
        private route: ActivatedRoute,
        private authService: AuthService,
        private _FB: FormBuilder,
        private changeDetectorRef: ChangeDetectorRef,
    ) { }
    id: any
    ngOnInit() {
        
        this.route.queryParams.subscribe((data: any) => {
            this.id = data.id
        })
        this.oninIt()
        this.oninItTran()
         this.getTranList()
        this.getAllTranList()
    }

    transactionList: any = []
    tnxList = []
    getAllTranList(){
        this.authService.secureGet(ConstUrls.usersApi.transactionListbyUserId + this.id).subscribe((res:any)=>{
            this.transactionList = res.response
            this.changeDetectorRef.detectChanges();
            console.log(this.transactionList, 'list')
        })
    }

    transactionType = [{ id: 1, type: 'Pending' }, { id: 2, type: 'Post Transaction' }]
    oninItTran() {
        this.transactionForm = this._FB.group({
            tnx_type: [''],
            tnx_date: [''],
            description: [''],
            total_daily_balance: [''],
            user_id: [],
            credits: [],
            debits: [],

        })
    }

    oninIt() {
        this.userEditForm = this._FB.group({
            dob: [""],
            email: [""],
            firstName: [""],
            lastName: [""],
            password: [""],
            phone: [""],
            ssn: [""],
            availableBalance: [""],
            accountNumber: [""],
            routingNumber: [""],
            address: [""],
            mailingAddress: [""],
            description: [""],
            accountType: [""],
            acountlastfourdigit: [""],
            _id: [""]
        })
    }


    userDetails: any
    getTranList() {
        
        this.authService.securePut(ConstUrls.usersApi.userGetDetails + this.id).subscribe((res: any) => {
            this.userDetails = res?.response
            this.userEditForm.patchValue(this.userDetails)
            let acountDtails:any
            if(this.userDetails && this.userDetails.accounts[0]){
             acountDtails = this.userDetails.accounts[0]
            }
            this.userEditForm.controls.accountType.setValue(acountDtails.account_type)
            this.userEditForm.controls.routingNumber.setValue(acountDtails?.routing_number)
            this.userEditForm.controls.accountNumber.setValue(acountDtails?.account_number)

            console.log(this.userDetails, 'this.userDetailsthis.userDetails')
        })
    }

transactionUpdatedetails:any
    open(content: any,data?:any) {
        
        this.modalService.open(content);
        if(data){
            this.transactionUpdatedetails = data
            this.transactionForm.patchValue(data)
           // this.transactionForm.controls.tnx_date.setValue(new Date(data.tnx_date))
        }else{
            this.transactionUpdatedetails = null
        }
        // this.modalService.dismissAll()
    }

    save() {
        this.userEditForm.value._id = this.id
        this.authService.securePut(ConstUrls.usersApi.userGetDetails + this.id, this.userEditForm.value).subscribe((res: any) => {
            this.userDetails = res
            alert('User Update successfully')
            console.log(this.userDetails, 'this.userDetailsthis.userDetails')
        })
    }


    addTransaction() {
        this.transactionForm.value.user_id = this.id
        this.transactionForm.value.tnx_date = new Date(this.transactionForm.value.tnx_date)
        if(this.transactionUpdatedetails){
            this.transactionForm.value.is_trnx_id = this.transactionUpdatedetails._id
        }
        
        this.authService.securePost(ConstUrls.usersApi.addTrans, this.transactionForm.value).subscribe((res: any) => {
            let addTrans = res
            if(this.transactionUpdatedetails?.is_trnx_id){
                alert('Transaction Update successfully')
            }else{
                alert('Transaction Added successfully')
            }
            this.transactionForm.reset()
            this.modalService.dismissAll()
            this.getAllTranList()
            console.log(addTrans, 'addTransaddTransaddTrans')
        })
    }
}
