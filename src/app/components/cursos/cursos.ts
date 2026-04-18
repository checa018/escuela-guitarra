import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cursos.html',
  styleUrl: './cursos.css',
})
export class CursosComponent implements OnInit {

  cursos: any[] = [];
  nuevo: any = {};
  editando: boolean = false;
  idEditar: number | null = null;

  constructor(private db: DbService) {}

  ngOnInit() {
    this.obtener();
  }

  async obtener() {
    const database = await this.db.getDB();
    const tx = database.transaction('cursos', 'readonly');
    const store = tx.objectStore('cursos');

    const request = store.getAll();
    request.onsuccess = () => {
      this.cursos = request.result;
    };
  }

  async guardar() {
    const database = await this.db.getDB();
    const tx = database.transaction('cursos', 'readwrite');
    const store = tx.objectStore('cursos');

    if (this.editando && this.idEditar !== null) {
      store.put({ ...this.nuevo, id: this.idEditar });
    } else {
      store.add(this.nuevo);
    }

    this.nuevo = {};
    this.editando = false;
    this.idEditar = null;
    this.obtener();
  }

  editar(curso: any) {
    this.nuevo = { ...curso };
    this.editando = true;
    this.idEditar = curso.id;
  }

  eliminar(id: number) {
    this.db.getDB().then(db => {
      const tx = db.transaction('cursos', 'readwrite');
      const store = tx.objectStore('cursos');
      store.delete(id);
      this.obtener();
    });
  }

  cancelar() {
    this.nuevo = {};
    this.editando = false;
    this.idEditar = null;
  }
}