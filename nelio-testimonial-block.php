<?php
/**
 * Nelio Testimonial Block For Gutenberg
 *
 * Plugin Name: Nelio Testimonial Block
 * Plugin URI: https://neliosoftware.com/
 * Description: The Nelio Testimonial Block is a custom block for the Gutenberg editor. It displays a testimonial with an image.
 * Version: 1.0.0
 *
 * Author:      Nelio Software
 * Author URI:  https://neliosoftware.com
 * License:     GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package    Nelio_Testimonial
 * @subpackage Root
 * @author     Antonio Villegas <antonio.villegas@neliosoftware.com>
 * @since      1.0.0
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}//end if

/**
 * BLOCK: Testimonial Block.
 */
require_once( WP_PLUGIN_DIR . '/' . dirname( plugin_basename( __FILE__ ) ) . '/block/testimonial/index.php' );
