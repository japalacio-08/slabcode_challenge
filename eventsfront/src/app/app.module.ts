import { HomePage } from './pages/home/home';
import { BrowserModule, Title } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';

import { HeaderComponent } from './components/header/header.component';
import { BaseMaterialModule } from './components/material-module';
import {MatNativeDateModule} from '@angular/material/core';
import { CalendarComponent } from './components/calendar/calendar.component';
import { EventService } from './services/event.service';
import { HttpClientModule } from '@angular/common/http';
import { LetDirective } from './directives/let.directive';
import { EventDetailPage } from './pages/event_detail/event_detail';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectFilterModule } from 'mat-select-filter';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,
    CalendarComponent,
    // Directives
    LetDirective,
    // Pages
    HomePage,
    EventDetailPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BaseMaterialModule,
    MatNativeDateModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectFilterModule
  ],
  entryComponents: [HeaderComponent, CalendarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    EventService,
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private router: Router, private titleService: Title, private route: ActivatedRoute) {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        const title = 'Events App | ' + this.route.snapshot.firstChild.data.title;
        this.titleService.setTitle(title);
      }
    });
  }
}
