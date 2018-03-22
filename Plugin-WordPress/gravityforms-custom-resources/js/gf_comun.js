

if(!typeof modal_panel !== "undefined"){
	var modal_panel = '';
}


//  **********************************
//   
//  Onload
//
//  **********************************************************************************

jQuery(function() {

	//  **********************************
	//   
	//  Eventos formulario
	//
	//  **********************************************************************************	
	
		
	jQuery('.fecha_nacimiento input').prop('readonly', true);
	
	jQuery('.mayusculas input').blur(function(){
		jQuery(this).val(jQuery(this).val().toUpperCase());
	});
	
	jQuery('.minusculas input').blur(function(){
		jQuery(this).val(jQuery(this).val().toLowerCase());
	});
	
	jQuery('.sanitize input').keyup(function(){
		jQuery(this).val(gf_sanitize_string(jQuery(this).val()));
	});
	
	jQuery('.nif input').keyup(function(){
		jQuery(this).val(gf_sanitize_dni(jQuery(this).val()));
	});
	
	jQuery('.nif input').change(function(){
		jQuery(this).val(gf_pad(jQuery(this).val(),9));
		jQuery(this).val(gf_mover_xyz_principio(jQuery(this).val()));
		var respuesta_dni = gf_validateDNI(jQuery(this).val());
		if (respuesta_dni != '') {
			gf_abrir_popumensaje(respuesta_dni);
			jQuery(this).val('');
		};
	});
	
	if(!typeof modal_panel !== "undefined"){
		
		if (jQuery('[data-remodal-id=modal]').length > 0) {
			modal_panel = jQuery('[data-remodal-id=modal]').remodal();
		}		
	}

	
	//lanzar_gfvalidacion(idformulario,validaciones);

});

function gf_comprobar_edad(){
	
	if(jQuery('.fecha_nacimiento input').val() != ''){
		anyo = parseInt(obtener_anio_mes_nac());
		if (anyo >= 2005 && anyo <=2014) {
			//jQuery('#input_56_58').val('500');
			mensaje = '';
			contenido_html = '<p>' + mensaje + '</p>';
			//calcular edad
		} else {
			jQuery('#input_56_58').val('0');
			mensaje = 'Solo podrán inscribirse los nacidos entre 2005 y 2014';
			contenido_html = '<div class="popup_mensaje"><table class="popup_mensaje__table" cellpadding="0" cellspacion="0"><tr><td class="popup_mensaje__tdimage"><img src="https://encuestasciudadanas.rivasciudad.es/wp-content/uploads/2017/04/error_icon.png"></td><td class="popup_mensaje__tdtext"><p>' + mensaje + '</p></td></tr></table></div>';
			abrir_popumensaje(contenido_html);
		}
	}
	
	//lanzar_gfvalidacion(idformulario,validaciones);
}

function gf_rellenar_combo(combo,options){
		
	//console.log('pintamos combo: ' + combo);
	//rellenamos el combo de actividades
	options.forEach(function(element) {
		console.log(element);
		jQuery('.' + combo + ' select').append('<option value="' + element['valor'] + '">' + element['opcion'] + '</option>');
	});
	
}

function gf_lanzar_gfvalidacion(id_formulario,reglas_campos){
	if(typeof __gf_timeout_handle !== "undefined"){
		clearTimeout(__gf_timeout_handle);
	}
	__gf_timeout_handle = setTimeout("gf_apply_rules(" + id_formulario + ",[" + reglas_campos + "])", 300);
}

function gf_abrir_popumensaje(mensaje){	
	jQuery('.remodal__contenido').html(mensaje);
	modal_panel.open();
}

jQuery(document).on('closed', '.remodal', function (e) {

  // Reason: 'confirmation', 'cancellation'
  //console.log('Modal is closed' + (e.reason ? ', reason: ' + e.reason : ''));
  
  if(!jQuery('.remodal__contenido').attr('novaciar')){
	jQuery('.remodal__contenido').html('');
  }
  
});

