import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
  ],
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss',
})
export class StoreComponent implements OnInit {
  products: MenuEntry[] = [];
  services: MenuEntry[] = [];

  ngOnInit(): void {
    this.products = [
      { name: 'Computers', slug: 'computers' },
      { name: 'Used', slug: 'used' },
      { name: 'Sale', slug: 'sale' },
    ];
    this.services = [
      { name: 'Computer Build', slug: 'computer-build' },
      { name: 'Tech Support', slug: 'tech-support' },
      { name: 'Website Build', slug: 'website-build' },
    ];
  }
}

export class MenuEntry {
  public slug!: string;
  public name!: string;
}
