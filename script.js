let ultimoCalculo = null;

// Elementos Dinâmicos dos Rótulos (Labels)
const labelPesoVeiculo = document.getElementById('label-peso-veiculo');
const labelBagagem = document.getElementById('label-bagagem');
const labelPassageiros = document.getElementById('label-passageiros');
const inputPassageiros = document.getElementById('passageiros');
const inputConsumo = document.getElementById('consumo');
const inputPesoVeiculo = document.getElementById('peso-carro');
const buttonsPreset = document.querySelectorAll('.btn-preset');

// Alterna rótulos dinamicamente usando códigos Unicode para evitar erros de acentuação
buttonsPreset.forEach(button => {
    button.addEventListener('click', () => {
        buttonsPreset.forEach(b => b.classList.remove('active'));
        button.classList.add('active');

        const tipoVeiculo = button.getAttribute('data-tipo');
        const consumoSugerido = button.getAttribute('data-consumo');
        const pesoSugerido = button.getAttribute('data-peso');

        inputConsumo.value = consumoSugerido;
        if (pesoSugerido) {
            inputPesoVeiculo.value = pesoSugerido;
        }

        if (tipoVeiculo === 'moto') {
            labelPesoVeiculo.textContent = 'Peso da Moto (kg):';
            labelBagagem.textContent = 'Mala / Bauletos / Bags (kg):';
            labelPassageiros.textContent = 'N\u00BA de Ocupantes (Piloto + Garupa):';
            inputPassageiros.max = '2';
            if (parseInt(inputPassageiros.value) > 2) {
                inputPassageiros.value = 2;
            }
        } else {
            labelPesoVeiculo.textContent = 'Peso do Pr\u00F3prio Carro (kg):';
            labelBagagem.textContent = 'Bagagens / Carga (kg):';
            labelPassageiros.textContent = 'N\u00BA de Pessoas (com motorista):';
            inputPassageiros.max = '9';
        }
    });
});

