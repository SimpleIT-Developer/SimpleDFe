# SimpleDFe - Document Management System

## Overview

SimpleDFe is a full-stack web application built for managing and processing Brazilian fiscal documents (NFe and NFSe). The system provides document visualization, DANFE generation, reporting capabilities, and user management features. It's designed as a comprehensive solution for businesses that need to process and manage electronic fiscal documents.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **UI Library**: Radix UI components with shadcn/ui styling
- **Styling**: Tailwind CSS with custom design system
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with standardized endpoints
- **Authentication**: JWT-based authentication system
- **File Processing**: Multer for XML file uploads and processing

### Database Architecture
- **Primary Database**: PostgreSQL with Drizzle ORM
- **Connection**: Neon serverless PostgreSQL via connection pooling
- **Secondary Database**: MySQL for legacy company data integration
- **Schema Management**: Drizzle Kit for migrations and schema management

## Key Components

### Authentication System
- JWT token-based authentication with refresh capabilities
- User registration with email verification
- Password hashing using bcrypt
- Role-based access control with user types and status management

### Document Processing Engine
- **XML Processing**: Multi-format XML parser for NFe and NFSe documents
- **DANFE Generation**: Multiple PDF generation strategies:
  - PHP-based generation using sped-da library
  - Node.js PDF generation using PDFKit and jsPDF
  - HTML-to-PDF conversion for complex layouts
- **Document Validation**: XML schema validation and data extraction

### File Management
- Secure file upload handling with type validation
- Temporary file management for processing
- PDF generation and storage system

### Reporting System
- Dynamic PDF report generation for NFe and NFSe data
- Company-based filtering and aggregation
- Tax calculation and summary reports
- Date-range based analytics

### Email Services
- Multiple email provider support (SendGrid, MailerSend, Resend)
- Welcome email automation with professional templates
- Template-based email system with company branding

## Data Flow

### User Registration Flow
1. User submits registration form with validation
2. Password hashing and user creation in PostgreSQL
3. Welcome email sent via configured email service
4. JWT token generation for immediate authentication

### Document Processing Flow
1. XML file upload through secure endpoint
2. File validation and temporary storage
3. XML parsing and data extraction
4. Database storage of document metadata
5. DANFE PDF generation on demand
6. File cleanup and response delivery

### Report Generation Flow
1. User selects report parameters (dates, companies)
2. Database query execution across multiple tables
3. Data aggregation and calculation
4. PDF generation with company-specific formatting
5. File delivery and temporary storage cleanup

## External Dependencies

### PHP Bridge Integration
- **sped-da Library**: Brazilian fiscal document processing
- **Composer**: PHP dependency management
- **PHP Runtime**: Required for DANFE generation fallback

### Email Service Providers
- **SendGrid**: Primary email service with API integration
- **MailerSend**: Alternative email service provider
- **Resend**: Modern email API for transactional emails

### Database Connections
- **Neon PostgreSQL**: Primary database with serverless architecture
- **MySQL**: Legacy system integration for company data
- **Connection Pooling**: Optimized database connection management

### Development Tools
- **Vite**: Fast development server and build tool
- **Replit Integration**: Cloud development environment support
- **TypeScript**: Type safety across the entire stack

## Deployment Strategy

### Development Environment
- Replit-based development with hot reload
- PostgreSQL and MySQL database provisioning
- Environment variable management
- Development-specific error overlays and debugging

### Production Build
- Vite production build optimization
- ESBuild bundling for server-side code
- Static asset optimization and serving
- Environment-specific configuration management

### Database Strategy
- Drizzle migrations for schema management
- Connection pooling for scalability
- Environment-specific database connections
- Backup and recovery procedures

## Changelog
- July 23, 2025: Sistema CTe Recebidas implementado completo
  - Criadas interfaces CTeRecebida, CTeFilters, CTeResponse e EventoCTe no schema
  - Implementada página client/src/pages/cte-recebidas.tsx baseada no padrão NFe Recebidas
  - Criadas rotas de API /api/cte-recebidas com filtros e paginação
  - Implementada rota /api/cte-eventos/:cte_id para visualização de eventos
  - Relacionamento entre tabelas cte e cte_evento usando cte_chave_acesso e cte_id_company
  - Download de XML via URL https://robolbv.simpledfe.com.br/api/cte_download_api.php?cte_id={cte_id}
  - Menu "CTe Recebidas" adicionado entre NFe e NFSe no layout
  - Funcionalidades: filtros por data, empresa, fornecedor, status de integração
  - Grid com seleção em lote, ordenação, visualização de eventos, download XML
  - Status do documento baseado nos campos cte_serie, cte_status e presença de eventos
  - Rota registrada em App.tsx para navegação completa
