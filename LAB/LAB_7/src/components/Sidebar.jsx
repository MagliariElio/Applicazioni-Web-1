
import React from 'react';

function Sidebar(props) {
    return (
        <aside className="collapse col-12 d-md-block col-md-3 below-nav" >
            <div className="list-group list-group-flush">
                <button className={(props.filterActived == 0 ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action")} onClick={props.handleAllFilter}>All</button>
                <button className={(props.filterActived == 1 ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action")} onClick={props.handleFavoriteFilter}>Favorites</button>
                <button className={(props.filterActived == 2 ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action")} onClick={props.handleBestRatedFilter}>Best Rated</button>
                <button className={(props.filterActived == 3 ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action")} onClick={props.handleSeenLastMonthFilter}>Seen Last Month</button>
                <button className={(props.filterActived == 4 ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action")} onClick={props.handleUnseenFilter}>Unseen</button>
            </div>
        </aside>
    );
}

export default Sidebar;