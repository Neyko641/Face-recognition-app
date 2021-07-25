import React from 'react';
import './ImageLinkForm.css';
const ImageLinkForm = ({onChange, onBtnSubmit}) => {
    return (
    <div>
          <p className='f3'>
        {'The Intergalactic Lion shall detect a face of your choosing.'}        
          </p>
        <div className='center'>
            <div className='form center pa4 br3 shadow-5'>
            <input type='text' className='f4 pa2 w-70 center' onChange={onChange}/>
            <button 
            className='w-30 grow f4 link ph3 pv2 dib white bg-dark-blue'
            onClick={onBtnSubmit}
            >Detect Face</button>
            </div>
        </div>    
    </div>
    );
}
export default ImageLinkForm;