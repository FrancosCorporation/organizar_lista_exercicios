# organizar_lista_exercicios

Coleção de exercícios acadêmicos em Java, organizada por semestre e assunto. Os arquivos originais permanecem em `Java/`; `arcade/` reúne uma seleção convertida para páginas web interativas.

## Abrir o arcade

Requer Node.js 18 ou superior. O projeto não usa dependências externas.

```bash
npm start
```

Abra <http://127.0.0.1:3000/arcade/>. O servidor escuta apenas no computador local e entrega somente os arquivos de `arcade/`.

Para escolher outra porta:

```bash
PORT=3333 npm start
```

O catálogo contém **347 programas únicos**. Vinte arquivos de origem já estão associados a conversões: dezoito apontam para quinze salas no arcade e dois foram portados em projetos próprios. Os **327 programas** restantes continuam na fila. O catálogo identifica cada sala pelo caminho completo do Java original, inclusive quando há nomes de classe repetidos.

Use a busca para localizar por nome, categoria ou caminho do arquivo. Os filtros permitem restringir a categoria e a disponibilidade. Cada sala preserva a referência ao programa Java que lhe deu origem.

## Comandos

```bash
npm start   # servidor local em http://127.0.0.1:3000/arcade/
npm test    # testes automatizados das funções de cálculo das cinco primeiras salas
```

## Estrutura

- `Java/` — exercícios originais, mantidos para consulta.
- `arcade/manifest.json` — inventário de programas, categorias e conversões.
- `arcade/apps/` — salas web feitas com JavaScript e HTML.
- `test/` — verificações automatizadas das funções convertidas.
- `MELHORIAS.md` — itens de evolução do catálogo.
