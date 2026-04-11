import {Component, OnInit} from '@angular/core';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {Cliente} from "./cliente";
import {ClienteService} from "../service/cliente.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-cadastro',
    imports: [
        FlexLayoutModule,
        MatCard,
        MatCardTitle,
        MatCardHeader,
        FormsModule,
        MatCardContent,
        MatFormField,
        MatLabel,
        MatInput,
        MatButton,
        MatCardActions,
        MatIcon
    ],
    templateUrl: './cadastro.html',
    styleUrl: './cadastro.scss',
})
export class Cadastro implements OnInit{

    cliente: Cliente = Cliente.newClient();
    edicao: boolean = false;

    constructor(
        private clienteService: ClienteService,
        private route: ActivatedRoute,
        private router: Router) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            let id = params['id'];
            let cliente = this.clienteService.pesquisaPorId(id);
            this.edicao = cliente !== null && cliente !== undefined;
            if(this.edicao)
                this.cliente = cliente || Cliente.newClient();
        });
    }

    salvar(){
        if(this.edicao) {
            this.clienteService.editar(this.cliente);
            this.router.navigate(['/consulta']);
        } else {
            this.clienteService.salvar(this.cliente);
        }
        this.cliente = Cliente.newClient();
    }
}
