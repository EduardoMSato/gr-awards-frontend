import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { YearWithMultipleWinners } from '../../../../core/models/movie.model';

@Component({
  selector: 'app-years-multiple-winners',
  templateUrl: './years-multiple-winners.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YearsMultipleWinnersComponent {
  @Input() years: YearWithMultipleWinners[] = [];
}
