function tratarDatos(xml) {
	//esta funcion recibe un objeto de datos de la peticion y devuelve un array de objetos
	//cada objeto se corresponde con un jugador de baloncesto.

	//accedemos al array que contiene los datos del XML
	var x = xml.responseXML.childNodes[0].children;
	
	var array_final = [];
	for (var i = 0 ; i < x.length; i++) {
		//iteramos sobre cada jugador
		var jugador = {};
		
		for(var j=0;j<x[i].children.length;j++) {
			//creamos las propiedades del objeto actual
			var nombrePropiedad = x[i].children[j].localName;
			var valorPropiedad = x[i].children[j].innerHTML;

			jugador[nombrePropiedad] = valorPropiedad;				
		}
		//añadimos el objeto al array final
		array_final.push(jugador);
	}
	console.log(array_final);
	return array_final;
}

function mostrarDatos(objeto) {
	//esta funcion no la usaremos, ver mas abajo "mostrarDatosFiltrados"
	var espacio = ' - ';
	var separador = '<br />';
	for(var i = 0; i < objeto.length; i++) {
		for(var propiedad in objeto[i]) {
			document.write(propiedad + espacio + objeto[i][propiedad] + separador);
		}
	}
}

function imprimirTresColumnas(res) {
	/* esta funcion recibe como parametro un array de 3 posiciones y muestra los valores en las 3 div */
	var col_izda = document.getElementById('col-izda');
	var col_cent = document.getElementById('col-cent');
	var col_dcha = document.getElementById('col-dcha');

	col_izda.innerHTML += res[0];
	col_cent.innerHTML += res[1];
	col_dcha.innerHTML += res[2];
}

function mostrarDatosFiltrados(objeto, filtro, propiedad) {
	/*	Esta funcion admite 3 parametros:
		- objeto que deseamos tratar
		- filtro, valor que queremos filtrar
		- la propiedad del objeto que deseamos tratar
		*/

	var espacio = ' - ';
	var separador = '<br />';
	
	for(var i = 0; i < objeto.length; i++) {
		var resultado = [];
		//en funcion de lo que nos pidan, modificar el operador >
		if(objeto[i][propiedad] > filtro) {
			for(var propiedad in objeto[i]) {
				resultado.push(propiedad + espacio + objeto[i][propiedad] + separador);
			}
			imprimirTresColumnas(resultado);
		} else {
			//si la propiedad no cumple la condicion, pasamos a la siguiente iteracion
			continue;
		}
	}
}

function pedirUsuario(pregunta) {
	/*	Esta funcion le pide al usuario el valor del filtro,
		no parara hasta que se introduzca un valor numerico no vacio */

	do {
		var peticion = window.prompt(pregunta);
	} while(isNaN(peticion) || peticion == '');
	return peticion;
}

/* codigo principal:
	-llamada con el objeto XMLHttpRequest
	-tratar el resultado de la peticion
	- mostrar resultado
	*/
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function(data) {
	if (xhttp.readyState == 4 && xhttp.status == 200) {
       //recogemos el resultado de la peticion
       var resultados = tratarDatos(xhttp);
       //mostramos los jugadores que miden mas de 180 cm
       mostrarDatosFiltrados(resultados, 180, 'altura');
       //pedimos la edad al usuario
       var filtro = pedirUsuario('Introduzca la edad: ');
       //mostramos los jugadores que superan el filtro del usuario
       mostrarDatosFiltrados(resultados, filtro, 'edad');
   }
};

xhttp.open("GET", "datos.xml", true);
xhttp.send();