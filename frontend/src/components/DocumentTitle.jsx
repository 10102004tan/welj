import {Helmet} from 'react-helmet';

const DocumentTitle = ({title}) => {
    return (
        <Helmet>
            <title>{title} | React E-commerce Dashboard Template</title>
        </Helmet>
    )
}

export default DocumentTitle;