import { Component } from '@angular/core';
import { SupportModalService } from 'src/app/services/support-modal.service';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css']
})
export class LinksComponent {
  constructor(private supportModalService: SupportModalService) {}

  openSupportModal(): void {
    this.supportModalService.open();
  }
}
