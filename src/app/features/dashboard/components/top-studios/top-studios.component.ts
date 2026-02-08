import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { StudioWinCount } from '../../../../core/models/movie.model';

@Component({
  selector: 'app-top-studios',
  templateUrl: './top-studios.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopStudiosComponent {
  @Input() studios: StudioWinCount[] = [];
}
