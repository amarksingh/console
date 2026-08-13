const { isset, sprintf, count, env } = require('@ostro/support/function')
const InvalidArgumentException = require('@ostro/support/exceptions/invalidArgumentException')

class Color {

    static COLORS = {
        'black': 0,
        'red': 1,
        'green': 2,
        'yellow': 3,
        'blue': 4,
        'magenta': 5,
        'cyan': 6,
        'white': 7,
        'default': 9,
    };

    static BRIGHT_COLORS = {
        'gray': 0,
        'bright-red': 1,
        'bright-green': 2,
        'bright-yellow': 3,
        'bright-blue': 4,
        'bright-magenta': 5,
        'bright-cyan': 6,
        'bright-white': 7,
    };

    static AVAILABLE_OPTIONS = {
        'bold': { 'set': 1, 'unset': 22 },
        'underscore': { 'set': 4, 'unset': 24 },
        'blink': { 'set': 5, 'unset': 25 },
        'reverse': { 'set': 7, 'unset': 27 },
        'conceal': { 'set': 8, 'unset': 28 },
    };

    $options =  {};

    constructor($foreground = '', $background = '', $options = []) {
        this.$foreground = this.parseColor($foreground);
        this.$background = this.parseColor($background, true);

        for (let $option of $options) {
            if (!isset(this.constructor.AVAILABLE_OPTIONS[$option])) {
                throw new InvalidArgumentException(sprintf('Invalid option specified: "%s". Expected one of (%s).', $option, Object.keys(this.constructor.AVAILABLE_OPTIONS).join(', ')));
            }

            this.$options[$option] = this.constructor.AVAILABLE_OPTIONS[$option];
        }
    }

    apply($text) {
        return this.set() + $text + this.unset();
    }

    set() {
        let $setCodes = [];
        if ('' !== this.$foreground) {
            $setCodes.push(this.$foreground);
        }
        if ('' !== this.$background) {
            $setCodes.push(this.$background);
        }
        for (let $option in this.$options) {
            $setCodes.push($option['set']);
        }

        if (0 === count($setCodes)) {
            return '';
        }

        return sprintf("\x1b[%sm", $setCodes.join(';'));
    }

    unset() {
        let $unsetCodes = [];
        if ('' !== this.$foreground) {
            $unsetCodes.push(39);
        }
        if ('' !== this.$background) {
            $unsetCodes.push(49);
        }
        for (let $option in this.$options) {
            $unsetCodes.push($option['unset']);
        }
        if (0 === count($unsetCodes)) {
            return '';
        }

        return sprintf("\x1b[%sm", $unsetCodes.join(';'));
    }

    parseColor($color, $background = false) {
        if ('' === $color) {
            return '';
        }

        if ('#' === $color[0]) {
            $color = $color.substring(1);

            if (3 === $color.length) {
                $color = $color[0] + $color[0] + $color[1] + $color[1] + $color[2] + $color[2];
            }

            if (6 !== $color.length) {
                throw new InvalidArgumentException(sprintf('Invalid "%s" color.', $color));
            }

            return ($background ? '4' : '3') + this.convertHexColorToAnsi(parseInt($color, 16));
        }

        if (isset(this.constructor.COLORS[$color])) {
            return ($background ? '4' : '3') + this.constructor.COLORS[$color];
        }

        if (isset(this.constructor.BRIGHT_COLORS[$color])) {
            return ($background ? '10' : '9') + this.constructor.BRIGHT_COLORS[$color];
        }

        throw new InvalidArgumentException(sprintf('Invalid "%s" color; expected one of (%s).', $color, Object.keys(this.constructor.COLORS).concat(Object.keys(this.constructor.BRIGHT_COLORS)).join(',')));
    }

    convertHexColorToAnsi($color) {
        let $r = ($color >> 16) & 255;
        let $g = ($color >> 8) & 255;
        let $b = $color & 255;

        if ('truecolor' !== env('COLORTERM')) {
            return this.degradeHexColorToAnsi($r, $g, $b);
        }

        return sprintf('8;2;%d;%d;%d', $r, $g, $b);
    }

    degradeHexColorToAnsi($r, $g, $b) {
        if (0 === Math.round(this.getSaturation($r, $g, $b) / 50)) {
            return 0;
        }

        return (Math.round($b / 255) << 2) | (Math.round($g / 255) << 1) | Math.round($r / 255);
    }

    getSaturation($r, $g, $b) {
        $r = $r / 255;
        $g = $g / 255;
        $b = $b / 255;
        $v = Math.max($r, $g, $b);
        let $diff = $v - Math.min($r, $g, $b)
        if (0 === $diff) {
            return 0;
        }

        return $diff * 100 / $v;
    }
}

module.exports = Color