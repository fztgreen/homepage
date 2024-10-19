import {
  Component,
  DestroyRef,
  DoCheck,
  inject,
  OnChanges,
  OnInit
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule
  ],
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss'
})
export class StoreComponent implements OnInit, DoCheck {
  _destroyRef: DestroyRef = inject(DestroyRef);
  products: MenuEntry[] = [];
  services: MenuEntry[] = [];
  isBaseStorePage!: boolean;

  constructor(private _router: Router) {}

  ngOnInit(): void {
    this.products = [
      { name: 'Computers', slug: 'computers' },
      { name: 'Used', slug: 'used' },
      { name: 'Sale', slug: 'sale' }
    ];
    this.services = [
      { name: 'Computer Build', slug: 'computer-build' },
      { name: 'Tech Support', slug: 'tech-support' },
      { name: 'Website Build', slug: 'website-build' }
    ];
  }

  ngDoCheck(): void {
    this.isBaseStorePage =
      this._router.url.split('/')[this._router.url.split('/').length - 1] ==
      'store';
  }
}

export class MenuEntry {
  public slug!: string;
  public name!: string;
}
