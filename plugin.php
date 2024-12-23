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

if (function_exists('tb_fs')) {
  register_activation_hook(__FILE__, function () {
    if (is_plugin_active('timeline-block-block/plugin.php')) {
      deactivate_plugins('timeline-block-block/plugin.php');
    }
    if (is_plugin_active('timeline-block-block-pro/plugin.php')) {
      deactivate_plugins('timeline-block-block-pro/plugin.php');
    }
  });
} else {
  // Constant
  define('TLGB_VERSION', isset($_SERVER['HTTP_HOST']) && 'localhost' === $_SERVER['HTTP_HOST'] ? time() : '1.0.7');
  define('TLGB_DIR_URL', plugin_dir_url(__FILE__));
  define('TLGB_DIR_PATH', plugin_dir_path(__FILE__));
  define('TLGB_HAS_FREE', 'timeline-block-block/plugin.php' === plugin_basename(__FILE__));
  define('TLGB_HAS_PRO', 'timeline-block-block-pro/plugin.php' === plugin_basename(__FILE__));


  // DO NOT REMOVE THIS IF, IT IS ESSENTIAL FOR THE `function_exists` CALL ABOVE TO PROPERLY WORK.
  if (!function_exists('tb_fs')) {

    // ... Freemius integration snippet ...
    function tb_fs()
    {
      global $tb_fs;

      if (!isset($tb_fs)) {
        $fsStartPath = dirname(__FILE__) . '/freemius/start.php';
        $bSDKInitPath = dirname(__FILE__) . '/bplugins_sdk/init.php';


        if (TLGB_HAS_PRO && file_exists($fsStartPath)) {
          require_once $fsStartPath;
        } else if (TLGB_HAS_FREE && file_exists($bSDKInitPath)) {
          require_once $bSDKInitPath;
        }

        $tlgbConfig = [
          'id' => '17342',
          'slug' => 'timeline-block-block',
          'premium_slug' => 'timeline-block-block-pro',
          'type' => 'plugin',
          'public_key' => 'pk_624005a9d0c56ff46db6602f5f730',
          'is_premium' => true,
          'premium_suffix' => 'Pro',
          // If your plugin is a serviceware, set this option to false.
          'has_premium_version' => true,
          'has_addons' => false,
          'has_paid_plans' => true,
          'menu' => array(
            'slug' => 'timeline-block',
            'support' => false,
            'parent' => array(
              'slug' => 'tools.php',
              'first-slug' => ''
            ),
          )
        ];
        $achb_fs = (TLGB_HAS_PRO && file_exists($fsStartPath)) ? fs_dynamic_init($tlgbConfig) : fs_lite_dynamic_init($tlgbConfig);
      }

      return $tb_fs;
    }

    // Init Freemius.
    tb_fs();
    // Signal that SDK was initiated.
    do_action('tb_fs_loaded');

  }

  function tlgbIsPremium()
  {
    return TLGB_HAS_PRO ? tb_fs()->can_use_premium_code() : false;
  }


  // ... Your plugin's main file logic ...
  if (!class_exists('TLGBPlugin')) {
    // Main Plugin Logic
    require_once TLGB_DIR_PATH . 'includes/AdminMenu.php';

    class TLGBPlugin
    {
      public function __construct()
      {
        add_action('init', [$this, 'init']);  // Block registration
        add_action('wp_enqueue_scripts', [$this, 'tlgb_enqueue_scripts']);  // Frontend script
        add_action('enqueue_block_editor_assets', [$this, 'tlgb_enqueue_editor_scripts']);  // Backend (block editor) script

        add_action('wp_ajax_tlgbPipeChecker', [$this, 'tlgbPipeChecker']);
        add_action('wp_ajax_nopriv_tlgbPipeChecker', [$this, 'tlgbPipeChecker']);
        add_action('admin_init', [$this, 'registerSettings']);
        add_action('rest_api_init', [$this, 'registerSettings']);
      }

      function tlgbPipeChecker()
      {
        $nonce = $_POST['_wpnonce'] ?? null;

        if (!wp_verify_nonce($nonce, 'wp_ajax')) {
          wp_send_json_error('Invalid Request');
        }

        wp_send_json_success([
          'isPipe' => tlgbIsPremium()
        ]);
      }

      function registerSettings()
      {
        register_setting('tlgbUtils', 'tlgbUtils', [
          'show_in_rest' => [
            'name' => 'tlgbUtils',
            'schema' => ['type' => 'string']
          ],
          'type' => 'string',
          'default' => wp_json_encode(['nonce' => wp_create_nonce('wp_ajax')]),
          'sanitize_callback' => 'sanitize_text_field'
        ]);
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
}


