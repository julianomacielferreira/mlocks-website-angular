/*
 * The MIT License
 *
 * Copyright 2019 Juliano Maciel Ferreira.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
  Directive,
  ViewChildren,
  QueryList,
} from "@angular/core";

/**
 * Directive created only to support ViewChildren selector by CSS class name
 */
@Directive({
  // tslint:disable-next-line: directive-selector
  selector: ".nav-item",
})
export class NavItemDirective {
  constructor() {}
}

@Component({
  selector: "mlocks-menu",
  templateUrl: "./menu.component.html",
})
export class MenuComponent implements OnInit {
  private showMenu: boolean;

  @ViewChild("menuBtn", { static: true })
  private menuBtn: ElementRef;

  @ViewChild("menu", { static: true })
  private menu: ElementRef;

  @ViewChild("menuNav", { static: true })
  private menuNav: ElementRef;

  @ViewChild("menuBranding", { static: true })
  private menuBranding: ElementRef;

  @ViewChildren(NavItemDirective, { read: ElementRef })
  private navItens: QueryList<ElementRef>;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {}

  public toogleMenu(): void {
    const closeCSS = "close";
    const showCSS = "show";

    if (!this.showMenu) {
      this.renderer.addClass(this.menuBtn.nativeElement, closeCSS);
      this.renderer.addClass(this.menu.nativeElement, showCSS);
      this.renderer.addClass(this.menuNav.nativeElement, showCSS);
      this.renderer.addClass(this.menuBranding.nativeElement, showCSS);

      this.navItens.forEach((item) =>
        this.renderer.addClass(item.nativeElement, showCSS)
      );

      // Set menu state
      this.showMenu = true;
    } else {
      this.renderer.removeClass(this.menuBtn.nativeElement, closeCSS);
      this.renderer.removeClass(this.menu.nativeElement, showCSS);
      this.renderer.removeClass(this.menuNav.nativeElement, showCSS);
      this.renderer.removeClass(this.menuBranding.nativeElement, showCSS);

      this.navItens.forEach((item) =>
        this.renderer.removeClass(item.nativeElement, showCSS)
      );

      // Set menu state
      this.showMenu = false;
    }
  }
}
