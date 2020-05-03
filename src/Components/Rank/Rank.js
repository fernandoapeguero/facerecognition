import React from 'react';

const Rank = ({entries , user}) => {

    return (
        <div>
            <div className="white f3">
                {`${user}, Your current entry count is...`}
            </div>
            <div className="white f1">
                {entries}
            </div>
        </div>
    )

}


export default Rank;