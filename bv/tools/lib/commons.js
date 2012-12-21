/** Simple version of jQuery.extend(false, target, args..) since jQuery hasn't loaded yet. */
exports.extend = function (target /*, args...*/) {
    var source, key, value, i;
    for (i = 1; i < arguments.length; i++) {
        if ((source = arguments[i]) != null) {
            for (key in source) {
                if ((value = source[key]) !== undefined) {
                    target[key] = value;
                }
            }
        }
    }
    return target;
}