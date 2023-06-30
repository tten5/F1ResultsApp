import servers from './servers';
import basicInfo from './basicInfo';
import components from './components';
import tags from './tags';
import paths from './paths'



export default {
    ...basicInfo,
    ...servers,
    ...components,
    ...tags,
    ...paths,
};