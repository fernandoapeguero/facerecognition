import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm = ({onInputChange , onButtonSubmit}) => {

    return (
        <div>
            
                <p className="f3">
                    {`This magic brain will detect faces on your pictures. Give it a try. `}
                </p>
                <div className='center'>
                    <div className=" form center pa4 br3 shadow-3">
                    <input className="f4 pa2 w-70 center" type="text"  onChange={onInputChange} />
                    <button className="w-30 grow f4 link ph3 pv dib white bg-light-purple" onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )

}

export default ImageLinkForm