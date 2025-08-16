import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SubjectComponent } from './subject/subject.component';
import { LearnComponent } from './learn/learn.component';

export const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "", component: SubjectComponent },
    { path: "account", component: SubjectComponent },
    { path: "timeline", component: SubjectComponent },
    { path: "subjects", component: SubjectComponent },
    { path: "subjects/:id/learn", component: LearnComponent },
    { path: "reviews", component: SubjectComponent },
    { path: "todos", component: SubjectComponent },
    { path: "*", component: SubjectComponent }
];