// Lógica de Cálculo
document.getElementById('calc-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const distanciaInput = parseFloat(document.getElementById('distancia').value);
    const consumoBase = parseFloat(inputConsumo.value);
    const preco = parseFloat(document.getElementById('preco').value);
    const pedagio = parseFloat(document.getElementById('pedagio').value) || 0;
    const passageiros = parseInt(inputPassageiros.value);

    // Pesos
    const pesoVeiculo = parseFloat(inputPesoVeiculo.value) || 140;
    const pesoBagagem = parseFloat(document.getElementById('peso-bagagem').value) || 0;
    const pesoPessoa = parseFloat(document.getElementById('peso-pessoa').value) || 75;

    const pix = document.getElementById('pix').value.trim();
    const arredondarPix = document.getElementById('arredondar-pix').checked;

    const tipoTrajeto = document.querySelector('input[name="tipo_trajeto"]:checked').value;
    const distanciaTotal = tipoTrajeto === 'idavolta' ? distanciaInput * 2 : distanciaInput;

    if (distanciaTotal > 0 && consumoBase > 0 && preco > 0 && passageiros > 0) {

        // Cálculo do Peso Bruto
        const pesoOcupantes = passageiros * pesoPessoa;
        const pesoCargaTotal = pesoOcupantes + pesoBagagem;
        const pesoBrutoTotal = pesoVeiculo + pesoCargaTotal;

        // Fórmula de Sensibilidade de Peso em relação à massa base (Veículo + Condutor de 75kg)
        const pesoBaseReferencia = pesoVeiculo + 75;
        const variacaoMassaPercentual = (pesoBrutoTotal - pesoBaseReferencia) / pesoBaseReferencia;

        const fatorAjusteConsumo = 1 + (variacaoMassaPercentual * 0.50);
        const consumoAjustado = Math.max(1, consumoBase / fatorAjusteConsumo);

        // Financeiro
        const litrosTotais = distanciaTotal / consumoAjustado;
        const custoCombustivel = litrosTotais * preco;
        const custoTotal = custoCombustivel + pedagio;

        let custoPorPassageiro = custoTotal / passageiros;
        if (arredondarPix) {
            custoPorPassageiro = Math.ceil(custoPorPassageiro);
        }

        const custoPorKm = custoTotal / distanciaTotal;

        ultimoCalculo = {
            distanciaTotal,
            pesoVeiculo,
            pesoCargaTotal,
            pesoBrutoTotal,
            consumoAjustado: consumoAjustado.toFixed(2),
            litrosTotais: litrosTotais.toFixed(2),
            custoCombustivel: custoCombustivel.toFixed(2),
            pedagio: pedagio.toFixed(2),
            custoTotal: custoTotal.toFixed(2),
            custoPorKm: custoPorKm.toFixed(2),
            custoPorPassageiro: custoPorPassageiro.toFixed(2),
            passageiros,
            pix,
            tipoTrajetoText: tipoTrajeto === 'idavolta' ? 'Ida e Volta' : 'Apenas Ida'
        };

        // Atualiza Painel de Resultados
        document.getElementById('distancia-total-res').textContent = `${distanciaTotal} km (${ultimoCalculo.tipoTrajetoText})`;
        document.getElementById('peso-carro-res').textContent = `${pesoVeiculo} kg`;
        document.getElementById('peso-carga-res').textContent = `${pesoCargaTotal} kg`;
        document.getElementById('peso-total-bruto-res').textContent = `${pesoBrutoTotal} kg`;
        document.getElementById('consumo-ajustado-res').textContent = `${consumoAjustado.toFixed(2)}`;
        document.getElementById('litros-totais').textContent = litrosTotais.toFixed(2);
        document.getElementById('custo-combustivel').textContent = `R$ ${custoCombustivel.toFixed(2)}`;
        document.getElementById('custo-pedagio').textContent = `R$ ${pedagio.toFixed(2)}`;
        document.getElementById('custo-total').textContent = `R$ ${custoTotal.toFixed(2)}`;
        document.getElementById('custo-km').textContent = `R$ ${custoPorKm.toFixed(2)} / km`;
        document.getElementById('custo-passageiro').textContent = `R$ ${custoPorPassageiro.toFixed(2)} ${arredondarPix ? '(Arredondado)' : ''}`;

        // Exibe PIX se preenchido
        const pixContainer = document.getElementById('pix-qr-container');
        const pixKeyDisplay = document.getElementById('pix-key-display');

        if (pix !== '') {
            if (pixKeyDisplay) pixKeyDisplay.textContent = pix;
            if (pixContainer) pixContainer.classList.remove('hidden');
        } else if (pixContainer) {
            pixContainer.classList.add('hidden');
        }

        document.getElementById('resultado').classList.remove('hidden');
    }
});

// Comparador Flex
function calcularFlex() {
    const precoGasolina = parseFloat(document.getElementById('flex-gasolina').value);
    const precoEtanol = parseFloat(document.getElementById('flex-etanol').value);
    const resultadoEl = document.getElementById('flex-resultado');

    if (precoGasolina > 0 && precoEtanol > 0) {
        const raz = precoEtanol / precoGasolina;
        if (raz <= 0.7) {
            resultadoEl.textContent = ` Abaste\u00E7a com ETANOL! (Propor\u00E7\u00E3o: ${(raz * 100).toFixed(1)}%)`;
            resultadoEl.style.color = '#27ae60';
        } else {
            resultadoEl.textContent = ` Abaste\u00E7a com GASOLINA! (Propor\u00E7\u00E3o: ${(raz * 100).toFixed(1)}%)`;
            resultadoEl.style.color = '#e67e22';
        }
    } else {
        resultadoEl.textContent = 'Digite os pre\u00E7os para comparar qual compensa mais.';
        resultadoEl.style.color = 'inherit';
    }
}

document.getElementById('flex-gasolina').addEventListener('input', calcularFlex);
document.getElementById('flex-etanol').addEventListener('input', calcularFlex);

