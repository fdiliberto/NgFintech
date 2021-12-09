export interface Tax {
    nome: string;
    cognome: string;
    dataNascita: string;
    sesso: string;
    cittaNascita: string;
    provinciaNascita: string;
    codiceFiscale: string;
    erarioList: Erario[];
    inpsList: Inps[]
}

export interface Erario {
    codiceTributo: string;
    annoRif: string;
    importoDebito: number;
    importoCredito: number;
}

export interface Inps {
    codiceSede: string;
    causaleContributo: string;
    codiceInps: string;
    dataDa: string;
    dataA: string;
    debito: number;
    credito: number;
}
