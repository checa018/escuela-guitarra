import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private dbName = 'EscuelaGuitarraDB';
  private isBrowser = typeof window !== 'undefined';

  constructor() {
    if (this.isBrowser) {
      this.initDB();
    }
  }

  initDB() {
    const request = indexedDB.open(this.dbName, 1);

    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;

      db.createObjectStore('estudiantes', { keyPath: 'id', autoIncrement: true });
      db.createObjectStore('cursos', { keyPath: 'id', autoIncrement: true });
      db.createObjectStore('inscripciones', { keyPath: 'id', autoIncrement: true });
    };
  }

  getDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {

      if (!this.isBrowser) {
        reject('IndexedDB no disponible en SSR');
        return;
      }

      const request = indexedDB.open(this.dbName, 1);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject('Error DB');
    });
  }
}