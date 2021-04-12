import {Component} from "react";

class StatusView extends Component {
    state = {}

    render() {
        return (
            <div
                className="conatiner"
                style={{
                paddingTop: 50
            }}>
                <h2 className="text-center">Status of other players</h2>
                <div className="container w-50" style={{paddingTop:60}}>
                <div className="row">
                    <div className="col sm-6">
                        <p>
                            <b>Factory:</b>
                            <span>Not Submitted</span>
                        </p>
                    </div>
                    <div className="col sm-6">
                        <p>
                            <b>Distributor:</b>
                            <span>Not Submitted</span>
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col sm-6">
                        <p>
                            <b>Wholesaler:</b>
                            <span>Not Submitted</span>
                        </p>
                    </div>
                    <div className="col sm-6">
                        <p>
                            <b>Retailer:</b>
                            <span>Not Submitted</span>
                        </p>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default StatusView;