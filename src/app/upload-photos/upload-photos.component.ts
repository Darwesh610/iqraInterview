import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import * as moment from 'moment-timezone';
import { finalize, Observable } from 'rxjs';

@Component({
  selector: 'app-upload-photos',
  templateUrl: './upload-photos.component.html',
  styleUrls: ['./upload-photos.component.css']
})
export class UploadPhotosComponent implements OnInit {
  constructor( private FireStorage:AngularFireStorage , private FireStore:AngularFirestore) { }
  selectedFile:any;
  ngOnInit(): void {
  }
  UploadedForm:FormGroup = new FormGroup({
    title:new FormControl(null),
    date: new FormControl(moment()),
    ImageUrl:new FormControl(null)
  })
  ImageName:string | undefined;
  onFileSelected(event:any){
    this.selectedFile = <File>event.target.files[0];
    this.ImageName = this.selectedFile.name;
  }
  UrlPhoto:any;
  addProduct(f:any){
    console.log(this.UploadedForm.value);
    const ImagePath = `gallary/${this.ImageName}`
    console.log(ImagePath);
    const ImageRef = this.FireStorage.ref(ImagePath);
    console.log(ImageRef);
    const UploadFile = this.FireStorage.upload(`gallary/${this.ImageName}` , {Image : this.ImageName } )
    UploadFile.snapshotChanges().pipe(finalize(() => {
      this.UrlPhoto = ImageRef.getDownloadURL();
      this.UrlPhoto.subscribe((ImageName: any) => {
        this.FireStore.collection('photos').add({
          title:this.UploadedForm.value.title,
          ImageName,
          date:moment().format('MMM DD YYYY , H:MM:SS A')
        })
      })
    })).subscribe();
  }

}
