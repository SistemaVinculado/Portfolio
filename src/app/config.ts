/**
 * This file serves as a central configuration store for critical application constants.
 * Centralizing these values makes the application more robust, maintainable, and
 * less prone to environment-specific errors, particularly with asset pathing.
 */

/**
 * The base path for loading translation files.
 * This path is derived from evidence in `index.html` (`href="src/styles.css"`),
 * which indicates a non-standard build process that preserves the `src` directory
 * in the final output.
 */
export const I18N_ASSET_PATH = 'src/assets/i18n/';
