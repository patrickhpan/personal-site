import createConnection from './contentful';

function init() {
    window.contentful = createConnection();
}

export default init; 