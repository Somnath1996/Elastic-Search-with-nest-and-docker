import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'client';
  value;
  searchValue;
  CId;
  CTitle;
  CDescription
  SId
  Skey 
  Svalue
  private url = 'http://localhost:3000';
  filteredOptions
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.http.get(`${this.url}/esm-health-check`).subscribe((val) => {
      console.log('****', val);
    });
  }

  onsearch() {
    this.http
      .post(`${this.url}/search`, { query: this.searchValue })
      .subscribe((val: any) => {
        let modifiedRes = val.results.map((res) => {
          return res._source.title
        });

        this.filteredOptions=modifiedRes
      });
  }

  onCreate(){
    this.http
    .post(`${this.url}/create-index`, { data:{
      id:this.CId,
      body:{
        title:this.CTitle,
        description:this.CDescription
      }
    }})
    .subscribe((val: any) => {
 console.log("#CREATED#",val)

     
    });
  }

  onUpdate(){
    this.http
    .put(`${this.url}/update`, { data:{
      id:this.SId,
      body:{
     [this.Skey]:this.Svalue
      }
    }})
    .subscribe((val: any) => {
 console.log("#UPDATED#",val)

     
    });
  }
}
