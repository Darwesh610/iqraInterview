import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private FireStore:AngularFirestore) { }
  getDoc:any;
  getText:any;
  ngOnInit(): void {
   const text = this.FireStore.collection("Text").valueChanges();
    text.subscribe((data) => {
      console.log(data);
      this.getDoc = data[0]
      this.getText = this.getDoc.text
      console.log(this.getText);
    })


  }
  OriginalText:any;
  texteditor(f:any){
    this.OriginalText = f.children[2].children[0].children[0].innerText;
  }
  addText(){
    this.FireStore.collection("Text").add({
      text : this.OriginalText})
  }

}


