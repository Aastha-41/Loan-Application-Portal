import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { LoanState } from './app/state/loan.state';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(NgxsModule.forRoot([LoanState]))
  ]
});
  
