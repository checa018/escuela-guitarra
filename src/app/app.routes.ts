import { Routes } from '@angular/router';
import { EstudiantesComponent } from './components/estudiantes/estudiantes.component';
import { CursosComponent } from './components/cursos/cursos';
import { InscripcionesComponent } from './components/inscripciones/inscripciones';

export const routes: Routes = [
  { path: '', redirectTo: 'estudiantes', pathMatch: 'full' },
  { path: 'estudiantes', component: EstudiantesComponent },
  { path: 'cursos', component: CursosComponent },
  { path: 'inscripciones', component: InscripcionesComponent }
];