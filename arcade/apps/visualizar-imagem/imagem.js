import { showMessage } from '../shared.js';

const fileInput = document.getElementById('arquivo');
const message = document.getElementById('mensagem');
const preview = document.getElementById('visualizacao');
const image = document.getElementById('imagem');
let previewUrl;

function releasePreview() {
  if (previewUrl) URL.revokeObjectURL(previewUrl);
  previewUrl = undefined;
}

fileInput.addEventListener('change', () => {
  const [file] = fileInput.files || [];
  releasePreview();
  preview.hidden = true;
  image.removeAttribute('src');

  if (!file) {
    showMessage(message, 'Nenhuma imagem selecionada.');
    return;
  }
  if (!file.type.startsWith('image/')) {
    showMessage(message, 'Escolha um arquivo de imagem.', 'error');
    fileInput.value = '';
    return;
  }
  if (file.size > 10 * 1024 * 1024) {
    showMessage(message, 'A imagem deve ter até 10 MB.', 'error');
    fileInput.value = '';
    return;
  }

  previewUrl = URL.createObjectURL(file);
  image.alt = `Pré-visualização de ${file.name}`;
  image.onload = () => {
    preview.hidden = false;
    showMessage(message, `${file.name} · ${image.naturalWidth} × ${image.naturalHeight} px`, 'success');
  };
  image.onerror = () => {
    releasePreview();
    fileInput.value = '';
    showMessage(message, 'O arquivo não pôde ser aberto como imagem.', 'error');
  };
  image.src = previewUrl;
});

window.addEventListener('pagehide', releasePreview, { once: true });
