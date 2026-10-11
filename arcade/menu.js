const SALAS_POR_ORIGEM = new Map([
  ['Java/Projetos Senac 1-2 semestres/EstatisticaCalculos/src/Calculadoradeprobabilidade.java', 'apps/estatistica/'],
  ['Java/Em Desenvolvimeto/Conversor de Bases/src/FrontEnd/NewFrontEnd.java', 'apps/conversor-bases/'],
  ['Java/Em Desenvolvimeto/Conversor de Bases/src/Logica/Logica_1.java', 'apps/conversor-bases/'],
  ['Java/Projetos Senac 1-2 semestres/Faustino2nd/src/Class_poo/Estatistica_calc_quartis.java', 'apps/quartis/'],
  ['Java/Em Desenvolvimeto/Strings/src/comparacoes/MetodoCompareTo.java', 'apps/compare-to/'],
  ['Java/Exemplos/CaixaDialogoComReturn/src/padrao/CaixaDialogoComReturn.java', 'apps/dialogo-data/'],
  ['Java/Puc-Goias/1048 - Tecnicas de Programacao - CalculadoraDeData/src/padrao/ClasseDeCalculo.java', 'apps/dialogo-data/'],
  ['Java/Puc-Goias/1048 - Tecnicas de Programacao - CalculadoraDeData/src/padrao/ClassePrincipal.java', 'apps/dialogo-data/'],
  ['Java/Em Desenvolvimeto/Abrindo Link/src/Padrao/NovaAba.java', 'apps/abrir-link/'],
  ['Java/Exemplos/TesteGUI/src/principal/MinhaPrimeiraJanela.java', 'apps/minha-primeira-janela/'],
  ['Java/Exemplos/TesteGUI/src/principal/SegundaJanela.java', 'apps/segunda-janela/'],
  ['Java/Exemplos/TudoDeImagens/src/padrao/LoadingPicture.java', 'apps/visualizar-imagem/'],
  ['Java/Projetos Senac 1-2 semestres/Agenda/src/agenda/MostrarListaEmTabela.java', 'apps/tabela-contatos/'],
  ['Java/Projetos Senac 1-2 semestres/Calculador/src/soma/calc.java', 'apps/soma/'],
  ['Java/Projetos Senac 1-2 semestres/Prof Marcelo Faustino/src/Primeiro/Exercicioslista7/Exercicio7_1.java', 'apps/pares/'],
  ['Java/Projetos Senac 1-2 semestres/Prof Marcelo Faustino/src/Primeiro/Exercicioslista7/Exercicio7_2.java', 'apps/soma-sequencia/'],
  ['Java/Projetos Senac 1-2 semestres/Prof Marcelo Faustino/src/Primeiro/Exercicioslista7/Exercicio7_3.java', 'apps/ingressos/'],
  ['Java/Projetos Senac 1-2 semestres/Prof Marcelo Faustino/src/Primeiro/Exercicioslista7/Exercicio7_4.java', 'apps/motos/']
]);

const resumo = document.getElementById('resumo');
const estado = document.getElementById('estado');
const menu = document.getElementById('menu');
const busca = document.getElementById('busca');
const categoriaFiltro = document.getElementById('categoria');
const statusFiltro = document.getElementById('status');
const limpar = document.getElementById('limpar-filtros');

let programas = [];

function situacao(programa) {
  if (SALAS_POR_ORIGEM.has(programa.arquivo)) return 'local';
  if (programa.status === 'portado') return 'externo';
  return 'pendente';
}

function criarCartao(programa) {
  const sala = SALAS_POR_ORIGEM.get(programa.arquivo);
  const cartao = document.createElement(sala ? 'a' : 'article');
  cartao.className = 'card';

  if (sala) {
    cartao.href = sala;
    cartao.setAttribute('aria-label', `Abrir sala: ${programa.nome}`);
  }

  const etiqueta = document.createElement('span');
  etiqueta.className = `badge ${situacao(programa)}`;
  etiqueta.textContent = sala
    ? 'Abrir sala'
    : programa.status === 'portado'
      ? 'Portado em outro projeto'
      : 'Na fila';

  const nome = document.createElement('span');
  nome.className = 'nome';
  nome.textContent = programa.nome || 'Programa sem nome';

  const arquivo = document.createElement('span');
  arquivo.className = 'arquivo';
  arquivo.textContent = programa.arquivo || 'Origem não informada';

  cartao.append(etiqueta, nome, arquivo);
  return cartao;
}

