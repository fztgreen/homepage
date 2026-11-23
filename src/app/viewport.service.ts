import { Injectable } from '@angular/core';

// Keep in sync with $mobile-width in _variables.scss. The stylesheets use
// max-width, which includes the breakpoint itself, so this does too.
const mobileWidth = 700;

@Injectable({
  providedIn: 'root'
})
export class ViewportService {
  public isMobileView(): boolean {
    return document.body.offsetWidth <= mobileWidth;
  }
}
