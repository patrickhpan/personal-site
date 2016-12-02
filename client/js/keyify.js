import shortid from 'shortid';

function keyify(elements) {
    if(!Array.isArray(elements)) {
        return elements;
    }
    return elements.map(element => Object.assign({}, element, {
        key: shortid()
    }))
}

export default keyify;