import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery-9';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      // tslint:disable-next-line: no-string-literal
      this.user = data['user'];
    });
    // this.loadUser();
    this.galleryOptions = [
      {
          width: '600px',
          height: '400px',
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
          breakpoint: 800,
          width: '100%',
          height: '600px',
          imagePercent: 80,
          thumbnailsPercent: 20,
          thumbnailsMargin: 20,
          thumbnailMargin: 20
      },
      // max-width 400
      {
          breakpoint: 400,
          preview: false
      }
  ];
    this.galleryImages = this.getImages() ;
  }

  // tslint:disable-next-line: typedef
  getImages() {
    const imageUrls = [];
    for (const photo of this.user.photos)
    {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url
      });
    }
    return imageUrls;
  }
   // member/1
   // tslint:disable-next-line: typedef
  //  loadUser() {
  //   // tslint:disable-next-line: no-string-literal
  //   this.userService.getUser(+this.route.snapshot.params['id']).subscribe((user: User) => {
  //     this.user = user;
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }
}
