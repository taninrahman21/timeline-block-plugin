<?php
/**
 * Plugin Name: Timeline Block
 * Description: Display timeline content on your site. 
 * Version: 1.0.7
 * Author: bPlugins
 * Author URI: https://bplugins.com
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: timeline-block
 */

// ABS PATH
if (!defined('ABSPATH')) {
  exit;
}

// Constant
define('TLGB_VERSION', isset($_SERVER['HTTP_HOST']) && 'localhost' === $_SERVER['HTTP_HOST'] ? time() : '1.0.7');
define('TLGB_DIR_URL', plugin_dir_url(__FILE__));
define('TLGB_DIR_PATH', plugin_dir_path(__FILE__));

if (!class_exists('TLGBPlugin')) {
  class TLGBPlugin
  {
    public function __construct()
    {
      add_action('init', [$this, 'init']);  // Block registration
      add_action('wp_enqueue_scripts', [$this, 'tlgb_enqueue_scripts']);  // Frontend script
      add_action('enqueue_block_editor_assets', [$this, 'tlgb_enqueue_editor_scripts']);  // Backend (block editor) script
    }

    // Function to enqueue frontend scripts
    public function tlgb_enqueue_scripts()
    {
      wp_enqueue_script(
        'timelineJS',
        TLGB_DIR_URL . 'assets/js/timeline.min.js',
        ['jquery'],
        TLGB_VERSION,
        true
      );

      // Enqueue the frontend CSS
      wp_enqueue_style(
        'timelineCSS',
        TLGB_DIR_URL . 'assets/css/timeline.min.css',
        [],
        TLGB_VERSION
      );
    }

    // Function to enqueue block editor scripts
    public function tlgb_enqueue_editor_scripts()
    {
      wp_enqueue_script(
        'timeline-block-editor',
        TLGB_DIR_URL . 'assets/js/timeline.min.js',
        [],
        TLGB_VERSION,
        true
      );

      // Enqueue the CSS for the block editor
      wp_enqueue_style(
        'timeline-editor-css',
        TLGB_DIR_URL . 'assets/css/timeline.min.css',
        [],
        TLGB_VERSION
      );
    }
    function init()
    {
      register_block_type(__DIR__ . '/build');

      wp_set_script_translations('tlgb-editor', 'timeline-block', plugin_dir_path(__FILE__) . 'languages');
    }

  }
  new TLGBPlugin();
}