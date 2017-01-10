import React from 'react';
import PostList from './PostList';

import { getNewestEntries } from '../js/contentful';
import staticContent from '../json/Projects.json';

class Projects extends PostList {
    constructor() {
        super();
        this.staticContent = staticContent;
        this.elementId = "Projects"
    }

    componentDidMount() {
        getNewestEntries('blog-post')
            .then(data => {
                let items = data.items;
                items = items.filter(item => item.fields.isProject === true)
                return items;
            })
            .then(items => {
                this.setState({
                    content: items
                })
            })
    }
}

export default Projects;