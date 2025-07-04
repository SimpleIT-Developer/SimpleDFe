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