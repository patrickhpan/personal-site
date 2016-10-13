import Content from './Content';

import content from '../json/Projects.json';
import mePic from '../img/me.jpg';

const About = (props) => <Content 
    content={content} 
    {...props}
/>

export default Projects