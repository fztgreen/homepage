import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-store-service',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './store-service.component.html',
  styleUrl: './store-service.component.scss',
})
export class StoreServiceComponent implements OnInit {
  _destroyRef: DestroyRef = inject(DestroyRef);
  name!: string;

  constructor(private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this._route.url
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((url) => (this.name = url[url.length - 1].path));
  }
}
