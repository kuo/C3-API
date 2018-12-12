/**
 * 
 * @param {success or fail} result 
 * @param {any} message 
 */
module.exports = function(result, message) {
    this.result = result;
    this.message = message;
}