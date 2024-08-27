import React from 'react';
import './styles.scss'

const TaskDetails = ({details}) => {


    return (
        <React.Fragment>
            {details &&
            <div className="task-details">
                <div className="details-list">
                    <ul>
                        <li>
                            <label className="label">Status</label>
                            <div className="label-details">-</div>
                        </li>

                        <li>
                            <label className="label">Status</label>
                            <div className="label-details">{['Assigned', 'Started', 'Successful', 'Failed', 'In Progress',
                                'Unassigned', 'Unassigned', 'Accepted', 'Declined', 'Cancelled',
                                'Deleted'][details.job_status || 6] || 'UNSIGNED'}</div>
                        </li>
                        <li>
                            <label className="label">Description</label>
                            <div className="label-details">{details.job_description}</div>
                        </li>
                        <li>
                            <label className="label">Donation Type </label>
                            <div className="label-details">{details?.donation_types[0]?.name}</div>
                        </li>
                        <li>
                            <label className="label">Tracking Link</label>
                            <div className="label-details">{details?.tracking_link || '-'}</div>
                        </li>

                        <li>
                            <label className="label">Arrived At</label>
                            <div className="label-details">{details?.arrived_datetime || '-' }</div>
                        </li>

                        <li>
                            <label className="label">Acknowledged At</label>
                            <div className="label-details">{details?.acknowledged_datetime || '-' }</div>
                        </li>
                        <li>
                            <label className="label">Started At</label>
                            <div className="label-details">{details?.started_datetime || '-' }</div>
                        </li>
                        <li>
                            <label className="label">Completed At</label>
                            <div className="label-details">{details?.completed_datetime || '-' }</div>
                        </li>

                        <li>
                            <label className="label">Order ID</label>
                            <div className="label-details">{details.order_id}</div>
                        </li>
                    </ul>
                </div>
            </div>
            }
        </React.Fragment>
    );
}

export default TaskDetails;