/**
 * returns the number with a metric prefix.
 * @param {number} num
 * @param {int} [fractionDigits=2]
 * @returns {string}
 */
function metricPrefix(num, fractionDigits = 2) {
    if (num === 0) {
        return "0"
    }
    let exponent = Math.floor(Math.log10(Math.abs(num)))

    const prefixes = [
        [24, "Y"], [21, "Z"], [18, "E"], [15, "P"],
        [12, "T"], [9, "G"], [6, "M"], [3, "k"],
        [0, ""],
        [-3, "m"], [-6, "\u03BC"], [-9, "n"],
        [-12, "p"], [-15, "f"], [-18, "a"],
        [-21, "z"], [-24, "y"],
    ]

    for (const [e, prefix] of prefixes) {
        if (exponent >= e) {
            return (num / (10 ** e)).toFixed(fractionDigits) + prefix
        }
    }

    // TODO: deal with values smaller than 10^-24 or larger than 10^24
}