import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  constructor(private _httpClient: HttpClient) {}

  public getReadMe(url: string): Observable<string> {
    return this._httpClient.get(url).pipe(map((m: any) => atob(m.content)));
  }
}
