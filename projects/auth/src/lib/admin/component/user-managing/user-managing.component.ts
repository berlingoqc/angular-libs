import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Input,
  TemplateRef,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Filter, Count } from '@berlingoqc/ngx-loopback';
import { MatTableDataSource } from '@angular/material/table';
import { AdminUserEditComponent } from '../admin-user-edit/admin-user-edit.component';
import { Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '@berlingoqc/ngx-pwa';
import { User, AuthDialogService, AuthService } from '../../../auth';
import { UserAPI } from '../../../auth/service/user.api';
import { ActionConfirmationDialogComponent } from '@berlingoqc/ngx-common';
import { OrgUserLinkAPI, OrganisationAPI } from '../../../organisation/service';
import { Organisation } from '../../../organisation';
import { SSOSettingsService } from '../../../sso';

@Component({
  selector: 'alb-user-managing',
  templateUrl: './user-managing.component.html',
  styleUrls: ['./user-managing.component.scss'],
})
export class UserManagingComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: true, read: true })
  paginator: MatPaginator;

  models: MatTableDataSource<User> = new MatTableDataSource<User>();

  count: number;

  @ViewChild('birthday') birthday: TemplateRef<any>;

  @ViewChild('additionalAction') additionalAction: ElementRef<any>;

  @Input() name = 'Gestion des usagers';

  @Input() invitation = true;

  @Input() actionTemplate: TemplateRef<any>;

  @Input() mode: 'all' | 'org' | 'not' = 'all';
  @Input() org?: Organisation;

  @Input() rows: TemplateRef<any>[] = [];

  @Input()
  set users(users: User[]) {
    this.models.data = users;
    this.count = this.models.data.length;
    this.mode = 'not';
  }

  @Output() userInvite = new EventEmitter<User>();

  get columns(): string[] {
    return [...this.extraColumn.map((x) => x.name), ...this.baseColumn];
  }

  @Input() baseColumn = [
    'name',
    'email',
    'phone',
    'blocked',
    'validUntil',
    'activated',
    'roles',
    'options',
  ];

  @Input() extraColumn: { name: string; template: TemplateRef<any> }[] = [];

  @Input() chipsOption: TemplateRef<any>;

  getUsers: () => Observable<any>;
  getCount: () => Observable<Count>;
  inviteUserFn: () => MatDialogRef<any>;
  editUserFn: () => Observable<any>;
  deleteUserFn: (id) => Observable<any>;

  @Input() offset = 0;
  @Input() limit = 5;
  @Input() skip = 0;
  @Input() order = ['email ASC'];

  get filter(): Filter<any> {
    return {
      offset: this.offset,
      limit: this.limit,
      skip: this.skip,
      order: this.order,
    };
  }

  constructor(
    private userAPI: UserAPI,
    private orgUserLinkAPI: OrgUserLinkAPI,
    private orgAPI: OrganisationAPI,
    private notificationService: NotificationService,
    private authDialogService: AuthDialogService,
    public authService: AuthService,
    private ssoService: SSOSettingsService,
    private changeDetecotRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.mode === 'all' || this.mode === 'org') {
      if (this.mode === 'all') {
        this.initFnAdmin();
      } else if (this.mode === 'org') {
        this.initFnOrgManager();
      }
      this.updateData(null, true);
    }
  }

  ngAfterViewInit() {
    this.models.paginator = this.paginator;
    const extraFields = this.ssoService.settings.userExtraFields;
    if (extraFields) {
      extraFields.forEach((field) => {
        this.extraColumn.push({ name: field.name, template: this[field.name] });
      });
      this.changeDetecotRef.detectChanges();
    } else {
      console.warn('Extra fields not present');
    }
  }

  updateData(e?: any, count = false) {
    if (e) {
      this.limit = e.pageSize;
      this.skip = e.pageIndex * this.limit;
    }
    this.getUsers().subscribe((users) => {
      this.models.data = users; // utilise models.data au lieu de connect pour avoir acces au données
      // this.models.connect().next(users);
      if (count) {
        this.getCount().subscribe((count) => {
          this.count = count.count;
        });
      }
    });
  }

  private initFnAdmin() {
    this.getUsers = () => this.userAPI.get(this.filter);
    this.getCount = () => this.userAPI.count();
    this.inviteUserFn = () => this.authDialogService.openInviteUser();
    this.deleteUserFn = (user: User) => this.userAPI.delete(user.id);
  }

  private initFnOrgManager() {
    this.getUsers = () => this.orgAPI.users(this.org.id, this.filter);
    this.getCount = () => this.orgAPI.usersCount(this.org.id, {});
    this.inviteUserFn = () => {
      return this.authDialogService.openInviteUser(this.org.id);
    };
    this.deleteUserFn = (user: User) =>
      this.orgUserLinkAPI.delete(user.id, { organisationId: this.org.id });
  }

  clickdelete(user: User) {
    const dialogRef = this.authService.matDialog.open(
      ActionConfirmationDialogComponent,
      {
        data: {
          title: 'Vouliez vous supprimer ' + user.email,
          accept: false,
        },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteUserFn(user).subscribe(() => {
          this.updateData();
        });
      }
    });
  }

  clickInvite() {
    this.inviteUserFn()
      .afterClosed()
      .subscribe((user) => {
        if (user && this.mode === 'all') {
          this.updateData();
        }
        this.userInvite.next(user);
      });
  }

  clickUpdate(user: User) {
    const dialogRef = this.authService.matDialog.open(AdminUserEditComponent, {
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const userResult = result as User;
        const index = this.models.data.findIndex((u) => u.id === userResult.id);
        if (index > -1) {
          const array = this.models.data;
          array[index] = userResult;
          this.models.connect().next(array);
        } else {
          console.warn('USER UPDATED NOT FOUND IN ARRAY', userResult);
        }
      }
    });
  }

  trackById(index, item) {
    return item.id;
  }

  getInvitationURL(user: User) {
    return `${this.ssoService.settings.emailRedirect}?action=validate&otp=${user.userCredentials.activationCode}&email=${user.email}`;
  }

  afterCopyClipboard() {
    this.notificationService.openNotification({
      title: "Lien d'invitation copié dans votre presse-papier.",
      body: 'Vous pouvez le coller dans un message.',
      duration: 4000,
    });
  }
}
