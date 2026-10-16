import readline from 'readline';
import OutputFormatter from './outputFormatter';
import OutputInterface from './outputInterface';

/**
 * Class OutputHandler.
 */
class OutputHandler {

    $verbosity;

    $formatter;

    /**
     * Create a new instance.
     * @param {*} $verbosity
     * @param {*} $decorated
     * @param {*} $formatter
     */
    constructor($verbosity: any = OutputInterface.VERBOSITY_NORMAL, $decorated: boolean = true, $formatter: any = null) {
        this.$verbosity = $verbosity || OutputInterface.VERBOSITY_NORMAL;
        this.$formatter = $formatter || new OutputFormatter();
        this.$formatter.setDecorated($decorated);
    }

    /**
     * setFormatter method.
     * @param {*} $formatter
     * @returns {any}
     */
    setFormatter($formatter: any) {
        this.$formatter = $formatter;
    }

    /**
     * getFormatter method.
     * @returns {any}
     */
    getFormatter() {
        return this.$formatter;
    }

    /**
     * setDecorated method.
     * @param {*} $decorated
     * @returns {any}
     */
    setDecorated($decorated: any) {
        this.$formatter.setDecorated($decorated);
    }

    /**
     * isDecorated method.
     * @returns {any}
     */
    isDecorated() {
        return this.$formatter.isDecorated();
    }

    /**
     * setVerbosity method.
     * @param {*} $level
     * @returns {any}
     */
    setVerbosity($level: any) {
        this.$verbosity = $level;
    }

    /**
     * getVerbosity method.
     * @returns {any}
     */
    getVerbosity() {
        return this.$verbosity;
    }

    /**
     * isQuiet method.
     * @returns {any}
     */
    isQuiet() {
        return OutputInterface.VERBOSITY_QUIET === this.$verbosity;
    }

    /**
     * isVerbose method.
     * @returns {any}
     */
    isVerbose() {
        return OutputInterface.VERBOSITY_VERBOSE <= this.$verbosity;
    }

    /**
     * isVeryVerbose method.
     * @returns {any}
     */
    isVeryVerbose() {
        return OutputInterface.VERBOSITY_VERY_VERBOSE <= this.$verbosity;
    }

    /**
     * isDebug method.
     * @returns {any}
     */
    isDebug() {
        return OutputInterface.VERBOSITY_DEBUG <= this.$verbosity;
    }

    /**
     * writeln method.
     * @param {*} $messages
     * @param {*} $options
     * @returns {any}
     */
    writeln($messages: any, $options: Record<string, any> = OutputInterface.OUTPUT_NORMAL) {
        return this.write($messages, true, $options);
    }

    /**
     * write method.
     * @param {*} $messages
     * @param {*} $newline
     * @param {*} $options
     * @returns {any}
     */
    write($messages: any, $newline: boolean = false, $options: Record<string, any> = OutputInterface.OUTPUT_NORMAL) {

        if (!Array.isArray($messages)) {
            $messages = [$messages];
        }

        let $types = OutputInterface.OUTPUT_NORMAL || OutputInterface.OUTPUT_RAW || OutputInterface.OUTPUT_PLAIN;
        let $type = $types || $options || OutputInterface.OUTPUT_NORMAL;

        let $verbosities = OutputInterface.VERBOSITY_QUIET || OutputInterface.VERBOSITY_NORMAL || OutputInterface.VERBOSITY_VERBOSE | OutputInterface.VERBOSITY_VERY_VERBOSE | OutputInterface.VERBOSITY_DEBUG;
        let $verbosity = $verbosities || $options || OutputInterface.VERBOSITY_NORMAL;

        if ($verbosity > this.getVerbosity()) {
            return;
        }

        for (let $message of $messages) {
            switch ($type) {
                case OutputInterface.OUTPUT_NORMAL:
                    $message = this.$formatter.format($message);
                    break;
                case OutputInterface.OUTPUT_RAW:
                    break;
                case OutputInterface.OUTPUT_PLAIN:
                    $message = strip_tags(this.$formatter.format($message));
                    break;
            }

            this.doWrite($message || '', $newline);
        }
        return this
    }

    /**
     * newLine method.
     * @param {*} $count
     * @returns {any}
     */
    newLine($count: number = 1) {
        let $message = '\n'.repeat($count)
        process.stdout.write($message)
        return this
    }

    /**
     * confirm method.
     * @param {*} $question
     * @param {*} $default
     * @returns {any}
     */
    confirm($question: any, $default: boolean = false) {
        return this.question($question).then(res => {
            if (res.toLowerCase() == 'y') {
                return $default || true
            } else {
                return $default || false
            }
        })
    }

    /**
     * ask method.
     * @param {*} $question
     * @param {*} $default
     * @returns {any}
     */
    ask($question: any, $default: any = null) {
        return this.output.ask($question, $default);
    }

    /**
     * question method.
     * @param {*} $question
     * @returns {any}
     */
    question($question: any) {
        return new Promise((resolve, reject) => {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            rl.question($question, function (answer) {
                rl.close();
                resolve(answer)
            })
        })

    }

    /**
     * doWrite method.
     * @param {*} $message
     * @param {*} $newline
     * @returns {any}
     */
    doWrite($message: string, $newline: any) {
        process.stdout.write(Buffer.from($message))
        if ($newline)
            this.newLine()
        return this
    }

}
export default OutputHandler;