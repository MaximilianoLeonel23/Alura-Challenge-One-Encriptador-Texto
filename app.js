'use strict';

const results = document.getElementById('results');
const encryptBtn = document.getElementById('encryptBtn');
const decryptBtn = document.getElementById('decryptBtn');
const textToEncrypt = document.getElementById('textToEncrypt');
const encriptKeys = {
	a: 'ai',
	e: 'enter',
	i: 'imes',
	o: 'ober',
	u: 'ufat',
};

const decryptKeys = {
	ai: 'a',
	enter: 'e',
	imes: 'i',
	ober: 'o',
	ufat: 'u',
};

// Evento onclick button 'Encriptar'
function onClickEncrypt() {
	const encryptedText = encryptText(textToEncrypt.value);

	// Chequeo la existencia del resultado
	if (encryptedText) {
		// Chequeo que este en el formato correcto
		if (checkInputFormat(encryptedText)) {
			showResults(encryptedText);
		} else {
			showCopyAlert('El texto contiene caracteres inválidos');
		}
	} else {
		showCopyAlert('Ingresa el texto a codificar');
	}
}
////////

// Evento onclick button 'Desencriptar'
function onClickDecrypt() {
	const decryptedText = decryptText(textToEncrypt.value);

	// Chequeo la existencia del resultado
	if (decryptedText) {
		// Chequeo que este en el formato correcto
		if (checkInputFormat(decryptedText)) {
			showResults(decryptedText);
		} else {
			showCopyAlert('El texto contiene caracteres inválidos');
		}
	} else {
		showCopyAlert('Ingresa el texto a codificar');
	}
}
/////////////

// Muestra el resultado en la barra lateral
function showResults(value) {
	// Remueve componente anterior
	while (results.firstChild) {
		results.removeChild(results.firstChild);
	}

	// Construye un nuevo componente
	const container = document.createElement('div');
	container.className = 'flex-between';
	const p = document.createElement('p');
	p.className = 'text text-left';
	p.innerHTML = value;
	const btn = document.createElement('button');
	btn.className = 'btn ghost-btn';
	btn.innerHTML = 'Copiar';
	btn.onclick = () => copyToClipboard(value);
	container.appendChild(p);
	container.appendChild(btn);
	results.appendChild(container);
}

// Encripta el texto original y devuelve el encriptado
function encryptText(value) {
	const regex = /[aeiou]/g;
	const str = value;

	const encryptedText = str.replace(regex, replaceVocal);
	return encryptedText;
}

// Desencripta el texto encriptado y devuelve el texto original
function decryptText(value) {
	let str = value;

	for (const [key, value] of Object.entries(decryptKeys)) {
		const regex = new RegExp(key, 'g');
		str = str.replace(regex, value);
	}
	return str;
}

// Reemplaza vocal por clave/código
function replaceVocal(vocal) {
	return encriptKeys[vocal];
}

// Copiar al portapapeles
function copyToClipboard(value) {
	navigator.clipboard.writeText(value);
	showCopyAlert('Copiado al portapapeles');
}

// Chequeo por formato correcto
function checkInputFormat(value) {
	const regex = /^[a-z\s.,;?!]+$/;
	return regex.test(value);
}
// Creación de la alerta
function showCopyAlert(message) {
	const toast = document.createElement('div');
	toast.className = 'toast text-sm';
	toast.innerHTML = message;
	document.body.appendChild(toast);
	setTimeout(() => {
		document.body.removeChild(toast);
	}, 3000);
}
