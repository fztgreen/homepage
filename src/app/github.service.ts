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
      .pipe(map((file) => decodeBase64Utf8(file.content)));
  }
}

// atob returns one character per byte, so multi-byte UTF-8 characters need TextDecoder.
function decodeBase64Utf8(base64: string): string {
  const bytes = Uint8Array.from(atob(base64), (character) =>
    character.charCodeAt(0)
  );
  return new TextDecoder().decode(bytes);
}
