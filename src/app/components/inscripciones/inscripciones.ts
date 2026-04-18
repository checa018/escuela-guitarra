import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-inscripciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inscripciones.html',
  styleUrl: './inscripciones.css',
})
export class InscripcionesComponent implements OnInit {

  estudiantes: any[] = [];
  cursos: any[] = [];
  inscripciones: any[] = [];

  nueva: any = {
    estudianteId: '',
    cursoId: ''
  };

  constructor(private db: DbService) {}

  ngOnInit() {
    this.cargarTodo();
  }

  async cargarTodo() {
    const db = await this.db.getDB();

    // estudiantes
    let tx1 = db.transaction('estudiantes', 'readonly');
    let estStore = tx1.objectStore('estudiantes');
    estStore.getAll().onsuccess = (e: any) => {
      this.estudiantes = e.target.result;
    };

    // cursos
    let tx2 = db.transaction('cursos', 'readonly');
    let cursoStore = tx2.objectStore('cursos');
    cursoStore.getAll().onsuccess = (e: any) => {
      this.cursos = e.target.result;
    };

    // inscripciones
    let tx3 = db.transaction('inscripciones', 'readonly');
    let insStore = tx3.objectStore('inscripciones');
    insStore.getAll().onsuccess = (e: any) => {
      this.inscripciones = e.target.result;
    };
  }

  async guardar() {
    const db = await this.db.getDB();
    const tx = db.transaction('inscripciones', 'readwrite');
    const store = tx.objectStore('inscripciones');

    store.add(this.nueva);

    this.nueva = { estudianteId: '', cursoId: '' };
    this.cargarTodo();
  }

  eliminar(id: number) {
    this.db.getDB().then(db => {
      const tx = db.transaction('inscripciones', 'readwrite');
      const store = tx.objectStore('inscripciones');
      store.delete(id);
      this.cargarTodo();
    });
  }

  // 🔥 obtener nombres
  getNombreEstudiante(id: number) {
    const est = this.estudiantes.find(e => e.id == id);
    return est ? est.nombre + ' ' + est.apellido : '---';
  }

  getNombreCurso(id: number) {
    const curso = this.cursos.find(c => c.id == id);
    return curso ? curso.nombreCurso : '---';
  }
}