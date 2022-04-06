import React from 'react';
import { Button } from 'reactstrap';

const Form = () => {
    return (
        <div>
            <form>
                <div className='row align-items-center'>
                    <div className='col-md-3'>
                        <div className='form-group'>
                            <label htmlFor="" className="mr-1">
                                Parameters Name
                            </label>
                            <input type='text' id='parameter_name' 
                            className='form-control'
                            
                             />
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className='form-group'>
                            <label htmlFor='' className='mr-1'>
                                Unit:
                            </label>
                            <input type="text" className='form-control'
                            
                            />
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className='form-group'>
                            <label htmlFor='' className='mr-1'>
                                NDWQ Standard:
                            </label>
                            <input type="text" className='form-control'
                            
                            />
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className='form-group'>
                            <label htmlFor='' className='mr-1'>
                                Types
                            </label>
                            <select className='form-control' name='types'>
                                <option>Chemical</option>
                                <option>Others</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className='col-md-12 text-right'>
                        <Button type='submit' className='btn btn-primary' color='primary' 
                            style={{padding: "8px 15px",
                                    borderRadius: "5px", 
                                    fontWeight: "bold", 
                                    letterSpacing:"2px", 
                                    fontSize: "0.9rem"}}
                        >
                            SAVE
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Form