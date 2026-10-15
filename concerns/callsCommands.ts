/**
 * Class CallsCommands.
 */
class CallsCommands {

    /**
     * callCommand method.
     * @param {*} $command
     * @param {*} $arguments
     * @returns {any}
     */
    callCommand($command: any, $arguments: Record<string, any> = {}) {
        return this.runCommand($command, $arguments, this.output);
    }

    /**
     * call method.
     * @returns {any}
     */
    call() {
        return this.callCommand(...arguments)
    }

    /**
     * runCommand method.
     * @param {*} $command
     * @param {*} $arguments
     * @returns {any}
     */
    runCommand($command: any, $arguments: any) {
        const $console = this.getConsole()
        return $console.callCommand(
            $command, $arguments
        );
    }
}

module.exports = CallsCommands
