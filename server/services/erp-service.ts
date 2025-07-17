import { ERP_CONFIG } from "../config/erp-config";
import { CNPJData } from "./cnpj-service";

export class ERPService {
  static createSOAPEnvelope(cnpjData: CNPJData): string {
    const currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    
    return `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tot="http://www.totvs.com/">
   <soapenv:Header/>
   <soapenv:Body>
      <tot:SaveRecord>
         <tot:DataServerName>FinCFODataBr</tot:DataServerName>
         <tot:XML><![CDATA[<FinCFOBR >
  <FCFO>
    <CODEXTERNO>00000000</CODEXTERNO>
    <CODCOLIGADA>${ERP_CONFIG.DEFAULTS.CODCOLIGADA}</CODCOLIGADA>
    <CODCFO>-1</CODCFO>
    <NOMEFANTASIA>${cnpjData.fantasia || cnpjData.nome}</NOMEFANTASIA>
    <NOME>${cnpjData.nome}</NOME>
    <CGCCFO>${cnpjData.cnpj}</CGCCFO>
    <PAGREC>${ERP_CONFIG.DEFAULTS.PAGREC}</PAGREC>
    <RUA>${cnpjData.logradouro || ''}</RUA>
    <NUMERO>${cnpjData.numero || ''}</NUMERO>
    <BAIRRO>${cnpjData.bairro || ''}</BAIRRO>
    <CIDADE>${cnpjData.municipio || ''}</CIDADE>
    <CODETD>${cnpjData.uf || ''}</CODETD>
    <CEP>${cnpjData.cep || ''}</CEP>
    <TELEFONE>${cnpjData.telefone || ''}</TELEFONE>
    <EMAIL>${cnpjData.email || ''}</EMAIL>
    <CONTATO>${cnpjData.nome}</CONTATO>
    <ATIVO>${ERP_CONFIG.DEFAULTS.ATIVO}</ATIVO>
    <LIMITECREDITO>${ERP_CONFIG.DEFAULTS.LIMITECREDITO}</LIMITECREDITO>
    <DATAULTALTERACAO>${currentDate}</DATAULTALTERACAO>
    <DATACRIACAO>${currentDate}</DATACRIACAO>
    <DATAULTMOVIMENTO>${currentDate}</DATAULTMOVIMENTO>
    <VALOROP1>${ERP_CONFIG.DEFAULTS.VALOROP1}</VALOROP1>
    <VALOROP2>${ERP_CONFIG.DEFAULTS.VALOROP2}</VALOROP2>
    <VALOROP3>${ERP_CONFIG.DEFAULTS.VALOROP3}</VALOROP3>
    <PATRIMONIO>${ERP_CONFIG.DEFAULTS.PATRIMONIO}</PATRIMONIO>
    <NUMFUNCIONARIOS>${ERP_CONFIG.DEFAULTS.NUMFUNCIONARIOS}</NUMFUNCIONARIOS>
    <CODMUNICIPIO>${cnpjData.codigo_municipio || ''}</CODMUNICIPIO>
    <INSCRMUNICIPAL>${cnpjData.inscricao_municipal || ''}</INSCRMUNICIPAL>
    <PESSOAFISOUJUR>J</PESSOAFISOUJUR>
    <PAIS>${ERP_CONFIG.DEFAULTS.PAIS}</PAIS>
    <CONTRIBUINTE>${ERP_CONFIG.DEFAULTS.CONTRIBUINTE}</CONTRIBUINTE>
    <CFOIMOB>${ERP_CONFIG.DEFAULTS.CFOIMOB}</CFOIMOB>
    <VALFRETE>${ERP_CONFIG.DEFAULTS.VALFRETE}</VALFRETE>
    <TPTOMADOR>${ERP_CONFIG.DEFAULTS.TPTOMADOR}</TPTOMADOR>
    <CONTRIBUINTEISS>${ERP_CONFIG.DEFAULTS.CONTRIBUINTEISS}</CONTRIBUINTEISS>
    <NUMDEPENDENTES>${ERP_CONFIG.DEFAULTS.NUMDEPENDENTES}</NUMDEPENDENTES>
    <USUARIOALTERACAO>${ERP_CONFIG.DEFAULTS.USUARIOALTERACAO}</USUARIOALTERACAO>
    <ORGAOPUBLICO>${ERP_CONFIG.DEFAULTS.ORGAOPUBLICO}</ORGAOPUBLICO>
    <IDCFO></IDCFO>
    <VROUTRASDEDUCOESIRRF>${ERP_CONFIG.DEFAULTS.VROUTRASDEDUCOESIRRF}</VROUTRASDEDUCOESIRRF>
    <CODRECEITA>${ERP_CONFIG.DEFAULTS.CODRECEITA}</CODRECEITA>
    <RAMOATIV>${ERP_CONFIG.DEFAULTS.RAMOATIV}</RAMOATIV>
    <OPTANTEPELOSIMPLES>${ERP_CONFIG.DEFAULTS.OPTANTEPELOSIMPLES}</OPTANTEPELOSIMPLES>
    <TIPORUA>${ERP_CONFIG.DEFAULTS.TIPORUA}</TIPORUA>
    <TIPOBAIRRO>${ERP_CONFIG.DEFAULTS.TIPOBAIRRO}</TIPOBAIRRO>
    <REGIMEISS>${ERP_CONFIG.DEFAULTS.REGIMEISS}</REGIMEISS>
    <RETENCAOISS>${ERP_CONFIG.DEFAULTS.RETENCAOISS}</RETENCAOISS>
    <USUARIOCRIACAO>${ERP_CONFIG.DEFAULTS.USUARIOCRIACAO}</USUARIOCRIACAO>
    <PORTE>${ERP_CONFIG.DEFAULTS.PORTE}</PORTE>
    <TIPOOPCOMBUSTIVEL>${ERP_CONFIG.DEFAULTS.TIPOOPCOMBUSTIVEL}</TIPOOPCOMBUSTIVEL>
    <IDPAIS>${ERP_CONFIG.DEFAULTS.IDPAIS}</IDPAIS>
    <NACIONALIDADE>${ERP_CONFIG.DEFAULTS.NACIONALIDADE}</NACIONALIDADE>
    <CALCULAAVP>${ERP_CONFIG.DEFAULTS.CALCULAAVP}</CALCULAAVP>
    <RECCREATEDBY>${ERP_CONFIG.DEFAULTS.RECCREATEDBY}</RECCREATEDBY>
    <RECCREATEDON>${currentDate}</RECCREATEDON>
    <RECMODIFIEDBY>${ERP_CONFIG.DEFAULTS.RECMODIFIEDBY}</RECMODIFIEDBY>
    <RECMODIFIEDON>${currentDate}</RECMODIFIEDON>
    <TIPORENDIMENTO>${ERP_CONFIG.DEFAULTS.TIPORENDIMENTO}</TIPORENDIMENTO>
    <FORMATRIBUTACAO>${ERP_CONFIG.DEFAULTS.FORMATRIBUTACAO}</FORMATRIBUTACAO>
    <SITUACAONIF>${ERP_CONFIG.DEFAULTS.SITUACAONIF}</SITUACAONIF>
    <ISTOTVSMESSAGE>${ERP_CONFIG.DEFAULTS.ISTOTVSMESSAGE}</ISTOTVSMESSAGE>
    <INOVAR_AUTO>${ERP_CONFIG.DEFAULTS.INOVAR_AUTO}</INOVAR_AUTO>
    <APLICFORMULA>${ERP_CONFIG.DEFAULTS.APLICFORMULA}</APLICFORMULA>
    <CODCFOCOLINTEGRACAO>${ERP_CONFIG.DEFAULTS.CODCFOCOLINTEGRACAO}</CODCFOCOLINTEGRACAO>
    <DIGVERIFICDEBAUTOMATICO>${ERP_CONFIG.DEFAULTS.DIGVERIFICDEBAUTOMATICO}</DIGVERIFICDEBAUTOMATICO>
    <ENTIDADEEXECUTORAPAA>${ERP_CONFIG.DEFAULTS.ENTIDADEEXECUTORAPAA}</ENTIDADEEXECUTORAPAA>
    <APOSENTADOOUPENSIONISTA>${ERP_CONFIG.DEFAULTS.APOSENTADOOUPENSIONISTA}</APOSENTADOOUPENSIONISTA>
    <SOCIOCOOPERADO>${ERP_CONFIG.DEFAULTS.SOCIOCOOPERADO}</SOCIOCOOPERADO>
  </FCFO>
  <FCFOCOMPL>
    <CODCOLIGADA>${ERP_CONFIG.DEFAULTS.CODCOLIGADA}</CODCOLIGADA>
    <CODCFO>-1</CODCFO>
    <NAOUSARCALCSIMPIRPF>${ERP_CONFIG.DEFAULTS.NAOUSARCALCSIMPIRPF}</NAOUSARCALCSIMPIRPF>
  </FCFOCOMPL>
</FinCFOBR>]]></tot:XML>
         <tot:Contexto>CODCOLIGADA=${ERP_CONFIG.DEFAULTS.CODCOLIGADA};CODUSUARIO='${ERP_CONFIG.AUTH.USERNAME}';CODSISTEMA=F</tot:Contexto>
      </tot:SaveRecord>
   </soapenv:Body>
</soapenv:Envelope>`;
  }

