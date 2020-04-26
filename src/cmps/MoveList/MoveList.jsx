import React from 'react'
import moment from 'moment';

export const MoveList = (props) => {

    return (
        <section className="move-list">
        <h2>{props.title}</h2>
            <div className="move-list-main">
                {props.moveList.map(move => {
                    return (
                        <ul key={move._id}>
                            {props.isFullList && <li>To: {move.to}</li>}
                            <li>At: {moment(move.at).format("LLL")}</li>
                            <li>Amount: {move.amount}</li>
                        </ul>
                    )
                })}
            </div>
        </section>
    )
}