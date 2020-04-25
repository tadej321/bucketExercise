import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-bucket',
  templateUrl: './create-bucket.component.html',
  styleUrls: ['./create-bucket.component.css']
})
export class CreateBucketComponent implements OnInit {
  public locations = ["Kranj", "ljubljana", "Bled", "Maribor", "Novo mesto", "Lesce", "Nova Gorica", "Celje"];

  constructor() { }

  ngOnInit() {
  }

}
