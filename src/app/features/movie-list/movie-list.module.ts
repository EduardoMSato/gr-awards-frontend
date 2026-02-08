import { NgModule } from '@angular/core';
import { MovieListRoutingModule } from './movie-list-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MovieListComponent } from './movie-list.component';

@NgModule({
  declarations: [MovieListComponent],
  imports: [SharedModule, MovieListRoutingModule],
})
export class MovieListModule {}
