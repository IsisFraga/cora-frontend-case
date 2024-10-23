# <img src="https://github.com/corabank/frontend-case/blob/16051123b026faaba02e6d0959fe471a6a6dac2a/src/assets/logo.svg" alt="Cora" title="Cora" width="50" /> Frontend Challenge

Teste para vagas de frontend da [Cora](https://www.cora.com.br) :heartbeat:


## 📑 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias](#-tecnologias)
- [Arquitetura](#-arquitetura)
  - [Portas Utilizadas](#portas-utilizadas)
- [Como Começar](#-como-começar)
  - [Credenciais para Teste](#credenciais-para-teste)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Boas Práticas](#-boas-práticas)
- [Processo de Desenvolvimento](#-processo-de-desenvolvimento)
  - [Workflow](#workflow)
  - [Commits](#commits)
- [Considerações Técnicas e de Segurança](#-considerações-técnicas-e-de-segurança)
  - [Ambiente de Desenvolvimento](#ambiente-de-desenvolvimento)
  - [Ambiente de Produção](#ambiente-de-produção)
- [Práticas de Equipe](#-práticas-de-equipe)
- [Licença](#-licença)


## 📋 Sobre o Projeto

Este projeto é uma aplicação bancária desenvolvida como parte do processo seletivo da Cora. A aplicação implementa:

- Sistema de autenticação
- Dashboard bancário
- Listagem de transações
- Interface responsiva e acessível

## 🚀 Tecnologias

- **React 18** - Framework principal
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Module Federation** - Arquitetura de microfrontends
- **Zustand** - Gerenciamento de estado
- **React Router** - Roteamento
- **Axios** - Cliente HTTP
- **Express** - Backend mockado


## 🏗 Arquitetura

O projeto utiliza uma arquitetura de microfrontends baseada em Module Federation, organizada da seguinte forma:

```
📦 cora-frontend-case
 ┣ 📂 Host (Aplicação principal)
 ┃ ┗ 📂 src
 ┃   ┣ 📂 components
 ┃   ┣ 📂 pages
 ┃   ┗ 📂 routes
 ┃
 ┣ 📂 IBanking (Micro frontend das transações)
 ┃ ┗ 📂 src
 ┃   ┣ 📂 assets
 ┃   ┣ 📂 components
 ┃   ┣ 📂 constants
 ┃   ┣ 📂 store
 ┃   ┣ 📂 types
 ┃   ┗ 📂 utils
 ┃
 ┣ 📂 Login (Micro frontend da autenticação)
 ┃ ┗ 📂 src
 ┃   ┣ 📂 components
 ┃   ┣ 📂 store
 ┃   ┗ 📂 tests
 ┃
 ┣ 📂 Todo (Micro frontend das tarefas)
 ┃ ┗ 📂 src
 ┃   ┣ 📂 assets
 ┃   ┗ 📂 components
 ┃   ┗ 📂 store
 ┃
 ┗ 📂 utils
```

### Portas Utilizadas
- Backend API: 3000
- Host Application: 3001
- IBanking MFE: 5002
- Login MFE: 5003


## 🚦 Como Começar

1. Clone o repositório:
```bash
git clone [url-do-repositorio]
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o projeto:
```bash
npm run start
```

### Credenciais para Teste
```
CPF: 35819357833
Senha: 123456
```

## 🔧 Estrutura do Projeto

Cada microfrontend é uma aplicação independente com sua própria estrutura de acordo com as suas necessidades:

```
📦 [microfrontend]
 ┣ 📂 src
 ┃ ┣ 📂 components
 ┃ ┣ 📂 hooks
 ┃ ┣ 📂 store
 ┃ ┣ 📂 types
 ┃ ┗ 📂 utils
 ┣ 📜 package.json
 ┗ 📜 vite.config.ts
```

## ✨ Boas Práticas

- **Clean Code**: Código limpo e autoexplicativo
- **Conventional Commits**: Padronização de commits
- **TypeScript**: Tipagem forte para maior segurança
- **Component-Driven Development**: Componentização eficiente
- **Error Handling**: Tratamento adequado de erros
- **Performance**: Otimizações de carregamento e renderização

## 🔄 Processo de Desenvolvimento

### Workflow
1. Criação de issues para cada feature/bug
2. Desenvolvimento em branches separadas
3. Pull Requests com descrição detalhada
4. Code Review feito por mim mesma
5. Merge

### Commits
Seguindo Conventional Commits:
```
feat: add new transaction list
fix: correct authentication flow
docs: update readme
style: format code
refactor: improve error handling
```

## 🔐 Considerações Técnicas e de Segurança

### Ambiente de Desenvolvimento

#### Desafios de Microfrontends
- **Gestão de Módulos**
  - Orquestração de múltiplos módulos em desenvolvimento local
  - Sincronização de dependências entre módulos
  - Gestão de versões compartilhadas

#### Estratégias de Repositório
1. **Multi-repositório**
   - Separação clara de responsabilidades
   - Controle granular de acesso
   - Ciclos de deploy independentes
   - Integração com pipeline para sincronização de dependências

2. **Monorepo**
   - Facilidade de compartilhamento de código
   - Simplificação da gestão de dependências
   - Commits atômicos entre módulos relacionados

3. **Híbrido**
   - Combinação de monorepo para módulos core
   - Repositórios separados para módulos específicos
   - Flexibilidade de acordo com necessidades de negócio

#### Controle de Acesso
- Implementação de RBAC (Role-Based Access Control)
- Segregação de funções por equipe
- Permissionamento granular por módulo
- Auditoria de acessos

### Ambiente de Produção

#### Pipeline e CI/CD
- **Sincronização de Dependências**
  - Verificação automática de compatibilidade
  - Atualização sincronizada de package.json
  - Locks de versão para prevenção de conflitos

- **Qualidade de Código**
  - Integração com SonarQube
  - Análise de cobertura de testes
  - Métricas de qualidade por módulo
  - Gate de qualidade para aprovação de deploy

- **Segurança**
  - Scan de vulnerabilidades
  - Análise de dependências
  - Validação de secrets
  - Compliance com requisitos bancários

#### Monitoramento e Observabilidade
- **Performance**
  - Métricas por módulo
  - Análise de carregamento
  - Monitoramento de dependências compartilhadas

- **Segurança**
  - Logs centralizados
  - Auditoria de acessos
  - Monitoramento de sessões
  - Detecção de anomalias

#### Estratégia de Deploy
- **Versionamento**
  - Semantic Versioning
  - Changelog automatizado
  - Rastreabilidade de mudanças

- **Releases**
  - Deploy progressivo
  - Canary releases
  - Rollback automatizado
  - Sincronização entre módulos

## 👥 Práticas de Equipe

- **Code Review**
  - Checklist específico por tipo de módulo
  - Revisão de segurança para módulos críticos
  - Pair programming em features complexas

- **Documentação**
  - Documentação técnica por módulo
  - Guias de integração
  - Padrões de desenvolvimento
  - Matriz de responsabilidades

- **Qualidade**
  - Testes unitários obrigatórios
  - Testes E2E por fluxo crítico
  - Métricas de qualidade por sprint
  - Retrospectivas técnicas

## 📄 Licença

MIT © [corabank](https://github.com/corabank)