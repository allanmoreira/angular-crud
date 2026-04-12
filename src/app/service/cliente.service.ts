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

    editar(cliente: Cliente) {
        const storage = this.getStorage();
        storage.forEach(storage => {
            if(storage.id === cliente.id) {
                Object.assign(storage, cliente);
            }
        });
        localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
    }

    pesquisar(nome: string): Cliente[] {
        let clientes = this.getStorage();
        if(nome)
            clientes = clientes.filter(cliente => cliente.nome?.toLowerCase().includes(nome.toLowerCase()));
        return clientes;
    }

    pesquisaPorId(id: string): Cliente | undefined {
        return this.getStorage().find(cliente => cliente.id === id);
    }

    private getStorage(): Cliente[] {
        const repositorio = localStorage.getItem(ClienteService.REPO_CLIENTES);
        if (repositorio)
            return JSON.parse(repositorio);
        const clientes: Cliente[] = [];
        localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes));
        return clientes;
    }

    deletar(id: string) {
        let storage = this.getStorage();
        let novaLista = storage.filter(cliente => cliente.id !== id);
        localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(novaLista));
    }
}
