'use strict';

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
function encryptText() {
	const regex = /[aeiou]/g;
	const str = textToEncrypt.value;
	const encryptedText = str.replace(regex, replaceVocal);

	console.log(encryptedText);
}

function replaceVocal(vocal) {
	return encriptKeys[vocal];
}

encryptBtn.addEventListener('click', () => {
	encryptText();
});

/* 
Las "llaves" de encriptación que utilizaremos son las siguientes:

La letra "e" es convertida para "enter"
La letra "i" es convertida para "imes"
La letra "a" es convertida para "ai"
La letra "o" es convertida para "ober"
La letra "u" es convertida para "ufat"
*/
