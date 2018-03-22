# Ejemplo de inscripción Gravity Form con validación Padrón #

Este plugin es un ejemplo de utilización de formulario de Gravity Forms añadiendo nueva funcionalidad de validación de DNI en Padrón municipal. Una vez encontrada coincidencia en el Padrón se valida y rellanan automáticamente los datos del ciudadano. Una vez validado se podrá continuar con el proceso del formulario.

### Requisitos ###

- Se debe tener instalado el plugin de WordPress **Gravity Forms**.
- Se debe tener instalado el plugin de  **WP Api Web Services**.

### Instalación e Instrucciones ###

1. Suba la carpeta **gravityforms-custom-resources** a su directorio **/wp-content/plugins/** (o importe el fichero zip con el plugin).
2. Active el plugin **Gravity Forms Custom Resourcesdesde** desde su menú de plugins en WordPress.
3. Importar el formulario de Gravity Forms desde el archivo **gravityforms-consulta-padron.json**. Para ello vaya al menú de Gravity Forms: Formularios->Importar/Exportar->Importar formularios. Seleccione el fichero **gravityforms-consulta-padron.json** que está en la carpeta del plugin: **export_gravity_forms_to_import**
4. Una vez importado el formulario de Gravity acceda al menú Formularios para conocer el **ID** que se le ha asignado al formulario.
5. Creé una nueva página (o post) e inserte el **shortcode** del formulario de Gravity importado.
6. Edite el fichero **inscripcion_padron.js** y defina el id de formulario en:
**var id_formulario_gravity = xxx;**
donde **xxx** será el id que le ha dado Gravity al formulario importado.
6. En el mismo fichero cambiar la función:
**function validar_padron_documento(documento)**
y definir la url del servicio web a su Padrón.
`var url = "https://servidorwebservice/wp-json/mg-dbq2json/v1/services?s=padron-dni&u=FAwJQJOURawN&dni=" + documento;`

