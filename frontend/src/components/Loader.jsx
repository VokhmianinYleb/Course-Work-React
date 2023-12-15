import './Loader.scss'


export default function Loader({ state }) {
    return (
        <>
            {state && <div class="d-flex justify-content-center mt10">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>}
        </>
    )
}