import {Component} from "react";

/*
    Component which will display the information regarding the 
    previos weeks of the game.
*/
class InfoView extends Component {
    state = {}

    render() {
        return (
            <div className="conatiner" style={{padding:30}}>
                <h1 className="text-center">Last 10 Week Data</h1>
                <div className="row justify-content-center">
                    <div className="container w-75" style={{paddingTop:30}}>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">WEEK</th>
                                    <th scope="col">INV/BK</th>
                                    <th scope="col">DEMAND</th>
                                    <th scope="col">INCOMING</th>
                                    <th scope="col">OUTGOING</th>
                                    <th scope="col">OrderPlaced</th>
                                    <th scope="col">CurrentCost</th>
                                </tr>
                            </thead>
                            <tbody>
                                <DisplayTable week="1"/>
                                <DisplayTable week="2"/>
                                <DisplayTable week="3"/>
                            </tbody>
                        </table>
                        </div>
                </div>
            </div>
        );
    }
}

function DisplayTable(props) {
    let week = props.week;
    // TODO: IMPLEMENT LOGIC
    return (
        <tr>
            <th scope="col">{week}</th>
            <th scope="col">1</th>
            <th scope="col">1</th>
            <th scope="col">1</th>
            <th scope="col">1</th>
            <th scope="col">1</th>
            <th scope="col">1</th>
        </tr>
    );
}

export default InfoView;