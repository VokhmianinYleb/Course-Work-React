import axios from 'axios'
import Hotel from './Hotel'
import './Hotels.scss'
import Loader from './Loader'
import { useEffect, useState } from 'react'


export default function Hotels() {
    const [isLoading, setIsLoading] = useState(true)
    const [constHotels, setConstHotels] = useState([])
    const [hotels, setHotels] = useState([])

    useEffect(() => {
        // Імітація завантаження
        setTimeout(() => {
            getData()
        }, 1500);
    }, [])

    function getData() {
        axios.get(`${process.env.REACT_APP_API_LINK}/hotels`)
            .then(res => {
                setHotels(res.data)
                setConstHotels(res.data)
                setIsLoading(false)
            })
            .catch(res => alert('Виникла помилка при завантаженні даних'))
    }

    function deleteHotel(_id) {
        if (window.confirm('Ви впевнені, що хочете видалити цей запис?') == true) {
            axios.delete(`${process.env.REACT_APP_API_LINK}/hotels/delete/${_id}`)
                .then(() => {
                    alert('Запис успішно видалено.')
                    setIsLoading(true)
                    getData()
                })
                .catch(() => alert('При видаленні виникла помилка.'))
        }
    }

    function search(e) {
        if (e.target.value == "") {
            setHotels([...constHotels])
        }
        else (
            setHotels(constHotels.filter(hotel => hotel.name.toLowerCase().includes(e.target.value.toLowerCase())))
        )
    }

    return (
        <>
            <Loader state={isLoading} />
            {!isLoading &&
                <div>
                    <div className='search'>
                        <input type="text" placeholder='Пошук за назвою' onChange={search} />
                    </div>
                    <div className='AllCards'>
                        {hotels.map((hotel, index) => <Hotel item={hotel} deleteHotel={deleteHotel}>{index}</Hotel>)}
                    </div>
                </div>
            }
        </>
    )
}