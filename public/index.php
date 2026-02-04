<?php
/**
 * Legacy URL Redirect
 *
 * This file handles legacy requests to /index.php and redirects
 * them to the homepage with a 301 permanent redirect.
 *
 * This ensures SEO value is preserved and users are seamlessly
 * redirected to the correct page.
 */

// Set 301 Permanent Redirect status code
header("HTTP/1.1 301 Moved Permanently");

// Redirect to homepage
header("Location: /");

// Terminate script execution
exit();
