import { Component } from "react";

class CreateDemand extends Component {

    state = {

    }

    render() {
        return (
            <div className="container" style={{paddingTop:60}}>
                <div className="row">
                    <div className="col sm-6">
                        <h4 className="text-center">Crete Game</h4>
                        <div className="container w-50" style={{paddingTop:50}}>
                            <form method="POST">
                                <div className="row">
                                <input type="text"></input>
                                <label>Enter the demand ID</label>
                                </div>
                                <div className="row">
                                    <input type="number"></input>
                                    <label>Enter the number of weeks</label>
                                </div>
                                <div className="row">
                                    <input type="text"></input>
                                    <label>Enter the demand</label>
                                </div>
                                <div className="row">
                                    <button type="button" className="btn btn-primary">Create</button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="col sm-6">
                    <h4 className="text-center">Demand Patterns</h4>
                        <div className="container w-100" style={{paddingTop:50}}>
                            <table className="table table-stripped">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Demand ID</th>
                                        <th scope="col">Demand Pattern</th>
                                    </tr>
                                    
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateDemand;