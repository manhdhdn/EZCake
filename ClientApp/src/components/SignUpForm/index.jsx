import React, { useState } from 'react'

import { useNavigate, Link } from 'react-router-dom';
import { UserAuth } from 'apis/auth/AuthContext';
import AccountApi from 'apis/services/Account';
import ShippingInformationApi from 'apis/services/ShippingInformation';
import { v4 } from 'uuid';
import { useSnackbar } from 'notistack';

import { Text, Input, Button } from 'components';
import { Backdrop, CircularProgress } from '@mui/material';

const SignUpForm = (props) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { createUser } = UserAuth();

  const handleSignUpBtxClick = async () => {
    setOpen(true);

    if (password === confirmPassword) {
      try {
        let accountId = v4();
        let shippingInformationId = v4();
        let status = await AccountApi.createAccount({
          id: accountId,
          name,
          email,
          role: "User"
        });

        if (status === 201) {
          status = await ShippingInformationApi.createShippingInformation({
            id: shippingInformationId,
            name,
            prioritisation: true,
            accountId: accountId
          })

          if (status === 201) {
            await createUser(email, password);

            enqueueSnackbar("Account created", { variant: "success" });
            navigate("/");
          }
        }
      } catch (error) {
        setOpen(false);
        enqueueSnackbar("Account could not be created", { variant: "error" });
      }
    }
  }

  return (
    <div className={props.className}>
      <div className="flex flex-col md:gap-10 gap-[60px] items-center justify-start w-full">
        <div className="flex flex-col items-center justify-start">
          <Text
            className="sm:text-[27px] md:text-[29px] text-[31px] text-center text-red-500"
            size="txtMonumentExtendedRegular31"
          >
            CREATE ACCOUNT
          </Text>
        </div>
        <div className="flex flex-col font-sfmono gap-5 items-center justify-start w-full">
          <form method="POST" className="flex flex-col font-sfmono items-center justify-start w-full">
            <Input
              name="group39695"
              placeholder="full name"
              className="leading-[normal] p-0 placeholder:text-red-500_87 placeholder:italic sm:px-5 text-left text-lg text-red-500 w-full"
              wrapClassName="bg-orange-50 border border-red-500 border-solid pb-[15px] pl-[21px] pr-[35px] pt-3 rounded-[5px] w-[98%]"
              type="text"
              autoComplete="fullname"
              onChange={(value) => setName(value)}
            ></Input>
            <Input
              name="group39696"
              placeholder="email"
              className="leading-[normal] p-0 placeholder:text-red-500_87 placeholder:italic sm:px-5 text-left text-lg text-red-500 w-full"
              wrapClassName="bg-orange-50 border border-red-500 border-solid mt-5 pl-5 pr-[35px] py-[13px] rounded-[5px] w-[98%]"
              type="email"
              autoComplete="email"
              onChange={(value) => setEmail(value)}
            ></Input>
            <Input
              name="group39697"
              placeholder="password"
              className="leading-[normal] p-0 placeholder:text-red-500_87 placeholder:italic sm:px-5 text-left text-lg text-red-500 w-full"
              wrapClassName="bg-orange-50 border border-red-500 border-solid mt-5 pl-5 pr-[35px] py-[13px] rounded-[5px] w-[98%]"
              type="password"
              autoComplete="password"
              onChange={(value) => setPassword(value)}
            ></Input>
            <Input
              name="group39699"
              placeholder="confirm your password"
              className="leading-[normal] p-0 placeholder:text-red-500_87 placeholder:italic sm:px-5 text-left text-lg text-red-500 w-full"
              wrapClassName="bg-orange-50 border border-red-500 border-solid mt-5 pl-5 pr-[35px] py-[13px] rounded-[5px] w-[98%]"
              type="password"
              autoComplete="password"
              onChange={(value) => setConfirmPassword(value)}
            ></Input>
            <Button
              className="bg-orange-50 hover:bg-indigo-900 border border-indigo-900 hover:border-teal-100 border-solid cursor-pointer leading-[normal] min-w-[193px] mt-5 py-3.5 rounded-[5px] text-center text-indigo-900 hover:text-orange-50 text-lg"
              type="button"
              onClick={handleSignUpBtxClick}
            >
              create account
            </Button>
          </form>
          <div className="flex flex-col items-center justify-start w-[58%] md:w-full">
            <div className="flex flex-col gap-[39px] items-center justify-start w-full">
              <div className="flex flex-row items-start justify-evenly w-full">
                <Text
                  className="text-center text-red-500 text-sm"
                  size="txtSFMonoRegular14"
                >
                  Already have an account?{" "}
                </Text>
                <Link to="/signin" className="text-center text-red-500 text-sm underline">
                  <Text
                    className="common-pointer"
                    size="txtSFMonoRegular14"
                  >
                    SIGN IN
                  </Text>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="success" />
      </Backdrop>
    </div>
  )
}

export default SignUpForm
