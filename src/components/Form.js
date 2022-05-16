import React from 'react'
import { nanoid } from 'nanoid';

const Form = ({ saveRequests, formData, setFormData }) => {
    const API_KEY = process.env.REACT_APP_API_KEY

    let recommend;
    let quickShip;

    if (formData.wouldRecommend) {
        recommend = 'I would recommend it.'
    } else {
        recommend = ''
    }

    if (formData.isQuick) {
        quickShip = "This shipped really quick!"
    } else {
        quickShip = ''
    }

    const data = {
        prompt: `Write a long review for this type of clothing: ${formData.clothing} that fits too ${formData.fit}. The fabric quality was ${formData.quality}! ${quickShip} ${recommend}. Also include details such as ${formData.request} `,
        temperature: 0.5,
        max_tokens: 64,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    }

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(data),
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch("https://api.openai.com/v1/engines/text-curie-001/completions", requestOptions)
            .then(response => response.json())
            .then(data => {
                const reply = (data.choices[0].text)
                const request = (formData.request)
                const clothing = (formData.clothing)
                const fit = (formData.fit)
                const quality = (formData.quality)
                const wouldRecommend = (formData.wouldRecommend)
                const isQuick = (formData.isQuick)

                const newRequest = {
                    request: request,
                    response: reply,
                    clothing: clothing,
                    fit: fit,
                    quality: quality,
                    wouldRecommend: wouldRecommend,
                    isQuick: isQuick,
                    id: nanoid()
                }
                saveRequests(newRequest)
            })

        handleReset();
    }

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value.toLowerCase()
            }
        })
    }


    const handleReset = () => {
        setFormData({
            request: "",
            reply: "",
            clothing: "",
            fit: "",
            quality: "",
            wouldRecommend: false,
            isQuick: false
        })
    }

    return (
        <>
            <form>
                <div className="my-6 flex flex-col justify-center">

                    <div className='py-3'>
                        <label htmlFor="clothing">
                            What did you buy?
                        </label>
                        <br />
                        <select
                            className='w-1/3'
                            id="clothing"
                            value={formData.clothing}
                            onChange={handleChange}
                            name="clothing"
                        >

                            <option value=""></option>
                            <option value="t-shirt">tshirt</option>
                            <option value="sweater">sweater</option>
                            <option value="jeans">jeans</option>
                            <option value="shorts">shorts</option>
                            <option value="jacket">jacket</option>
                        </select>
                    </div>


                    <div className='py-3'>
                        <label htmlFor="fit">
                            How was the fit?
                        </label>
                        <br />
                        <select
                            className='w-1/3'
                            id="fit"
                            value={formData.fit}
                            onChange={handleChange}
                            name="fit"
                        >
                            <option value=""> </option>
                            <option value="big">too big</option>
                            <option value="small">too small</option>
                            <option value="perfect">just right</option>
                        </select>
                    </div>



                    <div className='py-3'>
                        <label htmlFor="quality">
                            How was the fabric quality?
                        </label>
                        <br />
                        <select
                            className='w-1/3'
                            id="quality"
                            value={formData.quality}
                            onChange={handleChange}
                            name="quality"
                        >
                            <option value=""> </option>
                            <option value="low">low quality</option>
                            <option value="average">average </option>
                            <option value="superb">superb</option>
                        </select>
                    </div>


                    <div className='py-3'>
                        <label htmlFor="wouldRecommend">Would you recommend?</label>
                        <input
                            className='mx-3'
                            type="checkbox"
                            id="wouldRecommend"
                            checked={formData.wouldRecommend}
                            onChange={handleChange}
                            name="wouldRecommend"
                        />
                    </div>


                    <div className='pb-3'>
                        <label htmlFor="isQuick">Did this ship quickly?</label>
                        <input
                            className='mx-3'
                            type="checkbox"
                            id="isQuick"
                            checked={formData.isQuick}
                            onChange={handleChange}
                            name="isQuick"
                        />


                    </div>


                    <label
                        htmlFor="request"
                        className="form-label inline-block mb-2 text-gray-700"
                    >Add at least one unique suggestion to your review.
                    </label
                    >

                    <input
                        type="text"
                        name="request"
                        onChange={handleChange}
                        value={formData.request}
                        id="request"
                        placeholder="Suggestions for AI"
                        className="
                            form-control
                            block
                            -7/8
                            m-0
                            p-2
                            text-gray-700
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            focus:text-gray-700 focus:bg-white focus:border-[#92828d] focus:outline-none
                            "
                    />
                </div>
                <button
                    onClick={(e) => handleSubmit(e)}
                    className='bg-[#92828d] hover:bg-[#6B5A7D] text-white font-bold py-2 px-4 rounded'
                    type="submit" value="submit">
                    Submit
                </button>
            </form>

        </>



    )
}

export default Form