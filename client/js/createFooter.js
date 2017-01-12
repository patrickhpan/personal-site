function formatComponentName(name) {
    return name.replace(/([a-z])([A-Z])/g, '$1 $2').split(' ').join(" ");
}

function createFooter() { 
    let previousComponent = window.activeComponent.previous;
    if(previousComponent === undefined || previousComponent === null) {
        return {
            "link": "/",
            "md": "**Back** to home."
        }
    } else {
        let name = formatComponentName(previousComponent);
        return {
            "onClick": () => {
                window.history.back();
            },
            "md": `**Back** to ${name}`
        } 
    }
}

export default createFooter;