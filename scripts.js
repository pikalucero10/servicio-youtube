document.addEventListener('DOMContentLoaded', function() {
    const serviceType = document.getElementById('serviceType');
    const serviceName = document.getElementById('serviceName');
    const quantity = document.getElementById('quantity');
    const buyPrice = document.getElementById('buyPrice');
    const sellPrice = document.getElementById('sellPrice');
    const buyPriceUSD = document.getElementById('buyPriceUSD');
    const sellPriceUSD = document.getElementById('sellPriceUSD');
    const profitMargin = document.getElementById('profitMargin');
    const dropPercentage = document.getElementById('dropPercentage');
    const finalQuantity = document.getElementById('finalQuantity');

    const comboServiceType1 = document.getElementById('comboServiceType1');
    const comboServiceName1 = document.getElementById('comboServiceName1');
    const comboQuantity1 = document.getElementById('comboQuantity1');
    const comboServiceType2 = document.getElementById('comboServiceType2');
    const comboServiceName2 = document.getElementById('comboServiceName2');
    const comboQuantity2 = document.getElementById('comboQuantity2');
    const comboProfitMargin = document.getElementById('comboProfitMargin');
    const comboDropPercentage = document.getElementById('comboDropPercentage');
    const comboBuyPrice = document.getElementById('comboBuyPrice');
    const comboSellPrice = document.getElementById('comboSellPrice');
    const comboBuyPriceUSD = document.getElementById('comboBuyPriceUSD');
    const comboSellPriceUSD = document.getElementById('comboSellPriceUSD');
    const comboFinalQuantity = document.getElementById('comboFinalQuantity');

    const exchangeRate = 1300; // 1 dólar = 1300 pesos argentinos

    let combinedData = { services: { seguidores: [], likes: [], vistas: [], minutos: [] } };

    // Eventos
    serviceType.addEventListener('change', updateIndividualServices);
    quantity.addEventListener('input', updatePrice);
    profitMargin.addEventListener('input', updatePrice);
    dropPercentage.addEventListener('input', updatePrice);

    comboServiceType1.addEventListener('change', updateComboServices1);
    comboServiceType2.addEventListener('change', updateComboServices2);
    comboQuantity1.addEventListener('input', updateComboPrice);
    comboQuantity2.addEventListener('input', updateComboPrice);
    comboProfitMargin.addEventListener('input', updateComboPrice);
    comboDropPercentage.addEventListener('input', updateComboPrice);

    // Cargar archivo JSON
    async function loadJSONFile() {
        try {
            const response = await fetch('youtube.json');
            const data = await response.json();
            combinedData = data;
            updateIndividualServices();
            updateComboServices1();
            updateComboServices2();
        } catch (error) {
            console.error('Error loading JSON file:', error);
        }
    }

    // Actualizar servicios individuales según el tipo seleccionado
    function updateIndividualServices() {
        const selectedType = serviceType.value;

        serviceName.innerHTML = '';
        if (combinedData.services[selectedType]) {
            const services = combinedData.services[selectedType];

            services.forEach(service => {
                if (service.price_per_unit !== undefined) {
                    const option = document.createElement('option');
                    option.value = service.id;
                    option.textContent = service.service_name;
                    option.dataset.price = service.price_per_unit;
                    serviceName.appendChild(option);
                }
            });
        }
        updatePrice();
    }

    function updateComboServices1() {
        const selectedType = comboServiceType1.value;

        comboServiceName1.innerHTML = '';
        if (combinedData.services[selectedType]) {
            const services = combinedData.services[selectedType];

            services.forEach(service => {
                if (service.price_per_unit !== undefined) {
                    const option = document.createElement('option');
                    option.value = service.id;
                    option.textContent = service.service_name;
                    option.dataset.price = service.price_per_unit;
                    comboServiceName1.appendChild(option);
                }
            });
        }
        updateComboPrice();
    }

    function updateComboServices2() {
        const selectedType = comboServiceType2.value;

        comboServiceName2.innerHTML = '';
        if (combinedData.services[selectedType]) {
            const services = combinedData.services[selectedType];

            services.forEach(service => {
                if (service.price_per_unit !== undefined) {
                    const option = document.createElement('option');
                    option.value = service.id;
                    option.textContent = service.service_name;
                    option.dataset.price = service.price_per_unit;
                    comboServiceName2.appendChild(option);
                }
            });
        }
        updateComboPrice();
    }

    // Actualizar precio
    function updatePrice() {
        const selectedService = serviceName.selectedOptions[0];
        const pricePerUnitInDollars = selectedService ? parseFloat(selectedService.dataset.price) : 0;
        const pricePerUnitInPesos = pricePerUnitInDollars * exchangeRate;
        const totalPriceInPesos = pricePerUnitInPesos * quantity.value;
        
        const profitMarginValue = parseFloat(profitMargin.value) / 100;
        const dropPercentageValue = parseFloat(dropPercentage.value) / 100;
        
        const adjustedQuantity = quantity.value * (1 + dropPercentageValue);
        const adjustedPrice = totalPriceInPesos * (1 + dropPercentageValue);
        const sellPriceInPesos = adjustedPrice * (1 + profitMarginValue);
        const sellPriceInDollars = sellPriceInPesos / exchangeRate;

        buyPrice.textContent = totalPriceInPesos.toFixed(2);
        sellPrice.textContent = sellPriceInPesos.toFixed(2);
        buyPriceUSD.textContent = (totalPriceInPesos / exchangeRate).toFixed(2);
        sellPriceUSD.textContent = sellPriceInDollars.toFixed(2);
        finalQuantity.textContent = adjustedQuantity.toFixed(0);
    }

    function updateComboPrice() {
        const selectedService1 = comboServiceName1.selectedOptions[0];
        const selectedService2 = comboServiceName2.selectedOptions[0];

        const pricePerUnitInDollars1 = selectedService1 ? parseFloat(selectedService1.dataset.price) : 0;
        const pricePerUnitInDollars2 = selectedService2 ? parseFloat(selectedService2.dataset.price) : 0;

        const pricePerUnitInPesos1 = pricePerUnitInDollars1 * exchangeRate;
        const pricePerUnitInPesos2 = pricePerUnitInDollars2 * exchangeRate;

        const totalPriceInPesos1 = pricePerUnitInPesos1 * comboQuantity1.value;
        const totalPriceInPesos2 = pricePerUnitInPesos2 * comboQuantity2.value;

        const totalPriceInPesos = totalPriceInPesos1 + totalPriceInPesos2;

        const profitMarginValue = parseFloat(comboProfitMargin.value) / 100;
        const dropPercentageValue = parseFloat(comboDropPercentage.value) / 100;

        const adjustedQuantity1 = comboQuantity1.value * (1 + dropPercentageValue);
        const adjustedQuantity2 = comboQuantity2.value * (1 + dropPercentageValue);
        const adjustedQuantity = parseFloat(adjustedQuantity1) + parseFloat(adjustedQuantity2);

        const adjustedPrice = totalPriceInPesos * (1 + dropPercentageValue);
        const sellPriceInPesos = adjustedPrice * (1 + profitMarginValue);
        const sellPriceInDollars = sellPriceInPesos / exchangeRate;

        comboBuyPrice.textContent = totalPriceInPesos.toFixed(2);
        comboSellPrice.textContent = sellPriceInPesos.toFixed(2);
        comboBuyPriceUSD.textContent = (totalPriceInPesos / exchangeRate).toFixed(2);
        comboSellPriceUSD.textContent = sellPriceInDollars.toFixed(2);
        comboFinalQuantity.textContent = adjustedQuantity.toFixed(0);
    }

    loadJSONFile();
});
