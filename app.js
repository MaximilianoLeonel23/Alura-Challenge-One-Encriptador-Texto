'use strict';

const results = document.getElementById('encryptResults');
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

let isEncryptedTextFound = false;

// Evento onclick button 'Encriptar'
encryptBtn.addEventListener('click', () => {
	const encryptedText = encryptText(textToEncrypt.value);
	if (encryptedText) showResults(encryptedText);
});

////////

// Evento onclick button 'Desencriptar'
decryptBtn.addEventListener('click', () => {
	const decryptedText = decryptText(textToEncrypt.value);
	if (decryptedText) showResults(decryptedText);
});
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
	p.className = 'text';
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

	if (checkInputFormat(str)) {
		return;
	}
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
	showCopyAlert();
}

// Chequeo por mayúsculas o letra 'ñ'
function checkInputFormat(value) {
	const regex = /[A-Z]/;
	if (value.includes('ñ') || regex.test(value)) {
		return false;
	}
	return true;
}

// Creación de la alerta
function showCopyAlert() {
	const toast = document.createElement('div');
	toast.className = 'toast text-sm';
	toast.innerHTML = 'Copiado al portapapeles';
	document.body.appendChild(toast);
	setTimeout(() => {
		document.body.removeChild(toast);
	}, 3000);
}
