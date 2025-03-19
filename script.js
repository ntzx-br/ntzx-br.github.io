const turnos = {
  manha: ["Matheus Filipe", "Isaac", "Kettely"],
  tarde: ["Yzadora", "Natanael", "Matheus Ferreira"],
  noite: ["Gustavo", "Sávio", "Paulo"]
};

function gerarEscala() {
  let mesEscolhido = document.getElementById("mes").value;
  let nomeGerente = document.getElementById("nome").value;

  if (!mesEscolhido) {
    alert("Escolha um mês!");
    return;
  }
  if (!nomeGerente) {
    alert("Informe o nome do gerente!");
    return;
  }

  localStorage.setItem("usuario", nomeGerente);

  let [ano, mes] = mesEscolhido.split("-");
  let diasNoMes = new Date(ano, mes, 0).getDate();
  
  let tabela = `<h1>Super i Telecom</h1>`;
  tabela += `<h2>Escala de Trabalho - ${mes}/${ano}</h2>`;
  tabela += `<table border="1">`;
  tabela += `<tr><th>Nome</th>`;

  let diasSemana = ["D", "S", "T", "Q", "Q", "S", "S"];
  let diaSemanaInicial = new Date(ano, mes - 1, 1).getDay();

  tabela += `<tr><th></th>`;
  for (let dia = 1; dia <= diasNoMes; dia++) {
    tabela += `<th>${diasSemana[(diaSemanaInicial + dia - 1) % 7]}</th>`;
  }
  tabela += `</tr><tr><th></th>`;
  for (let dia = 1; dia <= diasNoMes; dia++) {
    tabela += `<th>${dia}</th>`;
  }
  tabela += `</tr>`;

  let folgasPorTurno = gerarFolgas(ano, mes, diasNoMes);

  Object.entries(turnos).forEach(([turno, funcionarios]) => {
    funcionarios.forEach((funcionario, index) => {
      tabela += `<tr><td>${funcionario} (${turno})</td>`;
      let folgas = folgasPorTurno[turno][index];  
      for (let dia = 1; dia <= diasNoMes; dia++) {
        let isFolga = folgas.includes(dia);
        tabela += `<td class="dia ${isFolga ? 'folga' : ''}" data-funcionario="${funcionario}" data-dia="${dia}" onclick="editarFolga(this)">${isFolga ? 'X' : ''}</td>`;
      }
      tabela += `</tr>`;
    });
  });

  tabela += `</table>`;

  let dataAtual = new Date();
  let horaAtual = dataAtual.toLocaleTimeString();
  tabela += `<p>Gerado por: ${nomeGerente} em ${dataAtual.toLocaleDateString()} às ${horaAtual}</p>`;

  document.getElementById("tabela-container").innerHTML = tabela;
}

function gerarFolgas(ano, mes, diasNoMes) {
  let folgasPorTurno = { manha: [], tarde: [], noite: [] };

  Object.entries(turnos).forEach(([turno, funcionarios]) => {
    let folgasTurno = [];
    funcionarios.forEach(() => folgasTurno.push([]));

    let diasFolgaDisponiveis = Array.from({ length: diasNoMes }, (_, i) => i + 1);
    let folgasEscolhidas = new Set();

    for (let semana = 0; semana < Math.ceil(diasNoMes / 7); semana++) {
      let inicioSemana = semana * 7 + 1;
      let fimSemana = Math.min((semana + 1) * 7, diasNoMes);

      let diasPossiveis = diasFolgaDisponiveis.filter(dia => dia >= inicioSemana && dia <= fimSemana);
      let folgasSemana = new Set();

      funcionarios.forEach((_, i) => {
        let diaFolga;
        do {
          diaFolga = diasPossiveis[Math.floor(Math.random() * diasPossiveis.length)];
        } while (
          folgasEscolhidas.has(diaFolga) ||
          folgasSemana.has(diaFolga) ||
          folgasTurno[i].includes(diaFolga - 1) ||
          folgasTurno[i].includes(diaFolga + 1)
        );

        folgasEscolhidas.add(diaFolga);
        folgasSemana.add(diaFolga);
        folgasTurno[i].push(diaFolga);
      });
    }

    folgasPorTurno[turno] = folgasTurno;
  });

  return folgasPorTurno;
}

function imprimirEscala() {
  window.print();
}

// ---------------------
// 📝 Função para editar manualmente as folgas
// ---------------------
let edicaoAtivada = false;

function ativarEdicao() {
  edicaoAtivada = !edicaoAtivada;
  alert(edicaoAtivada ? "Edição ativada! Clique para alterar qualquer célula." : "Edição desativada.");
}

function editarFolga(cell) {
  if (!edicaoAtivada) return;
  
  let funcionario = cell.getAttribute("data-funcionario");
  let dia = parseInt(cell.getAttribute("data-dia"));

  if (cell.innerText === "X") {
    cell.innerText = "";
    cell.classList.remove("folga");
  } else {
    cell.innerText = "X";
    cell.classList.add("folga");
  }
}