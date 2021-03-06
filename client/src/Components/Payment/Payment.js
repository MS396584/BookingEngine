import React, { Component } from "react";
import "./payment.css";
// import GpayIcon from "../Payment/GpayIcon.jpeg";
import ErrorIcon from "@material-ui/icons/Error";
import Image_Upi from "../Payment/FinalUPI.png";
import { ImCreditCard } from "react-icons/im";
import { IconContext } from "react-icons";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import modalBell from "../../asset/modalBell.gif";
import { FcGoogle } from "react-icons/fc";
import Modal from "@material-ui/core/Modal";
import * as db from "../../api/index";
import { get, functions, bind, isEmpty, trim } from "lodash";
import { hotelDetails } from "../../actions/index";
import { bindActionCreators } from "redux";
import { ObjectID } from "bson";
import netBanking from "./netbanking.jpg";
import { withRouter, Link } from "react-router-dom";
import paytm from "./image_upi.png";
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
      errorNumber: "",
      errorName: "",
      errorCvv: "",
      errorMonth: "",
      errorYear: "",
      UPItext: "",
      errorNowUPI: "",
      open: false,
      openNetBank: false,
      errorPost: false,
      isActiveNetBanking: false,
      errorCvv2: "",
      errorNumber2: "",
      openUPI: false,
      // netBankText:"",
      netPassword: "",
      netUserId: "",
      errorPassword: "",
      // errorNetBankText:"",
      errorUserId: "",
      value: "State Bank of India",
    };
  }
  componentDidMount() {
    if (this.props.customerDetails.length === 0) {
      this.props.history.push("/");
    }
  }
  onBankChange = (e) => {
    this.setState({ value: e.target.value });
  };
  handleCredit = () => {
    console.log("inside handle credit ");
    console.log(" isActiveCredit", this.state.isActiveCredit);
    console.log(" isActiveGPay", this.state.isActiveGPay);

    this.setState({
      isActiveCredit: true,
      isActiveGPay: false,
      isActiveNetBanking: false,
    });
  };
  handleGPay = () => {
    this.setState({
      isActiveCredit: false,
      isActiveGPay: true,
      isActiveNetBanking: false,
    });
  };
  handleNetBanking = () => {
    this.setState({
      isActiveCredit: false,
      isActiveGPay: false,
      isActiveNetBanking: true,
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
        errorNumber: "Required",
        errorName: "Required",
        errorCvv: "Required",
        errorMonth: "Required",
        errorYear: "Required",
      });
    }
    if (this.state.cardNumber.length !== 16) {
      this.setState({
        errorNumber2: "enter valid card number",
      });
    }
    if (this.state.cardCvv.length !== 3) {
      this.setState({
        errorCvv: "valid",
      });
    }

    if (
      this.state.cardCvv !== "" &&
      this.state.cardMonth !== "" &&
      this.state.cardNumber !== "" &&
      this.state.cardYear !== "" &&
      this.state.cardName !== "" &&
      this.state.cardCvv.length === 3 &&
      this.state.cardNumber.length === 16
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
    if (this.state.UPItext !== "") {
      this.setState({
        openUPI: true,
      });
      this.handlePostApi();
    }
  };
  handlePaymentNetBanking = () => {
    // if ((this.state.netUserId && this.state.netPassword) === "") {
    //   this.setState({
    //     // errorNetBankText:"Required",
    //     errorUserId: "required",
    //     errorPassword: "required",
    //   });
    // }

    this.setState({
      openNetBank: true,
    });
    this.handlePostApi();
  };
  //   handleNetBankChange=(e)=>{
  // this.setState({
  //   netBankText:e.target.value,
  //   errorNetBankText:""
  // })
  //   }
  // handleNetBankUserId = (e) => {
  //   this.setState({
  //     netUserId: e.target.value,
  //     errorUserId: "",
  //   });
  // };
  // handleNetBankPassword = (e) => {
  //   this.setState({
  //     netPassword: e.target.value,
  //     errorPassword: "",
  //   });
  // };
  handleInputChange1 = (event) => {
    this.setState({
      cardNumber: event.target.value,
      errorNumber: "",
    });
  };
  handleInputChange2 = (event) => {
    this.setState({
      cardName: event.target.value,
      errorName: "",
    });
  };
  handleInputChange3 = (event) => {
    this.setState({
      cardMonth: event.target.value,
      errorMonth: "",
    });
  };
  handleInputChange4 = (event) => {
    this.setState({
      cardYear: event.target.value,
      errorYear: "",
    });
  };
  handleInputChange5 = (event) => {
    this.setState({
      cardCvv: event.target.value,
      errorCvv: "",
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
    // handleCancel = () => {
    //   this.props.history.goBack();
    // };
  };
  handleBackPayment = () => {
    this.props.hotelDetails([]);
    console.log("doubt ey");
  };
  handleClose = () => {
    this.props.history.push("/");
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
                  <div className="imageAnddP">
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

                    <p className="forGreyColorVisa">
                      Visa, MasterCard,Rupay and more
                    </p>
                  </div>
                </button>
              </div>
              <div className="payButtonTwo">
                <button onClick={this.handleGPay}>
                  <div className="BindTogether">
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
                      <p className="forGreyColor">
                        Pay direct from Bank Account
                      </p>
                    </div>
                  </div>

                  {/* <img src={GpayIcon}></img>G-Pay */}
                </button>
              </div>
              {/* <div> Net Banking</div> */}
              <div className="netBankingContainer">
                <div className="payButtonthree">
                  <button onClick={this.handleNetBanking}>
                    <div className="Netbankingandimage">
                      <img src={netBanking}></img>
                      <p
                        style={{
                          fontWeight: "bold",
                          fontSize: "18px",
                          color: "darkblue",
                          marginLeft: "-20%",
                        }}
                      >
                        Net Banking
                      </p>
                      <p className="forGreyColorNet">
                        All Major banks Available
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div className="parentPaymentFirst">
              {this.state.isActiveCredit && (
                <div className="creditCardContainer">
                  <div className="childContainer">
                    <div className="cardNumber">
                      <label>Card Number</label>

                      <input
                        placeholder="**** **** **** ****"
                        type="number"
                        name="number"
                        value={this.state.cardNumber}
                        className={`${
                          this.state.errorNumber !== "" ? "firstError" : ""
                        }`}
                        onChange={this.handleInputChange1}
                      ></input>

                      {/* {this.state.errorNumber2} */}
                    </div>
                    <div className="cardName">
                      <label> Name on Card</label>

                      <input
                        type="text"
                        value={this.state.cardName}
                        className={`${
                          this.state.errorName !== "" ? "firstError" : ""
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
                            this.state.errorMonth !== "" ? "firstError" : ""
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
                            this.state.errorYear !== "" ? "firstError" : ""
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
                          type="number"
                          min="000"
                          max="999"
                          className={`${
                            this.state.errorCvv !== "" ? "firstError" : ""
                          }`}
                          onChange={this.handleInputChange5}
                          placeholder="XXX"
                        ></input>
                      </div>
                    </div>
                  </div>

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
                          <h1 className="head-confirm">Booking Confirmed !!</h1>
                          <h2 className="main-head">
                            Hello {this.props.customerDetails.guestName}
                          </h2>

                          <div className="HotelModal">
                            <label>Hotel </label>
                            <p>{this.props.customerDetails.hotelNow}</p>
                            <label> Booking ID</label>
                            <p>
                              {this.props.customerDetails.bookingId
                                .toString()
                                .substring(0, 11)}
                            </p>
                            <label>Amount </label>
                            <p>
                              {" "}
                              Rs.
                              {this.props.finalTotalPrice +
                                this.props.finalTotalPrice * 0.03}
                            </p>
                            {/* <label>Payment Mode</label>
                            <p>Net Banking </p> */}
                          </div>
                        </div>

                        <div className="bookNow">
                          <Link as={NavLink} to="/">
                            <button onClick={this.handleBackPayment}>
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
                  <div className="PaymentButton">
                    <div className="lastDivPayment">
                      <div className="forPay">
                        <p>
                          Pay :
                          {this.props.finalTotalPrice +
                            this.props.finalTotalPrice * 0.03}
                        </p>
                      </div>
                      <div className="cancelButtonDiv">
                        <button
                          className="cancelButton"
                          onClick={this.props.history.goBack}
                        >
                          Cancel
                        </button>
                      </div>
                      <div className="makePaymentDiv">
                        <button
                          id="paymentbuttonLast"
                          className="ui payment button"
                          onClick={this.handlePaymentCredit}
                        >
                          Make Payment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {this.state.isActiveGPay && (
                <div className="UPIParentContainer">
                  <div className="UPIContents">
                    <h2>Enter UPI ID</h2>
                    <div className="upiInput">
                      <input
                        type="text"
                        placeholder="MobileNumber@UPI"
                        className={`${
                          this.state.errorNowUPI !== "" ? "firstError" : ""
                        }`}
                        onChange={this.handleInputChange}
                      ></input>
                    </div>
                    <div className="UPIImage">
                      <img src={paytm}></img>
                    </div>
                    <div className="PaymentButton">
                      <div className="lastDivPayment">
                        <div className="forPay">
                          <p>
                            Pay :
                            {this.props.finalTotalPrice +
                              this.props.finalTotalPrice * 0.03}
                          </p>
                        </div>
                        <div className="cancelButtonDiv">
                          <button
                            className="cancelButton"
                            onClick={this.props.history.goBack}
                          >
                            Cancel
                          </button>
                        </div>
                        <div className="makePaymentDiv">
                          <button
                            id="paymentbuttonLast"
                            className="ui payment button"
                            onClick={this.handlePaymentUPI}
                          >
                            Make Payment
                          </button>
                        </div>
                      </div>
                    </div>
                    {this.state.openUPI && (
                      <Modal
                        open={this.state.openUPI}
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
                              <label> Booking ID</label>
                              <p>
                                {this.props.customerDetails.bookingId
                                  .toString()
                                  .substring(0, 11)}
                              </p>
                              <label>Amount </label>
                              <p>
                                {" "}
                                Rs.
                                {this.props.finalTotalPrice +
                                  this.props.finalTotalPrice * 0.03}
                              </p>
                              {/* <label>Payment Mode</label>
                            <p>Net Banking </p> */}
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
              {this.state.isActiveNetBanking && (
                <div>
                  <div className="Netbankingcontents">
                    <div>
                      <h2>Net Banking</h2>
                      {/* <div class="ui input">
                        <input type="text" placeholder="Search" value={this.state.netBankText} onChange={this.handleNetBankChange} className={`${
                          this.state.errorNetBankText  !== "" ? "firstError" : ""
                        }`}></input>
                        <div></div>
                      </div> */}
                    </div>
                    <form class="ui form">
                      <div class="field">
                        <div class="ui radio checkbox">
                          <input
                            type="radio"
                            name="bank"
                            value="State Bank of India"
                            id="State Bank of India"
                            checked={this.state.value === "State Bank of India"}
                            onChange={this.onBankChange}
                          ></input>
                          <label for="State Bank of India">
                            State Bank of India
                          </label>

                          {/* // checked={value === "State Bank of India"}
                            // onChange={handleChange}></input> */}
                        </div>
                        <div class="field">
                          <div class="ui radio checkbox">
                            <input
                              type="radio"
                              name="bank"
                              value="HDFC Bank"
                              id="HDFC Bank"
                              onChange={this.onBankChange}
                              checked={this.state.value === "HDFC Bank"}
                            ></input>
                            <label for="HDFC Bank">HDFC Bank</label>
                          </div>
                        </div>
                      </div>
                      <div class="field">
                        <div class="ui radio checkbox">
                          <input
                            type="radio"
                            name="bank"
                            value="Axis Bank"
                            id="AXIS"
                            onChange={this.onBankChange}
                            checked={this.state.value === "Axis Bank"}
                          ></input>
                          <label for="AXIS">Axis Bank</label>
                        </div>
                        <div class="field">
                          <div class="ui radio checkbox">
                            <input
                              type="radio"
                              name="bank"
                              value="Punjab National Bank"
                              id="PNB"
                              onChange={this.onBankChange}
                              checked={
                                this.state.value === "Punjab National Bank"
                              }
                            ></input>
                            <label for="PNB">Punjab National Bank</label>

                            {/* // checked={value === "Punjab National Bank"}
                              // onChange={handleChange}></input> */}
                          </div>
                        </div>
                      </div>
                      {/* <div className="userdetails">
                        <div className="Usercontents">
                          <div className="userNow">
                            <p>USER ID</p>
                            <input
                              type="text"
                              className={`${
                                this.state.errorUserId !== ""
                                  ? "firstError"
                                  : ""
                              }`}
                              value={this.state.netUserId}
                              onChange={this.handleNetBankUserId}
                            ></input>
                          </div>
                        </div>
                        <div className="userNow">
                          <p>PASSWORD</p>
                          <input
                            type="text"
                            className={`${
                              this.state.errorPassword !== ""
                                ? "firstError"
                                : ""
                            }`}
                            value={this.state.netPassword}
                            onChange={this.handleNetBankPassword}
                          ></input>
                        </div>
                      </div> */}
                      <div className="dropBank">
                        <p className="otherBank"> Others </p>
                        <select
                          name="bank"
                          id="selectedBank"
                          value={this.state.bankDrop}
                          onChange={this.onBankChange}
                        >
                          <option selected>Others</option>
                          <option value="Central Bank of India">
                            Central Bank of India
                          </option>
                          <option value="ICICI">ICICI</option>
                          <option value="IDBI">IDBI</option>
                          <option value="Yes Bank">Yes Bank</option>
                          <option value="Kotak Mahindra Bank">
                            Kotak Mahindra Bank
                          </option>
                          <option value="Indusland Bank">Indusland Bank</option>
                          <option value="Bank of India">Bank of India</option>
                          <option value="Union Bank">Union Bank</option>
                          <option value="Canara Bank">Canara Bank</option>
                        </select>
                      </div>
                    </form>
                    <div className="PaymentButton">
                      <div className="lastDivPayment">
                        <div className="forPay">
                          <p>
                            Pay :
                            {this.props.finalTotalPrice +
                              this.props.finalTotalPrice * 0.03}
                          </p>
                        </div>
                        <div className="cancelButtonDiv">
                          <button
                            className="cancelButton"
                            onClick={this.props.history.goBack}
                          >
                            Cancel
                          </button>
                        </div>
                        <div className="makePaymentDiv">
                          <button
                            id="paymentbuttonLast"
                            className="ui payment button"
                            onClick={this.handlePaymentNetBanking}
                          >
                            Make Payment
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {this.state.openNetBank && (
                    <Modal
                      open={this.state.openNetBank}
                      onClose={this.handleClose}
                      aria-labelledby="simple-modal-title"
                      aria-describedby="simple-modal-description"
                    >
                      <div className="modal-open">
                        {console.log(this.props)}
                        <div className="contents-modal">
                          <h1 className="head-confirm">Booking Confirmed !!</h1>
                          <h2 className="main-head">
                            Hello {this.props.customerDetails.guestName}
                          </h2>

                          <div className="HotelModal">
                            <label>Hotel </label>
                            <p>{this.props.customerDetails.hotelNow}</p>
                            <label> Booking ID</label>
                            <p>
                              {this.props.customerDetails.bookingId
                                .toString()
                                .substring(0, 11)}
                            </p>
                            <label>Amount </label>
                            <p>
                              {" "}
                              Rs.
                              {this.props.finalTotalPrice +
                                this.props.finalTotalPrice * 0.03}
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
