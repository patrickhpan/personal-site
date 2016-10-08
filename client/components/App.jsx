import React from 'react';

class App extends React.Component {
    render() {
        let children = this.props.children;
        return <div id="App">
            <h1>App</h1>
            {children}
        </div>
    }
}

export default App;