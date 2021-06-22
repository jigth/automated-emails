const newDateString = (date) => {
    if (date) {
        return new Date(date).toISOString();
    }
    return new Date().toISOString();
}

module.exports = newDateString;
