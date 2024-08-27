import './styles.scss'

const CustomerDetails = ({details}) => {

    let customer = details.customer ? details.customer : details

    return (
        <div className="customer-details">
            <div className="details-list">
                <h4 className="sub-heading">Customer Details</h4>
                <ul>

                    <li>
                        <label className="label">Name</label>
                        <div className="label-details">{customer.name}</div>
                    </li>
                    <li>
                        <label className="label">Contact</label>
                        <div className="label-details">{customer.phone}</div>
                    </li>
                    <li>
                        <label className="label">Email</label>
                        <div className="label-details">{customer.email}</div>
                    </li>
                    {/*<li>*/}
                    {/*    <label className="label">Address</label>*/}
                    {/*    <div className="label-details">-</div>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    <label className="label">Average Rating</label>*/}
                    {/*    <div className="label-details">-</div>*/}
                    {/*</li>*/}
                </ul>
            </div>
        </div>
    );
}

export default CustomerDetails;