const { env, unset } = require('@ostro/support/function')
const Color = require('./color')

/**
 * Class OutputFormatterStyle.
 */
class OutputFormatterStyle {

    $color;

    $foreground;

    $background;

    $options;

    $href = null;
    
    $handlesHrefGracefully = null;

    /**
     * Create a new instance.
     * @param {*} $foreground
     * @param {*} $background
     * @param {*} $options
     */
    constructor($foreground: any = null, $background: any = null, $options: any[] = []) {
        this.$foreground = $foreground || '';
        this.$background = $background || '';
        this.$color = new Color(this.$foreground, this.$background, this.$options = $options);
    }

    /**
     * setForeground method.
     * @param {*} $color
     * @returns {any}
     */
    setForeground($color: any = null) {
        this.$color = new Color(this.$foreground = $color || '', this.$background, this.$options);
    }

    /**
     * setBackground method.
     * @param {*} $color
     * @returns {any}
     */
    setBackground($color: any = null) {
        this.$color = new Color(this.$foreground, this.$background = $color || '', this.$options);
    }

    /**
     * setHref method.
     * @param {*} $url
     * @returns {any}
     */
    setHref($url: string) {
        this.$href = $url;
    }

    /**
     * setOption method.
     * @param {*} $option
     * @returns {any}
     */
    setOption($option: any) {
        this.$options.push($option);
        this.$color = new Color(this.$foreground, this.$background, this.$options);
    }

    /**
     * unsetOption method.
     * @param {*} $option
     * @returns {any}
     */
    unsetOption($option: any) {
        let $pos = this.$options.indexOf($option);
        if (false !== $pos) {
            unset(this.$options[$pos]);
        }

        this.$color = new Color(this.$foreground, this.$background, this.$options);
    }

    /**
     * setOptions method.
     * @param {*} $options
     * @returns {any}
     */
    setOptions($options: Record<string, any>) {
        this.$color = new Color(this.$foreground, this.$background, this.$options = $options);
    }

    /**
     * apply method.
     * @param {*} $text
     * @returns {any}
     */
    apply($text: any) {

        if (null === this.$handlesHrefGracefully) {
            this.$handlesHrefGracefully = 'JetBrains-JediTerm' !== env('TERMINAL_EMULATOR') &&
                (!env('KONSOLE_VERSION') || env('KONSOLE_VERSION') > 201100);
        }

        if (null !== this.$href && this.$handlesHrefGracefully) {
            $text = `\0o33]8;;${this.$href}\0o33\\${$text}\0o33]8;;\0o33\\`;
        }
        return this.$color.apply($text);
    }
}

module.exports = OutputFormatterStyle