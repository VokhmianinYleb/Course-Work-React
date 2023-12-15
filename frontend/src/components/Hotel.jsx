import './Hotel.scss'
import { Link } from 'react-router-dom'


export default function Hotel({ item, deleteHotel }) {
    return (
        <>
            <div class="card divCard">
                <img src={item.image_url} class="card-img-top" alt="..." />
                <div class="card-body">
                    <h5 class="card-title">{item.name} {item.stars_count}*</h5>
                    <p>Country: {item.Country}</p>
                    <hr />
                    <p class="card-text">{item.description}</p>
                    <Link to='/hotel' state={{ data: item._id }} class="btn btn-primary">Детально</Link>
                    <button onClick={() => deleteHotel(item._id)} class="btn btn-danger">Видалити</button>
                </div>
            </div>
        </>
    )
}   