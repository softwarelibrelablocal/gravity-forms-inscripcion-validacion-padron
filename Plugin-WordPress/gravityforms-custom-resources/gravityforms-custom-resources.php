<?php
/*
Plugin Name: Gravity Forms Custom Resources
Plugin URI: https://github.com/softwarelibrelablocal/gravity-forms-inscripcion-validacion-padron
Description: Gravity Forms Custom Resources
Author: Ayuntamiento de Rivas Vaciamadrid
Author URI: https://www.rivasciudad.es
Text Domain: gravityforms
Domain Path: /languages
*/

/* ==========================================================================
CUSTOM ASSETS
========================================================================== */
add_action( 'wp_enqueue_scripts', 'ayto_custom_gravity_assets' );

function ayto_custom_gravity_assets() {
	
	// BOOTSTRAP
	wp_enqueue_script('bootstrap_js',plugins_url( '', __FILE__ ) . '/js/bootstrap.min.js', array(), '1.0', true);
	wp_enqueue_style( 'bootstrap_css', plugins_url( '', __FILE__ ) . '/css/bootstrap.min.css');
	
	
	// REMODAL
	wp_enqueue_script('remodal',  plugins_url( '', __FILE__ ) . '/js/remodal.min.js', array(), '1.0', true);
	
	wp_enqueue_style( 'remodal_css', plugins_url( '', __FILE__ ) . '/css/remodal.css');
	
	wp_enqueue_style( 'remodal_theme', plugins_url( '', __FILE__ ) . '/css/remodal-default-theme.css');
}


/* ==========================================================================
CUSTOM CSS GRAVITY FORM
========================================================================== */
add_action( 'wp_enqueue_scripts', 'custom_gf_css',200 );

function custom_gf_css() {
	
	wp_enqueue_style( 'css_inscripcion', plugins_url( '', __FILE__ ) . '/css/inscripcion_padron.css');
	
}

/* ==========================================================================
CUSTOM JS GRAVITY FORM
========================================================================== */
add_action( 'wp_enqueue_scripts', 'custom_gf_js',200 );

function custom_gf_js() {
	wp_enqueue_script('js_gf_comun',  plugins_url( '', __FILE__ ) . '/js/gf_comun.js', array(), '1.0', true);
	wp_enqueue_script('js_inscripcion',  plugins_url( '', __FILE__ ) . '/js/inscripcion_padron.js', array(), '1.0', true);
}