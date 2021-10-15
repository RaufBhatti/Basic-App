import { useHistory, useParams } from "react-router";
import useFetch from "./hooks/useFetch";

const ProductDetails = ({ name, price }) => {
    const { _id } = useParams();
    const { data: product, error, loading } = useFetch('http://localhost:4000/products/' + _id);
    const history = useHistory();


    return (
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">{name}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        This Product is really useful and good.
                    </div>
                    <div className="modal-body">
                        <b>  Price: {price}</b>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-warning">Add to Cart</button>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails;