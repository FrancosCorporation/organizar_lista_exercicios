# Melhorias do arcade de exercícios

Objetivo: transformar a coleção de exercícios Java em um catálogo web local que facilite encontrar as conversões disponíveis e preserve os programas originais.

## P1 — Segurança

- [x] **SEC-01** — Limitar `server.js:6-94` aos arquivos estáticos de `arcade/`, ao host local e aos métodos de leitura; validar caminhos já decodificados e impedir acesso a arquivos ocultos e links simbólicos para fora da pasta. Verificação: `node --check server.js` e revisão estática da resolução de caminhos e cabeçalhos.
- [x] **SEC-02** — Remover a interpolação insegura de `arcade/apps/compare-to/pagina.js:6-21` e retirar scripts/estilos embutidos das cinco salas existentes para que a política CSP funcione sem exceções inline. Verificação: `node --check` dos módulos e busca estática sem `innerHTML`, `<script>` embutido ou `<style>` embutido nas salas.
- [x] **SEC-03** — Substituir o CRA 3.4.3 e seu `yarn.lock` vulnerável em `Js/nlw/web/` por Vite e dependências atualizadas, removendo a chave Mapbox obrigatória e exibindo atribuição do OpenStreetMap. Verificação: `npm audit --audit-level=high` sem vulnerabilidades, typecheck e build.

## P2 — Correção e experiência

- [x] **BUG-01** — Corrigir o vínculo por nome duplicado em `arcade/menu.js:1-20` e sincronizar `arcade/manifest.json:1-5` com as salas existentes em `arcade/apps/`. Verificação: interpretar o JSON e conferir os 18 caminhos mapeados contra as salas e os estados correspondentes no manifesto.
- [x] **UX-01** — Substituir a renderização HTML interpolada em `arcade/menu.js:38-65` por criação segura de elementos e oferecer busca, filtros, contagem correta e estados de carregamento/erro/vazio (`arcade/menu.js:80-153`). Verificação: `node --check arcade/menu.js` e inspeção estática de que valores do manifesto só entram via `textContent`.
- [x] **UX-02** — Melhorar a navegação e leitura do catálogo em `arcade/index.html:12-41` e `arcade/style.css:1-143`, com controles rotulados, foco visível e layout responsivo. Verificação: `git diff --check` e inspeção estática da semântica e das regras responsivas.
- [x] **IMP-01** — Portar dez exercícios GUI para dez salas acessíveis pelo catálogo. Origens: `Java/Em Desenvolvimeto/Abrindo Link/src/Padrao/NovaAba.java:1`, `Java/Exemplos/TesteGUI/src/principal/MinhaPrimeiraJanela.java:1`, `Java/Exemplos/TesteGUI/src/principal/SegundaJanela.java:1`, `Java/Exemplos/TudoDeImagens/src/padrao/LoadingPicture.java:1`, `Java/Projetos Senac 1-2 semestres/Agenda/src/agenda/MostrarListaEmTabela.java:1`, `Java/Projetos Senac 1-2 semestres/Calculador/src/soma/calc.java:1`, `Java/Projetos Senac 1-2 semestres/Prof Marcelo Faustino/src/Primeiro/Exercicioslista7/Exercicio7_1.java:1`, `Java/Projetos Senac 1-2 semestres/Prof Marcelo Faustino/src/Primeiro/Exercicioslista7/Exercicio7_2.java:1`, `Java/Projetos Senac 1-2 semestres/Prof Marcelo Faustino/src/Primeiro/Exercicioslista7/Exercicio7_3.java:1` e `Java/Projetos Senac 1-2 semestres/Prof Marcelo Faustino/src/Primeiro/Exercicioslista7/Exercicio7_4.java:1`. Verificação: os 18 caminhos mapeados correspondem a pastas com `index.html`; `node --check` passou em todos os arquivos JavaScript do arcade.

## P3 — Documentação

- [x] **DOC-01** — Atualizar `README.md:3-38` com o estado real da coleção, comando de início, comportamento local do servidor e número atualizado de itens. Verificação: comparar as instruções e a contagem documentada com `package.json` e `arcade/manifest.json`.

## P4 — Manutenção e CI

- [x] **DEVOPS-01** — Declarar Node.js 22.12+ e validar no CI, em Node 22/24, a sintaxe JavaScript, as origens do manifesto, as salas locais e os números documentados. A validação não executa a suíte comportamental. Verificação: `npm run check` e workflow estático.
- [x] **DEVOPS-02** — Adicionar o app Happy à CI em Node 22/24 com instalação reproduzível, audit de dependências, verificação de tipos e build de produção; a suíte de testes não é executada. Verificação: os quatro comandos passaram localmente e a CI deve confirmar após o push.

## Fora deste ciclo

- Conversão dos **327 programas** que ainda aparecem na fila; priorizar GUI e continuar em lotes, preservando a finalidade de cada Java original.
- Execução da suíte de testes existente; esta rodada fez apenas verificações estáticas.
