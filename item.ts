import { Venda } from "./venda";
import { Produto } from "./produto";


export class Item {
  constructor(private venda: Venda, private item: number,
    private produto: Produto, private quantidade: number){}

    public getProduto(): Produto {
        return this.produto;
    }

    public getItem(): number {
        return this.item;
    }

    public getQuantidade(): number {
        return this.quantidade;
    }

    public valorItem(): number {
        return this.quantidade * this.produto.getValorUnitario();
    }

    public dados_item(): string {
      return `${this.getItem()} ${this.produto.getCodigo()} ${this.produto.getDescricao()} ${this.getQuantidade()} ${this.produto.getUnidade()} ${this.produto.getValorUnitario().toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 })} ${this.produto.getSubstituicaoTributaria()} ${this.valorItem().toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 })}\n`;
    }
}