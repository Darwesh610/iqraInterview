import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  constructor(private FireStore:AngularFirestore) { }
  getData:any;
  ngOnInit(): void {
    const photo = this.FireStore.collection("photos").valueChanges();
    photo.subscribe((data) => {
      console.log(data);
      this.getData = data;
      console.log(this.getData[0].ImageName);
    })
  }

}
