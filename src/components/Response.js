import React from 'react'

const Response = ({ requests, request, setRequests }) => {

    const handleDelete = () => {
        setRequests(requests.filter((item) => item.id !== request.id))
    }

    return (
        <div className='results'>
            <div className='review mx-auto my-4 flex w-full flex-col rounded-md 
          border-2 bg-white font-light shadow-xl'>
                <div class="m-2 place-self-end">
                    <button className="rounded-full bg-red-300 p-2 text-white  hover:bg-red-600" title="Delete review" onClick={handleDelete}>
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0"
                            viewBox="0 0 448 512" height="1em" width="1em"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245 8a48 48 0 0 0 47.9-45L416 128H32z">
                            </path>
                        </svg>
                    </button>
                </div>

                <div class="review--answer px-3">
                    <div class="mb-2 text-xs font-bold uppercase 
              tracking-wider text-gray-500">Generated Review:</div>
                    {request.response}
                </div>

                <div class="review--prompt mt-3 bg-slate-50 p-3 text-xs 
            text-slate-700">
                    <span class="text-xs font-bold text-slate-500">
                        Prompt:</span> Please generate a review for a {request.clothing} that fit {request.fit} and had {request.quality} fabric quality. {request.isQuick ? `The item shipped fairly quickly.` : ''}
                    <br />{(request.request).length > 1 ? `Include these extra details as well: ${request.request}.` : ''} </div>

            </div>


        </div>


    )
}

export default Response