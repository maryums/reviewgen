import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid';


const API_KEY = process.env.REACT_APP_API_KEY;

const Form = ({ saveRequests, formData, inputText, setInputText, setInputReply, setFormData }) => {

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    const handleInputText = (e) => {
        setInputText(e.target.value)
    }

    let recommend;

    if (formData.wouldRecommend) {
        recommend = 'I would recommend this product'
    } else {
        recommend = 'I would not recommend it'
    }

    const data = {
        prompt: `Write a long review for this type of clothing: ${formData.clothing} that fits too ${formData.fit} and ${recommend} and include details such as ${inputText} `,
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
                const apiReply = (data.choices[0].text)
                const clothing = (formData.clothing)
                const fit = (formData.fit)
                const wouldRecommend = (formData.wouldRecommend)

                const newRequest = {
                    request: inputText,
                    response: apiReply,
                    clothing: clothing,
                    fit: fit,
                    wouldRecommend: wouldRecommend,
                    id: nanoid()
                }
                saveRequests(newRequest)
            })

        handleReset();
    }

    const handleReset = () => {
        setInputText('')
        setInputReply('')
        setFormData({
            clothing: "",
            fit: "",
            wouldRecommend: false
        })
    }
    console.log(data)
    return (
        <div>
            <form>
                <div>
                    <div className="my-6 flex flex-col justify-center">

                        <div className='py-3'>
                            <label htmlFor="cuisine">
                                What did you buy?
                            </label>
                            <br />
                            <select
                                className='w-1/4'
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
                            <label htmlFor="cuisine">
                                How was the fit?
                            </label>
                            <br />
                            <select
                                className='w-1/4'
                                id="fit"
                                value={formData.fit}
                                onChange={handleChange}
                                name="fit"
                            >
                                <option value=""> </option>
                                <option value="big">Too Big</option>
                                <option value="small">Too Small</option>
                                <option value="perfect">Just Right</option>
                            </select>
                        </div>


                        <div className='py-3 '>
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


                        <label
                            htmlFor="input-prompt"
                            className="form-label inline-block mb-2 text-gray-700"
                        >Add at least one more unique suggestion to your review.
                        </label
                        >

                        <input
                            type="text"
                            onChange={(e) => handleInputText(e)}
                            value={inputText}
                            id="input-prompt"
                            placeholder="Suggestions for AI"
                            className="
                                    form-control
                                    block
                                    w-7/8
                                    px-3
                                    py-1.5
                                    text-gray-700
                                    bg-white bg-clip-padding
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                    "

                        />

                    </div>
                    <input
                        onClick={(e) => handleSubmit(e)}
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        type="submit" value="Submit" />
                </div>



            </form>

        </div>



    )
}

export default Form