- July 17, 2025: Sistema de pré-cadastro no ERP implementado e funcional na tela de Fornecedores
  - Criado serviço CNPJService para consulta à API ReceitaWS (www.receitaws.com.br)
  - Criado serviço ERPService para comunicação SOAP com sistema ERP TOTVS
  - Arquivo de configuração server/config/erp-config.ts para manutenção fácil de endpoints e credenciais
  - Nova rota API /api/fornecedores/pre-cadastro-erp para processamento completo
  - Botão "Realizar Pré-Cadastro no ERP" na interface apenas para fornecedores sem código ERP
  - Fluxo: consulta CNPJ → monta XML SOAP → envia para ERP → atualiza código ERP local
  - Interface com feedback visual e mensagens de sucesso/erro detalhadas
  - Integração com sistema de toast para notificações ao usuário
  - **Parsing da resposta SOAP**: extrai código do fornecedor do formato <SaveRecordResult>1;09989435</SaveRecordResult>
  - **Sistema de logs SOAP**: armazena requisições e respostas para debugging (10 logs por CNPJ)
  - **Botão LOG**: interface para visualizar histórico de comunicação SOAP com modal detalhado
  - **Formatação correta**: CNPJ formatado, datas ISO (2023-09-08T00:00:00), CEP com hífen
  - **Rota de debug**: /api/fornecedores/soap-logs/:cnpj para acesso aos logs SOAP
  - **Mensagens aprimoradas**: sucesso mostra código ERP obtido (ex: "Código do fornecedor: 09989435")
  - **Headers SOAP corretos**: usando headers idênticos ao SOAPUI para garantir status 200
  - **Botão LIMPAR LOG**: no popup de logs SOAP para excluir histórico e gerar novos logs
  - **Rota DELETE**: /api/fornecedores/soap-logs/:cnpj para limpar logs de um CNPJ específico
- July 7, 2025: Adicionado botão "Abrir Ticket" na tela de usuários
  - Novo botão após "Ver Atualizações" que direciona para portal de suporte
  - Abre em nova aba: https://simpleitsolucoes.atlassian.net/servicedesk/customer/portal/8/user/login?destination=portal%2F8
  - Design com cor laranja e ícone ExternalLink para indicar link externo
- July 7, 2025: Redesign da grid NFSe com otimizações de layout
  - Incluído campo nfse_nsu na consulta SQL da API /api/nfse-recebidas
  - Atualizada interface NFSeRecebida no schema para incluir nfse_nsu
  - Removida coluna TIPO da grid para economizar espaço
  - Movida coluna NSU para primeira posição e renomeada para "Número"
  - Ajustadas larguras das colunas para evitar sobreposição de campos
  - Adicionado overflow horizontal para melhor responsividade
  - Coluna Número permite ordenação e exibe "-" quando valor é nulo
- July 7, 2025: Reativação da consulta de fornecedores (apenas busca)
  - Reativada API /api/fornecedores para buscar dados da tabela simplefcfo
  - Reativada consulta no dashboard para estatísticas corretas de fornecedores
  - Mantida desabilitação da verificação de ERP via webhook
  - API /api/fornecedores/verificar-erp permanece comentada
  - Botão "Verificar ERP" na interface permanece comentado
  - Sistema permite visualizar fornecedores mas não faz verificações automáticas no ERP
- July 4, 2025: Regra de STATUS da NFe atualizada para considerar eventos
  - Modificada consulta SQL para incluir LEFT JOIN com tabela eventos
  - Nova lógica: doc_serie nulo + tem evento na tabela eventos = CANCELADA
  - Nova lógica: doc_serie nulo + sem evento = EM PROCESSAMENTO 
  - Mantida lógica: doc_serie preenchido + doc_status = 1 = CANCELADA
  - Mantida lógica: doc_serie preenchido + doc_status != 1 = AUTORIZADA
  - Adicionado campo has_evento na interface NFeRecebida
  - JOIN verifica eventos_chave = doc_chave AND eventos_id_company = doc_id_company
