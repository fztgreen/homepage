import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-download',
  standalone: true,
  imports: [MatButtonModule, MatListModule, MatIconModule],
  templateUrl: './download.component.html',
  styleUrl: './download.component.scss'
})
export class DownloadComponent {
  file: File | undefined;

  public uploadFile(event: any): void {
    this.file = event.target.files[0];
    localStorage.setItem('upload', JSON.stringify(this.file));
  }

  public downloadFile(): void {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', `assets/downloads/${this.file?.name}`);
    link.setAttribute('download', `${this.file?.name}`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}
