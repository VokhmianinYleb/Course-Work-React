import { useEffect, useState } from 'react';
import './ConcreteHotel.scss'
import { useLocation } from "react-router-dom";
import Loader from './Loader';
import axios from 'axios';


export default function ConcreteHotel() {
    const [isLoading, setIsLoading] = useState(true)
    const [hotel, setHotel] = useState({})

    const [name, setName] = useState('')
    const [country, setCountry] = useState('')
    const [imageURL, setImageURL] = useState('')
    const [description, setDescription] = useState('')
    const [stars, setStars] = useState('1')

    const location = useLocation();
    const _id = location.state?.data;

    useEffect(() => {
        if (_id) {
            // Імітація завантаження
            setTimeout(() => {
                axios.get(`${process.env.REACT_APP_API_LINK}/hotels/${_id}`)
                    .then(res => {
                        setName(res.data[0].name)
                        setCountry(res.data[0].Country)
                        setDescription(res.data[0].description)
                        setStars(res.data[0].stars_count)
                        setImageURL(res.data[0].image_url)
                        setHotel(res.data[0])
                        setIsLoading(false)
                    })

            }, 1000);
        }
        else {
            setIsLoading(false)
        }
    }, [])

    function save() {
        const data = {
            name,
            Country: country,
            image_url: imageURL,
            description,
            stars_count: stars
        }

        if (_id) {
            axios.patch(`${process.env.REACT_APP_API_LINK}/hotels/update/${_id}`, data)
                .then(() => console.log('ok'))
                .catch(() => console.log('error'))
        }
        else {
            axios.post(`${process.env.REACT_APP_API_LINK}/hotels/add`, data)
                .then(() => console.log('ok'))
                .catch(() => console.log('error'))
        }

        window.location.href = '/'
    }

    return (
        <>
            <Loader state={isLoading} />
            {!isLoading &&
                <div className='mainDiv'>
                    <div className='divForm'>
                        <div className='subDiv'>
                            <input type="text" placeholder='Name' value={name} onChange={e => setName(e.target.value)} /><br />
                            <input type="text" placeholder='Country' value={country} onChange={e => setCountry(e.target.value)} /><br />
                            <input type="text" placeholder='Image URL' value={imageURL} onChange={e => setImageURL(e.target.value)} /><br />
                            <textarea type="text" placeholder='Description' value={description} onChange={e => setDescription(e.target.value)} /><br />
                            <select name="" id="" defaultValue={stars} onChange={e => setStars(e.target.value)}>
                                <option value="1">1 star</option>
                                <option value="2">2 stars</option>
                                <option value="3">3 stars</option>
                                <option value="4">4 stars</option>
                                <option value="5">5 stars</option>
                            </select><br />
                            <div className='divButton'>
                                <button onClick={save}>Зберегти</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1>{hotel.name}</h1>
                        <img src={hotel.image_url} />
                    </div>
                </div>
            }
        </>
    )
}