import React, { Component } from "react";
import "./payment.css";
import GpayIcon from "../Payment/GpayIcon.jpeg";
import ErrorIcon from "@material-ui/icons/Error";
import Image_Upi from "../Payment/FinalUPI.png";
import { ImCreditCard } from "react-icons/im";
import { IconContext } from "react-icons";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import modalBell from "../../asset/modalBell.gif";
import { FcGoogle } from "react-icons/fc";
import Modal from "@material-ui/core/Modal";
import { withRouter, Link } from "react-router-dom";
import * as db from "../../api/index";
import { get, functions, bind, isEmpty, trim } from "lodash";
import { hotelDetails } from "../../actions/index";
import { bindActionCreators } from "redux";
import { ObjectID } from "bson";

export class Payment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActiveCredit: true,
      isActiveGPay: false,
      cardNumber: "",
      cardName: "",
      cardCvv: "",
      cardMonth: "",
      cardYear: "",
      errorNow: "",
      UPItext: "",
      errorNowUPI: "",
      open: false,
      errorPost: false,
    };
  }
  componentDidMount() {
    if (this.props.customerDetails.length === 0) {
      this.props.history.push("/");
    }
    console.log(this.props.customerDetails, "vanakkam");
  }
  handleCredit = () => {
    console.log("inside handle credit ");
    console.log(" isActiveCredit", this.state.isActiveCredit);
    console.log(" isActiveGPay", this.state.isActiveGPay);

    this.setState({
      isActiveCredit: true,
      isActiveGPay: false,
    });
  };
  handleGPay = () => {
    console.log("inside GPAY");
    console.log(" isActiveCredit", this.state.isActiveCredit);
    console.log(" isActiveGPay", this.state.isActiveGPay);
    this.setState({
      isActiveCredit: false,
      isActiveGPay: true,
    });
  };
  handlePaymentCredit = () => {
    if (
      (this.state.cardCvv &&
        this.state.cardMonth &&
        this.state.cardNumber &&
        this.state.cardYear &&
        this.state.cardName) == ""
    ) {
      this.setState({
        errorNow: "*Required",
      });
    }
    if (
      (this.state.cardCvv &&
        this.state.cardMonth &&
        this.state.cardNumber &&
        this.state.cardYear &&
        this.state.cardName) !== ""
    ) {
      this.setState({
        open: true,
      });
      this.handlePostApi();
    }
  };
  handlePaymentUPI = () => {
    if (this.state.UPItext == "") {
      this.setState({
        errorNowUPI: "*Required",
      });
    }
  };
  handleInputChange1 = (event) => {
    this.setState({
      cardNumber: event.target.value,
    });
  };
  handleInputChange2 = (event) => {
    this.setState({
      cardName: event.target.value,
    });
  };
  handleInputChange3 = (event) => {
    this.setState({
      cardMonth: event.target.value,
    });
  };
  handleInputChange4 = (event) => {
    this.setState({
      cardYear: event.target.value,
    });
  };
  handleInputChange5 = (event) => {
    this.setState({
      cardCvv: event.target.value,
    });
  };
  handleInputChange = (event) => {
    this.setState({
      UPItext: event.target.value,
    });
  };
  handlePostApi = async () => {
    await db.getPostHotelDetails(this.props.customerDetails);
    // .catch((err) => {
    //   console.log("errorPost");
    //   // return err

    //   this.setState({
    //     errorPost: !this.state.errorPost,
    //     openPost: true,
    //   });
    // });
    // console.log(this.props.customerDetails)
  };
  render() {
    return (
      <div>
        <div className="parentPayment">
          <div className="divideIntoTwo">
            <div className="choiceOfPayment">
              <div className="choiceHeading">
                <h1>Payment Option</h1>
              </div>
              {/* <i class="fas fa-credit-card"></i>
              <i class="far fa-credit-card"></i> */}

              <div className="payButton">
                <button onClick={this.handleCredit}>
                  <div className="imageAndCredit">
                    <IconContext.Provider
                      value={{ color: "orange", size: "2.5em" }}
                    >
                      <ImCreditCard />
                    </IconContext.Provider>
                    <p
                      style={{
                        fontWeight: "bold",
                        fontSize: "18px",
                        color: "darkblue",
                        marginLeft: "5%",
                      }}
                    >
                      Credit/Debit
                    </p>
                  </div>

                  <p>Visa, MasterCard,Rupay and more</p>
                </button>
              </div>
              <div className="payButtonTwo">
                <button onClick={this.handleGPay}>
                  <img src={Image_Upi}></img>
                  <div className="imageAndUpi">
                    <p
                      style={{
                        fontWeight: "bold",
                        fontSize: "18px",
                        color: "darkblue",
                        marginLeft: "3%",
                      }}
                    >
                      UPI
                    </p>
                    <p>Pay direct from Bank Account</p>
                  </div>
                  {/* <img src={GpayIcon}></img>G-Pay */}
                </button>
              </div>
              {/* <div> Net Banking</div> */}
            </div>
            <div className="parentPaymentFirst">
              {this.state.isActiveGPay ? (
                <div className="UPIContents">
                  <h2>Enter UPI ID</h2>
                  <div className="ui input">
                    <input
                      type="text"
                      placeholder="MobileNumber@UPI"
                      value={this.state.UPItext}
                      className={`${
                        this.state.errorNowUPI !== "" ? "firstError" : ""
                      }`}
                      onChange={this.handleInputChange}
                    ></input>
                    {/* <div className="UPIImage">
                   <img src={ImageOne} style={{ width: "20%" }}></img>
                   </div> */}
                  </div>
                  <div className="UPIImage">
                    <img
                      // src={ImageOne}
                      style={{ width: "20%" }}
                    ></img>
                  </div>
                  <div className="PaymentButton">
                    <button
                      className="ui payment button"
                      onClick={this.handlePaymentUPI}
                    >
                      {" "}
                      Make Payment
                    </button>
                  </div>
                </div>
              ) : (
                <div className="creditCardContainer">
                  <div className="childContainer">
                    <div className="cardNumber">
                      <label>Card Number</label>

                      <input
                        placeholder="**** **** **** ****"
                        maxLength="16"
                        minLength="16"
                        min="0"
                        type="number"
                        name="number"
                        value={this.state.cardNumber}
                        className={`${
                          this.state.errorNow !== "" ? "firstError" : ""
                        }`}
                        onChange={this.handleInputChange1}
                      ></input>

                      {/* {this.state.errorNow} */}
                    </div>
                    <div className="cardName">
                      <label> Name on Card</label>

                      <input
                        type="text"
                        value={this.state.cardName}
                        className={`${
                          this.state.errorNow !== "" ? "firstError" : ""
                        }`}
                        onChange={this.handleInputChange2}
                      ></input>
                    </div>
                    <div className="forDivision">
                      <div className="monthContainer">
                        <label for="month">Expiry Month & Year</label>

                        <select
                          name="month"
                          id="selectedMonth"
                          value={this.state.cardMonth}
                          className={`${
                            this.state.errorNow !== "" ? "firstError" : ""
                          }`}
                          onChange={this.handleInputChange3}
                        >
                          <option selected>Month</option>
                          <option value="Jan">Jan</option>
                          <option value="Feb">Feb</option>
                          <option value="Mar">Mar</option>
                          <option value="Apr">Apr</option>
                          <option value="May">May</option>
                          <option value="Jun">Jun</option>
                          <option value="Jul">Jul</option>
                          <option value="Aug">Aug</option>
                          <option value="Sep">Sep</option>
                          <option value="Oct">Oct</option>
                          <option value="Nov">Nov</option>
                          <option value="Dec">Dec</option>
                        </select>

                        <select
                          name="year"
                          id="selectedyear"
                          value={this.state.cardYear}
                          className={`${
                            this.state.errorNow !== "" ? "firstError" : ""
                          }`}
                          onChange={this.handleInputChange4}
                        >
                          <option selected>Year</option>
                          <option value="2021">2021</option>
                          <option value="2022">2022</option>
                          <option value="2023">2023</option>
                          <option value="2024">2024</option>
                          <option value="2025">2025</option>
                          <option value="2026">2026</option>
                          <option value="2027">2027</option>
                          <option value="2028">2028</option>
                          <option value="2029">2029</option>
                        </select>
                      </div>
                      <div className="cvvContainer">
                        <label>Card CVV</label>

                        <input
                          maxLength="3"
                          value={this.state.cardCvv}
                          className={`${
                            this.state.errorNow !== "" ? "firstError" : ""
                          }`}
                          onChange={this.handleInputChange5}
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="PaymentButton">
                    <button
                      className="ui payment button"
                      onClick={this.handlePaymentCredit}
                    >
                      {" "}
                      Make Payment
                    </button>
                    {this.state.open && !this.state.errorPost && (
                      <Modal
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                      >
                        <div className="modal-open">
                          {console.log(this.props)}
                          <div className="contents-modal">
                            <h1 className="head-confirm">
                              Booking Confirmed !!
                            </h1>
                            <h2 className="main-head">
                              Hello {this.props.customerDetails.guestName}
                            </h2>

                            <div className="HotelModal">
                              <label>Hotel </label>
                              <p>{this.props.customerDetails.hotelNow}</p>
                              <label> Check-in </label>
                              <p>{this.props.customerDetails.checkIn}</p>
                              <label>Check-out </label>
                              <p>{this.props.customerDetails.checkOut}</p>
                              <label> Booking ID</label>
                              <p>
                                123452653
                                {/* {this.props.customerDetails.bookingId} */}
                              </p>
                            </div>
                          </div>

                          <div className="bookNow">
                            <Link as={NavLink} to="/">
                              <button onClick={this.handlePost}>
                                Back to Home
                              </button>
                            </Link>
                            <p className="i-p">
                              {" "}
                              <i>For any queries,contact us on 0462-222442</i>
                            </p>
                          </div>
                          {/* onClick={this.handleClose */}
                          {/* <img src={modalBell} className="modal-gif"></img> */}
                        </div>
                      </Modal>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    hotelDetails: bindActionCreators(hotelDetails, dispatch),
  };
};
const mapStateToProps = (state) => ({
  dateRange: state.dateRange,
  roomRange: get(state, "roomRange", []),
  roomDetailsList: get(state, "roomDetailsList", []),
  roomTypeRatesData: get(state, "roomTypeRatesData", []),
  propertyList: get(state, "propertyList", []),
  customerDetails: get(state, "customerDetails", []),
  booking: get(state, "bookedRoomDetails.bookingData", []),
  finalTotalPrice: get(state, "totalPriceInState.Amount", []),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Payment));
