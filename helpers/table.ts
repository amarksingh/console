const kHeaders = Symbol('headers')
const kRows = Symbol('row')
const kStyle = Symbol('style')
const kColumStyle = Symbol('columnStyle')

/**
 * Class Table.
 */
class Table {

    /**
     * Create a new instance.
     * @param {*} output
     */
    constructor(output: any) {
        this.output = output
    }

    /**
     * setHeaders method.
     * @param {*} headers
     * @returns {any}
     */
    setHeaders(headers: Record<string, any>) {
    	this[kHeaders] = headers
        return this
    }

    /**
     * setRows method.
     * @param {*} rows
     * @returns {any}
     */
    setRows(rows: any) {
    	this[kRows] = rows
        return this
    }

    /**
     * setStyle method.
     * @param {*} style
     * @returns {any}
     */
    setStyle(style: any) {
    	this[kStyle] = style
        return this
    }

    /**
     * setColumnStyle method.
     * @param {*} style
     * @returns {any}
     */
    setColumnStyle(style: any) {
    	this[kColumStyle] = style
    }

    /**
     * render method.
     * @returns {any}
     */
    render() {
    	let datas = []
    	for(let row of this[kRows]){
    		let data = {}
    		this[kHeaders].forEach((header,i)=>{
    			let message = row[i]
    			if(typeof message == 'string'){
    				message = message.replace(/<.*>(.*)<\/.*>/g,'$1')
    			}
    			data[header] = message
    		})
    		datas.push(data)
    	}
    	console.table(datas)
    }

}

module.exports = Table