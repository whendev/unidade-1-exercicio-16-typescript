import { Loja } from './loja';
import { Endereco } from './endereco';


function verificaCampoObrigatorio(mensagemEsperada: string, loja: Loja) {
  try {
    loja.dados_loja();
  } catch (e) {
    expect(e.message).toBe(mensagemEsperada);
  }
}

// Todas as variáveis preenchidas
const NOME_LOJA = "Loja 1"
const LOGRADOURO = "Log 1"
const NUMERO = 10
const COMPLEMENTO = "C1"
const BAIRRO = "Bai 1"
const MUNICIPIO = "Mun 1"
const ESTADO = "E1"
const CEP = "11111-111"
const TELEFONE = "(11) 1111-1111"
const OBSERVACAO = "Obs 1"
const CNPJ = "11.111.111/1111-11"
const INSCRICAO_ESTADUAL = "123456789"

const TEXTO_ESPERADO_LOJA_COMPLETA: string = `Loja 1
Log 1, 10 C1
Bai 1 - Mun 1 - E1
CEP:11111-111 Tel (11) 1111-1111
Obs 1
CNPJ: 11.111.111/1111-11
IE: 123456789
`;

const TEXTO_ESPERADO_SEM_NUMERO: string = `Loja 1
Log 1, s/n C1
Bai 1 - Mun 1 - E1
CEP:11111-111 Tel (11) 1111-1111
Obs 1
CNPJ: 11.111.111/1111-11
IE: 123456789
`;

const TEXTO_ESPERADO_SEM_COMPLEMENTO: string = `Loja 1
Log 1, 10
Bai 1 - Mun 1 - E1
CEP:11111-111 Tel (11) 1111-1111
Obs 1
CNPJ: 11.111.111/1111-11
IE: 123456789
`;

const TEXTO_ESPERADO_SEM_BAIRRO: string = `Loja 1
Log 1, 10 C1
Mun 1 - E1
CEP:11111-111 Tel (11) 1111-1111
Obs 1
CNPJ: 11.111.111/1111-11
IE: 123456789
`;

const TEXTO_ESPERADO_SEM_CEP: string = `Loja 1
Log 1, 10 C1
Bai 1 - Mun 1 - E1
Tel (11) 1111-1111
Obs 1
CNPJ: 11.111.111/1111-11
IE: 123456789
`;

const TEXTO_ESPERADO_SEM_TELEFONE: string = `Loja 1
Log 1, 10 C1
Bai 1 - Mun 1 - E1
CEP:11111-111
Obs 1
CNPJ: 11.111.111/1111-11
IE: 123456789
`;

const TEXTO_ESPERADO_SEM_OBSERVACAO: string = `Loja 1
Log 1, 10 C1
Bai 1 - Mun 1 - E1
CEP:11111-111 Tel (11) 1111-1111

CNPJ: 11.111.111/1111-11
IE: 123456789
`;

const TEXTO_ESPERADO_SEM_NUMERO_SEM_COMPLEMENTO: string = `Loja 1
Log 1, s/n
Bai 1 - Mun 1 - E1
CEP:11111-111 Tel (11) 1111-1111
Obs 1
CNPJ: 11.111.111/1111-11
IE: 123456789
`;

const TEXTO_ESPERADO_SEM_NUMERO_SEM_COMPLEMENTO_SEM_BAIRRO: string = `Loja 1
Log 1, s/n
Mun 1 - E1
CEP:11111-111 Tel (11) 1111-1111
Obs 1
CNPJ: 11.111.111/1111-11
IE: 123456789
`;


test('Loja Completa', () => {
  let lojaCompleta: Loja = new Loja(NOME_LOJA, new Endereco(LOGRADOURO, NUMERO, COMPLEMENTO,
    BAIRRO, MUNICIPIO, ESTADO, CEP), TELEFONE, OBSERVACAO, CNPJ,
    INSCRICAO_ESTADUAL);
  expect(lojaCompleta.dados_loja()).toBe(TEXTO_ESPERADO_LOJA_COMPLETA);
});

