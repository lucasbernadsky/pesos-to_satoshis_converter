async function convertir() {
    const monto = parseFloat(document.getElementById('amount').value);
    const conversionType = document.getElementById('conversionType').value;
    const cotizacionSatoshi = await obtenerCotizacionSatoshi()
    const cotizacionDolarBlue = await obtenerCotizacionDolarBlue()

    if (conversionType === 'arsToSatoshis') {
        convertirPesosASatoshis(monto, cotizacionSatoshi, cotizacionDolarBlue);
    } else if (conversionType === 'satoshisToARS') {
        convertirSatoshisAPesos(monto, cotizacionSatoshi, cotizacionDolarBlue);
    } else {
        console.error('Tipo de conversión no válido');
    }
}

function convertirPesosASatoshis(montoARS, cotizacionSatoshi, cotizacionDolarBlue) {
    const satoshis = (montoARS / cotizacionDolarBlue) / cotizacionSatoshi;
    document.getElementById('result').innerText = `${Math.round(montoARS)} ars = ${Math.round(satoshis)} satoshis`;
}

function convertirSatoshisAPesos(montoSatoshis, cotizacionSatoshi, cotizacionDolarBlue) {
    const montoARS = montoSatoshis * cotizacionDolarBlue * cotizacionSatoshi;
    document.getElementById('result').innerText = `${Math.round(montoSatoshis)} satoshis = ${Math.round(montoARS)} ars`;
}

async function obtenerCotizacionSatoshi() {
    // Obtener cotización de Bitcoin desde otra API
    // Implementar la lógica de obtención de la cotización
    return fetch('https://api.coinbase.com/v2/prices/BTC-USD/buy')
        .then(response => response.json())
        .then(data => {
            return data.data.amount / 100000000            
        })
        .catch(error => console.error('Error al obtener cotización BTC', error));
}
async function obtenerCotizacionDolarBlue() {
    // Obtener cotización de Bitcoin desde otra API
    // Implementar la lógica de obtención de la cotización
    return fetch('https://api.bluelytics.com.ar/v2/latest')
        .then(response => response.json())
        .then(data => {
            return data.blue.value_sell
        })
        .catch(error => console.error('Error al obtener cotización USD', error));
}

function cambiarTitulo() {
    const conversionType = document.getElementById('conversionType').value;
    document.getElementById('result').innerText = `...`;

    if (conversionType === 'arsToSatoshis') {
        document.getElementById('title').innerText = `Conversor de ARS a Satoshis`;
    } else if (conversionType === 'satoshisToARS') {
        document.getElementById('title').innerText = `Conversor de Satoshis a ARS`;
    } else {
        console.error('Tipo de conversión no válido');
    }
}
