import React, { useEffect } from "react";

import { Text } from "components";
import Footer from "components/Footer";
import Navbar from "components/Navbar";

const TermsOfService = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <div className="bg-orange-50 flex flex-col items-center justify-start mx-auto w-full">
            <div className="flex flex-col justify-start w-full">
                <Navbar className="bg-orange-50 flex flex-row font-sfmono items-center justify-start p-[27px] sm:px-5 shadow-bs w-full" />
                <div className="h-px mt-navbar" />
                <Text className="font-monumentextended md:ml-[0] ml-[162px] mt-[75px] sm:text-[27px] md:text-[29px] text-[31px] text-red-500">
                    TERMS OF SERVICE
                </Text>
                <div className="flex md:flex-col flex-row font-sfmono md:gap-10 gap-[91px] items-start justify-end md:ml-[0] ml-[162px] mt-5 md:px-5 w-[88%] md:w-full">
                    <Text className="mb-[41px] text-base text-red-500">
                        <>
                            This website is operated by EZCake. Throughout the website, the terms &quot;we&quot;, &quot;we&quot; and
                            &quot;our&quot; refer to EZCake. EZCake makes this website available, including all information, tools
                            and services available on this website to you, the user, provided that you accept all terms, conditions,
                            policies and information newspaper listed here.
                            <br />
                            <br />
                            By accessing our website and/or making a purchase from us, you participate in our &quot;Service&quot;
                            and agree to abide by the following terms and conditions (&quot;Terms of Service&quot;, &quot;Terms of
                            Service&quot;, &quot;Terms&quot;), including additional terms and conditions and policies referenced
                            herein and/or available via link. These Terms of Service apply to all users of the website, including
                            but not limited to web browsing users, suppliers, customers, merchants and/or content contributors.
                            <br />
                            <br />
                            Please read these Terms of Service carefully before accessing or using our website. By accessing or
                            using any part of the website, you agree to comply with these Terms of Service. If you do not agree to
                            all the terms and conditions of this agreement, you may not access the website or use any of the
                            services. If these Terms of Service are considered an offer, acceptance is expressly limited to these
                            Terms of Service.
                            <br />
                            <br />
                            Any new features or tools added to the existing store will also be subject to the Terms of Service. You
                            can view the most current version of the Terms of Service at any time on this page. We reserve the right
                            to update, change or replace any part of these Terms of Service by posting updates and/or changes on our
                            website. You are responsible for checking this page periodically for changes. Continued use or access to
                            the website after posting updates and/or changes constitutes your acceptance of such changes.
                        </>
                    </Text>
                </div>
                <Text className="font-bold font-sfmono md:ml-[0] ml-[162px] mt-[38px] text-[22px] sm:text-lg text-red-500 md:text-xl">
                    PART 1 - ONLINE STORE TERMS
                </Text>
                <Text className="font-sfmono md:ml-[0] ml-[162px] mt-[19px] text-base text-red-500">
                    <>
                        By agreeing to these Terms of Service, you represent that you are of age to act as a legal representative
                        of the state or province in which you reside, or that you are of age to act as a legal representative. the
                        laws of the country or province in which you reside. If you are under 18 years old, you must have a legal
                        representative to protect any transactions or acts directly related to the law.
                        <br />
                        <br />
                        You may not use our products for any illegal or unauthorized purpose, nor may you violate any laws within
                        your jurisdiction (including but not limited to: into copyright laws).
                        <br />
                        <br />
                        You may not transmit any worms or viruses or any code of a destructive nature.
                        <br />
                        <br />
                        Violation or breach of any Terms will result in immediate termination of your Service.
                    </>
                </Text>
                <Text className="font-bold font-sfmono md:ml-[0] ml-[162px] mt-[39px] text-[22px] sm:text-lg text-red-500 md:text-xl">
                    PART 2 - GENERAL TERMS
                </Text>
                <Text className="font-sfmono md:ml-[0] ml-[162px] mt-[19px] text-base text-red-500">
                    <>
                        We reserve the right to refuse service to anyone for any reason at any time.
                        <br />
                        <br />
                        You understand that your content (excluding credit card information) may be transferred unencrypted and
                        includes (a) transmission over various networks; and (b) changes to conform and adapt to the
                        specifications of connected networks or devices. Credit card information is always encrypted during
                        transmission over the network.
                        <br />
                        <br />
                        You agree not to copy, duplicate, sell, resell, or otherwise exploit any part of the Service, your use of
                        the Service, or access to the Service, or any information on the website through which it is translated.
                        services are provided, without our written permission.
                        <br />
                        <br />
                        The headings used in this agreement are for convenience only and will not limit or affect these Terms.
                    </>
                </Text>
                <Text className="font-bold font-sfmono md:ml-[0] ml-[162px] mt-[41px] text-[22px] sm:text-lg text-red-500 md:text-xl">
                    SECTION 3 - ACCURACY, COMPLETE AND DURATION OF INFORMATION
                </Text>
                <Text className="font-sfmono md:ml-[0] ml-[162px] mt-[17px] text-base text-red-500">
                    <>
                        We are not responsible if the information provided on this website is incorrect, complete or current. The
                        material on this website is provided for general information purposes only and should not be relied upon
                        or used as the sole basis for decision making without reference to primary, accurate, complete or more
                        time. Any reliance on material on this website is your responsibility.
                        <br />
                        <br />
                        This website may contain historical information, but please note that historical information is not
                        current information and is provided for informational purposes only. We reserve the right to change the
                        content of this website at any time, but have no obligation to update the information. We recommend that
                        you monitor changes on our website yourself. We recommend that you manually monitor the changes on our
                        website to stay up to date with the latest information.
                    </>
                </Text>
                <Text className="font-bold font-sfmono md:ml-[0] ml-[162px] mt-[39px] text-[22px] sm:text-lg text-red-500 md:text-xl">
                    SECTION 4 - SERVICES AND PRICE MODIFICATIONS
                </Text>
                <Text className="font-sfmono md:ml-[0] ml-[162px] mt-[19px] text-base text-red-500">
                    <>
                        Prices for our products are subject to change without prior notice.
                        <br />
                        <br />
                        We reserve the right at any time to modify or discontinue the Service (or any portion or content thereof)
                        with prior notice.
                        <br />
                        <br />
                        We will not be liable to you or to any third party for any modification, price change, suspension or
                        discontinuance of the service without written records, documents as well as evidence. related matters
                        only.
                    </>
                </Text>
                <Text className="font-bold font-sfmono md:ml-[0] ml-[162px] mt-10 text-[22px] sm:text-lg text-red-500 md:text-xl">
                    SECTION 5 - PRODUCTS OR SERVICES (if any)
                </Text>
                <Text className="font-sfmono md:ml-[0] ml-[162px] mt-[18px] text-base text-red-500">
                    <>
                        Some products or services may only be available online through the website. These products or services may
                        be limited in quantity and are only accepted for returns or exchanges in accordance with our Return
                        Policy.
                        <br />
                        <br />
                        We have tried to display the colors and images of the products as accurately as possible on the store.
                        However, we do not guarantee that your computer monitor will display all colors correctly.
                        <br />
                        <br />
                        We will not be liable to you or to any third party for any modification, price change, suspension or
                        discontinuance of the service without written records, documents as well as evidence. related matters
                        only.
                        <br />
                        <br />
                        We do not guarantee that the quality of any product, service, information or material that you purchase or
                        obtain will meet your expectations.
                    </>
                </Text>
                <Text className="font-bold font-sfmono md:ml-[0] ml-[162px] mt-[39px] text-[22px] sm:text-lg text-red-500 md:text-xl">
                    SECTION 6 - ACCURACY OF PAYMENT AND ACCOUNT INFORMATION
                </Text>
                <Text className="font-sfmono md:ml-[0] ml-[162px] mt-[19px] text-base text-red-500">
                    <>
                        We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or
                        cancel the number of purchases per person, per household or per order. These restrictions may include
                        orders placed by or under the same customer account, the same credit card, or orders using the same
                        billing and/or shipping address. In the event that we make a change or cancel your order, we may attempt
                        to notify you by contacting the email address and/or billing address/phone number provided at the time of
                        booking. row. We reserve the right to limit or prohibit orders that, in our sole discretion, appear to be
                        placed by merchants, resellers or distributors.
                        <br />
                        <br />
                        You agree to provide current, complete and accurate purchase and account information for all purchases
                        made in our store. You agree to update your account and other information, including your email address
                        and credit card number and expiration date, so that we can complete the transaction and contact you as
                        necessary.
                        <br />
                        <br />
                        For more details, please contact via gmail EzCake@gmail.com
                    </>
                </Text>
                <Text className="font-bold font-sfmono md:ml-[0] ml-[162px] mt-[39px] text-[22px] sm:text-lg text-red-500 md:text-xl">
                    SECTION 7 - OPTIONS TOOLS
                </Text>
                <Text className="font-sfmono md:ml-[0] ml-[162px] mt-[19px] text-base text-red-500">
                    <>
                        We allow you to access third-party tools that we do not control or can influence. You understand and agree
                        that we provide access to these tools &quot;as is&quot; and &quot;as available&quot; without any
                        warranties, representations or conditions and without any endorsement. which real. We are not responsible
                        for the use of optional third-party tools.
                        <br />
                        <br />
                        Any use of optional tools made by you through the website is entirely at your own risk and discretion and
                        you should ensure that you understand and agree to the terms set forth by the public providers. respective
                        tools provided.
                        <br />
                        <br />
                        We may also, in the future, offer new services and/features through the website (including the release of
                        new tools and resources). These new features and/or features will also be subject to these Terms of
                        Service.
                    </>
                </Text>
                <Text className="font-bold font-sfmono md:ml-[0] ml-[162px] mt-[39px] text-[22px] sm:text-lg text-red-500 md:text-xl">
                    SECTION 8 - LINKS WITH THIRD PARTY
                </Text>
                <Text className="font-sfmono md:ml-[0] ml-[162px] mt-[19px] text-base text-red-500">
                    <>
                        Some of the content, products and services available through our Services may include material from third
                        parties.
                        <br />
                        <br />
                        Third-party links on this website may lead you to third-party websites that are not related to us. We are
                        not responsible for checking or evaluating content or accuracy and we make no warranties and will not be
                        responsible or liable for any third party materials or websites, or any any other third party materials,
                        products or services.
                        <br />
                        <br />
                        We are not responsible for any harm or damage whatsoever in connection with the purchase or use of goods,
                        services, resources, content or any other transaction in connection with any of our websites. any third
                        party. Please review third party policies and practices carefully and ensure that you understand them well
                        before entering into any transaction. Any complaints, requests, concerns or questions regarding
                        third-party products should be directed to the third party.
                    </>
                </Text>
                <Text className="font-bold font-sfmono md:ml-[0] ml-[162px] mt-[41px] text-[22px] sm:text-lg text-red-500 md:text-xl">
                    SECTION 9 - USER COMMENTS, FEEDBACK AND OTHER CONTRIBUTIONS
                </Text>
                <Text className="font-sfmono md:ml-[0] ml-[162px] mt-[17px] text-base text-red-500">
                    <>
                        If at our request you submit specific specific posts (e.g. contest registration) or without a request from
                        us you submit creative ideas, suggestions, proposals, plans or other material, whether online, by email,
                        by post or otherwise (collectively, &#39;comments&#39;), you agree that we may, at any time, without
                        restrict, edit, copy, publish, distribute, translate and use any comments you submit to us. We are not
                        obligated to (1) maintain any comments confidentially; (2) pay for any comments; or (3) respond to any
                        comments.
                        <br />
                        <br />
                        We may, but are not obligated to, monitor, edit, or remove content that we determine in our sole
                        discretion to be illegal, offensive, threatening, defamatory, infringing. is defamatory, libelous, obscene
                        or otherwise illegal or violates any third party&#39;s intellectual property rights or these Terms of
                        Service.
                        <br />
                        <br />
                        You agree that your comment will not infringe any third party&#39;s rights, including copyright,
                        trademark, privacy, personal right or other personal or proprietary right. You also agree that your
                        comments will not contain offensive or illegal content, abuse or pornography, or contain any computer
                        viruses or other malicious software that may affect the operation of the Service. or any related website.
                        You may not use a fake email address, pretend to be someone else, or mislead us or a third party as to the
                        origin of any comment. You are solely responsible for any comments you make and their accuracy. We are not
                        responsible and do not accept any liability for any comments posted by you or a third party.
                    </>
                </Text>
                <Text className="font-bold font-sfmono md:ml-[0] ml-[162px] mt-[39px] text-[22px] sm:text-lg text-red-500 md:text-xl">
                    SECTION 10 - PERSONAL INFORMATION
                </Text>
                <Text className="font-sfmono md:ml-[0] ml-[162px] mt-[19px] text-base text-red-500 w-[78%] sm:w-full">
                    The provision of your personal information through the store is governed by our Privacy Policy. To view our
                    Privacy Policy.
                </Text>
                <Text className="font-bold font-sfmono md:ml-[0] ml-[162px] mt-[41px] text-[22px] sm:text-lg text-red-500 md:text-xl">
                    SECTION 11 - ERROR, INACCURACY AND IMPLICATION
                </Text>
                <Text className="font-sfmono md:ml-[0] ml-[162px] mt-[17px] text-base text-red-500">
                    <>
                        From time to time there is information on the website or in the Service that contains typographical
                        errors, inaccuracies or omissions that may be related to product descriptions, prices, promotions, offers,
                        product shipping fees, delivery times, etc. delivery time and availability. We reserve the right to
                        correct errors, inaccuracies or omissions and to change or update information or to cancel orders if any
                        information in the Service or on any related website is incorrect at any time. at any time and with prior
                        notice (including after you have submitted your order). For any refund issues, please contact us at gmail
                        EzCake@gmail.com
                        <br />
                        <br />
                        We are under no obligation to update, modify or clarify information in the Service or on any related
                        website, including, without limitation, pricing information, except as required by law. the law. A
                        particular update or refresh date applied in the Service or on any related website, shall not be deemed to
                        indicate that all information in the Service or on any related website has been modify or update.
                    </>
                </Text>
                <Text className="font-bold font-sfmono md:ml-[0] ml-[162px] mt-[39px] text-[22px] sm:text-lg text-red-500 md:text-xl">
                    SECTION 12 - PROHIBITED PURPOSE
                </Text>
                <Text className="font-sfmono md:ml-[0] ml-[162px] mt-[19px] text-base text-red-500">
                    <>
                        In addition to the other prohibited purposes set forth in the Terms of Service, you are prohibited from
                        using the website or its content:
                        <br />
                        <br />
                        (a) for any illegal purpose; (b) to induce others to commit or engage in any illegal act; (c) to violate
                        any international, federal, provincial or state regulation, rule, law or statute, or local statute; (d) to
                        infringe or violate our intellectual property rights or the intellectual property rights of others; (e) to
                        harass, abuse, insult, harm, punish, attack, offend, threaten or discriminate on the basis of sex,
                        orientation, religion, ethnicity, race, age, disability, national origin or disability; (f) to send false
                        or misleading information;
                        <br />
                        <br />
                        (g) to upload or transmit virus code or any other malicious code that may be used in any way to affect the
                        functionality or operation of the Service or any related website, other websites or the Internet; (h) to
                        collect or track the personal information of others; (i) for spamming, phishing, identity theft, reason,
                        spider, crawl or scrape; (j) for any indecent or unethical purpose; or (k) to interfere with or circumvent
                        the security features of the Service or any related websites, other websites, or the Internet. We reserve
                        the right to terminate your use of the Service or any related website in violation of any prohibited
                        purpose.
                    </>
                </Text>
                <Text className="font-bold font-sfmono md:ml-[0] ml-[162px] mt-[41px] text-[22px] sm:text-lg text-red-500 md:text-xl">
                    SECTION 13 - DISCLAIMER; LIMITATION OF US LIABILITY
                </Text>
                <Text className="font-sfmono md:ml-[0] ml-[162px] mt-[17px] text-base text-red-500">
                    <>
                        We make no warranties, representations or warranties that the use of our services will be uninterrupted,
                        timely, secure or error-free.
                        <br />
                        <br />
                        We do not guarantee that the results that may be obtained from the use of the service will be accurate or
                        reliable.
                        <br />
                        <br />
                        You agree that we may turn off the service for an indefinite period from time to time or cancel the
                        service at any time, and will notify and reimburse you via gmail depending on the amount. degree of the
                        situation.
                        <br />
                        <br />
                        You hereby agree that the use or inability to use the Service is at your own risk. The Service and all
                        products and services provided to you through the Service (unless otherwise specified by us) are provided
                        &quot;as available&quot; for your use, without any representations, including all implied or express
                        warranties or conditions, including all implied or express warranties or conditions of merchantability,
                        quality of merchantability, fitness for a specific purpose, durability, sovereignty and non-infringement.
                        <br />
                        <br />
                        In any event, EzCake, our directors, managers, employees, affiliates, agents, contractors, interns,
                        service providers or licensors shall be liable at their sole discretion. against any loss, damage, claim
                        or any other direct, indirect, incidental, punitive, special or other consequential damages of any kind,
                        including, but not limited to term, lost profits, lost revenue, lost savings, lost data, replacement costs
                        or any similar loss, based on contract, strict liability, strict breach or other , arising from the use of
                        any service or any product purchased through the service, or any other claim relating in any way to the
                        use of the service or any product or other services provided by us, regardless of whether we have advised
                        of the possibility of such damages or not, unless it would be in violation of Vietnamese law.
                    </>
                </Text>
                <Text className="font-bold font-sfmono md:ml-[0] ml-[162px] mt-[39px] text-[22px] sm:text-lg text-red-500 md:text-xl">
                    SECTION 14 - COMPENSATION
                </Text>
                <Text className="font-sfmono md:ml-[0] ml-[162px] mt-[19px] text-base text-red-500 w-[78%] sm:w-full">
                    <>
                        You agree to indemnify, defend and hold harmless EzCake, its directors, managers, employees, associates,
                        agents, contractors, interns, service providers or licensors. from any claim, liability, loss, expense or
                        expense, including reasonable attorneys&#39; fees, arising out of any breach of any provision of these
                        Terms of Service or from the use of use or access our Services or any related websites, products or other
                        services offered through the Services.
                    </>
                </Text>
                <Text className="font-bold font-sfmono md:ml-[0] ml-[162px] mt-[39px] text-[22px] sm:text-lg text-red-500 md:text-xl">
                    SECTION 15 - TERMINATION
                </Text>
                <Text className="font-sfmono md:ml-[0] ml-[162px] mt-[19px] text-base text-red-500 w-[78%] sm:w-full">
                    These Terms of Service will be effective from the date you begin using the Service and will continue until
                    terminated by any party. You may terminate your use of the Service at any time by discontinuing access to
                    the Service and deleting your account, if applicable. We may also terminate or suspend the provision of our
                    Services at any time, without prior notice, including, without limitation, termination or suspension of
                    access to the Services or any part thereof. any of it, with or without reason, without liability to you or
                    any third party.
                </Text>
                <Text className="font-bold font-sfmono md:ml-[0] ml-[162px] mt-[39px] text-[22px] sm:text-lg text-red-500 md:text-xl">
                    SECTION 16 - GENERAL TERMS
                </Text>
                <Text className="font-sfmono md:ml-[0] ml-[162px] mt-[19px] text-base text-red-500">
                    <>
                        These Terms of Service shall be governed by and construed in accordance with the laws of Vietnam, without
                        regard to the principle of law. Any dispute arising out of or relating to these Terms of Service shall be
                        subject to the jurisdiction of the respective courts in Vietnam, and the parties agree to abide by the
                        final and binding decisions of the courts. there.
                        <br />
                        <br />
                        If any part of these Terms of Service is held to be invalid or unenforceable, that part shall be forfeited
                        and shall not affect the validity and enforceability of the remaining portions.
                        <br />
                        <br />
                        These Terms of Service establish your and our full rights and responsibilities with respect to your use of
                        the Service and supersede all prior agreements relating to the Service.
                        <br />
                        <br />
                        If you have any questions or concerns regarding these Terms of Service, please contact us through our
                        website or through the contact information provided in the Service.
                    </>
                </Text>
                <Text className="font-bold font-sfmono md:ml-[0] ml-[162px] mt-[39px] text-[22px] sm:text-lg text-red-500 md:text-xl">
                    SECTION 17 - ENTIRE AGREEMENT
                </Text>
                <Text className="font-sfmono md:ml-[0] ml-[162px] mt-[19px] text-base text-red-500">
                    <>
                        Our failure to exercise or apply any right or provision in these Terms of Service shall not constitute a
                        waiver of such right or provision.
                        <br />
                        <br />
                        These Terms of Service and any policies or operating rules posted by us on this website or in connection
                        with the Services will constitute the entire agreement and understanding between you and us and govern use
                        of the Service, supersedes any prior agreements, notices and proposals, whether oral or written, between
                        you and us (including, without limitation, any prior versions) here of the Terms of Service).
                        <br />
                        <br />
                        Any ambiguity in the interpretation of these Terms of Service shall not be construed to the detriment of
                        the drafting party.
                    </>
                </Text>
                <Text className="font-bold font-sfmono md:ml-[0] ml-[162px] mt-[39px] text-[22px] sm:text-lg text-red-500 md:text-xl">
                    SECTION 18 - APPLICABLE LAW
                </Text>
                <Text className="font-sfmono md:ml-[0] ml-[162px] mt-[19px] text-base text-red-500 w-[78%] sm:w-full">
                    These Terms of Service and any separate agreement by which we provide the Services to you shall be governed
                    by and construed in accordance with the laws of Vietnam.
                </Text>
                <Text className="font-bold font-sfmono md:ml-[0] ml-[162px] mt-[39px] text-[22px] sm:text-lg text-red-500 md:text-xl">
                    SECTION 19 - CHANGES TO TERMS OF SERVICE
                </Text>
                <Text className="font-sfmono md:ml-[0] ml-[162px] mt-[19px] text-base text-red-500">
                    <>
                        You can view the most current version of the Terms of Service at any time on this page.
                        <br />
                        <br />
                        We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of
                        Service by posting updates and changes on our website. It is your responsibility to check our website
                        periodically for changes. Continued use or access to our website or Services following any changes to
                        these Terms of Service is deemed acceptance of such changes.
                        <br />
                        <br />
                        We will also notify you of any material changes to these Terms of Service by posting a notice on the
                        website or by sending an email notice (if applicable), so that you are notified in advance. about those
                        changes.
                    </>
                </Text>
                <Text className="font-bold font-sfmono md:ml-[0] ml-[162px] mt-[39px] text-[22px] sm:text-lg text-red-500 md:text-xl">
                    SECTION 20 - CONTACT INFORMATION
                </Text>
                <Text className="font-sfmono md:ml-[0] ml-[162px] mt-[19px] text-base text-red-500">
                    Questions about the Terms of Service should be emailed to us EzCake@gmail.com
                </Text>
                <Text className="font-bold font-sfmono md:ml-[0] ml-[162px] mt-[38px] text-[22px] sm:text-lg text-red-500 md:text-xl">
                    SECTION 20 - CONTACT INFORMATION
                </Text>
                <Text className="font-sfmono md:ml-[0] ml-[162px] mt-[19px] text-base text-red-500">
                    Questions about the Terms of Service should be emailed to us EzCake@gmail.com
                </Text>
                <Footer className="bg-orange-50 flex font-sfmono items-center justify-center mt-[18px] md:px-5 w-full" />
            </div>
        </div>
    );
};

export default TermsOfService;