function preencherCategorias() {
  const categorias = [...new Set(programas.map((programa) => programa.categoria).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, 'pt-BR'));

  for (const nome of categorias) {
    const opcao = document.createElement('option');
    opcao.value = nome;
    opcao.textContent = nome;
    categoriaFiltro.append(opcao);
  }
}

function renderizar() {
  const termo = busca.value.trim().toLocaleLowerCase('pt-BR');
  const categoria = categoriaFiltro.value;
  const status = statusFiltro.value;
  const filtrados = programas.filter((programa) => {
    const texto = `${programa.nome || ''} ${programa.arquivo || ''} ${programa.categoria || ''}`
      .toLocaleLowerCase('pt-BR');
    return (!termo || texto.includes(termo))
      && (!categoria || programa.categoria === categoria)
      && (!status || situacao(programa) === status);
  });

  const grupos = new Map();
  for (const programa of filtrados) {
    const nomeCategoria = programa.categoria || 'Sem categoria';
    if (!grupos.has(nomeCategoria)) grupos.set(nomeCategoria, []);
    grupos.get(nomeCategoria).push(programa);
  }

  const fragmento = document.createDocumentFragment();
  const categorias = [...grupos.entries()].sort(([a, listaA], [b, listaB]) =>
    listaB.length - listaA.length || a.localeCompare(b, 'pt-BR'));

  for (const [nomeCategoria, lista] of categorias) {
    const secao = document.createElement('section');
    secao.className = 'categoria';

    const titulo = document.createElement('h2');
    titulo.textContent = `${nomeCategoria} (${lista.length})`;

    const grade = document.createElement('div');
    grade.className = 'grid';
    for (const programa of lista) grade.append(criarCartao(programa));

    secao.append(titulo, grade);
    fragmento.append(secao);
  }

  menu.replaceChildren(fragmento);
  const portados = programas.filter((programa) => programa.status === 'portado').length;
  const pendentes = programas.length - portados;
  const salas = new Set(SALAS_POR_ORIGEM.values()).size;
  resumo.textContent = `${programas.length} programas · ${salas} salas no arcade · ${portados} fontes portadas · ${pendentes} na fila · ${filtrados.length} exibidos`;
  estado.textContent = filtrados.length
    ? `${filtrados.length} resultado${filtrados.length === 1 ? '' : 's'}.`
    : 'Nenhum programa corresponde aos filtros. Tente outro termo ou limpe os filtros.';
}

async function carregarCatalogo() {
  estado.textContent = 'Carregando o catálogo…';
  estado.removeAttribute('role');
  menu.replaceChildren();

  try {
    const resposta = await fetch('manifest.json', { headers: { Accept: 'application/json' } });
    if (!resposta.ok) throw new Error('manifesto indisponível');

    const manifesto = await resposta.json();
    if (!manifesto || !Array.isArray(manifesto.apps)) throw new Error('manifesto inválido');

    programas = manifesto.apps;
    preencherCategorias();
    renderizar();
  } catch {
    resumo.textContent = 'O catálogo não pôde ser carregado.';
    estado.textContent = 'Não foi possível abrir o inventário. Confira sua conexão local e tente novamente.';
    estado.setAttribute('role', 'alert');

    const tentarNovamente = document.createElement('button');
    tentarNovamente.className = 'botao-secundario';
    tentarNovamente.type = 'button';
    tentarNovamente.textContent = 'Tentar novamente';
    tentarNovamente.addEventListener('click', carregarCatalogo, { once: true });
    estado.append(' ', tentarNovamente);
  }
}

busca.addEventListener('input', renderizar);
categoriaFiltro.addEventListener('change', renderizar);
statusFiltro.addEventListener('change', renderizar);
limpar.addEventListener('click', () => {
  busca.value = '';
  categoriaFiltro.value = '';
  statusFiltro.value = '';
  busca.focus();
  renderizar();
});

carregarCatalogo();
