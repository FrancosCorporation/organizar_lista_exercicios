# Plan — organizar_lista_exercicios

## 1. Visão Geral

- **Nome do projeto:** organizar_lista_exercicios
- **Descrição:** Coleção abrangente de exercícios acadêmicos originalmente desenvolvidos em Java e Flutter durante graduação/bootcamps, em processo de modernização para um "arcade" web interativo e catálogos didáticos, servindo como demonstração técnica e portfólio de carreira.
- **Problema que resolve:** Dificuldade em exibir código-fonte legado e projetos crud ou legados para avaliadores/recrutadores. Possibilita a interação visual e moderna com projetos originais sem a necessidade de instalar IDEs (como Eclipse ou o JDK completo) ou emuladores Android.
- **Público-alvo:** Recrutadores técnicos, avaliadores de portfólio, o próprio autor (para preservação e estruturação histórica).
- **Objetivo principal:** Criar uma interface Web robusta ("Arcade") e portfólio web (ex: WebEstudante) que documente, exiba e preserve os 347 programas da coleção.
- **Visão de longo prazo:** Concluir a conversão de todos os 347 programas e transformá-los em módulos de aprendizado interativo disponíveis publicamente (via GitHub Pages ou deploy estático).
- **Estado atual do desenvolvimento:** Estágio de catalogação e modernização parcial. Já foi criado o servidor "Arcade" em Node.JS, e cerca de 15 salas/apps foram portadas para Javascript/HTML puro. O aplicativo web interno (ex: interface React "Happy" e app "WebEstudante" Flutter) carece de modernização nas dependências pesadas e possui locks desatualizados.

## 2. Arquitetura e Tecnologias

- **Núcleo (Core):** Node.js (exige v22.12+) responsável por servir o `arcade/` estaticamente via `server.js`. Não há uso de frameworks backend complexos (backend expressamente simplificado e local-first).
- **Frontend Principal:** HTML, CSS e JavaScript Vanilla (localizado em `arcade/apps/`).
- **Frontend React Legado:** Interface "Happy" (localizada em `Js/nlw/web/`). Baseada em `react-scripts` (CRA) e `yarn` com `yarn.lock` antigo. Constitui atualmente uma dívida técnica por suas dependências vulneráveis ou depreciadas (CRA teve suporte reduzido na comunidade e grandes falhas de segurança em subdependências).
- **Mobile/Web Adicional:** Flutter/Dart (localizado em `Projetos Flutter/WebEstudante`). Código acadêmico de 2º semestre usando Material Design para listagens.
- **Banco de Dados:** Inexistente (catálogo estático via `arcade/manifest.json`).
- **Docker/Infra:** Não aplicável no ciclo corrente; deploy é concebido como estático/CI no GitHub Actions.
- **Dependências Críticas:** O projeto raiz em `package.json` é minúsculo (sem dependências exógenas por enquanto). A pasta `Js/nlw/web` possui o `yarn.lock` com rasto de dependências conflitantes/vulneráveis em versões antigas de webpack/babel.

## 3. Funcionalidades Existentes

- [x] **Catálogo Arcade Interativo:** Servidor local `http://127.0.0.1:3000/arcade/` que lista programas, categorias, e salas a partir do manifesto. **Validado.**
- [x] **Validador de Sintaxe:** Script `npm run check` que valida JSON do manifesto e roteamentos. **Validado.**
- [x] **Suíte de Testes para Conversões:** Testes nativos usando `node:test` que aplicados em 5 das salas (`test/`). **Validado.**
- [x] **Interface React "Happy" Funcional:** Rotas e telas acessíveis (`OrphanagesMaps`, etc), porém instalação via `yarn install` sujeita a warnings de dependências. **Parcialmente Implementado / Necessita de Otimização.**
- [ ] **Portabilidade Remota:** Não existe configuração Docker ou Compose nem CI pipeline estruturada no histórico atual. **Não Implementado.**

## 4. Objetivos Futuros

- **OBJ-01**
  - **Nome:** Modernização e Substituição do CRA na interface "Happy"
  - **Descrição:** Substituir a base via Create React App (yarn 1.x e node-sass/webpack velhos) por um ecossistema moderno como Vite ou Next.js. Usar `npm audit fix` ou rotas de patches atualizadas e mudar o gerenciador de pacotes.
  - **Origem:** Código (`Js/nlw/web/yarn.lock` massivo e legado).
  - **Justificativa:** Resolver alta contagem de vulnerabilidades encontradas em auditorias de pacotes antigas e acelerar o tempo de bootstrap do projeto local.
  - **Prioridade:** P0 (Segurança e Manutenibilidade)
  - **Critério de conclusão:** Projeto `Js/nlw/web/` compilando e servindo usando Vite ou similar, `npm audit --omit=dev` retornando zero vulnerabilidades altas/críticas.
  - **Estado atual:** Não implementado (reversão aplicada nesta sessão).

