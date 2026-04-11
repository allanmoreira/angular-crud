import {Component} from '@angular/core';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {Cliente} from "./cliente";
import { ClienteService} from "../service/cliente.service";

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
export class Cadastro {
    cliente: Cliente = Cliente.newClient();

    constructor(private clienteService: ClienteService) {}

    salvar(){
        this.clienteService.salvar(this.cliente);
    }
}
