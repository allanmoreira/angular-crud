import {Component, OnInit} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {Cliente} from "../cadastro/cliente";
import {ClienteService} from "../service/cliente.service";
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
    MatTable
} from "@angular/material/table";
import {Router} from "@angular/router";

@Component({
  selector: 'app-consulta',
    imports: [
        FlexModule,
        MatCard,
        MatCardHeader,
        MatCardTitle,
        FormsModule,
        MatCardContent,
        MatFormField,
        MatLabel,
        MatInput,
        MatCardActions,
        MatIcon,
        MatButton,
        MatTable,
        MatColumnDef,
        MatHeaderCell,
        MatCell,
        MatHeaderCellDef,
        MatCellDef,
        MatHeaderRow,
        MatHeaderRowDef,
        MatRow,
        MatRowDef,
        MatIconButton
    ],
  templateUrl: './consulta.html',
  styleUrl: './consulta.scss',
})
export class Consulta implements OnInit {

    nomeBusca: string = '';
    listaClientes: Cliente[] = [];
    colunasTable: string[] = ['id', 'nome', 'cpf', 'email', 'dataNascimento', 'acoes'];

    constructor(
        private clienteService: ClienteService,
        private router: Router,) {}

    ngOnInit(): void {
        this.pesquisar();
    }

    pesquisar() {
        this.listaClientes = this.clienteService.pesquisar(this.nomeBusca);
    }

    editar(id: string) {
        this.router.navigate(['/cadastro'], { queryParams: { id } });
    }

    confirmaDeletar(cliente: Cliente) {
        cliente.deletar = true;
    }

    deletar(id: string){
        this.clienteService.deletar(id);
        this.pesquisar();
    }
}
