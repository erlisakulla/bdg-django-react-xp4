import {Component} from "react";

class StatusView extends Component {
    render() {
        if (!this.props.shared_info || this.props.shared_info.length === 0) {
            return ( 
                <p style={{textAlign:'center', color:'grey'}}>No roles to display</p>
            );
        }
        return (
            <div
                className="conatiner"
                style={{
                paddingTop: 50
            }}>
                <h2 className="text-center">Order status of all players</h2>
                <div className="container w-50" style={{paddingTop:60}}>
                    <div className="row">
                        <table className="status-table">
                            <thead>
                                <tr>
                                {this.props.shared_info.map((r) => {
                                    return (
                                    <th key={r.role_name}>{r.role_name}</th>
                                    );
                                })}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                {this.props.shared_info.map((r) => {
                                    if (r.order_status === false) {
                                        return (<td style={{color:'red'}} key={r.role_name}>Order not placed</td>);
                                    }
                                    else {
                                        return (<td style={{color:'green'}} key={r.role_name}>Order placed</td>);
                                    }
                                })}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default StatusView;