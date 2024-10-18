const btnCalcular = document.querySelector('#btnCalcular');
document.querySelector('#btnVSair').addEventListener('click', sair);
const cxForm = document.querySelector("#form")
const cxResultado = document.querySelector("#resultado")
const btnVoltar = document.querySelector("#btnVolt")
const btnLimpa = document.querySelector("#btnLimpa")

const divSalarioBruto = document.querySelector("#divSalarioBruto")
const divDescontoINSS = document.querySelector("#divDescontoINSS")
const divDescontoIRPF = document.querySelector("#divDescontoIRPF")
const divDescontoTransporte = document.querySelector("#divDescontoTransporte")
const divDeducao = document.querySelector("#divDeducao")
const divSalarioLiquido = document.querySelector("#divSalarioLiquido")

btnCalcular.addEventListener("click", ()=>{
    calcular();
    cxForm.classList.toggle("ocultar")
    cxResultado.classList.toggle("ocultar")
})

const calcular = () => {
    const valorHora = parseFloat(document.querySelector('#valorHora').value);
    const qtdeHoras = parseFloat(document.querySelector('#quantidadeTrabalhada').value);
    const valeTransporte = document.querySelector('#inputVale').value.toUpperCase() === 'S';
    const outrasDeducoes = parseFloat(document.querySelector('#outrasDeducoes').value) || 0;


    const salarioBruto = valorHora * qtdeHoras;
    const descontoValeTransporte = valeTransporte ? salarioBruto * 0.06 : 0;
    const inss = calcularINSS(salarioBruto);
    const baseCalculoIRPF = salarioBruto - inss - descontoValeTransporte;
    const irpf = calcularIRPF(baseCalculoIRPF);
    const salarioLiquido = salarioBruto - (inss + irpf + descontoValeTransporte + outrasDeducoes);

    document.querySelector('#divSalarioBruto').innerText = `Salário Bruto R$ ${salarioBruto.toFixed(2)}`;
    document.querySelector('#divDescontoINSS').innerText = `Desconto INSS - R$ ${inss.toFixed(2)}`;
    document.querySelector('#divDescontoIRPF').innerText = `Desconto IRPF - R$ ${irpf.toFixed(2)}`;
    document.querySelector('#divDescontoTransporte').innerText = `Desconto Vale Transporte - R$ ${descontoValeTransporte.toFixed(2)}`;
    document.querySelector('#divDeducao').innerText = `Outras Deduções - R$ ${outrasDeducoes.toFixed(2)}`;
    document.querySelector('#divSalarioLiquido').innerText = `Salário Líquido R$ ${salarioLiquido.toFixed(2)}`;
}

function calcularINSS(salario) {
    if (salario <= 1320.00) {
        return salario * 0.075;
    } else if (salario <= 2571.29) {
        return (1320.00 * 0.075) + ((salario - 1320.00) * 0.09);
    } else if (salario <= 3856.94) {
        return (1320.00 * 0.075) + ((2571.29 - 1320.00) * 0.09) + ((salario - 2571.29) * 0.12);
    } else if (salario <= 7507.49) {
        return (1320.00 * 0.075) + ((2571.29 - 1320.00) * 0.09) + ((3856.94 - 2571.29) * 0.12) + ((salario - 3856.94) * 0.14);
    }
    return 0;
}

function calcularIRPF(base) {
    if (base <= 2112.00) {
        return 0;
    } else if (base <= 2826.65) {
        return (base * 0.075);
    } else if (base <= 3751.06) {
        return (base * 0.15) - 316.38;
    } else if (base <= 4664.68) {
        return (base * 0.225) - 552.36;
    } else {
        return (base * 0.275) - 796.36;
    }
}

function sair() {
    window.close();
}
btnVoltar.addEventListener("click", ()=>{

    cxForm.classList.toggle("ocultar")
    cxResultado.classList.toggle("ocultar")
    
})
btnLimpa.addEventListener("click", ()=>{
  limpaInput() 
})

const limpaInput = () => {
 divSalarioBruto.innerHTML = ""
 divDescontoINSS.innerHTML = ""
 divDescontoIRPF.innerHTML = ""
 divDescontoTransporte.innerHTML = ""
 divDeducao.innerHTML = ""
 divSalarioLiquido.innerHTML = ""
}