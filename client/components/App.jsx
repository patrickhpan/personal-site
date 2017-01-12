import React from 'react';

import Header from './Header';

class App extends React.Component {
    componentWillReceiveProps(nextProps) {
        let { routes } = nextProps;
        let activeComponent = routes[routes.length - 1].component.name;
        if(window.activeComponent.current !== activeComponent) {
            window.activeComponent.previous = window.activeComponent.current;
            window.activeComponent.current = activeComponent;
        }
    }
    render() {
        let children = this.props.children;
        return <div id="App">
            <Header />
            {children}
        </div>
    }
}

export default App;