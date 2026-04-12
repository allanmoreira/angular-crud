import {Component, OnInit, inject} from '@angular/core';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {Cliente} from "./cliente";
import {ClienteService} from "../service/cliente.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgxMaskDirective, provideNgxMask} from "ngx-mask";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NotificacaoComponent} from "../notificacao/notificacao.component";
import {BrasilApiService} from "../service/brasilapi.service";
import {Estado, Municipio} from "../service/brasilapi.models";
import {MatOption, MatSelect, MatSelectChange} from "@angular/material/select";

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
        MatIcon,
        NgxMaskDirective,
        MatSelect,
        MatOption
    ],
    providers: [
        provideNgxMask()
    ],
    templateUrl: './cadastro.html',
    styleUrl: './cadastro.scss',
})
export class Cadastro implements OnInit {

    cliente: Cliente = Cliente.newClient();
    edicao: boolean = false;
    estados: Estado[] = [];
    municipios: Municipio[] = [];

    constructor(
        private clienteService: ClienteService,
        private notificacao: NotificacaoComponent,
        private route: ActivatedRoute,
        private router: Router,
        private brasilApiService: BrasilApiService
    ) {
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            let id = params['id'];
            let cliente = this.clienteService.pesquisaPorId(id);
            this.edicao = cliente !== null && cliente !== undefined;
            if (this.edicao) {
                this.cliente = cliente || Cliente.newClient();
                if(this.cliente.uf)
                    this.consultaMunicipios({value: this.cliente.uf} as MatSelectChange);
            }
            this.consultaUFs();
        });
    }

    salvar() {
        if (this.edicao) {
            this.clienteService.editar(this.cliente);
            this.router.navigate(['/consulta']);
        } else {
            this.clienteService.salvar(this.cliente);
            this.notificacao.notificar("Cliente cadastrado com sucesso!");
        }
        this.cliente = Cliente.newClient();
    }

    consultaUFs() {
        this.brasilApiService.getUFs().subscribe({
            next: estados => this.estados = estados,
            error: erro => this.notificacao.notificar(erro.message)
        });
    }

    consultaMunicipios(event: MatSelectChange){
        let uf = event.value;
        this.brasilApiService.getMunicipios(uf).subscribe({
            next: response => this.municipios = response,
            error: erro => this.notificacao.notificar(erro.message)
        });
    }
}