test('Nome vazio', () => {
  let nomeVazio: Loja = new Loja("", new Endereco(LOGRADOURO, NUMERO, COMPLEMENTO, BAIRRO,
    MUNICIPIO, ESTADO, CEP), TELEFONE, OBSERVACAO, CNPJ, INSCRICAO_ESTADUAL);
  verificaCampoObrigatorio(`O campo nome da loja é obrigatório`, nomeVazio);
});

test('Logradouro vazio', () => {
  let logradouroVazio: Loja = new Loja(NOME_LOJA, new Endereco("", NUMERO, COMPLEMENTO,
    BAIRRO, MUNICIPIO, ESTADO, CEP), TELEFONE, OBSERVACAO, CNPJ,
    INSCRICAO_ESTADUAL);
  verificaCampoObrigatorio(`O campo logradouro do endereço é obrigatório`,
    logradouroVazio);
});

test('Número zero', () => {
  let numeroZero: Loja = new Loja(NOME_LOJA, new Endereco(LOGRADOURO, 0, COMPLEMENTO,
    BAIRRO, MUNICIPIO, ESTADO, CEP), TELEFONE, OBSERVACAO, CNPJ,
    INSCRICAO_ESTADUAL);
  expect(numeroZero.dados_loja()).toBe(TEXTO_ESPERADO_SEM_NUMERO);
});

test('Complemento vazio', () => {
  let complementoVazio: Loja = new Loja(NOME_LOJA, new Endereco(LOGRADOURO, NUMERO, "",
    BAIRRO, MUNICIPIO, ESTADO, CEP), TELEFONE, OBSERVACAO, CNPJ,
    INSCRICAO_ESTADUAL);
  expect(complementoVazio.dados_loja())
    .toBe(TEXTO_ESPERADO_SEM_COMPLEMENTO);
});

test('Bairro vazio', () => {
  let bairroVazio: Loja = new Loja(NOME_LOJA, new Endereco(LOGRADOURO, NUMERO, COMPLEMENTO,
    "", MUNICIPIO, ESTADO, CEP), TELEFONE, OBSERVACAO, CNPJ,
    INSCRICAO_ESTADUAL);
  expect(bairroVazio.dados_loja()).toBe(TEXTO_ESPERADO_SEM_BAIRRO);
});

test('Município vazio', () => {
  let municipioVazio: Loja = new Loja(NOME_LOJA, new Endereco(LOGRADOURO, NUMERO,
    COMPLEMENTO, BAIRRO, "", ESTADO, CEP), TELEFONE, OBSERVACAO, CNPJ,
    INSCRICAO_ESTADUAL);
  verificaCampoObrigatorio(`O campo município do endereço é obrigatório`,
    municipioVazio);
});

test('Estado vazio', () => {
  let estadoVazio: Loja = new Loja(NOME_LOJA, new Endereco(LOGRADOURO, NUMERO,
    COMPLEMENTO, BAIRRO, MUNICIPIO, "", CEP), TELEFONE, OBSERVACAO, CNPJ,
    INSCRICAO_ESTADUAL);
  verificaCampoObrigatorio(`O campo estado do endereço é obrigatório`,
    estadoVazio);
});

test('CEP vazio', () => {
  let cepVazio: Loja = new Loja(NOME_LOJA, new Endereco(LOGRADOURO, NUMERO,
    COMPLEMENTO, BAIRRO, MUNICIPIO, ESTADO, ""), TELEFONE, OBSERVACAO, CNPJ,
    INSCRICAO_ESTADUAL);
  expect(cepVazio.dados_loja()).toBe(TEXTO_ESPERADO_SEM_CEP);
});

test('Telefone vazio', () => {
  let telefoneVazio: Loja = new Loja(NOME_LOJA, new Endereco(LOGRADOURO, NUMERO,
    COMPLEMENTO, BAIRRO, MUNICIPIO, ESTADO, CEP), "", OBSERVACAO, CNPJ,
    INSCRICAO_ESTADUAL);
  expect(telefoneVazio.dados_loja()).toBe(TEXTO_ESPERADO_SEM_TELEFONE);
});

