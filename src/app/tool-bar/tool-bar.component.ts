import { Component, inject, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-tool-bar',
  imports: [MatIcon, RouterModule],
  templateUrl: './tool-bar.component.html',
  styleUrl: './tool-bar.component.scss'
})
export class ToolBarComponent {

  barIsOpened = signal(false)

  private readonly router = inject(Router)

  redirect(path: string) {
    this.router.navigate([path])
  }

  changeStatusBar() {
    this.barIsOpened.update(status => !status)
  }

}