- July 4, 2025: Sistema de notificações de versão implementado e funcionando
  - Adicionado campo show_version_notifications na tabela users
  - Criadas rotas de API para gerenciar conteúdo de versão e preferências do usuário
  - Popup automático aparece 1.5s após login (uma vez por sessão)
  - Botão "Ver Atualizações" na tela USUARIOS para acesso manual
  - Sistema utiliza arquivo version/version.txt para exibir changelog
  - Checkbox permite desabilitar notificações permanentemente
  - SessionStorage controla exibição única por sessão
  - Cores melhoradas para legibilidade (botão azul, textos contrastados)
- July 4, 2025: Funcionalidade de visualização de eventos NFe
  - Implementada interface EventoNFe no schema para tipagem
  - Adicionada rota /api/nfe-eventos/:doc_id relacionando tabelas doc e eventos
  - Criado botão "Visualizar Eventos" com ícone Eye na grid NFe
  - Dialog popup mostra eventos: Código, Descrição, Data e Protocolo
- July 4, 2025: Coluna STATUS adicionada na grid NFe
  - Implementada coluna STATUS com ícones entre checkbox e número na grid NFe
  - Campo doc_status da tabela doc incluído na API (/api/nfe-recebidas)
  - Ícones CheckCircle2 (verde) para Autorizada (doc_status = 0) 
  - Ícones XCircle (vermelho) para Cancelada (doc_status = 1)
  - Tooltip mostra texto do status ao passar mouse sobre ícone
  - Tooltip formatado para CNPJ no campo EMPRESA (XX.XXX.XXX/XXXX-XX)
  - Otimizado espaçamento entre colunas checkbox e STATUS para melhor layout
- July 3, 2025: Melhorias nos campos de data do sistema
  - Aplicada função DATE() em todos os filtros de data das APIs NFe e NFSe
  - Filtros de exportação XML e DANFE corrigidos para incluir dia completo
  - Data final agora inclui documentos do dia inteiro (até 23:59:59)
  - Padronização: todos os filtros usam DATE() para comparação apenas da data
  - Criado componente DateInput reutilizável para melhor UX de digitação
  - Implementada máscara automática dd/mm/aaaa com validação em tempo real
  - Campos de data permitem digitação manual ou seleção via calendário
  - Aplicado nas telas de NFe, NFSe e Relatórios para experiência consistente
- July 2, 2025: Sistema de exportação em lote por período
  - Implementado sistema de seleção de linhas com checkboxes nas grids NFe/NFSe
  - Adicionados botões de ações em lote (Download XML, Download DANFE) no cabeçalho das grids
  - Criados cards de exportação na tela de relatórios para download por período e empresa
  - APIs para download em lote usando bibliotecas externas (pegar_varios_nfe.php, baixar_danfe_lote.php)
  - Geração de arquivos ZIP com nomes padronizados (xml_nfe.zip, danfe_nfe.zip, xml_nfse.zip, danfse_nfse.zip)
  - Interface dinâmica que altera botão "Gerar PDF" para "Gerar Arquivo" em exportações
  - Adicionados cards para exportação XML e DANFSe de NFSe com filtros por data e empresa
- June 24, 2025: Correção na autenticação
  - Implementado login case-insensitive para emails
  - Normalização de emails para lowercase no registro e busca
  - Senha mantida case-sensitive para segurança
- June 24, 2025: Correção da URL nos emails
  - Corrigida URL nos templates de email para usar www.simpledfe.com.br como padrão fixo
  - Removida captura dinâmica da URL, mantendo URL padrão
- June 24, 2025: Melhorias no sistema de email
  - Corrigido nome da marca de "SimpleDFE" para "SimpleDFe" em todos os templates
  - Atualizada URL de acesso para simpledfe.simpleit.app.br
  - Adicionada validação robusta de dados de email
  - Implementado sistema de logs detalhados para troubleshooting
  - Criado utilitário de teste para todos os provedores de email
  - Adicionadas rotas de teste e status de email
- June 24, 2025: Configuração inicial do projeto

## User Preferences

Preferred communication style: Simple, everyday language.