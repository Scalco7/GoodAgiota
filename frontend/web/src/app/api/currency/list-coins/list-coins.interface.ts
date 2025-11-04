export interface IListCoinResponse{
    "@odata.context": any
    value: ICoin[]
}

export interface ICoin {
    simbolo: string
    nomeFormatado: string
}