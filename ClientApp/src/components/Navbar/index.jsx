import React, { useState, useEffect, useRef } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { UserAuth } from "apis/auth/AuthContext";
import { v4 } from "uuid";
import moment from "moment";
import OrderApi from "apis/services/Order";
import OrderDetailApi from "apis/services/OrderDetail";

import { DeleteForever } from "@mui/icons-material";
import { Backdrop, Checkbox } from "@mui/material";
import { Button, Img, Input, Line, Text } from "components";

const Navbar = (props) => {
  const [userLoggedIn, setUserLoggedIn] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [open, setOpen] = useState(false);
  const [number, setNumber] = useState({
    set1: 1,
    set2: 0,
    set4: 0,
    set6: 0
  });
  const [cart, setCart] = useState(null);
  const [orderDetail, setOrderDetail] = useState(null);
  const [userIcon, setUserIcon] = useState("images/img_user.svg");
  const [cartIcon, setCartIcon] = useState("images/img_cart.svg");
  const [hoverEdit, setHoverEdit] = useState(-1);

  const dropdownRef = useRef();

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { logout } = UserAuth();

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  useEffect(() => {
    var user = localStorage.getItem("token");

    if (!user) {
      setUserLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsOpenCart(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const loadCart = async () => {
      try {
        setCart(JSON.parse(localStorage.getItem("cart")));
      } catch (error) {
        enqueueSnackbar("Load cart failed", { variant: "error" });
      }
    }

    if (isOpenCart) {
      loadCart();
    }

    // eslint-disable-next-line
  }, [isOpenCart])

  const handleUserIconEnter = () => {
    setUserIcon("images/img_user_hover.svg");
  };

  const handleUserIconLeave = () => {
    setUserIcon("images/img_user.svg");
  };

  const handleCartIconEnter = () => {
    setCartIcon("images/img_cart_hover.svg");
  };

  const handleCartIconLeave = () => {
    setCartIcon("images/img_cart.svg");
  }

  const handleSignInBtxClick = () => {
    navigate("/signin");
  };

  const handleSignUpBtxClick = () => {
    navigate("/signup");
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setIsOpenCart(false);
  };

  const toggleDropdownCart = () => {
    setIsOpen(false);
    setIsOpenCart(!isOpenCart);
  }

  const handleIconEditEnter = (id) => {
    setHoverEdit(id);
  }

  const handleIconEditLeave = () => {
    setHoverEdit(-1);
  }

  const handleDelete = async (id) => {
    try {
      let status = await OrderDetailApi.deleteOrderDetail(id);

      if (status === 204) {
        let removedItemCart = { ...cart, orderDetails: cart.orderDetails.filter((order) => order.id !== id) };

        setCart(removedItemCart);
        localStorage.setItem("cart", JSON.stringify(removedItemCart));
      }
    } catch (error) {
      enqueueSnackbar("Delete failed", { variant: "error" });
    }
  }

  const handlePayNowClick = async () => {
    let orderId = v4();

    try {
      let status = await OrderApi.updateOrder(cart.id, {
        id: cart.id,
        orderDate: cart.orderDate,
        shippingInformationId: cart.shippingInformationId,
        status: "Pending"
      })

      status = await OrderApi.createOrder({
        id: orderId,
        orderDate: moment().format("YYYY-MM-DDTHH:mm:ss"),
        shippingInformationId: JSON.parse(localStorage.getItem("userInfo")).shippingInformations[0].id,
        status: "Cart"
      })

      if (status === 201) {
        const cart = await OrderApi.getOrder(orderId);

        localStorage.setItem("cart", JSON.stringify(cart));
      }
    } catch (error) {
      enqueueSnackbar("Cart could not be created", { variant: "error" });
    }

    navigate(`/payment/${cart.id}`);
  }

  const handleOpenEditPopup = (orderDetail) => {
    setOpen(true);
    setIsOpenCart(false);
    setOrderDetail(orderDetail);

    let cakeSet = JSON.parse(orderDetail.cakeSet);

    setNumber({ ...number, set1: cakeSet.set1 === undefined ? 0 : cakeSet.set1, set2: cakeSet.set2 === undefined ? 0 : cakeSet.set2, set4: cakeSet.set4 === undefined ? 0 : cakeSet.set4, set6: cakeSet.set6 === undefined ? 0 : cakeSet.set6 });
  }

  const handleCloseEditPopup = () => {
    setOpen(false);
  }

  const handleInputNumber = (value, set) => {
    if (value < 0) {
      setNumber({ ...number, [set]: 0 });
      return;
    }

    if (value > 10) {
      setNumber({ ...number, [set]: 10 });
      return;
    }

    setNumber({ ...number, [set]: value !== '' ? parseInt(value.toString()) : value });
  }

  const handleInputBlur = (set) => {
    if (number[set] === '') {
      setNumber({ ...number, [set]: 0 });
    }
  }

  const handleCheckBoxClick = (set) => {
    if (number[set] === 0) {
      setNumber({ ...number, [set]: 1 });
    } else {
      setNumber({ ...number, [set]: 0 });
    }
  }

  const handleUpdateCart = async () => {
    try {
      let orderId = cart.id;
      let cake = orderDetail.cake;
      let quantity = 0;
      let cakeSet = null;
      let status = 0;

      Object.keys(number).forEach((key) => {
        if (number[key] !== 0) {
          quantity += number[key] * parseInt(key.slice(3));
          cakeSet = { ...cakeSet, [key]: number[key] };
        }
      })

      if (cart) {
        status = await OrderDetailApi.updateOrderDetail(orderDetail.id, {
          id: orderDetail.id,
          orderId,
          cakeId: cake.id,
          price: cake.price,
          quantity,
          cakeSet: JSON.stringify(cakeSet)
        })

        if (status === 204) {
          enqueueSnackbar("Updated cart", { variant: "success" });

          let cart = await OrderApi.getOrder(orderId);
          localStorage.setItem("cart", JSON.stringify(cart));

          setOpen(false);
          setIsOpenCart(true);
        }
      }
    } catch (error) {
      enqueueSnackbar("Update cart failed", { variant: "info" });
    }
  }

  const editCake = () => {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <div className="h-[45%] bg-orange-50 border border-red-500 flex flex-col items-center justify-center rounded-[5px] p-12 w-[40%]">
          <div className="flex flex-col font-sfmono gap-4 items-center justify-start w-full">
            <div className="flex flex-col gap-3.5 items-center justify-start w-full">
              <Line className="bg-red-500 h-px w-full" />
              <div className="flex flex-row items-center justify-between w-full">
                <div className="flex flex-col items-center justify-start">
                  <div className="flex flex-row gap-[25px] items-center justify-between w-full">
                    <Text className="text-lg text-red-500">Set:</Text>
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex flex-row items-center justify-start w-full">
                        <Checkbox
                          {...label}
                          checked={number["set1"] !== 0}
                          color="success"
                          onChange={() => handleCheckBoxClick("set1")}
                        />
                        <Text className="font-sfmono text-red-500 text-left">Set 1 cake</Text>
                        <Input
                          className={`transition-all duration-300 leading-[normal] text-center text-lg text-red-500 h-full w-full ${number["set1"] === 0 ? "opacity-0" : ""}`}
                          wrapClassName={`transition-all duration-300 bg-orange-50 border border-red-500 border-solid h-[30px] rounded-[3px] pl-2 ml-[22px] w-[68px] ${number["set1"] === 0 ? "opacity-0" : ""}`}
                          value={number["set1"]}
                          type="number"
                          onChange={(value) => handleInputNumber(value, "set1")}
                          onBlur={() => handleInputBlur("set1")}
                        />
                      </div>
                      <div className="flex flex-row items-center justify-start">
                        <Checkbox
                          {...label}
                          checked={number["set2"] !== 0}
                          color="success"
                          onChange={() => handleCheckBoxClick("set2")}
                        />
                        <Text className="font-sfmono text-red-500 text-left">Set 2 cakes</Text>
                        <Input
                          className={`transition-all duration-300 leading-[normal] text-center text-lg text-red-500 h-full w-full ${number["set2"] === 0 ? "opacity-0" : ""}`}
                          wrapClassName={`transition-all duration-300 bg-orange-50 border border-red-500 border-solid h-[30px] rounded-[3px] pl-2 ml-3 w-[68px] ${number["set2"] === 0 ? "opacity-0" : ""}`}
                          value={number["set2"]}
                          type="number"
                          onChange={(value) => handleInputNumber(value, "set2")}
                          onBlur={() => handleInputBlur("set2")}
                        />
                      </div>
                      <div className="flex flex-row items-center justify-start">
                        <Checkbox
                          {...label}
                          checked={number["set4"] !== 0}
                          color="success"
                          onChange={() => handleCheckBoxClick("set4")}
                        />
                        <Text className="font-sfmono text-red-500 text-left">Set 4 cakes</Text>
                        <Input
                          className={`transition-all duration-300 leading-[normal] text-center text-lg text-red-500 h-full w-full ${number["set4"] === 0 ? "opacity-0" : ""}`}
                          wrapClassName={`transition-all duration-300 bg-orange-50 border border-red-500 border-solid h-[30px] rounded-[3px] pl-2 ml-3 w-[68px] ${number["set4"] === 0 ? "opacity-0" : ""}`}
                          value={number["set4"]}
                          type="number"
                          onChange={(value) => handleInputNumber(value, "set4")}
                          onBlur={() => handleInputBlur("set4")}
                        />
                      </div>
                      <div className="flex flex-row items-center justify-start">
                        <Checkbox
                          {...label}
                          checked={number["set6"] !== 0}
                          color="success"
                          onChange={() => handleCheckBoxClick("set6")}
                        />
                        <Text className="font-sfmono text-red-500 text-left">Set 6 cakes</Text>
                        <Input
                          className={`transition-all duration-300 leading-[normal] text-center text-lg text-red-500 h-full w-full ${number["set6"] === 0 ? "opacity-0" : ""}`}
                          wrapClassName={`transition-all duration-300 bg-orange-50 border border-red-500 border-solid h-[30px] rounded-[3px] pl-2 ml-3 w-[68px] ${number["set6"] === 0 ? "opacity-0" : ""}`}
                          value={number["set6"]}
                          type="number"
                          onChange={(value) => handleInputNumber(value, "set6")}
                          onBlur={() => handleInputBlur("set6")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <Text className="text-lg text-red-500 text-right">{number.set1 * 1 + number.set2 * 2 + number.set4 * 4 + number.set6 * 6} x {orderDetail.cake.price.toLocaleString("vi-VN")} VNĐ</Text>
              </div>
              <Line className="bg-red-500 h-px w-full" />
            </div>
            <div className="flex flex-row gap-5 items-center justify-center w-[52%] md:w-full">
              <Button
                className={`bg-orange-50 hover:bg-indigo-900 border border-indigo-900 hover:border-teal-100 border-solid leading-[normal] min-w-[193px] py-3.5 rounded-[5px] text-center text-indigo-900 hover:text-orange-50 text-lg ${number["set1"] === 0 && number["set2"] === 0 && number["set4"] === 0 && number["set6"] === 0 ? "cursor-not-allowed" : ""}`}
                disabled={number["set1"] === 0 && number["set2"] === 0 && number["set4"] === 0 && number["set6"] === 0}
                onClick={() => handleUpdateCart()}
              >
                save
              </Button>
              <Text className="font-sfmono text-red-500 text-left">or</Text>
              <Button
                className="bg-orange-50 hover:bg-red-500 border border-red-500 hover:border-teal-100 border-solid leading-[normal] min-w-[193px] py-3.5 rounded-[5px] text-center text-red-500 hover:text-orange-50 text-lg"
                onClick={() => handleCloseEditPopup()}
              >
                close
              </Button>
            </div>
          </div>
        </div>
      </Backdrop>
    );
  }

  const cakes = () => {
    const element = [];

    if (cart.orderDetails.length === 0) {
      element.push(
        <Text key="cart" className="font-sfmono text-center text-lg text-red-500 w-full">• Nothing in cart yet •</Text>
      );
    } else {
      cart.orderDetails.forEach((orderDetail, index) => {
        element.push(
          <div key={orderDetail.id} className="h-[125px] flex flex-row gap-5 items-start justify-start w-full">
            <Img className="h-[125px] border border-1 border-red-500 px-1 py-3 w-[122px]" style={{ objectFit: 'cover', width: '80%', height: '100%' }} src={orderDetail.cake.image} alt="cake" />
            <div className="flex flex-col gap-max-5 items-start justify-between w-full h-full">
              <div className="flex flex-col items-start">
                <Text className="font-bold text-deep_orange-500 text-lg">{orderDetail.cake.name}</Text>
                <Text className="font-bold text-deep_orange-500 text-lg">Cupcake</Text>
                <Text className="text-deep_orange-500 text-sm">{orderDetail.price.toLocaleString("vi-VN")} VNĐ</Text>
              </div>
              <div className="flex flex-row gap-3 items-end">
                <div className="flex items-center bg-orange-50 border border-red-500 border-solid h-[30px] rounded-[3px] w-12">
                  <Text className="text-deep_orange-500 text-center text-lg w-full">{orderDetail.quantity}</Text>
                </div>
                <Img
                  className="cursor-pointer"
                  src={hoverEdit === index ? "images/icon_edit_hover.svg" : "images/icon_edit.svg"}
                  alt="edit"
                  onClick={() => handleOpenEditPopup(orderDetail)}
                  onMouseEnter={() => handleIconEditEnter(index)}
                  onMouseLeave={() => handleIconEditLeave()}
                />
                <DeleteForever
                  className="cursor-pointer"
                  sx={{ color: "#ee4e34" }}
                  onClick={() => handleDelete(orderDetail.id)}
                />
              </div>
            </div>
          </div>
        );
      })
    }

    return element;
  }

  const handleLogout = async () => {
    try {
      await logout();
      setUserLoggedIn(false);

      navigate("/");
    } catch (error) {
      enqueueSnackbar("Logout failed", { variant: "error" });
    }
  };

  return (
    <div style={{ position: "fixed", zIndex: 100 }} className={props.className}>
      <div className="flex sm:flex-col flex-row md:gap-10 items-center justify-between mb-0.5 ml-[43px] w-[94%]">
        <Link to="/">
          <Img
            className="h-[62px]"
            src="images/img_logosmall.png"
            alt="logosmall"
          />
        </Link>
        <div className="flex sm:flex-col flex-row gap-5 items-center justify-between">
          {!userLoggedIn ? (
            <>
              <Button
                className="common-pointer bg-orange-50 hover:bg-red-500 border border-red-500 hover:border-teal-100 border-solid cursor-pointer font-sfmono leading-[normal] min-w-[193px] py-3.5 rounded-[5px] text-center text-lg text-red-500 hover:text-orange-50"
                id="block3"
                onClick={handleSignInBtxClick}
              >
                sign in
              </Button>
              <Button
                className="common-pointer bg-orange-50 hover:bg-indigo-900 border border-indigo-900 hover:border-teal-100 border-solid cursor-pointer font-sfmono leading-[normal] min-w-[193px] py-3.5 rounded-[5px] text-center text-indigo-900 text-lg hover:text-orange-50"
                id="block2"
                onClick={handleSignUpBtxClick}
              >
                sign up
              </Button>
            </>
          ) : (
            <div className="flex flex-row items-center justify-center gap-10" ref={dropdownRef}>
              <div className="relative">
                <Img
                  id="user"
                  className="ml-5 md:ml-[0] rounded-full cursor-pointer"
                  src={userIcon}
                  alt="user"
                  onClick={toggleDropdown}
                  onMouseEnter={handleUserIconEnter}
                  onMouseLeave={handleUserIconLeave}
                />

                {isOpen && (
                  <div
                    id="user"
                    className="absolute right-0 z-10 bg-orange-50 font-monumentextended items-center justify-start w-[180px]"
                  >
                    <ul>
                      <Button
                        className="bg-red-500 hover:bg-orange-50 border border-orange-50 hover:border-teal-100 border-solid font-extrabold text-[12px] sm:text-sm md:text-sm text-center text-orange-50 hover:text-red-500 flex flex-col items-center justify-start p-4 px-8 md:px-4 sm:px-2 w-full"
                        onClick={() => navigate("/profile")}
                      >
                        YOUR PROFILE
                      </Button>
                      <Button
                        className="bg-red-500 hover:bg-orange-50 border border-orange-50 hover:border-teal-100 border-solid font-extrabold text-[12px] sm:text-sm md:text-sm text-center text-orange-50 hover:text-red-500 flex flex-col items-center justify-start p-4 px-8 md:px-4 sm:px-2 w-full"
                        onClick={() => navigate("/order")}
                      >
                        YOUR ORDER
                      </Button>
                      <Button
                        className="bg-red-500 hover:bg-orange-50 border border-orange-50 hover:border-teal-100 border-solid font-extrabold text-[12px] sm:text-sm md:text-sm text-center text-orange-50 hover:text-red-500 flex flex-col items-center justify-start p-4 px-8 md:px-4 sm:px-2 w-full"
                        onClick={handleLogout}
                      >
                        SIGNOUT
                      </Button>
                      <Button
                        className="bg-red-500 hover:bg-orange-50 border border-orange-50 hover:border-teal-100 border-solid font-extrabold text-[12px] sm:text-sm md:text-sm text-center text-orange-50 hover:text-red-500 flex flex-col items-center justify-start p-4 px-8 md:px-4 sm:px-2 w-full"
                        onClick={toggleDropdown}
                      >
                        x CANCEL x
                      </Button>
                    </ul>
                  </div>
                )}
              </div>
              <div className="relative">
                <Img
                  className="h-[36px] ml-0 md:ml-[0] w-[38px] cursor-pointer"
                  src={cartIcon}
                  alt="cart"
                  onClick={toggleDropdownCart}
                  onMouseEnter={handleCartIconEnter}
                  onMouseLeave={handleCartIconLeave}
                />

                {isOpenCart && (
                  <div
                    id="cart"
                    className="absolute right-0 z-10 bg-orange-50 max-h-[700px] h-auto font-monumentextended border border-red-500 flex flex-col items-center justify-center px-5 py-10 w-[422px]"
                  >
                    <div className="flex flex-col gap-10 items-start justify-start overflow-y-scroll w-[320px]">
                      <Text className="font-extrabold sm:text-[35px] md:text-[37px] text-[39px] text-left text-deep_orange-500 w-full">Your Cart</Text>
                      <div className="font-sfmono flex flex-col gap-5 items-start justify-start w-full">
                        {/* Place cakes here */}
                        {cart && cakes()}
                        <Line className="h-[3px] w-full bg-deep_orange-500" />
                        <div className="flex flex-row items-start justify-between w-full">
                          <Text className="font-bold text-left text-deep_orange-500 text-[20px]">Total:</Text>
                          <Text className="text-right text-deep_orange-500 text-[20px]">{cart && cart.orderDetails.reduce((total, order) => total + order.price * order.quantity, 0).toLocaleString("vi-VN")} VNĐ</Text>
                        </div>
                        <div className="flex flex-row items-center justify-center w-full">
                          <Button
                            className="bg-orange-50 hover:bg-indigo-900 border border-indigo-900 hover:border-teal-100 border-solid cursor-pointer leading-[normal] min-w-[193px] py-3.5 rounded-[5px] text-center text-indigo-900 hover:text-orange-50 text-lg"
                            hidden={cart && cart.orderDetails.length === 0}
                            onClick={() => handlePayNowClick()}
                          >
                            pay now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Line className="absolute bg-red-500 h-px inset-x-[0] mx-auto bottom-[0] w-full" />
      {orderDetail && number && editCake()}
    </div>
  );
};

Navbar.defaultProps = {};

export default Navbar;
