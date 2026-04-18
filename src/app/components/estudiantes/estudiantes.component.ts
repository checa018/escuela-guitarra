import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './estudiantes.component.html',
  styleUrl: './estudiantes.component.css',
})
export class EstudiantesComponent implements OnInit {

  estudiantes: any[] = [];
  nuevo: any = {};
  editando: boolean = false;
  idEditar: number | null = null;

  constructor(private db: DbService) {}

  ngOnInit() {
    this.obtener();
  }

  async obtener() {
    const database = await this.db.getDB();
    const tx = database.transaction('estudiantes', 'readonly');
    const store = tx.objectStore('estudiantes');

    const request = store.getAll();
    request.onsuccess = () => {
      this.estudiantes = request.result;
    };
  }

  async guardar() {
    const database = await this.db.getDB();
    const tx = database.transaction('estudiantes', 'readwrite');
    const store = tx.objectStore('estudiantes');

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

  editar(est: any) {
    this.nuevo = { ...est };
    this.editando = true;
    this.idEditar = est.id;
  }

  eliminar(id: number) {
    this.db.getDB().then(db => {
      const tx = db.transaction('estudiantes', 'readwrite');
      const store = tx.objectStore('estudiantes');
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