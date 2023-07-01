import React, { useEffect } from "react";

import { Text } from "components";
import Footer from "components/Footer";
import Navbar from "components/Navbar";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, []);

  return (
    <>
      <div className="bg-orange-50 flex flex-col items-center justify-start mx-auto w-full">
        <div className="flex flex-col justify-start w-full">
          <Navbar className="bg-orange-50 flex flex-row font-sfmono items-center justify-start p-[27px] sm:px-5 shadow-bs w-full" />
          <div className="h-px mt-navbar" />
          <Text className="font-monumentextended md:ml-[0] ml-[162px] mt-[75px] sm:text-[27px] md:text-[29px] text-[31px] text-red-500">
            PRIVACY POLICY
          </Text>
          <Text className="font-sfmono md:ml-[0] ml-[162px] mt-5 text-base text-red-500 w-[78%] sm:w-full">
            <>
              This Privacy Policy describes how your personal information is collected, used and shared when you visit
              or make a purchase at www.EzCake.com (referred to as the &quot;Site&quot;).
            </>
          </Text>
          <Text className="font-bold font-sfmono md:ml-[0] ml-[162px] mt-[79px] text-[22px] sm:text-lg text-red-500 md:text-xl">
            PERSONAL INFORMATION N WE COLLECT
          </Text>
          <div className="flex md:flex-col flex-row font-sfmono md:gap-10 gap-[91px] items-start justify-end md:ml-[0] ml-[162px] mt-[19px] md:px-5 w-[88%] md:w-full">
            <Text className="text-base text-red-500">
              <>
                When you visit the Website, we automatically collect certain information about your device, including
                information about your web browser, IP address, time zone and certain cookies installed on your device.
                . In addition, when you browse the Website, we collect information about the specific websites or
                products you view, the websites or search terms that referred you to the Website, and information about
                how you interacted with the Website. cooperate with the Website. We call this automatically collected
                information &quot;Device Information.&quot;
                <br />
                <br />
                We collect Device Information using technologies such as cookies, log files and web beacons. Cookies are
                data files that are placed on your device or computer and typically include an anonymous unique
                identifier. Log files keep track of activities that take place on the Website and collect data such as
                IP address, browser type, Internet service provider, referencing/exiting pages and timestamps. Web
                beacons are electronic files used to record information about how you browse the Website.
                <br />
                <br />
                In addition, when you make a purchase or attempt to make a purchase through the Website, we collect
                certain information from you, including your name, billing address, shipping address, payment
                information (including credit), email address and phone number. We call this information &quot;Order
                Information.&quot;
                <br />
                <br />
                When we talk about &quot;Personal Information&quot; in this Privacy Policy, we are talking about both
                Device Information and Ordering Information.
              </>
            </Text>
          </div>
          <Text className="font-bold font-sfmono md:ml-[0] ml-[162px] mt-[39px] text-[22px] sm:text-lg text-red-500 md:text-xl">
            USE OF YOUR PERSONAL INFORMATION
          </Text>
          <Text className="font-bold font-sfmono md:ml-[0] ml-[162px] mt-[38px] text-lg text-red-500">
            We use order information to:
          </Text>
          <Text className="font-sfmono md:ml-[0] ml-[162px] mt-[33px] text-base text-red-500">
            <>
              Fulfill your orders: This includes processing payment information, arranging for shipping, and providing
              invoices and/or order confirmations.
              <br />
              <br />
              Communicating with you: To communicate and inform you about orders, shipping information or any other
              information related to our services.
              <br />
              <br />
              Risk and Fraud Check: We use order information to check orders for risk or signs of potential fraud.
              <br />
              <br />
              Providing information or advertising: If you have shared your interests, we may provide information or
              advertising related to our products or services.
              <br />
              <br />
              Improve the site and prevent risks.
            </>
          </Text>
          <Text className="font-bold font-sfmono md:ml-[0] ml-[162px] mt-[38px] text-lg text-red-500">
            We use device information to:
          </Text>
          <Text className="font-sfmono md:ml-[0] ml-[162px] mt-[27px] text-base text-red-500">
            <>
              Risk and Fraud Check: By using your IP address and other device information, we help check and prevent
              potential fraud and risk.
              <br />
              <br />
              Website Optimization: We use device information to generate analytics on how customers browse and interact
              with our website, and evaluate the effectiveness of our marketing and advertising campaigns.
            </>
          </Text>
          <Text className="font-bold font-sfmono md:ml-[0] ml-[162px] mt-10 text-lg text-red-500">
            Share your personal information
          </Text>
          <Text className="font-sfmono md:ml-[0] ml-[162px] mt-[31px] text-base text-red-500">
            <>
              We share your personal information with third parties to assist us in using your personal information,
              <br />
              as follows:
            </>
          </Text>
          <Text className="font-sfmono md:ml-[0] ml-[162px] mt-2.5 text-base text-red-500">
            <>
              Synchronous Services: We use synchronous services to provide the operability of our website. For details
              on how these third parties use your personal information, please see the privacy policy of each service.
              <br />
              <br />
              Website Analytics: We use web analytics tools to understand how our customers use our website and improve
              it. Please refer to the privacy policy of each analytics tool for details on how they use your personal
              information.
              <br />
              <br />
              Legal compliance and protection: We may share your personal information to comply with applicable laws and
              regulations, respond to a lawful request such as a subpoena, search warrant or request. request
              information we receive, or protect our interests.
            </>
          </Text>
          <Text className="font-bold font-sfmono md:ml-[0] ml-[162px] mt-10 text-lg text-red-500">
            Behavioral advertising
          </Text>
          <Text className="font-sfmono md:ml-[0] ml-[162px] mt-[31px] text-base text-red-500 w-[78%] sm:w-full">
            <>
              We use your personal information to provide you with advertising or marketing information that we believe
              may be of interest to you. You can opt out of targeted advertising by visiting the Facebook, Google, and
              Bing opt-out links. Alternatively, you may also opt-out of some of these services by visiting the Digital
              Advertising Alliance&#39;s opt-out portal.
            </>
          </Text>
          <Text className="font-bold font-sfmono md:ml-[0] ml-[162px] mt-[39px] text-lg text-red-500">
            Do not track
          </Text>
          <Text className="font-sfmono md:ml-[0] ml-[162px] mt-8 text-base text-red-500 w-[78%] sm:w-full">
            Please note that we do not change the method of data collection and use on the website when receiving Do Not
            Track signals from your browser.
          </Text>
          <Text className="font-bold font-sfmono md:ml-[0] ml-[162px] mt-10 text-lg text-red-500">Data saving</Text>
          <Text className="font-sfmono md:ml-[0] ml-[162px] mt-[31px] text-base text-red-500">
            When you place an order through the website, we will keep your order information until you ask us to delete
            it.
          </Text>
          <Text className="font-bold font-sfmono md:ml-[0] ml-[162px] mt-[39px] text-lg text-red-500">Change</Text>
          <Text className="font-sfmono md:ml-[0] ml-[162px] mt-[30px] text-base text-red-500 w-3/4 sm:w-full">
            We may update this privacy policy to reflect changes in practice or for other operational, legal or
            regulatory reasons.
          </Text>
          <Text className="font-bold font-sfmono md:ml-[0] ml-[162px] mt-[39px] text-lg text-red-500">Contact</Text>
          <Text className="font-sfmono md:ml-[0] ml-[162px] mt-8 text-base text-red-500 w-[78%] sm:w-full">
            For more information about our privacy policy, if you have a question or would like to make a complaint,
            please contact us by email: EzCake@gmail.com
          </Text>
          <Footer className="bg-orange-50 flex font-sfmono items-center justify-center mt-[100px] md:px-5 w-full" />
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
