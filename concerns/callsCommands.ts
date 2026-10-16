/**
 * Class CallsCommands.
 */
class CallsCommands {
    output: any;
    getConsole: any;

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
    call(...args: any[]) {
        return (this.callCommand as any)(...args)
    }

    /**
     * runCommand method.
     * @param {*} $command
     * @param {*} $arguments
     * @param {*} $output
     * @returns {any}
     */
    runCommand($command: any, $arguments: any, $output?: any) {
        const $console = this.getConsole()
        return $console.callCommand(
            $command, $arguments, $output
        );
    }
}

export default CallsCommands;
