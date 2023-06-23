using System.Net;
using System.Text;

namespace EZCake.Momo
{
    public class PaymentRequest
    {
        public PaymentRequest()
        {
        }
        public static async Task<string> SendPaymentRequest(string endpoint, string postJsonString)
        {
            try
            {
                using HttpClient httpClient = new();

                var postData = new StringContent(postJsonString, Encoding.UTF8, "application/json");

                HttpResponseMessage response = await httpClient.PostAsync(endpoint, postData);

                response.EnsureSuccessStatusCode();

                string jsonResponse = await response.Content.ReadAsStringAsync();

                // todo parse it
                return jsonResponse;
                // return new MomoResponse(mtid, jsonResponse);
            }
            catch (HttpRequestException e)
            {
                return e.Message;
            }
        }

    }
}
