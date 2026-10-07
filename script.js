document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("calc-form");
  const resultadoDiv = document.getElementById("resultado");
  const themeToggle = document.getElementById("theme-toggle");
  const selectUnit = document.getElementById("select-unit");
  const selectCurrency = document.getElementById("select-currency");
  const btnPresets = document.querySelectorAll(".btn-preset");
  const btnLangs = document.querySelectorAll(".btn-lang");

  // Dicionário de Traduções (PT, ES, EN) + Textos adaptados para o PDF
  const translations = {
    pt: {
      doc_title: "Calculadora de Custo de Viagem - Combustível, Pedágio e Rateio",
      theme_btn_dark: "Modo Escuro",
      theme_btn_light: "Modo Claro",
      main_title: "Calculadora de Viagem 🚗🏍",
      main_subtitle: "Calcule o custo do combustível considerando o peso do veículo, passageiros, bagagens e pedágios.",
      ad_label: "Publicidade",
      preset_label: "Predefinição de Veículo:",
      label_trip_type: "Tipo de Trajeto:",
      trip_one_way: "Apenas Ida",
      trip_round_trip: "Ida e Volta",
      label_distance: "Distância (km de um trecho):",
      label_consumption: "Consumo do Veículo (km/l):",
      label_price: "Preço do Combustível:",
      label_weight_vehicle_car: "Peso do Veículo (kg):",
      label_weight_luggage_car: "Porta-malas / Bagagem (kg):",
      label_occupants_car: "Nº de Ocupantes (Passageiros):",
      label_peso_pessoa_label: "Peso Médio p/ Pessoa (kg):",
      label_tolls: "Pedágios / Custos Extras Totais:",
      label_pix: "Chave PIX / Info de Pagamento (Opcional):",
      label_round_amount: "Arredondar valor por pessoa para facilitar a divisão",
      btn_calculate: "Calcular Custo",
      flex_title: "⛽ Comparador Gasolina vs. Etanol",
      flex_prompt: "Digite os preços para comparar qual compensa mais.",
      res_title: "Resultado do Cálculo",
      res_dist: "Distância Total:",
      res_weight_veh: "Peso do Veículo:",
      res_weight_load: "Peso dos Ocupantes + Carga:",
      res_weight_gross: "Peso Bruto Total na Rodovia:",
      res_consumption_adj: "Consumo Reajustado pelo Peso:",
      res_fuel_needed: "Combustível Necessário:",
      res_fuel_cost: "Custo do Combustível:",
      res_tolls_cost: "Pedágios / Extras:",
      res_total_cost: "Custo total da viagem:",
      res_cost_per_unit: "Custo estimado por distância:",
      res_per_person: "Valor por pessoa:",
      pix_title: "Info para Pagamento / PIX:",
      btn_copy_pix: "Copiar Info",
      btn_whatsapp: "📲 Compartilhar no WhatsApp",
      btn_pdf: "📄 Baixar Relatório PDF",
      btn_card: "📸 Gerar Card Stories",
      guide_title: "Guia Prático: Como Planejar e Economizar no Combustível da Viagem",
      guide_p1: "Planejar os custos de uma viagem de carro ou moto envolve muito mais do que apenas multiplicar a distância pelo preço na bomba. O peso transportado, a calibragem dos pneus e a aerodinâmica alteram diretamente o consumo.",
      guide_tips_title: "Dicas Essenciais para Reduzir o Consumo:",
      guide_tip1: "<strong>Calibragem dos Pneus:</strong> Rodar com pneus murchos aumenta o atrito com o asfalto e pode elevar o consumo em até 5%. Calibre-os ainda frios antes de pegar a estrada.",
      guide_tip2: "<strong>Ajuste de Velocidade e Marchas:</strong> Manter uma velocidade constante entre 80 km/h e 100 km/h na rodovia garante a melhor eficiência energética do motor.",
      guide_tip3: "<strong>Carga e Aerodinâmica:</strong> Distribua o peso do baú/porta-malas de forma uniforme. Bagageiros externos no teto aumentam o arrasto aerodinâmico e o gasto de combustível.",
      guide_tip4: "<strong>Planejamento de Pedágios e Paradas:</strong> Evite desacelerações e acelerações bruscas perto de praças de pedágio utilizando tags de pagamento automático.",
      faq_title: "Perguntas Frequentes & Como Funciona",
      faq_q1: "Como o peso da garupa, passageiros e bagagens afeta o consumo?",
      faq_a1: "A cada 50 kg adicionais no veículo, o consumo de combustível pode aumentar em média de 1% a 2%. Em motos, onde a proporção de peso é maior em relação ao veículo, esse impacto é ainda mais perceptível.",
      faq_q2: "Como ajustar o peso do meu próprio veículo?",
      faq_a2: "Você pode alterar o campo 'Peso do Veículo' para o valor exato informado no manual do proprietário (tara em ordem de marcha).",
      faq_q3: "Qual a regra dos 70% para Gasolina vs. Etanol?",
      faq_a3: "O etanol rende em média 70% da quilometragem da gasolina. Se o preço do etanol for inferior a 70% do preço da gasolina, vale a pena abastecer com etanol.",
      footer_copy: "© Viatrip - Todos os direitos reservados.",
      footer_privacy: "Política de Privacidade",
      footer_terms: "Termos de Uso",
      footer_support: "Suporte",
      card_badge_title: "🚗 Resumo da Viagem",
      card_per_person_label: "VALOR POR PESSOA",
      card_pix_label: "Pagamento",
      card_footer_text: "Calculado via Viatrip",
      pdf_title: "Relatorio de Custos de Viagem - Viatrip",
      pdf_dist: "Distancia Total",
      pdf_weight_gross: "Peso Bruto Total",
      pdf_consumption_adj: "Consumo Ajustado",
      pdf_fuel_needed: "Combustivel Necessario",
      pdf_fuel_cost: "Custo do Combustivel",
      pdf_tolls: "Pedagios / Extras",
      pdf_total_cost: "Custo Total da Viagem",
      pdf_per_person: "Valor por Pessoa",
      pdf_occupants: "ocupantes",
      pdf_pix: "Chave PIX para pagamento",
      terms_title: "Termos de Uso",
      terms_intro: "Ao utilizar a nossa calculadora de viagem, você concorda com os termos descritos abaixo.",
      terms_h1: "1. Isenção de Responsabilidade",
      terms_p1: "Esta calculadora fornece apenas estimativas de custos de combustível e pedágios com base nas médias inseridas pelo próprio usuário. Os valores reais podem variar devido a condições de trânsito, calibragem, estilo de condução e alterações imprevistas de tarifas rodoviárias. O uso das informações é por sua conta e risco.",
      terms_h2: "2. Modificações na Ferramenta",
      terms_p2: "Reservamo-nos o direito de alterar, suspender ou descontinuar qualquer aspecto do aplicativo a qualquer momento, sem aviso prévio.",

    },
    es: {
      doc_title: "Calculadora de Costo de Viaje - Combustible, Peaje y Reparto",
      theme_btn_dark: "Modo Oscuro",
      theme_btn_light: "Modo Claro",
      main_title: "Calculadora de Viaje 🚗🏍",
      main_subtitle: "Calcula el costo del combustible considerando el peso, pasajeros y peajes.",
      ad_label: "Publicidad",
      preset_label: "Preajuste de Vehículo:",
      label_trip_type: "Tipo de Trayecto:",
      trip_one_way: "Solo Ida",
      trip_round_trip: "Ida y Vuelta",
      label_distance: "Distancia (km de un tramo):",
      label_consumption: "Consumo del Vehículo (km/l):",
      label_price: "Precio del Combustible:",
      label_weight_vehicle_car: "Peso del Vehículo (kg):",
      label_weight_luggage_car: "Maletero / Equipaje (kg):",
      label_occupants_car: "Nº de Ocupantes (Pasajeros):",
      label_peso_pessoa_label: "Peso Promedio p/ Persona (kg):",
      label_tolls: "Peajes / Costos Extras Totales:",
      label_pix: "Clave PIX / Info de Pago (Opcional):",
      label_round_amount: "Redondear valor por persona",
      btn_calculate: "Calcular Costo",
      flex_title: "⛽ Comparador Gasolina vs. Etanol",
      flex_prompt: "Ingresa los precios para comparar cuál conviene más.",
      res_title: "Resultado del Cálculo",
      res_dist: "Distancia Total:",
      res_weight_veh: "Peso del Vehículo:",
      res_weight_load: "Peso Ocupantes + Carga:",
      res_weight_gross: "Peso Bruto Total:",
      res_consumption_adj: "Consumo Ajustado:",
      res_fuel_needed: "Combustible Necesario:",
      res_fuel_cost: "Costo de Combustible:",
      res_tolls_cost: "Peajes / Extras:",
      res_total_cost: "Costo total del viaje:",
      res_cost_per_unit: "Costo por distancia:",
      res_per_person: "Valor por persona:",
      pix_title: "Info de Pago / PIX:",
      btn_copy_pix: "Copiar Info",
      btn_whatsapp: "📲 Compartir en WhatsApp",
      btn_pdf: "📄 Descargar PDF",
      btn_card: "📸 Generar Tarjeta",
      guide_title: "Guía Práctica: Cómo Planificar y Ahorrar",
      guide_p1: "Planificar los costos de un viaje de coche o moto implica mucho más que multiplicar la distancia por el precio. El peso y la aerodinámica alteran el consumo.",
      guide_tips_title: "Consejos Esenciales para Reducir el Consumo:",
      guide_tip1: "<strong>Calibración de Neumáticos:</strong> Conducir con neumáticos desinflados aumenta la fricción y puede elevar el consumo hasta un 5%.",
      guide_tip2: "<strong>Ajuste de Velocidad:</strong> Mantener una velocidad constante entre 80 km/h y 100 km/h en la carretera garantiza la mejor eficiencia.",
      guide_tip3: "<strong>Carga y Aerodinámica:</strong> Distribuya el peso de manera uniforme y evite portaequipajes excesivos en el techo.",
      guide_tip4: "<strong>Peajes y Paradas:</strong> Evite frenadas y aceleraciones bruscas cerca de los peajes utilizando telepeaje.",
      faq_title: "Preguntas Frecuentes",
      faq_q1: "¿Cómo afecta el peso al consumo?",
      faq_a1: "Por cada 50 kg extra en el vehículo, el consumo de combustible aumenta en promedio del 1% al 2%.",
      faq_q2: "¿Cómo ajustar el peso del vehículo?",
      faq_a2: "Cambie el campo 'Peso del Vehículo' al valor exacto que figura en el manual del propietario.",
      faq_q3: "¿Cuál es la regla del 70% para Gasolina vs. Etanol?",
      faq_a3: "El etanol rinde en promedio el 70% del kilometraje de la gasolina.",
      footer_copy: "© Viatrip - Todos los derechos reservados.",
      footer_privacy: "Política de Privacidad",
      footer_terms: "Términos de Uso",
      footer_support: "Soporte",
      card_badge_title: "🚗 Resumen del Viaje",
      card_per_person_label: "VALOR POR PESSOA",
      card_pix_label: "Pago",
      card_footer_text: "Calculado via Viatrip",
      pdf_title: "Informe de Costos de Viaje - Viatrip",
      pdf_dist: "Distancia Total",
      pdf_weight_gross: "Peso Bruto Total",
      pdf_consumption_adj: "Consumo Ajustado",
      pdf_fuel_needed: "Combustible Necesario",
      pdf_fuel_cost: "Costo del Combustible",
      pdf_tolls: "Peajes / Extras",
      pdf_total_cost: "Costo Total del Viaje",
      pdf_per_person: "Valor por Persona",
      pdf_occupants: "pasajeros",
      pdf_pix: "Clave PIX para pago",
      terms_title: "Términos de Uso",
      terms_intro: "Al utilizar nuestra calculadora de viaje, usted acepta los términos descritos a continuación.",
      terms_h1: "1. Exención de Responsabilidad",
      terms_p1: "Esta calculadora solo proporciona estimaciones de costos basadas en los datos ingresados por el propio usuario. Los valores reales pueden variar debido al tráfico, estilo de conducción y cambios de tarifas. El uso de esta información es bajo su propio riesgo.",
      terms_h2: "2. Modificaciones de la Herramienta",
      terms_p2: "Nos reservamos el derecho de modificar o suspender cualquier aspecto de la aplicación en cualquier momento sin previo aviso.",

    },
    en: {
      doc_title: "Trip Cost Calculator - Fuel, Tolls & Split",
      theme_btn_dark: "Dark Mode",
      theme_btn_light: "Light Mode",
      main_title: "Trip Calculator 🚗🏍",
      main_subtitle: "Calculate fuel costs considering vehicle weight, passengers, luggage, and tolls.",
      ad_label: "Advertisement",
      preset_label: "Vehicle Preset:",
      label_trip_type: "Trip Type:",
      trip_one_way: "One Way",
      trip_round_trip: "Round Trip",
      label_distance: "Distance (one way):",
      label_consumption: "Vehicle Fuel Economy (km/l):",
      label_price: "Fuel Price:",
      label_weight_vehicle_car: "Vehicle Weight (kg):",
      label_weight_luggage_car: "Luggage / Cargo (kg):",
      label_occupants_car: "Number of Passengers:",
      label_peso_pessoa_label: "Avg. Weight per Person (kg):",
      label_tolls: "Total Tolls / Extra Costs:",
      label_pix: "PIX / Payment Info (Optional):",
      label_round_amount: "Round amount per person for easy splitting",
      btn_calculate: "Calculate Cost",
      flex_title: "⛽ Gas vs. Ethanol Comparator",
      flex_prompt: "Enter prices to compare which is better.",
      res_title: "Calculation Results",
      res_dist: "Total Distance:",
      res_weight_veh: "Vehicle Weight:",
      res_weight_load: "Passengers + Cargo Weight:",
      res_weight_gross: "Total Gross Weight:",
      res_consumption_adj: "Weight-Adjusted Economy:",
      res_fuel_needed: "Fuel Needed:",
      res_fuel_cost: "Fuel Cost:",
      res_tolls_cost: "Tolls / Extras:",
      res_total_cost: "Total trip cost:",
      res_cost_per_unit: "Estimated cost per distance:",
      res_per_person: "Cost per person:",
      pix_title: "Payment Info / PIX:",
      btn_copy_pix: "Copy Info",
      btn_whatsapp: "📲 Share on WhatsApp",
      btn_pdf: "📄 Download PDF Report",
      btn_card: "📸 Generate Story Card",
      guide_title: "Practical Guide: How to Save on Trip Fuel",
      guide_p1: "Planning car or motorcycle trip costs involves much more than multiplying distance by pump prices. Transported weight and aerodynamics directly alter fuel economy.",
      guide_tips_title: "Essential Tips to Reduce Consumption:",
      guide_tip1: "<strong>Tire Pressure:</strong> Driving with low tire pressure increases rolling resistance and can raise fuel consumption by up to 5%.",
      guide_tip2: "<strong>Speed and Gears:</strong> Maintaining a steady speed between 80 km/h and 100 km/h on the highway ensures optimal energy efficiency.",
      guide_tip3: "<strong>Cargo and Aerodynamics:</strong> Distribute trunk weight evenly. External rooftop cargo carriers increase aerodynamic drag and fuel burn.",
      guide_tip4: "<strong>Toll Planning:</strong> Avoid sudden braking and acceleration near toll plazas by using automatic toll tags.",
      faq_title: "FAQ & How It Works",
      faq_q1: "How does passenger and luggage weight affect consumption?",
      faq_a1: "For every additional 50 kg in the vehicle, fuel consumption can increase on average by 1% to 2%.",
      faq_q2: "How to adjust my vehicle's weight?",
      faq_a2: "You can change the 'Vehicle Weight' field to the exact value specified in your owner's manual.",
      faq_q3: "What is the 70% rule for Gas vs. Ethanol?",
      faq_a3: "Ethanol averages about 70% of gasoline's mileage. If ethanol is cheaper than 70% of gas price, it's worth it.",
      footer_copy: "© Viatrip - All rights reserved.",
      footer_privacy: "Privacy Policy",
      footer_terms: "Terms of Use",
      footer_support: "Support",
      card_badge_title: "🚗 Trip Summary",
      card_per_person_label: "COST PER PERSON",
      card_pix_label: "Payment",
      card_footer_text: "Calculated via Viatrip",
      pdf_title: "Trip Cost Report - Viatrip",
      pdf_dist: "Total Distance",
      pdf_weight_gross: "Total Gross Weight",
      pdf_consumption_adj: "Adjusted Economy",
      pdf_fuel_needed: "Fuel Needed",
      pdf_fuel_cost: "Fuel Cost",
      pdf_tolls: "Tolls / Extras",
      pdf_total_cost: "Total Trip Cost",
      pdf_per_person: "Cost per Person",
      pdf_occupants: "passengers",
      pdf_pix: "PIX Key / Payment Info",
      terms_title: "Terms of Use",
      terms_intro: "By using our trip calculator, you agree to the terms described below.",
      terms_h1: "1. Disclaimer",
      terms_p1: "This calculator provides cost estimates based on user-entered values. Actual trip expenses may vary due to traffic, tire pressure, driving habits, and toll price updates. Use this tool at your own risk.",
      terms_h2: "2. Tool Changes",
      terms_p2: "We reserve the right to change, suspend, or discontinue any aspect of this application at any time without prior notice."

    }
  };

  let currentLang = "pt";

  function setLanguage(lang) {
    currentLang = lang;
    btnLangs.forEach(b => {
      b.classList.toggle("active", b.getAttribute("data-lang") === lang);
    });
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang] && translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });
  }

  btnLangs.forEach(btn => {
    btn.addEventListener("click", () => setLanguage(btn.getAttribute("data-lang")));
  });

  // Tema Dark / Light
  themeToggle.addEventListener("click", () => {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    if (isLight) {
      document.documentElement.removeAttribute("data-theme");
      themeToggle.textContent = translations[currentLang].theme_btn_dark;
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      themeToggle.textContent = translations[currentLang].theme_btn_light;
    }
  });

  function updatePresetLabels() {
    const isMi = selectUnit.value === "mi";
    document.getElementById("preset-btn-1").textContent = isMi ? `🏍️ Moto (~308 lbs)` : `🏍️ Moto (~140 kg)`;
    document.getElementById("preset-btn-2").textContent = isMi ? `🚗 Hatch 1.0 (~2160 lbs)` : `🚗 Hatch 1.0 (~980 kg)`;
    document.getElementById("preset-btn-3").textContent = isMi ? `🚙 Sedan (~2755 lbs)` : `🚙 Sedan (~1.250 kg)`;
    document.getElementById("preset-btn-4").textContent = isMi ? `🚘 SUV médio (~3417 lbs)` : `🚘 SUV médio (~1.550 kg)`;
  }

  selectUnit.addEventListener("change", () => {
    const unit = selectUnit.value;
    const isMi = unit === "mi";
    
    document.getElementById("label-distancia").textContent = isMi ? "Distância (miles):" : "Distância (km de um trecho):";
    document.getElementById("label-consumo").textContent = isMi ? "Consumo do Veículo (MPG):" : "Consumo do Veículo (km/l):";
    document.getElementById("label-peso-veiculo").textContent = isMi ? "Peso do Veículo (lbs):" : "Peso do Veículo (kg):";
    document.getElementById("label-bagagem").textContent = isMi ? "Porta-malas / Bagagem (lbs):" : "Porta-malas / Bagagem (kg):";
    document.getElementById("weight-unit-label-2").textContent = isMi ? "lbs" : "kg";

    btnPresets.forEach(btn => {
      if (btn.classList.contains("active")) {
        document.getElementById("consumo").value = isMi ? btn.getAttribute("data-consumo-mi") : btn.getAttribute("data-consumo-km");
        document.getElementById("peso-carro").value = isMi ? btn.getAttribute("data-peso-lbs") : btn.getAttribute("data-peso-kg");
      }
    });

    updatePresetLabels();
  });

  selectCurrency.addEventListener("change", () => {
    const cur = selectCurrency.value;
    document.getElementById("currency-symbol-label").textContent = cur;
    document.getElementById("currency-symbol-label-2").textContent = cur;
  });

  btnPresets.forEach(btn => {
    btn.addEventListener("click", () => {
      btnPresets.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const isMi = selectUnit.value === "mi";
      document.getElementById("consumo").value = isMi ? btn.getAttribute("data-consumo-mi") : btn.getAttribute("data-consumo-km");
      document.getElementById("peso-carro").value = isMi ? btn.getAttribute("data-peso-lbs") : btn.getAttribute("data-peso-kg");
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    resultadoDiv.classList.remove("hidden");

    const unit = selectUnit.value;
    const isMi = unit === "mi";
    const distUnitLabel = isMi ? "mi" : "km";
    const weightUnitLabel = isMi ? "lbs" : "kg";
    const consumptionUnitLabel = isMi ? "MPG" : "km/l";

    const tipoTrajeto = document.querySelector('input[name="tipo_trajeto"]:checked').value;
    let distancia = parseFloat(document.getElementById("distancia").value) || 0;
    if (tipoTrajeto === "idavolta") distancia *= 2;

    const consumoBase = parseFloat(document.getElementById("consumo").value) || (isMi ? 28.2 : 12);
    const preco = parseFloat(document.getElementById("preco").value) || 0;
    const pesoVeiculo = parseFloat(document.getElementById("peso-carro").value) || 0;
    const pesoBagagem = parseFloat(document.getElementById("peso-bagagem").value) || 0;
    const passageiros = parseInt(document.getElementById("passageiros").value) || 1;
    const pesoPessoa = parseFloat(document.getElementById("peso-pessoa").value) || (isMi ? 165 : 75);
    const pedagio = parseFloat(document.getElementById("pedagio").value) || 0;
    const pixInfo = document.getElementById("pix").value.trim();
    const arredondar = document.getElementById("arredondar-pix").checked;
    const cur = selectCurrency.value;

    const pesoTotalCarga = pesoBagagem + (passageiros * pesoPessoa);
    const pesoTotalBruto = pesoVeiculo + pesoTotalCarga;

    const limiteExcesso = isMi ? 110 : 50;
    const excessoPeso = Math.max(0, pesoTotalCarga - limiteExcesso);
    const fatorPeso = 1 + (excessoPeso / (isMi ? 220 : 100)) * 0.015;
    const consumoAjustado = consumoBase / fatorPeso;

    const litrosTotais = distancia / consumoAjustado;
    const custoCombustivel = litrosTotais * preco;
    const custoTotal = custoCombustivel + pedagio;
    let custoPassageiro = custoTotal / passageiros;

    if (arredondar) {
      custoPassageiro = Math.ceil(custoPassageiro / 5) * 5;
    }

    const custoKm = distancia > 0 ? custoTotal / distancia : 0;

    document.getElementById("distancia-total-res").textContent = `${distancia.toFixed(1)} ${distUnitLabel}`;
    document.getElementById("peso-carro-res").textContent = `${pesoVeiculo} ${weightUnitLabel}`;
    document.getElementById("peso-carga-res").textContent = `${pesoTotalCarga} ${weightUnitLabel}`;
    document.getElementById("peso-total-bruto-res").textContent = `${pesoTotalBruto} ${weightUnitLabel}`;
    document.getElementById("consumo-ajustado-res").textContent = `${consumoAjustado.toFixed(2)} ${consumptionUnitLabel}`;
    document.getElementById("litros-totais").textContent = `${litrosTotais.toFixed(1)} L`;
    document.getElementById("custo-combustivel").textContent = `${cur} ${custoCombustivel.toFixed(2)}`;
    document.getElementById("custo-pedagio").textContent = `${cur} ${pedagio.toFixed(2)}`;
    document.getElementById("custo-total").textContent = `${cur} ${custoTotal.toFixed(2)}`;
    document.getElementById("custo-km").textContent = `${cur} ${custoKm.toFixed(2)} / ${distUnitLabel}`;
    document.getElementById("custo-passageiro").textContent = `${cur} ${custoPassageiro.toFixed(2)}`;

    const pixContainer = document.getElementById("pix-qr-container");
    if (pixInfo) {
      pixContainer.classList.remove("hidden");
      document.getElementById("pix-key-display").textContent = pixInfo;
    } else {
      pixContainer.classList.add("hidden");
    }

    document.getElementById("btn-copy-pix").onclick = () => {
      navigator.clipboard.writeText(pixInfo);
      alert("Chave PIX copiada com sucesso!");
    };

    document.getElementById("btn-whatsapp").onclick = () => {
      const msg = encodeURIComponent(`🚗 *Resumo da Viagem (Viatrip)*\n📍 Distância: ${distancia.toFixed(1)} ${distUnitLabel}\n⛽ Combustível: ${cur} ${custoCombustivel.toFixed(2)}\n💰 Custo Total: ${cur} ${custoTotal.toFixed(2)}\n👥 Valor por Pessoa (${passageiros} p.): *${cur} ${custoPassageiro.toFixed(2)}*${pixInfo ? `\n💳 PIX: ${pixInfo}` : ""}`);
      window.open(`https://api.whatsapp.com/send?text=${msg}`, "_blank");
    };

    document.getElementById("btn-pdf").onclick = () => {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      const t = translations[currentLang];

      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text(t.pdf_title, 20, 20);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text(`${t.pdf_dist}: ${distancia.toFixed(1)} ${distUnitLabel}`, 20, 35);
      doc.text(`${t.pdf_weight_gross}: ${pesoTotalBruto} ${weightUnitLabel}`, 20, 45);
      doc.text(`${t.pdf_consumption_adj}: ${consumoAjustado.toFixed(2)} ${consumptionUnitLabel}`, 20, 55);
      doc.text(`${t.pdf_fuel_needed}: ${litrosTotais.toFixed(1)} L`, 20, 65);
      doc.text(`${t.pdf_fuel_cost}: ${cur} ${custoCombustivel.toFixed(2)}`, 20, 75);
      doc.text(`${t.pdf_tolls}: ${cur} ${pedagio.toFixed(2)}`, 20, 85);
      
      doc.setFont("helvetica", "bold");
      doc.text(`${t.pdf_total_cost}: ${cur} ${custoTotal.toFixed(2)}`, 20, 100);
      doc.text(`${t.pdf_per_person} (${passageiros} ${t.pdf_occupants}): ${cur} ${custoPassageiro.toFixed(2)}`, 20, 110);
      
      if (pixInfo) {
        doc.text(`${t.pdf_pix}: ${pixInfo}`, 20, 125);
      }
      doc.save("relatorio-viagem-viatrip.pdf");
    };

    document.getElementById("btn-card").onclick = () => {
      document.getElementById("card-val-pessoa").textContent = `${cur} ${custoPassageiro.toFixed(2)}`;
      document.getElementById("card-distancia").textContent = `${distancia.toFixed(1)} ${distUnitLabel}`;
      document.getElementById("card-custo-total").textContent = `${cur} ${custoTotal.toFixed(2)}`;
      document.getElementById("card-pessoas").textContent = passageiros;
      document.getElementById("card-litros").textContent = `${litrosTotais.toFixed(1)} L`;
      
      const cardPixBox = document.getElementById("card-pix-box");
      if (pixInfo) {
        cardPixBox.classList.remove("hidden");
        document.getElementById("card-pix-key").textContent = pixInfo;
      } else {
        cardPixBox.classList.add("hidden");
      }

      const cardElement = document.getElementById("card-stories");
      html2canvas(cardElement, { scale: 2 }).then(canvas => {
        const link = document.createElement("a");
        link.download = "card-viagem.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    };
  });

  const flexGasolina = document.getElementById("flex-gasolina");
  const flexEtanol = document.getElementById("flex-etanol");
  const flexResultado = document.getElementById("flex-resultado");

  function calcularFlex() {
    const g = parseFloat(flexGasolina.value);
    const e = parseFloat(flexEtanol.value);
    if (!g || !e) {
      flexResultado.textContent = "";
      return;
    }
    const proporcao = e / g;
    if (proporcao <= 0.7) {
      flexResultado.textContent = "Compensa abastecer com ETANOL! 🟢";
      flexResultado.style.color = "var(--primary-color)";
    } else {
      flexResultado.textContent = "Compensa abastecer com GASOLINA! ⛽";
      flexResultado.style.color = "var(--accent-blue)";
    }
  }

  flexGasolina.addEventListener("input", calcularFlex);
  flexEtanol.addEventListener("input", calcularFlex);
});
