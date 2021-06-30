import React, { Component } from "react";
import Imagecard from "./addImage3.png";
import "./AddRooms.css";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import axios from "axios";
import AddNewRoom2 from "./AddNewRoom2";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
const initialState = {
  availability: 0,
  roomDesc: "",
  numberOfRooms: 0,
  roomImage: Imagecard,
  roomType: "",
  food: "",
  availabilityErr: "",
  roomDescErr: "",
  roomTypeErr: "",
  numberOfRoomsErr: "",
  url11: "",
  url12: "",
  url13: "",
  url14: "",
  url11Err: "",
  url12Err: "",
  addNew: false,
  price1: 0,
  price2: 0,
  price1Err: "",
  price2Err: "",
};
export class AddRooms extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }
  handlenumberOfRooms = (e) => {
    this.setState({
      numberOfRooms: e.target.value,
      numberOfRoomsErr: "",
    });
  };
  handleRoomType = (e) => {
    this.setState({
      roomType: e.target.value,
      roomTypeErr: "",
    });
    console.log("Value of roomType = ", this.state.roomType);
    console.log("this.props.propertyList", this.props.propertyList);
    console.log(
      "this.props.propertyList length = ",
      this.props.propertyList.length + 1
    );
  };
  handleRoomPrice = (e) => {
    this.setState({
      price2: e.target.value,
      price2Err: "",
    });
  };
  handleRoomPriceFood = (e) => {
    console.log("this.props.rooomDetailsList = ", this.props.roomDetailsList);
    this.setState({
      price1: e.target.value,
      price1Err: "",
    });
  };
  handleAvailable = (e) => {
    this.setState({
      availability: e.target.value,
      availabilityErr: "",
    });
  };
  handleRoomDesc = (e) => {
    this.setState({
      roomDesc: e.target.value,
      roomDescErr: "",
    });
  };

  isValidForm = () => {
    let availabilityErr = "";
    let roomDescErr = "";
    let roomTypeErr = "";
    let numberOfRoomsErr = "";

    let url11Err = "";
    let url12Err = "";

    if (!this.state.url11) {
      url11Err = "Enter price with food";
      console.log("url11Err = ", url11Err);
    }
    if (url11Err) {
      this.setState({ url11Err });
    }
    if (!this.state.url12) {
      url12Err = "Enter price with food";
      console.log("url11Err = ", url12Err);
    }
    if (url12Err) {
      this.setState({ url12Err });
    }

    if (!this.state.availability) {
      availabilityErr = "Enter Total Rooms";
      console.log("availability = ", availabilityErr);
    }
    if (availabilityErr) {
      this.setState({ availabilityErr });
    }
    if (this.state.roomDesc == "") {
      roomDescErr = "Enter Address";
      console.log("roomDescErr = ", roomDescErr);
    }
    if (roomDescErr) {
      this.setState({ roomDescErr });
      // return false;
    }
    if (this.state.roomType == "") {
      roomTypeErr = "Enter Address";
      console.log("roomDescErr = ", roomTypeErr);
    }
    if (roomTypeErr) {
      this.setState({ roomTypeErr });
      // return false;
    }
    if (!this.state.numberOfRooms) {
      numberOfRoomsErr = "Enter Total Rooms";
      console.log("numberOfRoomsErr = ", numberOfRoomsErr);
    }
    if (numberOfRoomsErr) {
      this.setState({ numberOfRoomsErr });
      return false;
    }
    // if (!this.state.roomType) {
    //   roomTypeErr = "Enter Location";
    //   console.log("roomTypeErr = ", roomTypeErr);
    // }
    // if (roomTypeErr) {
    //   this.setState({ roomTypeErr });
    //   return false;
    // }
    return true;
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.isValidForm();
    if (isValid) {
      const roomData = {
        PropertyId: this.props.propertyList.length,
        roomType: this.state.roomType,
        roomImage: this.state.url11,
        description: this.state.roomDesc,
        numberofRooms: this.state.numberOfRooms,
        availability: this.state.availability,
        _v: 0,
      };

      console.log("this.state = ", roomData);

      axios
        .post("http://localhost:5000/rooms/addRoomType", roomData)
        .then((res) => {
          console.log("Response from room = ", res);
        })
        .catch((error) => {
          console.log("Response from room = ", error);
        });
    }
  };
  isValidPrice = () => {
    let price1Err = "";
    let price2Err = "";

    if (!this.state.price1) {
      price1Err = "Enter price with food";
      console.log("price1 = ", price1Err);
    }
    if (price1Err) {
      this.setState({ price1Err });
    }
    if (!this.state.price2) {
      price2Err = "Enter price without food";
      console.log("price2Err = ", price2Err);
    }
    if (price2Err) {
      this.setState({ price2Err });
      return false;
    }
    return true;
  };
  handleAddPrice = (event) => {
    event.preventDefault();
    const isValidPrice = this.isValidPrice();
    if (isValidPrice) {
      const priceData = {
        roomTypeId: "60db57735ec7be06b0886db6",
        roomType: this.state.roomType,
        fromDate: "2021-06-30T05:49:20.710Z",
        toDate: "2022-06-30T05:49:20.710Z",
        perDayRate: [this.state.price1, this.state.price2],
        plan: ["AP", "EP"],
      };
      console.log("priceData = ", priceData);
      axios
        .post("http://localhost:5000/rate/rate", priceData)
        .then((res) => {
          console.log("Response from price = ", res);
        })
        .catch((error) => {
          console.log("Response from price = ", error);
        });
    }
  };
  handleRoomChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleRoomImage = (e) => {
    this.setState({
      roomImage: URL.createObjectURL(e.target.files[0]),
    });
    console.log("imge func room = ", e.target.files);
  };
  handleUrl11 = (e) => {
    this.setState({
      url11: e.target.value,
      // hotelNameErr: "",
    });
    console.log("url1 - ", this.state.url11);
  };
  handleUrl12 = (e) => {
    this.setState({
      url12: e.target.value,
    });
  };
  // handleUrl13 = (e) => {
  //   this.setState({
  //     url13: e.target.value,
  //   });
  // };
  // handleUrl14 = (e) => {
  //   this.setState({
  //     url14: e.target.value,
  //   });
  // };
  handleAddNewRoom = (e) => {
    this.setState({
      addNew: !this.state.addNew,
    });
    console.log("addnew = ", this.state.addNew);
  };
  render() {
    const minValue = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    );
    return (
      <div>
        <div className="sectionTwo">
          <div className="firstHeading">
            <h1>Room Details</h1>
          </div>
          <div className="roomTypeContainer">
            <div>
              <form>
                <div className="roomDivide">
                  <div className="roomImage">
                    <div className="setroomImage">
                      <div className="insideAddImagesRoom">
                        <div className="imageHeightRoom">
                          {/* <input placeholder="dummy"></input> */}
                          <input
                            type="url"
                            name="url11"
                            placeholder="Add Image URL"
                            value={this.state.url11}
                            onChange={this.handleUrl11}
                            className={`${
                              this.state.url11Err !== "" ? "inputError" : ""
                            }`}
                          ></input>
                          <div className="imageDivRoom">
                            <img
                              src={this.state.url11}
                              // alt="Add Image Url"
                            ></img>
                          </div>
                        </div>
                        <div className="imageHeightRoom">
                          {/* Image URL */}
                          <input
                            type="url"
                            name="url12"
                            value={this.state.url12}
                            placeholder="Add Image URL"
                            onChange={this.handleUrl12}
                            className={`${
                              this.state.url12Err !== "" ? "inputError" : ""
                            }`}
                          ></input>
                          <div className="imageDivRoom">
                            <img src={this.state.url12}></img>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="roomDataOne">
                    <div className="roomData">
                      {/* <label htmlFor="option">
                      </label>
                      <select
                        id="option"
                        value={this.state.roomType}
                        onChange={this.handleRoomType}
                      >
                        <option value="AC">AC</option>
                        <option value="Non-AC">Non-AC</option>
                        <option value="Delux">Delux</option>
                        <option value="Junior Suit">Junior Suit</option>
                      </select> */}
                      <input
                        name="roomType"
                        type="text"
                        onChange={this.handleRoomType}
                        placeholder="Room Type"
                        className={`${
                          this.state.roomTypeErr !== "" ? "inputError" : ""
                        }`}
                      ></input>

                      <input
                        name="numberOfRooms"
                        type="text"
                        onChange={this.handleAvailable}
                        placeholder="RoomAvailable"
                        className={`${
                          this.state.availabilityErr !== "" ? "inputError" : ""
                        }`}
                      ></input>
                      <input
                        name="numberOfRooms"
                        type="text"
                        onChange={this.handlenumberOfRooms}
                        placeholder="numberOfRooms"
                        className={`${
                          this.state.numberOfRoomsErr !== "" ? "inputError" : ""
                        }`}
                      ></input>
                      <textarea
                        id="adjustHeight"
                        name="roomDesc"
                        type="text"
                        onChange={this.handleRoomDesc}
                        placeholder="RoomDesc"
                        className={`${
                          this.state.roomDescErr !== "" ? "inputError" : ""
                        }`}
                      ></textarea>
                    </div>
                    <div className="submit">
                      <button onClick={this.handleSubmit}> Next</button>
                    </div>
                    <div className="foodPriceData">
                      <DateRangePickerComponent
                        placeholder="Check-in/Check-out"
                        startDate={this.props.dateRange.start}
                        endDate={this.props.dateRange.end}
                        min={minValue}
                        format={"dd-MMM-yy"}
                        color={"black"}
                        className="datepicker-input"
                        onChange={this.handleDateChange}
                      ></DateRangePickerComponent>
                      <input
                        id="priceOne"
                        name="price1"
                        type="text"
                        onChange={this.handleRoomPriceFood}
                        placeholder=" Price with Food "
                        className={`${
                          this.state.price1Err !== "" ? "inputError" : ""
                        }`}
                        required
                      ></input>
                      <input
                        id="priceTwo"
                        name="price2"
                        type="text"
                        onChange={this.handleRoomPrice}
                        placeholder=" Price without Food "
                        className={`${
                          this.state.price2Err !== "" ? "inputError" : ""
                        }`}
                        required
                      ></input>
                    </div>
                    <div className="dateData">
                      {/* <input
                        name="price1"
                        type="text"
                        onChange={this.handleRoomPriceFood}
                        placeholder=" fromdate "
                        className={`${
                          this.state.price1Err !== "" ? "inputError" : ""
                        }`}
                        required
                      ></input>
                      <input
                        name="price2"
                        type="text"
                        onChange={this.handleRoomPrice}
                        placeholder=" todate"
                        className={`${
                          this.state.price2Err !== "" ? "inputError" : ""
                        }`}
                        required
                      ></input> */}
                    </div>
                    <div className="addPriceDiv">
                      <button onClick={this.handleAddPrice}>Add Price</button>
                    </div>
                    <div className="AddNewRoom">
                      {/* <button onClick={<AddRooms />}>Add New</button> */}
                      <label>
                        Do you wish to add another room type?
                        <input
                          type="checkbox"
                          checked={this.state.addNew}
                          onChange={this.handleAddNewRoom}
                        ></input>
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {this.state.addNew ? <AddNewRoom2 /> : null}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    propertyList: state.propertyList,
    dateRange: state.dateRange,
    roomVal: state.roomVal,
    adultVal: state.adultVal,
    childVal: state.childVal,
    propertyEmptyList: state.propertyEmptyList,
    // roomDetailsList:state
    roomDetailsList: state.roomDetailsList,
  };
};

export default connect(mapStateToProps, null)(withRouter(AddRooms));

// export default ;
