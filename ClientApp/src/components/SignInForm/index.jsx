import React, { useState } from 'react'

import { useNavigate, Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { UserAuth } from "apis/auth/AuthContext";
import AccountApi from 'apis/services/Account';

import { Button, Input, Text } from "components";
import { Backdrop, CircularProgress } from '@mui/material';

const SignInForm = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { login } = UserAuth();

    const handleSignInBtxClick = async () => {
        setOpen(true);

        try {
            await login(email, password);
            let userInfo = await AccountApi.getAccount({ email: email });

            localStorage.setItem('userInfo', JSON.stringify(userInfo));

            enqueueSnackbar("Login successful", { variant: "success" });
            navigate("/");
        } catch (error) {
            enqueueSnackbar("Invalid email or password", { variant: "error" });
            setOpen(false);
        }
    }

    return (
        <div className={props.className}>
            <div className="flex flex-col md:gap-10 gap-[60px] items-center justify-start w-full">
                <div className="flex flex-col items-center justify-start">
                    <Text className="sm:text-[27px] md:text-[29px] text-[31px] text-center text-red-500"
                        size="txtMonumentExtendedRegular31">
                        SIGN IN
                    </Text>
                </div>
                <div className="flex flex-col font-sfmono items-center justify-start w-full">
                    <form method="POST" className="flex flex-col font-sfmono items-center justify-start w-full">
                        <Input
                            name="group39694"
                            placeholder="email"
                            className="italic leading-[normal] p-0 placeholder:text-red-500_87 sm:px-5 text-left text-lg text-red-500_87 w-full"
                            wrapClassName="bg-orange-50 border border-red-500 border-solid pb-[15px] pl-[21px] pr-[35px] pt-3 rounded-[5px] w-[98%]"
                            type="email"
                            autoComplete="email"
                            onChange={(value) => setEmail(value)}
                        ></Input>
                        <Input name="group39702" placeholder="password"
                            className="italic leading-[normal] p-0 placeholder:text-red-500_87 sm:pr-5 text-left text-lg text-red-500_87 w-full"
                            wrapClassName="bg-orange-50 border border-red-500 border-solid mt-5 pl-5 pr-[35px] py-[13px] rounded-[5px] w-[98%]"
                            type="password"
                            autoComplete="current-password"
                            onChange={(value) => setPassword(value)}
                        ></Input>
                        <Button
                            className="bg-orange-50 border border-indigo-900 border-solid cursor-pointer leading-[normal] min-w-[193px] mt-5 py-3.5 rounded-[5px] text-center text-indigo-900 text-lg"
                            type="button"
                            onClick={handleSignInBtxClick}
                        >
                            sign in
                        </Button>
                    </form>
                    <div className="flex flex-row items-center justify-center mt-[39px] w-[54%] md:w-full">
                        <Text className="text-center text-red-500 text-sm" size="txtSFMonoRegular14">
                            Don’t have an account?{" "}
                        </Text>
                        <Link to="/signup" className="ml-[5px] text-center text-red-500 text-sm underline">
                            <Text className="common-pointer" size="txtSFMonoRegular14">
                                SIGN UP
                            </Text>
                        </Link>
                    </div>
                    <Link to="/reset" className="mt-[19px] text-center text-red-500 text-sm">
                        <Text size="txtSFMonoRegular14">Reset Password</Text>
                    </Link>
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

export default SignInForm