  static async realizarPreCadastro(cnpjData: CNPJData): Promise<{ success: boolean; message: string; erpCode?: string }> {
    try {
      console.log(`[ERP-SERVICE] Iniciando pré-cadastro no ERP para ${cnpjData.nome} (${cnpjData.cnpj})`);
      
      const soapEnvelope = this.createSOAPEnvelope(cnpjData);
      
      // Create Basic Auth header
      const credentials = Buffer.from(`${ERP_CONFIG.AUTH.USERNAME}:${ERP_CONFIG.AUTH.PASSWORD}`).toString('base64');
      
      console.log(`[ERP-SERVICE] Enviando requisição SOAP para ${ERP_CONFIG.SOAP_ENDPOINT}`);
      
      const response = await fetch(ERP_CONFIG.SOAP_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
          'SOAPAction': '',
          'Authorization': `Basic ${credentials}`,
          'User-Agent': 'SimpleDFe/1.0'
        },
        body: soapEnvelope
      });

      const responseText = await response.text();
      console.log(`[ERP-SERVICE] Resposta do ERP (status ${response.status}):`, responseText.substring(0, 500));

      if (!response.ok) {
        throw new Error(`Erro na requisição ERP: ${response.status} - ${response.statusText}`);
      }

      // Check if the response contains an error
      if (responseText.includes('soap:Fault') || responseText.includes('faultstring')) {
        const errorMatch = responseText.match(/<faultstring>(.*?)<\/faultstring>/);
        const errorMessage = errorMatch ? errorMatch[1] : 'Erro desconhecido no ERP';
        throw new Error(`Erro do ERP: ${errorMessage}`);
      }

      // Try to extract the ERP code from the response
      let erpCode: string | undefined;
      const codeMatch = responseText.match(/<CODCFO>(\d+)<\/CODCFO>/);
      if (codeMatch) {
        erpCode = codeMatch[1];
      }

      console.log(`[ERP-SERVICE] Pré-cadastro realizado com sucesso. Código ERP: ${erpCode || 'não informado'}`);

      return {
        success: true,
        message: 'Pré-cadastro realizado com sucesso no ERP',
        erpCode
      };
    } catch (error) {
      console.error('[ERP-SERVICE] Erro no pré-cadastro:', error);
      
      // Return more user-friendly error messages
      let message = 'Erro ao realizar pré-cadastro no ERP';
      if (error instanceof Error) {
        if (error.message.includes('fetch')) {
          message = 'Erro de conexão com o ERP. Verifique sua internet e tente novamente.';
        } else if (error.message.includes('timeout')) {
          message = 'Tempo limite excedido. O ERP pode estar temporariamente indisponível.';
        } else {
          message = error.message;
        }
      }

      return {
        success: false,
        message
      };
    }
  }
}