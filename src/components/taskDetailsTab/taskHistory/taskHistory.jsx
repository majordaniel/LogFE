import "./styles.scss";

const HistoryCard = ({data}) => <div className="single-history">
    <div className="history-time">{data?.creation_datetime}</div>
    <div className="history-detail">
        <span className="title" dangerouslySetInnerHTML={{__html: data.label_description}}/>
    </div>
</div>;

const EmptyHistory = () => <div className="history-agent"><span className="title-heading">No history data yet</span>
</div>


const taskHistory = ({data}) => {

    return (
        <div className="task-history">
            {/*<div className="history-agent">*/}
            {/*    <span className="title-img"><img*/}
            {/*        src="https://tookan.s3.amazonaws.com/fleet_profile/v7Rt1588068852972-لوجوكسوة.png" alt=""/></span>*/}
            {/*    <span className="title-heading">Mohammed Salem Dammam</span>*/}
            {/*</div>*/}
            {/*<div className="line"/>*/}
            <div className="history">{(data && data.length) ? data?.map((his, index) =>
                    <HistoryCard data={his} key={index}/>) :
                <EmptyHistory/>}</div>
        </div>
    );
};

export default taskHistory;
