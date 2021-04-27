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
                <h1 className="text-center">All Weeks Data</h1>
                <div className="row justify-content-center">
                    <div className="container w-75" style={{paddingTop:30}}>
                        <table className="table" style={{textAlign:"center"}}>
                            <thead>
                                <tr>
                                    <th scope="col">WEEK</th>
                                    <th scope="col">INV/BK</th>
                                    <th scope="col">DEMAND</th>
                                    <th scope="col">INCOMING</th>
                                    <th scope="col">OUTGOING</th>
                                    <th scope="col">ORDER</th>
                                    <th scope="col">TOTAL COST</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.all_weeks.map((w) => {
                                    return (
                                        <tr key={w.week_num}>
                                            <td>{w.week_num}</td>
                                            <td>{w.inventory}</td>
                                            <td>{w.demand}</td>
                                            <td>{w.incoming}</td>
                                            <td>{w.outgoing}</td>
                                            <td>{w.order}</td>
                                            <td>{w.cost}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        </div>
                </div>
            </div>
        );
    }
}

export default InfoView;