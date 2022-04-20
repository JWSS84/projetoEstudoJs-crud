const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sName = document.querySelector('#m-name')
const sFunction = document.querySelector('#m-function')
const sSalary = document.querySelector('#m-salary')
const btnSave = document.querySelector('#btnSave')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sName.value = itens[index].nome
    sFunction.value = itens[index].funcao
    sSalary.value = itens[index].salario
    id = index
  } else {
    sName.value = ''
    sFunction.value = ''
    sSalary.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}
// pega atraves da interpolacao cada item novo e seta no body da tabela
function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.funcao}</td>
    <td>R$ ${item.salario}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSave.onclick = e => {
  
  if (sName.value == '' || sFunction.value == '' || sSalary.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sName.value
    itens[id].funcao = sFunction.value
    itens[id].salario = sSalary.value
  } else {
    itens.push({'nome': sName.value, 'funcao': sFunction.value, 'salario': sSalary.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}
// atraves do "for" vai percorrer e criar cada linha
function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}
// pega os itens do banco "dbfunc" pelo get, caso não tenha nada retorna um array vazio
const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
// seta os itens pra dentro do "dbfunc" no localstorage
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

//funcao assim que carrega a tela
loadItens()