// Copiar PIX
const btnCopyPix = document.getElementById('btn-copy-pix');
if (btnCopyPix) {
    btnCopyPix.addEventListener('click', () => {
        const pixKey = document.getElementById('pix-key-display').textContent;
        if (pixKey) {
            navigator.clipboard.writeText(pixKey).then(() => {
                btnCopyPix.textContent = 'Copiado! \u2713';
                setTimeout(() => { btnCopyPix.textContent = 'Copiar Chave PIX'; }, 2000);
            });
        }
    });
}

// Geração de Relatório em PDF com jsPDF
document.getElementById('btn-pdf').addEventListener('click', () => {
    if (!ultimoCalculo) return;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('Relatorio de Custos de Viagem', 20, 20);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Data do Calculo: ${new Date().toLocaleDateString('pt-BR')}`, 20, 30);

    doc.setLineWidth(0.5);
    doc.line(20, 35, 190, 35);

    let y = 45;
    doc.text(`Distancia Total: ${ultimoCalculo.distanciaTotal} km (${ultimoCalculo.tipoTrajetoText})`, 20, y); y += 10;
    doc.text(`Peso do Veiculo Vazio: ${ultimoCalculo.pesoVeiculo} kg`, 20, y); y += 10;
    doc.text(`Peso das Cargas / Ocupantes: ${ultimoCalculo.pesoCargaTotal} kg`, 20, y); y += 10;
    doc.text(`Peso Bruto na Rodovia: ${ultimoCalculo.pesoBrutoTotal} kg`, 20, y); y += 10;
    doc.text(`Consumo Reajustado: ${ultimoCalculo.consumoAjustado} km/l`, 20, y); y += 10;
    doc.text(`Litros Estimados: ${ultimoCalculo.litrosTotais} L`, 20, y); y += 10;
    doc.text(`Custo do Combustivel: R$ ${ultimoCalculo.custoCombustivel}`, 20, y); y += 10;
    doc.text(`Pedagios e Extras: R$ ${ultimoCalculo.pedagio}`, 20, y); y += 10;

    doc.line(20, y, 190, y); y += 10;

    doc.setFont('helvetica', 'bold');
    doc.text(`Custo Total da Viagem: R$ ${ultimoCalculo.custoTotal}`, 20, y); y += 10;
    doc.text(`Numero de Ocupantes: ${ultimoCalculo.passageiros}`, 20, y); y += 10;
    doc.text(`Valor por Pessoa: R$ ${ultimoCalculo.custoPorPassageiro}`, 20, y); y += 10;

    if (ultimoCalculo.pix) {
        y += 5;
        doc.text(`Chave PIX para Pagamento: ${ultimoCalculo.pix}`, 20, y);
    }

    doc.save('Relatorio_Viagem.pdf');
});

// Compartilhar WhatsApp
document.getElementById('btn-whatsapp').addEventListener('click', () => {
    if (!ultimoCalculo) return;

    let texto = `\uD83D\uDE97\uD83C\uDFCD\uFE0F *Divis\u00E3o de Custos de Viagem*\n\n` +
        `\uD83D\uDCCD *Trajeto:* ${ultimoCalculo.distanciaTotal} km (${ultimoCalculo.tipoTrajetoText})\n` +
        `\uD83D\uDCB0 *Custo Total:* R$ ${ultimoCalculo.custoTotal}\n` +
        `\uD83D\uDC65 *Ocupantes:* ${ultimoCalculo.passageiros}\n\n` +
        `\uD83D\uDC49 *Valor por pessoa:* R$ ${ultimoCalculo.custoPorPassageiro}\n`;

    if (ultimoCalculo.pix) {
        texto += `\n\uD83D\uDD11 *Chave PIX:* ${ultimoCalculo.pix}\n`;
    }

    texto += `\nCalculado na Calculadora de Viagem!`;

    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
});

// Modo Escuro
const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeBtn.innerHTML = document.body.classList.contains('dark-mode') ? 'Modo Claro' : 'Modo Escuro';
});