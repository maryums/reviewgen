import React from 'react'
import { FaTrash } from 'react-icons/fa'

const Response = ({ requests, request, setRequests }) => {

    const handleDelete = () => {
        setRequests(requests.filter((item) => item.id !== request.id))
    }

    return (
        <div className='w-11/12 mx-auto shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
            <div className='flex place-self-end'>
                <button
                    onClick={handleDelete}
                >
                    <FaTrash

                    />
                </button>
            </div>

            <div className='flex p-3'>
                <div className='px-3 font-bold'>
                    Prompt:
                </div> Please generate a review for a {request.clothing} that fit {request.fit} and had {request.quality} fabric quality. {request.isQuick ? `The item shipped fairly quickly.` : ''}
                <br />{(request.request).length > 1 ? `Include these extra details as well: ${request.request}.` : ''}

            </div>
            <div className='flex p-3'>
                <div className='px-3 font-bold'>
                    Answer:  </div>  {request.response}
            </div>
        </div>
    )
}

export default Response