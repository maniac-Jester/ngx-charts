import {
  Component,
  Input,
  Output,
  ChangeDetectionStrategy,
  HostListener,
  EventEmitter
} from '@angular/core';
import {trimLabel} from "@swimlane/ngx-charts/common/trim-label.helper";

@Component({
  selector: 'ngx-charts-legend-entry',
  template: `
    <span [title]="formattedLabel" tabindex="-1" [class.active]="isActive" (click)="select.emit(formattedLabel)">
      <span class="legend-label-color" [style.background-color]="color" (click)="toggle.emit(formattedLabel)"> </span>
      <span class="legend-label-text">
        {{ labelTrim ? trimLabel(label, labelTrimSize) : trimmedLabel }}
      </span>
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LegendEntryComponent {
  @Input() color: string;
  @Input() label: string;
  @Input() formattedLabel: string;
  @Input() isActive: boolean = false;
  @Input() labelTrim: boolean = false;
  @Input() labelTrimSize: number = 10;

  @Output() select: EventEmitter<string> = new EventEmitter();
  @Output() activate: EventEmitter<{ name: string }> = new EventEmitter();
  @Output() deactivate: EventEmitter<{ name: string }> = new EventEmitter();
  @Output() toggle: EventEmitter<string> = new EventEmitter();

  trimLabel: (label: string, max?: number) => string;

  constructor() {
    this.trimLabel = trimLabel;
  }

  get trimmedLabel(): string {
    return this.formattedLabel || '(empty)';
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.activate.emit({ name: this.label });
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.deactivate.emit({ name: this.label });
  }
}
