import { Button } from 'semantic-ui-react';
import React from 'react';

const OptionView = () => {
    const [title, setTitle] = React.useState('---');

    return (
        <div>
            <h3>
                {title}
                <Button circular icon="close" />
            </h3>
        </div>
    );
};

export default OptionView;