function gf_sanitize_string(cadena){
   // Definimos los caracteres que queremos eliminar
   var specialChars = "!@#$^&%*()+=[]\/{}|:<>?.";

   // Los eliminamos todos
   for (var i = 0; i < specialChars.length; i++) {
       cadena= cadena.replace(new RegExp("\\" + specialChars[i], 'gi'), '');
   }   

   // Lo queremos devolver limpio en minusculas
   //cadena = cadena.toLowerCase();

   // Quitamos espacios y los sustituimos por _ porque nos gusta mas asi
   //cadena = cadena.replace(/ /g,"_");

   // Quitamos acentos y "ñ". Fijate en que va sin comillas el primer parametro
   cadena = cadena.replace(/á/gi,"a");
   cadena = cadena.replace(/é/gi,"e");
   cadena = cadena.replace(/í/gi,"i");
   cadena = cadena.replace(/ó/gi,"o");
   cadena = cadena.replace(/ú/gi,"u");
   //cadena = cadena.replace(/ñ/gi,"n");
   
   cadena = cadena.replace(/Á/gi,"A");
   cadena = cadena.replace(/É/gi,"E");
   cadena = cadena.replace(/Í/gi,"I");
   cadena = cadena.replace(/Ó/gi,"O");
   cadena = cadena.replace(/Ú/gi,"U");
   //cadena = cadena.replace(/ñ/gi,"n");
   
   return cadena;
}

function gf_sanitize_dni(dni){
   // Definimos los caracteres que queremos eliminar
   var specialChars = "!@#$^&%*()+=[]\/{}|:<>?., -ñÑoOiIuU";

   // Los eliminamos todos
   for (var i = 0; i < specialChars.length; i++) {
       dni= dni.replace(new RegExp("\\" + specialChars[i], 'gi'), '');
   }   

   // Lo queremos devolver limpio en mayúsculas
   dni = dni.toUpperCase();

   // Quitamos espacios y los sustituimos por _ porque nos gusta mas asi
   //dni = dni.replace(/ /g,"_");

   // Quitamos acentos y "ñ". Fijate en que va sin comillas el primer parametro
   dni = dni.replace(/á/gi,"a");
   dni = dni.replace(/é/gi,"e");
   dni = dni.replace(/í/gi,"");
   dni = dni.replace(/ó/gi,"");
   dni = dni.replace(/ú/gi,"");
   //dni = dni.replace(/ñ/gi,"n");
   
   dni = dni.replace(/Á/gi,"A");
   dni = dni.replace(/Ä/gi,"A");
   dni = dni.replace(/É/gi,"E");
   dni = dni.replace(/Ë/gi,"E");
   dni = dni.replace(/Í/gi,"");
   dni = dni.replace(/Ó/gi,"");
   dni = dni.replace(/Ú/gi,"");
   dni = dni.replace(/Ï/gi,"");
   dni = dni.replace(/Ö/gi,"");
   dni = dni.replace(/Ü/gi,"");
   //dni = dni.replace(/ñ/gi,"n");
   
   return dni;
}

function gf_pad (n, length) {
    var  n = n.toString();
    while(n.length < length)
         n = "0" + n;
	n = n.slice(-length);
    return n;
}

// Acepta NIEs (Extranjeros con X, Y o Z al principio)
function gf_validateDNI(dni) {
    var numero, let, letra;
    var expresion_regular_dni = /^[XYZ]?\d{5,8}[A-Z]$/;
	var mensaje_error_dni = '';

    if(expresion_regular_dni.test(dni) === true){
        numero = dni.substr(0,dni.length-1);
        numero = numero.replace('X', 0);
        numero = numero.replace('Y', 1);
        numero = numero.replace('Z', 2);
        let = dni.substr(dni.length-1, 1);
        numero = numero % 23;
        letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
        letra = letra.substring(numero, numero+1);
        if (letra != let) {
            mensaje_error_dni = '<div class="mensaje_error_ico"><img src="https://encuestasciudadanas.rivasciudad.es/wp-content/uploads/2017/04/error_icon.png" width="40" border="0"></div><div class="mensaje_error_texto">Documento introducido: ' + dni + '<br><br>La letra del documento no se corresponde. Compruebe de nuevo.</div><div style="clear: both;"></div>';
        }
    }else{
        mensaje_error_dni = '<div class="mensaje_error_ico"><img src="https://encuestasciudadanas.rivasciudad.es/wp-content/uploads/2017/04/error_icon.png" width="40" border="0"></div><div class="mensaje_error_texto">Documento introducido: ' + dni + '<br><br>Documento erróneo. Formato no válido.</div><div style="clear: both;"></div>';
    }
	
	return mensaje_error_dni;
}

