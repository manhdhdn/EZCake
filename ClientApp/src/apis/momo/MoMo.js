import { HmacSHA256, enc } from "crypto-js";

const MoMo = {
    createRequest: async (amount) => {
        //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
        //parameters
        var qrCodeUrl = "";
        var error = "";

        var partnerCode = "MOMO";
        var accessKey = "F8BBA842ECF85";
        var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
        var requestId = partnerCode + new Date().getTime();
        var orderId = requestId;
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

        //Create the HTTPS objects
        const encoder = new TextEncoder();

        const requestBodyString = JSON.stringify(requestBody);
        const requestBodyBytes = encoder.encode(requestBodyString);

        const headers = {
            'Content-Type': 'application/json; charset=UTF-8',
            'Content-Length': requestBodyBytes.length.toString()
        }

        //Send the request and get the response
        await fetch(
            'https://test-payment.momo.vn:443/v2/gateway/api/create',
            {
                method: "POST",
                headers: headers,
                body: requestBodyString
            }
        )
            .then(response => response.json())
            .then(data => {
                qrCodeUrl = data.qrCodeUrl;
            });

        return {
            partnerCode: partnerCode,
            requestId: requestId,
            orderId: orderId,
            signature: paymentSignature,
            qrCodeUrl: qrCodeUrl,
            error: error
        }
    },

    checkPayment: async (params) => {
        var status = -1;

        const requestBody = JSON.stringify({
            partnerCode: params.partnerCode,
            requestId: params.requestId,
            orderId: params.orderId,
            signature: params.signature,
            lang: 'en'
        });

        const encoder = new TextEncoder();

        const requestBodyString = JSON.stringify(requestBody);
        const requestBodyBytes = encoder.encode(requestBodyString);

        const headers = {
            'Content-Type': 'application/json; charset=UTF-8',
            'Content-Length': requestBodyBytes.length.toString()
        }

        await fetch(
            'https://test-payment.momo.vn/v2/gateway/api/query',
            {
                method: "POST",
                headers: headers,
                body: requestBodyString
            }
        )
            .then(response => response.json())
            .then(data => {
                status = data.resultCode;
            });

        return status;
    }
}

export default MoMo