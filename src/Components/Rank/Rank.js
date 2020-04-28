import React from 'react';

const Rank = ({entries}) => {

    return (
        <div>
            <div className="white f3">
                {'Fernando, Your current entry count is...'}
            </div>
            <div className="white f1">
                {entries}
            </div>
        </div>
    )

}


export default Rank