import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PingService {
  private pingUrl: string = 'https://localhost:44314/api/ping';

  constructor(private http: HttpClient) {}

  get ping(): Observable<string> {
    return this.http.get<string>(this.pingUrl);
  }
}

export default PingService;