test('Observação vazia', () => {
  let observacaoVazia: Loja = new Loja(NOME_LOJA, new Endereco(LOGRADOURO, NUMERO,
    COMPLEMENTO, BAIRRO, MUNICIPIO, ESTADO, CEP), TELEFONE, "", CNPJ,
    INSCRICAO_ESTADUAL);
  expect(observacaoVazia.dados_loja())
    .toBe(TEXTO_ESPERADO_SEM_OBSERVACAO);
});

test('CNPJ vazio', () => {
  let cnpjVazio: Loja = new Loja(NOME_LOJA, new Endereco(LOGRADOURO, NUMERO,
    COMPLEMENTO, BAIRRO, MUNICIPIO, ESTADO, CEP), TELEFONE, OBSERVACAO, "",
    INSCRICAO_ESTADUAL);
  verificaCampoObrigatorio(`O campo CNPJ da loja é obrigatório`, cnpjVazio);
});

test('Inscrição estadual vazia', () => {
  let ieVazia: Loja = new Loja(NOME_LOJA, new Endereco(LOGRADOURO, NUMERO,
    COMPLEMENTO, BAIRRO, MUNICIPIO, ESTADO, CEP), TELEFONE, OBSERVACAO, CNPJ,
    "");
  verificaCampoObrigatorio(`O campo inscrição estadual da loja é obrigatório`,
    ieVazia);
});

test('Número zero e complemento vazio', () => {
  let numeroZeroComplementoVazio: Loja = new Loja(NOME_LOJA, new Endereco(LOGRADOURO, 0, "",
    BAIRRO, MUNICIPIO, ESTADO, CEP), TELEFONE, OBSERVACAO, CNPJ,
    INSCRICAO_ESTADUAL);
  expect(numeroZeroComplementoVazio.dados_loja())
    .toBe(TEXTO_ESPERADO_SEM_NUMERO_SEM_COMPLEMENTO);
});

test('Número zero, complemento e bairro vazios', () => {
  let numeroZeroComplementoVazioBairroVazio: Loja = new Loja(NOME_LOJA,
    new Endereco(LOGRADOURO, 0, "", "", MUNICIPIO, ESTADO, CEP), TELEFONE, OBSERVACAO, CNPJ,
    INSCRICAO_ESTADUAL);
  expect(numeroZeroComplementoVazioBairroVazio.dados_loja())
    .toBe(TEXTO_ESPERADO_SEM_NUMERO_SEM_COMPLEMENTO_SEM_BAIRRO);
});


test('Exercício 2 - customizado', () => {

  // Defina seus próprios valores para as variáveis a seguir
  let nome_loja = "LOJAS AMERICANAS S.A.";
  let logradouro = "R SACADURA CABRAL";
  let numero = 102;
  let complemento = "";
  let bairro = "GAMBOA";
  let municipio = "RIO DE JANEIRO";
  let estado = "RJ";
  let cep = "20.221-160";
  let telefone = "(21) 2206-6708";
  let observacao = "47.11-3-02 Comercio varejista de mercadorias em geral";
  let cnpj = "33.014.556/0001-96";
  let inscricao_estadual = "85.687.08-5";

  let endereco_customizado: Endereco = new Endereco(logradouro, numero,
    complemento, bairro, municipio, estado, cep);

  let loja_customizada: Loja = new Loja(nome_loja, endereco_customizado, telefone, observacao, cnpj,
    inscricao_estadual);

  //E atualize o texto esperado abaixo
  expect(loja_customizada.dados_loja()).toBe(
    `LOJAS AMERICANAS S.A.
R SACADURA CABRAL, 102
GAMBOA - RIO DE JANEIRO - RJ
CEP:20.221-160 Tel (21) 2206-6708
47.11-3-02 Comercio varejista de mercadorias em geral
CNPJ: 33.014.556/0001-96
IE: 85.687.08-5
`);
});