- **OBJ-02**
  - **Nome:** Integração contínua (CI) para os diferentes módulos da pasta
  - **Descrição:** Criar pipelines de CI no Github Actions que validem sintaxe de Dart/Flutter, JS Arcade e construção da Web app React separadamente.
  - **Origem:** Recomendação técnica (ausência de workflow visível para build completo).
  - **Justificativa:** Garantir que nenhuma conversão de sala ou alteração na interface React quebre os testes.
  - **Prioridade:** P1
  - **Critério de conclusão:** Jobs separados e verdes de "lint", "audit" e "builds" para Web, Arcade e Flutter/Dart.
  - **Estado atual:** Não implementado.

- **OBJ-03**
  - **Nome:** Conversão Completa dos Programas em Fila
  - **Descrição:** Conversão roubástica em lote dos 327 programas Java restantes descritos no README/manifesto.
  - **Origem:** Especificação original e documentação do projeto.
  - **Justificativa:** Concluir a missão inicial de arquivar todo trabalho histórico no formato moderno e interativo.
  - **Prioridade:** P3
  - **Critério de conclusão:** Todos os itens do `arcade/manifest.json` marcados com link/path válido e ausência de erros de reserva.
  - **Estado atual:** 15 salas completas / 327 pendentes.

## 5. Melhorias Técnicas

**Arquitetura**
- Reduzir o acoplamento entre a pasta `Java/` original e o runtime Web: a cópia de `yarn` legado está afetando as análises de dependência na raiz.

**Segurança**
- Sanitização estrita do servidor estático (`server.js`).
- Bloqueio do acesso fora do escopo estático local (melhorias de Directory Traversal já aplicadas historicamente).

**Qualidade & Testes**
- Criação de testes de integração E2E leves com Playwright para rodar as alterações visuais das salas recém-convertidas, prevenindo quebras nas conversões automáticas (ex: elementos não desenhados).

**Infraestrutura**
- Script de `Dockerfile` minimalista para quem quiser rodar o arcade sem instalar as cadeias nativas do Node na máquina hospedeira.

## 6. Roadmap de Desenvolvimento

**Fase 1 — Correções Críticas (P0)**
- Concluir revisão de segurança das libs na raiz e no catalógado `Js/nlw`.
- Hardening do fluxo de conversão legado.

**Fase 2 — Estabilização (P1)**
- Configurar pipelines unificDetectionActionad `npm run check` e `npm test` isolados.
- Atualizar Engine Flutter para `>=3.x`.

**Fase 3 — Melhorias Funcionais (P2)**
- Adicionar busca instantânea (Fuse.js) no catálogo.

**Fase 4 — Novas Funcionalidades (P2/P3)**
- Documentar via Swagger os endpoints estáticos (se crescer a demanda de rede).

**Fase 5 — Evolução de Longo Prazo (P3)**
- Implementar cache de Service Workers (PWA) para uso offline das salas de programação.

## 7. Backlog Priorizado

1. **P0 - React Migration:** Atualizar `Js/nlw/web` removendo CRA *e todas as dependências do yarn*, migrando para Vite. Limpar `node_modules` órfãos e corrigir variáveis legadas.
2. **P1 - CI Arcades:** Acionar job do Actions para garantir build do Arcade com sucesso.
3. **P1 - Node LTS Support:** Fixar runners CI em Ubuntu 24.04 / Node v22/24.
4. **P2 - Batch Conversion:** Setup pipeline e adicionar scripts de batch de 10 em 10 classes para revisão fácil.

## 8. Riscos e Pendências

- **Risco de falha na migração React:** O build Vite pode quebrar componentes visuais que usam estilos específicos de Webpack/Sass. A reversão da tentativa anterior prova a cautela necessária.
- **Pendência:** Falta os testes de UI E2E do Playwright para "Happy" rodarem em um container de teste durante a CI, o que está vedado para o `npm run check` direto.

## 9. Ideias e Recomendações Adicionais

- Adicionar tags semânticas no `arcade/manifest.json` (ex: `"type": "matemática"`, `"gui": true`) para facilitar sistemas de buscas externos via SEO.

---
*(Gerado automaticamente pelo Agente Orquestrador - Etapa de Planejamento)*