function gf_mover_xyz_principio(dni) {
	
	var letra = 'X';
	if(dni.indexOf(letra) != -1 && dni.indexOf(letra) != (dni.length - 1)) {
		dni = dni.replace(letra,'');
		dni = letra + dni;
	}
	
	letra = 'Y';
	if(dni.indexOf(letra) != -1 && dni.indexOf(letra) != (dni.length - 1)) {
		dni = dni.replace(letra,'');
		dni = letra + dni;
	}
	
	letra = 'Z';
	if(dni.indexOf(letra) != -1 && dni.indexOf(letra) != (dni.length - 1)) {
		dni = dni.replace(letra,'');
		dni = letra + dni;
	}
	
	return dni;
	
}

function gf_obtener_anio_mes_nac(){
	if (!jQuery('.fecha_nacimiento input').val() == '') {
		var strFechaNac = jQuery('.fecha_nacimiento input').val();
		var arrayFechaNac = strFechaNac.split('/');
		anionac = arrayFechaNac[2];
	} else {
		anionac = '1000';
	}
	
	return anionac;
}


ValidateSpanishID = (function() {
  'use strict';
  
  var DNI_REGEX = /^(\d{8})([A-Z])$/;
  var CIF_REGEX = /^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/;
  var NIE_REGEX = /^[XYZ]\d{7,8}[A-Z]$/;

  var ValidateSpanishID = function( str ) {

    // Ensure upcase and remove whitespace
    str = str.toUpperCase().replace(/\s/, '');

    var valid = false;
    var type = spainIdType( str );

    switch (type) {
      case 'dni':
        valid = validDNI( str );
        break;
      case 'nie':
        valid = validNIE( str );
        break;
      case 'cif':
        valid = validCIF( str );
        break;
    }

    return {
      type: type,
      valid: valid
    };

  };

  var spainIdType = function( str ) {
    if ( str.match( DNI_REGEX ) ) {
      return 'dni';
    }
    if ( str.match( CIF_REGEX ) ) {
      return 'cif';
    }
    if ( str.match( NIE_REGEX ) ) {
      return 'nie';
    }
  };

  var validDNI = function( dni ) {
    var dni_letters = "TRWAGMYFPDXBNJZSQVHLCKE";
    var letter = dni_letters.charAt( parseInt( dni, 10 ) % 23 );
    
    return letter == dni.charAt(8);
  };

  var validNIE = function( nie ) {

    // Change the initial letter for the corresponding number and validate as DNI
    var nie_prefix = nie.charAt( 0 );

    switch (nie_prefix) {
      case 'X': nie_prefix = 0; break;
      case 'Y': nie_prefix = 1; break;
      case 'Z': nie_prefix = 2; break;
    }

    return validDNI( nie_prefix + nie.substr(1) );

  };

  var validCIF = function( cif ) {

    var match = cif.match( CIF_REGEX );
    var letter  = match[1],
        number  = match[2],
        control = match[3];

    var even_sum = 0;
    var odd_sum = 0;
    var n;

    for ( var i = 0; i < number.length; i++) {
      n = parseInt( number[i], 10 );

      // Odd positions (Even index equals to odd position. i=0 equals first position)
      if ( i % 2 === 0 ) {
        // Odd positions are multiplied first.
        n *= 2;

        // If the multiplication is bigger than 10 we need to adjust
        odd_sum += n < 10 ? n : n - 9;

      // Even positions
      // Just sum them
      } else {
        even_sum += n;
      }

    }

    var control_digit = (10 - (even_sum + odd_sum).toString().substr(-1) );
    var control_letter = 'JABCDEFGHI'.substr( control_digit, 1 );

    // Control must be a digit
    if ( letter.match( /[ABEH]/ ) ) {
      return control == control_digit;

    // Control must be a letter
    } else if ( letter.match( /[KPQS]/ ) ) {
      return control == control_letter;

    // Can be either
    } else {
      return control == control_digit || control == control_letter;
    }

  };

  return ValidateSpanishID;
})();