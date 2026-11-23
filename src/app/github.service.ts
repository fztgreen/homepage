import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';

interface GithubFileContent {
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private _httpClient = inject(HttpClient);

  public getReadMe(url: string): Observable<string> {
    return this._httpClient
      .get<GithubFileContent>(url)
      .pipe(map((file) => atob(file.content)));
  }
}
