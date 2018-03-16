<?php
//
// Recommended way to include parent theme styles.
//  (Please see http://codex.wordpress.org/Child_Themes#How_to_Create_a_Child_Theme)
//  
add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );

function theme_enqueue_styles() {
	wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
	
	//wp_enqueue_style( 'child-style', get_stylesheet_directory_uri()  . '/style.css', array('parent-style') );
	// echo('Id post:' . get_the_ID());	
	
	wp_enqueue_script('bootstrap_js', get_stylesheet_directory_uri() . '/js/bootstrap.min.js', array(), '1.0', true);
	
	wp_enqueue_script('remodal',  get_stylesheet_directory_uri() . '/js/remodal.min.js', array(), '1.0', true);
	
	wp_enqueue_style( 'remodal_css', get_stylesheet_directory_uri() . '/css/remodal.css');
	
	wp_enqueue_style( 'remodal_theme', get_stylesheet_directory_uri() . '/css/remodal-default-theme.css');
	
	wp_enqueue_style( 'bootstrap_css', get_stylesheet_directory_uri() . '/css/bootstrap.min.css');
	
}



/* ==========================================================================
CSS POST GRAVITY FORMS
========================================================================== */
add_action( 'wp_enqueue_scripts', 'custom_enqueue_gf_css',200 );

function custom_enqueue_gf_css() {
	wp_enqueue_style( 'css_inscripcion', get_stylesheet_directory_uri() . '/css/inscripcion_padron.css' );
	
}



/* ==========================================================================
JS POST GRAVITY FORMS
========================================================================== */
add_action( 'wp_enqueue_scripts', 'custom_enqueue_gf_js',200 );

function custom_enqueue_gf_js() {
	wp_enqueue_script('javascript_inscripcion',  get_stylesheet_directory_uri() . '/js/inscripcion_padron.js', array(), '1.0', true);
}

