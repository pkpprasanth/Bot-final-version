import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {



  private baseUrl = 'http://localhost:8090/event';
  private base = 'http://localhost:8090/details';

  constructor(private http: HttpClient) { }

  getMassage(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  putdetail(name1 :string,id1:string) {
    console.log("data",name1,id1)
    const obj = {name: name1, id: id1};
    return this.http.post(`${this.base}`,obj);
  }
  
  getEmployeeById(id: string): Observable<any>{
    return this.http.get(`${this.base}/${id}`);
  }
}
