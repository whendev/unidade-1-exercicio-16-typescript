
export class Produto {
  constructor(private codigo: number, private descricao: string,
   private unidade: string, private valor_unitario: number, private substiuicao_tributaria: string){}

   public getCodigo(): number {
      return this.codigo;
    }

    public getDescricao(): string {
      return this.descricao;
    }

    public getUnidade(): string {
      return this.unidade;
    }

    public getValorUnitario(): number {
      return this.valor_unitario;
    }

    public getSubstituicaoTributaria(): string {
      return this.substiuicao_tributaria;
    }
}