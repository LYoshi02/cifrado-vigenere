const form = document.getElementById("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const mensaje = document.getElementById("mensaje").value.trim().toLowerCase();
    const clave = getCleanedString(document.getElementById("clave").value);
    
    const mensaje_cifrar = mensaje.normalize('NFD').replace(/[\u0300-\u036f]/g,""); // Permite borrar los acentos
    const clave_cifrar = obtenerClaveCifrar(mensaje_cifrar, clave);
    const resultado = aplicarCifrado(mensaje_cifrar, clave_cifrar);
    
    document.getElementById("cifrado").innerText = resultado;
    document.getElementById("info-clave").innerHTML = `<span class="info__span">Clave utilizada:</span>
    <p class="info__paragraph">${clave_cifrar}</p>`;
});

const esUnaLetra = (codigo) => {
    if(codigo >= 97 && codigo <= 122) {
        return true;
    }
    return false;
}

const obtenerClaveCifrar = (mensaje, clave) => {
    let clave_cifrar = "", indiceClave = 0;

    for(let caracter of mensaje) {
        if(indiceClave === clave.length) {
            indiceClave = 0;
        }

        if(esUnaLetra(caracter.charCodeAt(0))) {
            clave_cifrar += clave[indiceClave];
            indiceClave++;
        }
    }

    return clave_cifrar;
} 

const aplicarCifrado = (mensaje, clave) => {
    const alfabeto = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    const cifrar = document.getElementById("cifrar").checked;
    let texto_cifrado = "";
    let indice_clave = 0;

    for(let index in mensaje) {
        if(esUnaLetra(mensaje[index].charCodeAt(0))) {
            const indice_separacion = alfabeto.indexOf(clave[indice_clave]);
            const alfabeto_clave = alfabeto.slice(indice_separacion, alfabeto.length).concat(alfabeto.slice(0, indice_separacion));
            
            if(cifrar) {
                const indice_mensaje = alfabeto.indexOf(mensaje[index]);
                texto_cifrado += alfabeto_clave[indice_mensaje];
            } else {
                const indice_mensaje = alfabeto_clave.indexOf(mensaje[index]);
                texto_cifrado += alfabeto[indice_mensaje];
            }
            
            indice_clave++;
        } else {
            texto_cifrado += mensaje[index];
        }
    }

    return texto_cifrado;
}

const getCleanedString = cadena => {
    // Definimos los caracteres que queremos eliminar
    var specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,.";
 
    // Los eliminamos todos
    for (var i = 0; i < specialChars.length; i++) {
        cadena= cadena.replace(new RegExp("\\" + specialChars[i], 'gi'), '');
    }   
 
    // Lo queremos devolver limpio en minusculas
    cadena = cadena.toLowerCase();
 
    // Quitamos espacios y los sustituimos por un string vacio
    cadena = cadena.replace(/ /g,"");
 
    // Quitamos acentos y "ñ". Fijate en que va sin comillas el primer parametro
    cadena = cadena.replace(/á/gi,"a");
    cadena = cadena.replace(/é/gi,"e");
    cadena = cadena.replace(/í/gi,"i");
    cadena = cadena.replace(/ó/gi,"o");
    cadena = cadena.replace(/ú/gi,"u");
    cadena = cadena.replace(/ñ/gi,"n");

    // Quitar numeros de la cadena
    cadena = cadena.replace(/\d/g,"");
    return cadena;
 }