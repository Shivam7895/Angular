import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    QueryList,
    ViewChildren,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services';
import { ConstUrls } from '@modules/const-urls';
import { SBSortableHeaderDirective, SortEvent } from '@modules/tables/directives';
import { Country } from '@modules/tables/models';
import { CountryService } from '@modules/tables/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
    selector: 'sb-ng-bootstrap-table',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './ng-bootstrap-table.component.html',
    styleUrls: ['ng-bootstrap-table.component.scss'],
})
export class NgBootstrapTableComponent implements OnInit {
    @Input() pageSize = 4;

    countries$!: Observable<Country[]>;
    total$!: Observable<number>;
    sortedColumn!: string;
    sortedDirection!: string;

    @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;
page:any = 5
    constructor(
        public countryService: CountryService,
        private changeDetectorRef: ChangeDetectorRef,
        private authService: AuthService,
        private modalService: NgbModal,
        private _FB:FormBuilder,
        private router:Router
    ) { }

    ngOnInit() {
       this.countryService.pageSize = this.pageSize
        this.getUser()
    }

    navigateDetailsPage(){
this.router.navigate(['/dashboard/static'])
    }

    // onSort({ column, direction }: SortEvent) {
    //     this.sortedColumn = column;
    //     this.sortedDirection = direction;
    //     this.countryService.sortColumn = column;
    //     this.countryService.sortDirection = direction;

    // }

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

    allUsers: any = []
    data: any
    total:any
    paginationValue:any = []
    getUser() {
        debugger
        this.authService.secureGet(ConstUrls.usersApi.userList).subscribe((res: any) => {
            this.allUsers = res?.response
            this.paginationValue = this.allUsers
            this.total = this.allUsers?.length
            // const startIndex = (this.page - 1) * this.pageSize;
            // const endIndex = startIndex + this.pageSize;
            // this.allUsers = this.allUsers.slice(startIndex, endIndex);
            this.changeDetectorRef.detectChanges();
            console.log(this.allUsers, 'getUsergetUsergetUser')
        })
    }

    onPageChange(page: number) {
        debugger
        this.page = page;
        this.setPageItems();
      }

      setPageItems() {
        const startIndex = (this.page - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        this.allUsers = this.paginationValue.slice(startIndex, endIndex);
      }

      open(content:any) {
		this.modalService.open(content);
	}
}
