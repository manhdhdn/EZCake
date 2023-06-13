import React from 'react'

import { Link } from 'react-router-dom';

import { Text, Input, Button } from 'components';

const SignUpForm = (props) => {
  // const navigate = useNavigate();

  // const handleSi

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
              className="italic leading-[normal] p-0 placeholder:text-red-500_87 sm:px-5 text-left text-lg text-red-500_87 w-full"
              wrapClassName="bg-orange-50 border border-red-500 border-solid pb-[15px] pl-[21px] pr-[35px] pt-3 rounded-[5px] w-[98%]"
              type="text"
              autoComplete="full-name"
            ></Input>
            <Input
              name="group39696"
              placeholder="email"
              className="italic leading-[normal] p-0 placeholder:text-red-500_87 sm:px-5 text-left text-lg text-red-500_87 w-full"
              wrapClassName="bg-orange-50 border border-red-500 border-solid mt-5 pl-5 pr-[35px] py-[13px] rounded-[5px] w-[98%]"
              type="email"
              autoComplete="email"
            ></Input>
            <Input
              name="group39697"
              placeholder="password"
              className="italic leading-[normal] p-0 placeholder:text-red-500_87 sm:pr-5 text-left text-lg text-red-500_87 w-full"
              wrapClassName="bg-orange-50 border border-red-500 border-solid mt-5 pl-5 pr-[35px] py-[13px] rounded-[5px] w-[98%]"
              type="password"
              autoComplete="new-password"
            ></Input>
            <Input
              name="group39699"
              placeholder="confirm your password"
              className="italic leading-[normal] p-0 placeholder:text-red-500_87 sm:pl-5 text-left text-lg text-red-500_87 w-full"
              wrapClassName="bg-orange-50 border border-red-500 border-solid mt-5 pl-5 pr-[35px] py-[13px] rounded-[5px] w-[98%]"
              type="password"
              autoComplete="confirm-password"
            ></Input>
            <Button
              className="bg-orange-50 border border-indigo-900 border-solid cursor-pointer leading-[normal] min-w-[193px] mt-5 py-3.5 rounded-[5px] text-center text-indigo-900 text-lg"
              type="button"
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
    </div>
  )
}

export default SignUpForm
