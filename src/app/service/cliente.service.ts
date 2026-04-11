import {Injectable} from '@angular/core';
import {Cliente} from "../cadastro/cliente";

@Injectable({
    providedIn: 'root',
})
export class ClienteService {

    static REPO_CLIENTES = '_CLIENTES';

    salvar(cliente: Cliente) {
        let storage = this.getStorage();
        storage.push(cliente);
        localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
    }

    pesquisar(nome: string): Cliente[] {
        return this.getStorage();
    }

    private getStorage(): Cliente[] {
        const repositorio = localStorage.getItem(ClienteService.REPO_CLIENTES);
        if (repositorio)
            return JSON.parse(repositorio);
        const clientes: Cliente[] = [];
        localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes));
        return clientes;
    }
}
