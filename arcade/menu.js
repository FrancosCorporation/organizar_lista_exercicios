// Menu do arcade: lê manifest.json (gerado do inventário dedup dos .java originais)
// e lista os apps por categoria com status (portado/pendente).
const MAPA_SALAS = {
  'Calculadoradeprobabilidade': 'apps/estatistica/'
};

fetch('manifest.json')
  .then((r) => r.json())
  .then(({ total, pendentes, apps }) => {
    document.getElementById('resumo').textContent =
      `${total} apps únicos catalogados · ${total - pendentes} já portados · ${pendentes} na fila (conversão contínua)`;

    const porCategoria = {};
    for (const app of apps) {
      (porCategoria[app.categoria] ||= []).push(app);
    }

    const menu = document.getElementById('menu');
    for (const [categoria, lista] of Object.entries(porCategoria).sort((a, b) => b[1].length - a[1].length)) {
      const sec = document.createElement('section');
      sec.className = 'categoria';
      sec.innerHTML = `<h2>${categoria} (${lista.length})</h2><div class="grid"></div>`;
      const grid = sec.querySelector('.grid');
      for (const app of lista) {
        const sala = MAPA_SALAS[app.nome];
        const card = document.createElement('a');
        card.className = 'card';
        if (sala) { card.href = sala; }
        else { card.href = '#'; card.style.opacity = 0.65; card.title = 'Ainda não portado — ver java original'; }
        card.innerHTML = `<span class="badge ${app.status}">${sala ? 'JOGAR/ABRIR' : app.status}</span>
          <span class="nome">${app.nome}</span><span class="arquivo">${app.arquivo}</span>`;
        grid.appendChild(card);
      }
      menu.appendChild(sec);
    }
  });
