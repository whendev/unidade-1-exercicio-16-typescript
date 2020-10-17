import { Loja } from "./loja"
import { Produto } from "./produto";
import { Item } from "./item";
import { Pagamento } from "./pagamento";

export class Venda {
  constructor(private loja: Loja,private datahora: string, private ccf: string,private coo: string,private itens: Array<Item> = [], private pagamento: Pagamento = null){}

  public isNullOrEmpty(s: String): boolean {
    return s == null || s.length == 0;
  }

  public validar_campos_obrigatorios(): void{
    if (this.isNullOrEmpty(this.ccf)) {
      throw new Error(`O campo ccf da venda é obrigatório`);
    }
    
    if (this.isNullOrEmpty(this.coo)) {
      throw new Error(`O campo coo da venda é obrigatório`);
    }

    if (this.isNullOrEmpty(this.datahora)) {
      throw new Error(`O campo data da venda é obrigatório`);
    }

    if (this.itens.length <= 0) {
      throw new Error(`Voce precisa adicionar itens a sua venda`);
    }

    if (this.pagamento == null) {
      throw new Error(`Voce precisa realizar o pagamento para imprimir o cupom`);
    }
  }

  public valida_item(item: Number, produto: Produto, quantidade: number): void {
    this.itens.forEach(i => {
      if (i.getItem() != item && i.getProduto().getCodigo() == produto.getCodigo()){
        throw new Error(`Voce não pode inserir o mesmo produto com itens diferentes`);
      }
    });

    if (quantidade <= 0){
      throw new Error(`Insira a quantidade de itens"`);
    }

    if (produto.getValorUnitario() <= 0) {
      throw new Error(`item não pode ser adicionado na venda com produto nesse estado`);
    }
  }

  public pagar(valor: number, forma: number) {
    if(forma == 0 || forma > 3){
      throw new Error("Forma de pagamento invalida");
    }
    if(this.pagamento == null){
      let valor_venda_total = this.calcular_total();
      if(valor >= valor_venda_total){
        this.pagamento = new Pagamento(valor, forma, valor_venda_total);
      } else {
        throw new Error("O valor da compra é maior que o pagamento!");
      }
      
    } else {
      throw new Error("Já existe um pagamento nesta venda");
    }
  }

  public adicionar_item(item: number, produto: Produto, quantidade: number) {
    this.valida_item(item, produto, quantidade);
    let item_venda: Item = new Item(this, item, produto, quantidade);
    this.itens.push(item_venda);
  }

  public dados_itens(): string {
    let _dados = `ITEM CODIGO DESCRICAO QTD UN VL UNIT(R$) ST VL ITEM(R$)\n`
    this.itens.forEach(i => {
      _dados = _dados + i.dados_item();
    });
    return _dados;
  }


  public calcular_total(): number{
    let total = 0;
    this.itens.forEach(i => {
      total += i.valorItem();
    })
    return total;
  }

  public dadosVenda(): String
  {
    this.validar_campos_obrigatorios();
    return `${this.datahora}V CCF:${this.ccf} COO: ${this.coo}`;
  }

  public imprimeCupom(): string{
    this.validar_campos_obrigatorios();
    let dadosLoja = this.loja.dados_loja();
    let dadosVenda = this.dadosVenda();
    let total = this.calcular_total().toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    let dados_pagamento_forma = this.pagamento.get_forma_pagamento();
    let dados_pagamento_valor = this.pagamento.get_valor_pagamento().toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    let dados_pagamento_troco = this.pagamento.get_troco().toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    return `${dadosLoja}------------------------------
${dadosVenda}
CUPOM FISCAL
${this.dados_itens()}------------------------------
TOTAL R$ ${total}
${dados_pagamento_forma} ${dados_pagamento_valor}
Troco R$ ${dados_pagamento_troco}`;
  }
}