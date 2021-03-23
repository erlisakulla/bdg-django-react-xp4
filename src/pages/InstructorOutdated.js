class Instructor111 extends Component {
    //   constructor(props) {
    //     super(props);
    //     this.state = {
    //       Game_id: "",
    //       Password: "",
    //       Game_nbre: 1,
    //       Gameid: "2486",
    //       time_delay: 2,
    //       is_wholesaler_present: 1,
    //       is_retailer_present: 1,
    //       current_cost: 170,
    //       demand_pattern: 1,
    //       Holding_cost: 0.5,
    //       Backorder_cost: 1,
    //       Number_of_weeks_completed: 7,
    //       stop: false,
    //       Number_of_weeks_to_stop: 10,
    //       password: "admin",
    //       Manufacturer_cost: 32,
    //       Distributor_cost: 46,
    //       Wholesaler_cost: 50,
    //       Retailer_cost: 39,
    //       gamedata:[]
    //     };
    //   }
    //   onChangetimedelay = (e) => {
    //     this.setState({ time_delay: e.target.value });
    //   };
    //   onChangewholesalerpresent = (e) => {
    //     this.setState({ is_wholesaler_present: e.target.value });
    //   };
    //   onChangeretailerpresent = (e) => {
    //     this.setState({ is_retailer_present: e.target.value });
    //   };
    //   onChangedemand_pattern = (e) => {
    //     this.setState({ demand_pattern: e.target.value });
    //   };
    //   onChangeHolding_cost = (e) => {
    //     this.setState({ Holding_cost: e.target.value });
    //   };
    //   onChangeBackorder_cost = (e) => {
    //     this.setState({ Holding_cost: e.target.value });
    //   };
    //   reset = () => {
    //     this.setState({
    //       time_delay: 2,
    //       is_wholesaler_present: 1,
    //       is_retailer_present: 1,
    //       current_cost: 100,
    //       demand_pattern: 1,
    //       Holding_cost: 0.5,
    //       Backorder_cost: 1,
    //       Number_of_weeks_completed: 0,
    //       stop: false,
    //       Number_of_weeks_to_stop: 20,
    //     });
    //   };
    //   stop_continue = () => {
    //     if (this.state.stop) {
    //       //continue game
    //     } else {
    //       this.setState({ stop: true });
    //     }
    //   };
    //   onChangeNumber_of_weeks_to_stop = (e) => {
    //     this.setState({ Number_of_weeks_to_stop: e.target.value });
    //   };
    //   onChangepassword = (e) => {
    //     this.setState({ password: e.target.value });
    //   };
    //   onChangeGameid2 = (e) => {
    //     this.setState({ Game_id: e.target.value });
    //   };
    //   onChangepassword2 = (e) => {
    //     this.setState({ Password: e.target.value });
    //   };
    //   onsubmit2 = (e) => {
    //     alert("Game Creacted!");
    //   };
    
    //   componentDidMount(){
    
    //     axiosInstance.get("game/").then((res)=>{
    //             console.log(res);
    //         })
    //   }
    
    
    //   render() {
    //     let game=this.props.gamedata
    //     return (
    //       <div>
    //         {/* <Nav2></Nav2> */}
    
    //         { 
    //           game?this.props.gamedata.map((element, i) => {     
    //            console.log("Entered");                 
    //            return (<ViewGame gamedata={element} />) 
    //         }): null
    //       }
    
    //         <Tabs defaultActiveKey="1" id="uncontrolled-tab-example">
    //           <Tab eventKey="1" title="Create new game">
    //             <section className="content-wrapper">
    //               <div className="login">
    //                 <div className="newgame">
    //                   <br></br>
    //                   <h3>Lunch the Game now with default settings </h3>
    //                   <br></br>
    //                   <br></br>
    //                   <label>Game id</label>
    //                   <input
    //                     type="text"
    //                     id="Gameid2"
    //                     name="Gameid2"
    //                     value={this.state.Gameid2}
    //                     onChange={this.onChangeGameid2}
    //                   />
    //                   <p></p>
    //                   <label>Password</label>
    //                   <input
    //                     type="password"
    //                     id="password2"
    //                     name="password2"
    //                     onChange={this.onChangepassword2}
    //                   />
    //                   <br></br>
    //                   <div className="buttonContainer">
    //                     <button id="userSubmit" onClick={this.onsubmit2}>
    //                       Create Game
    //                     </button>
    //                   </div>
    //                 </div>
    //               </div>
    //             </section>
    //           </Tab>
    //           <Tab eventKey="2" title="Current games">
    //             <section className="content-wrapper">
    //               <div className="login">
    //                 <div className="newgame">
    //                   <h3>View and Edit current games settings</h3>
    //                 </div>
    //               </div>
    //             </section>
    //             <Table striped bordered hover variant="dark">
    //               <thead>
    //                 <tr>
    //                   <th>Game ID</th>
    //                   <th>Time delay between supply chain partners</th>
    //                   <th>Is wholesaler Present?</th>
    //                   <th>Is Retailer Present?</th>
    //                   <th>Current cost</th>
    //                   <th>Demand pattern</th>
    //                   <th>Holdin cost</th>
    //                   <th>Backorder cost</th>
    //                   <th>Number of weeks Completed</th>
    //                   <th>Reset the Game</th>
    //                   <th>Stop/Continue this game</th>
    //                   <th>Week to stop</th>
    //                   <th>Change supply chain partner password</th>
    //                 </tr>
    //               </thead>
    //               <tbody>
    //                 <tr>
    //                   <td>{this.state.Gameid}</td>
    //                   <td>
    //                     <select
    //                       name="time_delay"
    //                       defaultValue={this.state.time_delay}
    //                       id="delay"
    //                       onChange={this.onChangetimedelay}
    //                     >
    //                       <option value="1">1 week</option>
    //                       <option value="2">2 weeks</option>
    //                       <option value="3">3 weeks</option>
    //                       <option value="4">4 weeks</option>
    //                     </select>{" "}
    //                   </td>
    //                   <td>
    //                     <select
    //                       name="is_wholesaler_present"
    //                       defaultValue={this.state.is_wholesaler_present}
    //                       id="wholesalerprsent"
    //                       onChange={this.onChangewholesalerpresent}
    //                     >
    //                       <option value="1">yes</option>
    //                       <option value="2">no</option>
    //                     </select>{" "}
    //                   </td>
    //                   <td>
    //                     <select
    //                       name="is_retailer_present"
    //                       defaultValue={this.state.is_retailer_present}
    //                       id="retailerprsent"
    //                       onChange={this.onChangeretailerpresent}
    //                     >
    //                       <option value="1">yes</option>
    //                       <option value="2">no</option>
    //                     </select>{" "}
    //                   </td>
    //                   <td>{this.state.current_cost}</td>
    //                   <td>
    //                     <select
    //                       name="demand_pattern"
    //                       defaultValue={this.state.demand_pattern}
    //                       id="demand_pattern"
    //                       onChange={this.onChangedemand_pattern}
    //                     >
    //                       <option value="1">1</option>
    //                       <option value="2">0</option>
    //                     </select>{" "}
    //                   </td>
    //                   <td>
    //                     <input
    //                       type="text"
    //                       id="Holding_cost"
    //                       name="Holding_cost"
    //                       value={this.state.Holding_cost}
    //                       onChange={this.onChangeHolding_cost}
    //                     />
    //                   </td>
    //                   <td>
    //                     <input
    //                       type="text"
    //                       id="Backorder_cost"
    //                       name="Backorder_cost"
    //                       value={this.state.Backorder_cost}
    //                       onChange={this.onChangeBackorder_cost}
    //                     />
    //                   </td>
    //                   <td>{this.state.Number_of_weeks_completed}</td>
    //                   <td>
    //                     <button onClick={this.reset}>Reset</button>
    //                   </td>
    //                   <td>
    //                     <button onClick={this.stop_continue}>Stop/Continue</button>
    //                   </td>
    //                   <td>
    //                     <input
    //                       type="text"
    //                       id="Number_of_weeks_to_stop"
    //                       name="Number_of_weeks_to_stop"
    //                       value={this.state.Number_of_weeks_to_stop}
    //                       onChange={this.onChangeNumber_of_weeks_to_stop}
    //                     />
    //                   </td>
    //                   <td>
    //                     <input
    //                       type="password"
    //                       id="password"
    //                       name="password"
    //                       onChange={this.onChangepassword}
    //                     />
    //                     <button onClick={this.onChangepassword}>Submit</button>
    //                   </td>
    //                 </tr>
    //               </tbody>
    //             </Table>
    //           </Tab>
    //           <Tab eventKey="3" title="Game Monitoring">
    //             <section className="content-wrapper">
    //               <div className="login">
    //                 <div className="newgame">
    //                   <h3>Game Monitoring</h3>
    //                 </div>
    //               </div>
    //             </section>
    //             <Table striped bordered hover variant="dark">
    //               <thead>
    //                 <tr>
    //                   <th>Game Number</th>
    //                   <th>
    //                     Game settings<br></br> Delay, Holding cost, Backorder cost
    //                   </th>
    //                   <th>Total Cost</th>
    //                   <th>Manufacturer Cost</th>
    //                   <th>Distributor Cost</th>
    //                   <th>Wholesaler Cost</th>
    //                   <th>Retailer Cost</th>
    //                   <th>Graphical plots</th>
    //                   <th>Stop/Continue the game</th>
    //                 </tr>
    //               </thead>
    //               <tbody>
    //                 <tr>
    //                   <td>{this.state.Game_nbre}</td>
    //                   <td>
    //                     {this.state.time_delay}
    //                     <h> weeks, </h>
    //                     {this.state.Holding_cost}
    //                     <h>, </h>
    //                     {this.state.Backorder_cost}
    //                   </td>
    //                   <td>
    //                     {this.state.current_cost}
    //                     <h>, W.C. :</h>
    //                     {this.state.Number_of_weeks_completed}
    //                   </td>
    //                   <td>
    //                     {this.state.Manufacturer_cost}
    //                     <h>, W.C. :</h>
    //                     {this.state.Number_of_weeks_completed}
    //                   </td>
    //                   <td>
    //                     {this.state.Distributor_cost}
    //                     <h>, W.C. :</h>
    //                     {this.state.Number_of_weeks_completed}
    //                   </td>
    //                   <td>
    //                     {this.state.Wholesaler_cost}
    //                     <h>, W.C. :</h>
    //                     {this.state.Number_of_weeks_completed}
    //                   </td>
    //                   <td>
    //                     {this.state.Retailer_cost}
    //                     <h>, W.C. :</h>
    //                     {this.state.Number_of_weeks_completed}
    //                   </td>
    //                   <td>
    //                     <button>plot</button>
    //                   </td>
    //                   <td>
    //                     <button onClick={this.stop_continue}>Stop/Continue</button>
    //                   </td>
    //                 </tr>
    //               </tbody>
    //             </Table>
    //           </Tab>
    //         </Tabs>
    //       </div>
    //     );
    //   }
    // }
    