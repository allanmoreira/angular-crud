import {MatSnackBar} from "@angular/material/snack-bar";
import {inject, Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class NotificacaoComponent {

    snackBar: MatSnackBar = inject(MatSnackBar);

    notificar(mensagem: string) {
        this.snackBar.open(mensagem, 'OK', {
            duration: 3000,
            verticalPosition: "top",
        });
    }
}