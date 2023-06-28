import { HmacSHA256, enc } from "crypto-js";

import API_CONFIG from "apis/services/baseConfig";

const MoMo = {
    createRequest: async (amount) => {
        //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
        //parameters
        var qrCodeUrl = "";
        var error = "";

        var partnerCode = "MOMO";
        var accessKey = "F8BBA842ECF85";
        var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
        var orderId = "EzCake" + new Date().getTime();
        var requestId = orderId;
        var orderInfo = "Pay for Cuscake";
        var redirectUrl = "https://momo.vn/return";
        var ipnUrl = "https://callback.url/notify";
        // var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
        var requestType = "captureWallet"
        var extraData = ""; //pass empty value if your merchant does not have stores

        //raw
        var rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType;
        var rawPaymentSignature = "accessKey=" + accessKey + "&orderId=" + orderId + "&partnerCode=" + partnerCode + "&requestId=" + requestId;

        //signature
        var signature = HmacSHA256(rawSignature, secretkey).toString(enc.Hex);
        var paymentSignature = HmacSHA256(rawPaymentSignature, secretkey).toString(enc.Hex);

        //json object send to MoMo endpoint
        const requestBody = JSON.stringify({
            partnerCode: partnerCode,
            accessKey: accessKey,
            requestId: requestId,
            amount: amount,
            orderId: orderId,
            orderInfo: orderInfo,
            redirectUrl: redirectUrl,
            ipnUrl: ipnUrl,
            extraData: extraData,
            requestType: requestType,
            signature: signature,
            lang: 'en'
        });

        const endpoint = "https://test-payment.momo.vn/v2/gateway/api/create";
        const postJsonString = requestBody;

        //Send the request and get the response
        const response = await fetch(
            `${API_CONFIG.endpoints.momo}`,
            {
                method: "POST",
                headers: API_CONFIG.api.headers,
                body: JSON.stringify({
                    endpoint,
                    postJsonString
                }),
            }
        );

        const data = (await response.json()).data;
        qrCodeUrl = JSON.parse(data).qrCodeUrl;

        return {
            partnerCode: partnerCode,
            requestId: requestId,
            orderId: orderId,
            signature: paymentSignature,
            lang: 'en',
            qrCodeUrl: qrCodeUrl,
            error: error
        }
    },

    checkPayment: async (params) => {
        var objectResponse = {};

        const requestBody = JSON.stringify({
            partnerCode: params.partnerCode,
            requestId: params.requestId,
            orderId: params.orderId,
            signature: params.signature,
            lang: params.lang
        });

        const endpoint = "https://test-payment.momo.vn/v2/gateway/api/query";
        const postJsonString = requestBody;

        const response = await fetch(
            `${API_CONFIG.endpoints.momo}`,
            {
                method: "POST",
                headers: API_CONFIG.api.headers,
                body: JSON.stringify({
                    endpoint,
                    postJsonString
                })
            }
        );

        const data = (await response.json()).data;
        objectResponse = JSON.parse(data);

        return objectResponse;
    },

    refund: async (order) => {
        var objectResponse = {};

        var accessKey = "F8BBA842ECF85";
        var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
        var orderId = "EzCake" + new Date().getTime();
        var requestId = orderId;
        var message = "Hoàn tiền hủy đơn hàng tại EzCake";

        var payment = await MoMo.checkPayment(order.payment);

        var rawSignature = "accessKey=" + accessKey + "&amount=" + payment.amount + "&description=" + message + "&orderId=" + orderId + "&partnerCode=" + payment.partnerCode + "&requestId=" + requestId + "&transId=" + payment.transId;
        var signature = HmacSHA256(rawSignature, secretkey).toString(enc.Hex);

        const requestBody = JSON.stringify({
            partnerCode: payment.partnerCode,
            orderId,
            requestId,
            amount: payment.amount,
            transId: payment.transId,
            lang: order.payment.lang,
            description: message,
            signature: signature
        })

        const endpoint = "https://test-payment.momo.vn/v2/gateway/api/refund";
        const postJsonString = requestBody;

        const response = await fetch(
            `${API_CONFIG.endpoints.momo}`,
            {
                method: "POST",
                headers: API_CONFIG.api.headers,
                body: JSON.stringify({
                    endpoint,
                    postJsonString
                })
            }
        );

        const data = (await response.json()).data;
        // console.log(JSON.parse(requestBody));
        // console.log(data);
        objectResponse = JSON.parse(data);

        return objectResponse.resultCode;
    }
}

export default MoMo