import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProducerWinInterval } from '../../../../core/models/movie.model';

@Component({
  selector: 'app-producer-win-interval',
  templateUrl: './producer-win-interval.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProducerWinIntervalComponent {
  @Input() maxIntervals: ProducerWinInterval[] = [];
  @Input() minIntervals: ProducerWinInterval[] = [];
}
