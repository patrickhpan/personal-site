import React from 'react';
import PostList from './_PostList';

import { getNewestEntries } from '../../js/contentful';
import { AllPosts as staticContent } from '../../json/PostLists.json';

class AllPosts extends PostList {
    constructor() {
        super();
        this.staticContent = staticContent;
    }
}

export default AllPosts;