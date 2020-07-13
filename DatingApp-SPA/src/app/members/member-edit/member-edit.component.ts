import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  user: User;
  // tslint:disable-next-line: typedef
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
    // tslint:disable-next-line: no-string-literal
    this.user = data['user'];
    });
  }

  // tslint:disable-next-line: typedef
  updateUser() {
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(next => {
      this.alertify.success('Success!');
      this.editForm.reset(this.user);
    }, error => {
      this.alertify.error(error);
    });
  }

}
