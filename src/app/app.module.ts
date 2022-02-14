import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { RatingModule } from 'ngx-bootstrap/rating';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxPubSubModule } from '@pscoped/ngx-pub-sub';

//Interceptor
import { HttpConfig } from './http/http.interceptor';

//Modules
import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './modules/admin/admin.module';
import { SharableModule } from './modules/sharable/sharable.module';

//Services
import { AuthGuardService } from './services/auth-guard.service';
import { AuthRedirectService } from './services/auth-redirect.service';

//Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MustMatchDirective } from './directives/password-confirm-match.directive';
import { HeaderComponent } from './components/header/header.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { FabricExampleComponent } from './components/fabric-example/fabric-example.component';
import { FormComponent } from './components/form/form.component';
import { HollywoodComponent } from './components/hollywood/hollywood.component';
import { BollywoodComponent } from './components/bollywood/bollywood.component';
import { TictoegameComponent } from './components/tictoegame/tictoegame.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    MustMatchDirective,
    HeaderComponent,
    UserProfileComponent,
    NotFoundComponent,
    QuizComponent,
    FabricExampleComponent,
    FormComponent,
    HollywoodComponent,
    BollywoodComponent,
    TictoegameComponent,
  ],
  imports: [
    BrowserModule,
    AdminModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    RatingModule.forRoot(),
    TabsModule.forRoot(),
    SharableModule,
    NgxPubSubModule
  ],
  providers: [
    AuthGuardService,
    AuthRedirectService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfig, multi: true }
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
