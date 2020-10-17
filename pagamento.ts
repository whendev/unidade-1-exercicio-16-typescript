
export class Pagamento {
  constructor(private valor: number, private forma: number, private valor_total_venda: number){}

  public get_valor_pagamento(){
    return this.valor;
  }

  public get_troco(): number {
    if(this.forma == 2 || this.forma == 3){
      return 0;
    }

    return this.valor - this.valor_total_venda;
    
  }

  public get_forma_pagamento(): string {
    switch (this.forma) {
      case 1:
        return "Dinheiro"
      case 2:
        return "Credito"
      case 3:
        return "Debito"
      default:
        break;
    }
  }

} 
