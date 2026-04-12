import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Estado, Municipio} from "./brasilapi.models";
import {MatSelectChange} from "@angular/material/select";

@Injectable({
  providedIn: 'root',
})
export class BrasilApiService {
    private baseUrl = 'https://brasilapi.com.br/api';

    constructor(private httpClient: HttpClient) {

    }

    getUFs(): Observable<Estado[]>{
      return this.httpClient.get<Estado[]>(this.baseUrl + '/ibge/uf/v1');
    }

    getMunicipios(uf: string): Observable<Municipio[]>{
        return this.httpClient.get<Municipio[]>(this.baseUrl + '/ibge/municipios/v1/' + uf);
    }
}
