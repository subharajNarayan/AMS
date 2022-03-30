import React from 'react'

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
                            <input></input>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className='form-group'>
                            <label htmlFor='' className='mr-1'>
                                Unit:
                            </label>
                            <input></input>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className='form-group'>
                            <label htmlFor='' className='mr-1'>
                                NDWQ Standard:
                            </label>
                            <input></input>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Form