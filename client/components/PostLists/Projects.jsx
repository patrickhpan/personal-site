import React from 'react';
import PostList from './_PostList';

import { getNewestEntries } from '../../js/contentful';
import { Projects as staticContent } from '../../json/PostLists.json';

class Projects extends PostList {
    constructor() {
        super();
        this.staticContent = staticContent;
        this.elementId = "Projects"
    }

    postFilter(post) {
        console.log(post)
        return (post.fields.isProject === true)
    }
}

export default Projects;