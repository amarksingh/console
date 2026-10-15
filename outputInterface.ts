/**
 * Class OutputInterface.
 */
class OutputInterface{

	/**
	 * Get VERBOSITY_QUIET.
	 * @static
	 * @returns {any}
	 */
	static get VERBOSITY_QUIET(){
        return 16;
    }
    
    /**
     * Get VERBOSITY_NORMAL.
     * @static
     * @returns {any}
     */
    static get VERBOSITY_NORMAL(){
        return 32;
    }
    
    /**
     * Get VERBOSITY_VERBOSE.
     * @static
     * @returns {any}
     */
    static get VERBOSITY_VERBOSE(){
        return 64;
    }
    
    /**
     * Get VERBOSITY_VERY_VERBOSE.
     * @static
     * @returns {any}
     */
    static get VERBOSITY_VERY_VERBOSE(){
        return 128;
    }
    
    /**
     * Get VERBOSITY_DEBUG.
     * @static
     * @returns {any}
     */
    static get VERBOSITY_DEBUG(){
        return 256;
    }

    /**
     * Get OUTPUT_NORMAL.
     * @static
     * @returns {any}
     */
    static get OUTPUT_NORMAL(){
        return 1;
    }
    
    /**
     * Get OUTPUT_RAW.
     * @static
     * @returns {any}
     */
    static get OUTPUT_RAW(){
        return 2;
    }
    
    /**
     * Get OUTPUT_PLAIN.
     * @static
     * @returns {any}
     */
    static get OUTPUT_PLAIN(){
        return 4;
    }
    
}

module.exports = OutputInterface