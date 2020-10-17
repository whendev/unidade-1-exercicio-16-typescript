export class Endereco {

  constructor(public logradouro: string, public numero: number, public complemento: string,
      public bairro: string, public municipio: string, public estado: string, public cep: string) { }

   public isNullOrEmpty(s: String): boolean {
      return s == null || s.length == 0;
  }

  public validar_campos_obrigatorios(): void{
      
      if (this.logradouro == "") {
          throw new Error(`O campo logradouro do endereço é obrigatório`);
      }
  
      if (this.municipio == "") {
          throw new Error(`O campo município do endereço é obrigatório`);
      }
  
      if (this.estado == "") {
          throw new Error(`O campo estado do endereço é obrigatório`);
      }
  }

  public dados_endereco(){

      this.validar_campos_obrigatorios();

      let _COMPLEMENTO = "";
      if (this.complemento != ""){
          _COMPLEMENTO = " " + this.complemento;
      }

      let _BAIRRO = "";
      if (this.bairro != "") {
          _BAIRRO = this.bairro + " - ";
      }

      let _CEP = (this.isNullOrEmpty(this.cep) ? "" : "CEP:" + this.cep);

      let _NUMERO;
      if (this.numero != 0){
          _NUMERO = this.numero;
      }

      if (this.numero == 0 || this.numero == null){
          _NUMERO = "s/n";
      }

      let show = `${this.logradouro}, ${_NUMERO}${_COMPLEMENTO}
${_BAIRRO}${this.municipio} - ${this.estado}
${_CEP}`;

      return show;
  }
}