const { empty } = require('@ostro/support/function')
const InvalidArgumentException = require('@ostro/support/exceptions/invalidArgumentException')
const OutputFormatterStyle = require('./outputFormatterStyle')

/**
 * Class OutputFormatterStyleStack.
 */
class OutputFormatterStyleStack {

    /**
     * Create a new instance.
     * @param {*} $emptyStyle
     */
    constructor($emptyStyle: any = null) {
        this.$emptyStyle = $emptyStyle || new OutputFormatterStyle();
        this.$styles = [];
    }

    /**
     * reset method.
     * @returns {any}
     */
    reset() {
        this.$styles = [];
    }

    /**
     * push method.
     * @param {*} $style
     * @returns {any}
     */
    push($style: any) {
        this.$styles.push($style);
    }

    /**
     * pop method.
     * @param {*} $style
     * @returns {any}
     */
    pop($style: any = null) {
        if (empty(this.$styles)) {
            return this.$emptyStyle;
        }

        if (null === $style) {
            return this.$styles.pop();
        }
        this.$styles = this.$styles.reverse()
        for (let $i = 0; $i < this.$styles.length; $i++) {
            let $stackedStyle = this.$styles[$i]

            if ($style.apply('') === $stackedStyle.apply('')) {
                this.$styles = this.$styles.slice(0, $i);

                return $stackedStyle;
            }
        }

        throw new InvalidArgumentException('Incorrectly nested style tag found.');
    }

    /**
     * getCurrent method.
     * @returns {any}
     */
    getCurrent() {
        if (empty(this.$styles)) {
            return this.$emptyStyle;
        }

        return this.$styles[this.$styles.length - 1];
    }

    /**
     * setEmptyStyle method.
     * @param {*} $emptyStyle
     * @returns {any}
     */
    setEmptyStyle($emptyStyle: any) {
        this.$emptyStyle = $emptyStyle;

        return this;
    }

    /**
     * getEmptyStyle method.
     * @returns {any}
     */
    getEmptyStyle() {
        return this.$emptyStyle;
    }
}

module.exports = OutputFormatterStyleStack