
const TabelaPricePagina = document.getElementById('tabelaPrice')

let valorTotal
let numeroParcelas
let carencia
let juros
let taxa = juros / 100
let periodoTotal = numeroParcelas + carencia

class Tabela {
    constructor(){
        this.periodo = [];
        this.saldoDevedor = [];
        this.amortizacao =  [];
        this.juros = [];
        this.prestacao = [];
        this.totalJuros = 0;
        this.totalPrestacoes = 0;
    }

    atribuirValoresTabelas(periodo, saldoDevedor, amortizacao, juros, prestacao, totalJuros, totalPrestacoes){
        this.periodo.push(periodo)
        this.saldoDevedor.push(saldoDevedor)
        this.amortizacao.push(amortizacao)
        this.juros.push(juros)
        this.prestacao.push(prestacao)
        this.totalJuros = totalJuros
        this.totalPrestacoes = totalPrestacoes
    }

}

let tabelaSAC = new Tabela()
let tabelaPrice = new Tabela()

function createTableSAC(){
    
    let valorTotalSAC = valorTotal
    let amortizacao = valorTotalSAC / numeroParcelas;
    let jurosParcial, prestacao
    let totalJuros = 0 
    let totalPrestacao = 0

    for(let i = 1; i <= periodoTotal; i++){
        if(carencia != 0 && i <= carencia ){
            jurosParcial = valorTotalSAC * taxa
            prestacao = jurosParcial
            totalJuros = totalJuros + jurosParcial
            totalPrestacao = totalPrestacao + prestacao
            tabelaSAC.atribuirValoresTabelas(i, valorTotalSAC, 0, jurosParcial, prestacao, totalJuros, totalPrestacao)
        } else {
            jurosParcial = valorTotalSAC * taxa
            prestacao = jurosParcial + amortizacao
            valorTotalSAC = valorTotalSAC - amortizacao
            totalJuros = totalJuros + jurosParcial
            totalPrestacao = totalPrestacao + prestacao
            tabelaSAC.atribuirValoresTabelas(i, valorTotalSAC, amortizacao, jurosParcial, prestacao, totalJuros, totalPrestacao)
        }
    }
}

function createTablePrice(){
    
    let valorTotalPrice = valorTotal
    let prestacao =  valorTotalPrice * (((1 + taxa)**numeroParcelas * taxa) / ((1 + taxa)**numeroParcelas -1));
    let amortizacao
    let prestacaoCarencia
    let totalJuros = 0 
    let totalPrestacao = 0

    for(let i = 1; i <= periodoTotal; i++){
        if(carencia != 0 && i <= carencia ){
            jurosParcial = valorTotalPrice * taxa
            totalJuros = totalJuros + jurosParcial
            totalPrestacao = totalPrestacao + prestacao
            tabelaPrice.atribuirValoresTabelas(i, valorTotalPrice, 0, jurosParcial, jurosParcial, totalJuros, totalPrestacao)
        } else {
            jurosParcial = valorTotalPrice * taxa
            amortizacao = prestacao - jurosParcial
            valorTotalPrice = valorTotalPrice - amortizacao
            totalJuros = totalJuros + jurosParcial
            totalPrestacao = totalPrestacao + prestacao
            tabelaPrice.atribuirValoresTabelas(i, valorTotalPrice, amortizacao, jurosParcial, prestacao, totalJuros, totalPrestacao)
        }
    }
}

function renderTableSAC(){
    const TabelaSACPagina = document.getElementById('tabelaSAC')

    for(let i = 0; i < tabelaSAC.periodo.length; i++){
        let tr = TabelaSACPagina.insertRow();
        let td_mes = tr.insertCell();
        let td_saldoDevedor = tr.insertCell();
        let td_amortizacao = tr.insertCell();
        let td_juros = tr.insertCell();
        let td_prestacao = tr.insertCell();

        td_mes.innerText = tabelaSAC.periodo[i].toFixed(2)
        td_saldoDevedor.innerText = tabelaSAC.saldoDevedor[i].toFixed(2)
        td_amortizacao.innerText = tabelaSAC.amortizacao[i].toFixed(2)
        td_juros.innerText = tabelaSAC.juros[i].toFixed(2)
        td_prestacao.innerText = tabelaSAC.prestacao[i].toFixed(2)
    }
}

function renderTablePrice(){
    const TabelaPricePagina = document.getElementById('tabelaPrice')

    for(let i = 0; i < tabelaPrice.periodo.length; i++){
        let tr = TabelaPricePagina.insertRow();
        let td_mes = tr.insertCell();
        let td_saldoDevedor = tr.insertCell();
        let td_amortizacao = tr.insertCell();
        let td_juros = tr.insertCell();
        let td_prestacao = tr.insertCell();

        td_mes.innerText = tabelaPrice.periodo[i].toFixed(2)
        td_saldoDevedor.innerText = tabelaPrice.saldoDevedor[i].toFixed(2)
        td_amortizacao.innerText = tabelaPrice.amortizacao[i].toFixed(2)
        td_juros.innerText = tabelaPrice.juros[i].toFixed(2)
        td_prestacao.innerText = tabelaPrice.prestacao[i].toFixed(2)
    }
}

function inicializarTela(){
    createTableSAC()
    createTablePrice()  
    console.log(tabelaSAC)
    console.log(tabelaPrice)
    renderTableSAC()
    renderTablePrice()
}

function atribuirValoresVariaveis(){
    const inputValorTotal = document.getElementById(valorEmprestimo)
    valorTotal = inputValorTotal.value
    
    
}

console.log(valorTotal)
// inicializarTela()
// createTableSAC()


