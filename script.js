// array que guardará os episódios
let episodes = [];
let editIndex = null;

// elementos
const numeroEl = document.getElementById('numero');
const tituloEl = document.getElementById('titulo');
const dataEl = document.getElementById('data');
const scanEl = document.getElementById('scan');
const resultadoEl = document.getElementById('resultado');
const listaEl = document.getElementById('lista');
const errNumero = document.getElementById('err-numero');
const errTitulo = document.getElementById('err-titulo');

// formatação ISO simples: se tiver data, retorna "YYYY-MM-DDT00:00:00"
function formatDateIso(dateStr) {
  if (!dateStr) return "";
  return dateStr + "T00:00:00";
}

function updateResultado() {
  resultadoEl.textContent = JSON.stringify(episodes, null, 2);
  renderLista();
}

function renderLista() {
  listaEl.innerHTML = '';
  episodes.forEach((ep, idx) => {
    const li = document.createElement('li');
    const text = document.createElement('span');
    text.textContent = `#${ep.episode_number} - ${ep.name}`;
    const btns = document.createElement('div');
    const editBtn = document.createElement('button');
    const delBtn = document.createElement('button');
    editBtn.textContent = 'Editar';
    delBtn.textContent = 'Remover';
    editBtn.onclick = () => editarItem(idx);
    delBtn.onclick = () => removerItem(idx);
    btns.append(editBtn, delBtn);
    li.append(text, btns);
    listaEl.appendChild(li);
  });
}

function validar() {
  let ok = true;
  errNumero.style.display = 'none';
  errTitulo.style.display = 'none';
  const numVal = numeroEl.value.replace(",", ".");
  const tituloVal = tituloEl.value.trim();

  if (!numVal || isNaN(Number(numVal)) || Number(numVal) < 0) {
    errNumero.textContent = " Informe um número maior ou igual a 0";
    errNumero.style.display = 'inline';
    ok = false;
  }
  if (!tituloVal) {
    errTitulo.textContent = " Título obrigatório";
    errTitulo.style.display = 'inline';
    ok = false;
  }
  return ok;
}

function editarItem(index) {
  const ep = episodes[index];
  numeroEl.value = ep.episode_number;
  tituloEl.value = ep.name;
  dataEl.value = ep.date_upload ? ep.date_upload.split("T")[0] : '';
  scanEl.value = ep.scanlator || '';
  editIndex = index;
}

function removerItem(index) {
  if (confirm('Remover este episódio?')) {
    episodes.splice(index, 1);
    updateResultado();
  }
}

document.getElementById('adicionarBtn').addEventListener('click', () => {
  if (!validar()) return;

  let item = {
    episode_number: Number(numeroEl.value.replace(",", ".")),
    name: tituloEl.value.trim()
  };

  const dateStr = dataEl.value;
  const scan = scanEl.value.trim();

  if (dateStr) item.date_upload = formatDateIso(dateStr);
  if (scan) item.scanlator = scan;

  if (editIndex !== null) {
    episodes[editIndex] = item;
    editIndex = null;
  } else {
    episodes.push(item);
  }

  numeroEl.value = '';
  tituloEl.value = '';
  dataEl.value = '';
  numeroEl.focus();

  updateResultado();
});

document.getElementById('baixarBtn').addEventListener('click', () => {
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

document.getElementById('limparBtn').addEventListener('click', () => {
  if (confirm('Limpar todos os episódios?')) {
    episodes = [];
    updateResultado();
  }
});

updateResultado();
