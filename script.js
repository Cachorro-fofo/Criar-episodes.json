<<<<<<< HEAD
// array que guardará os episódios
let episodes = [];

// elementos
const numeroEl = document.getElementById('numero');
const tituloEl = document.getElementById('titulo');
const dataEl = document.getElementById('data');
const scanEl = document.getElementById('scan');
const resultadoEl = document.getElementById('resultado');
const adicionarBtn = document.getElementById('adicionarBtn');
const baixarBtn = document.getElementById('baixarBtn');
const limparBtn = document.getElementById('limparBtn');
const errNumero = document.getElementById('err-numero');
const errTitulo = document.getElementById('err-titulo');

// formatação ISO simples: se tiver data, retorna "YYYY-MM-DDT00:00:00"
function formatDateIso(dateStr){
  if(!dateStr) return "";
  // dateStr vem no formato YYYY-MM-DD (input[type=date])
  return dateStr + "T00:00:00";
}

function updateResultado(){
  resultadoEl.textContent = JSON.stringify(episodes, null, 2);
}

function validar(){
  let ok = true;
  // limpar erros
  errNumero.style.display = 'none';
  errTitulo.style.display = 'none';

  const numVal = numeroEl.value.replace(",", ".");
  const tituloVal = tituloEl.value.trim();

  if(!numVal || isNaN(Number(numVal)) || Number(numVal) < 0){
    errNumero.textContent = " Informe um número >= 0";
    errNumero.style.display = 'inline';
    ok = false;
  }

  if(!tituloVal){
    errTitulo.textContent = " Título obrigatório";
    errTitulo.style.display = 'inline';
    ok = false;
  }

  return ok;
}

adicionarBtn.addEventListener('click', () => {
  if(!validar()) return;

  const episode_number = Number(numeroEl.value.replace(",", "."));
  const name = tituloEl.value.trim();
  const date_upload = formatDateIso(dataEl.value);
  const scanlator = scanEl.value.trim();

  const item = {
    episode_number: episode_number,
    name: name
  };

  if (date_upload) {item.date_upload = date_upload};
  if (scanlator) {item.scanlator = scanlator};

  episodes.push(item);

  // limpar inputs (mantém foco no número para facilitar)
  numeroEl.value = '';
  tituloEl.value = '';
  dataEl.value = '';
  numeroEl.focus();

  updateResultado();
});

baixarBtn.addEventListener('click', () => {
  const content = JSON.stringify(episodes, null, 2);
  const blob = new Blob([content], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = "episodes.json";
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }, 100);
});

limparBtn.addEventListener('click', () => {
  if(!confirm('Limpar todos os episódios adicionados?')) return;
  episodes = [];
  updateResultado();
});

// Exibir estado inicial
updateResultado();
=======

>>>>>>> 7f5e077b0ef2b33b4b79b6f5d37f959bdd998c75
