import { Component, HostListener, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SupportModalService } from 'src/app/services/support-modal.service';

@Component({
  selector: 'app-support-modal',
  templateUrl: './support-modal.component.html',
  styleUrls: ['./support-modal.component.css']
})
export class SupportModalComponent implements OnDestroy {
  public readonly alias = 'comu.LEMON';
  public readonly cafecitoUrl = 'https://cafecito.app/comusenias';

  public isOpen = false;
  public aliasCopied = false;

  private subscription: Subscription;
  private copyResetTimer?: ReturnType<typeof setTimeout>;

  constructor(private supportModalService: SupportModalService) {
    this.subscription = this.supportModalService.isOpen$.subscribe((open) => {
      this.isOpen = open;
      if (!open) {
        this.aliasCopied = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    if (this.copyResetTimer) {
      clearTimeout(this.copyResetTimer);
    }
  }

  @HostListener('document:keydown.escape')
  onEscapePress(): void {
    if (this.isOpen) {
      this.close();
    }
  }

  close(): void {
    this.supportModalService.close();
  }

  copyAlias(): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(this.alias).then(
        () => this.markCopied(),
        () => this.fallbackCopy()
      );
    } else {
      this.fallbackCopy();
    }
  }

  private fallbackCopy(): void {
    if (typeof document === 'undefined') {
      return;
    }
    const textarea = document.createElement('textarea');
    textarea.value = this.alias;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      this.markCopied();
    } finally {
      document.body.removeChild(textarea);
    }
  }

  private markCopied(): void {
    this.aliasCopied = true;
    if (this.copyResetTimer) {
      clearTimeout(this.copyResetTimer);
    }
    this.copyResetTimer = setTimeout(() => {
      this.aliasCopied = false;
    }, 2500);
  }
}
