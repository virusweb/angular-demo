import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Services
import { AuthGuardService } from './services/auth-guard.service';
import { AuthRedirectService } from './services/auth-redirect.service';

//Components
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FabricExampleComponent } from './components/fabric-example/fabric-example.component';
import { FormComponent } from './components/form/form.component';
import { TictoegameComponent } from './components/tictoegame/tictoegame.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthRedirectService],
    component: LoginComponent
  },
  {
    path: 'register',
    canActivate: [AuthRedirectService],
    component: RegisterComponent,
  },
  {
    path: 'home',
    canActivate: [AuthGuardService],
    component: HomeComponent,
  },
  {
    path: 'my-profile',
    canActivate: [AuthGuardService],
    component: UserProfileComponent,
  },
  {
    path: 'quiz',
    canActivate: [AuthGuardService],
    component: QuizComponent,
  },
  {
    path: 'fabric-example',
    component: FabricExampleComponent,
  },
  {
    path: 'movies',
    component: FormComponent,
  },
  {
    path: 'tic-toe-game',
    component: TictoegameComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}