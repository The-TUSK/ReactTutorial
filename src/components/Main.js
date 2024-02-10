import React from 'react'
import Service from './Service';
import Board from './Board';
function Main() {
    return (
        <>
            <div className="container">
                <div className="row" >
                    <div className="col-xs-6" style={{ 'maxWidth': '450px' }}><Board /></div>
                    <div className="col-xs-6" style={{ 'maxWidth': '450px' }}><Service /></div>
                </div>
            </div>
        </>
    )
}
export default Main;