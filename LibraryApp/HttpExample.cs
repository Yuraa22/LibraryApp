using LibraryApp.Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace LibraryApp
{
    public class HttpExample
    {
        private HttpClient Client { get; set; }

        public HttpExample()
        {

            Client = new HttpClient();
            string AuthorizationHeader = Environment.GetEnvironmentVariable("MICROBLINK_TOKEN");
            Client.DefaultRequestHeaders.Add("Authorization", AuthorizationHeader);
        }


        /// Make a dummy request
        public async Task<User> MakePostRequest()
        {
            string url = "https://api.microblink.com/v1/recognizers/mrz-id";

            //string json = @"{
            //    ""returnFullDocumentImage"": false,
            //    ""returnFaceImage"": false,
            //    ""returnSignatureImage"": false,
            //    ""imageSource"": ""https://storage.googleapis.com/microblink-data-public/microblink-api/test-set/blinkid/CRO_ID_BACK/CRO_ID_BACK_sample_with_disclaimer.jpg""
            //}";

            //MrzIdRequest content = (MrzIdRequest)JsonConvert.DeserializeObject(json);

            MrzIdRequest content = new MrzIdRequest()
            {
                returnFullDocumentImage = false,
                returnFaceImage = false,
                returnSignatureImage = false,
                imageSource = "https://storage.googleapis.com/microblink-data-public/microblink-api/test-set/blinkid/CRO_ID_BACK/CRO_ID_BACK_sample_with_disclaimer.jpg"
            };

            User user = await PostAsync(content, url);
            return user;
        }

        /// Performs a POST Request
        public async Task<User> PostAsync(MrzIdRequest content, string url)
        {
            //Serialize Object
            StringContent jsonContent = SerializeObject(content);

            //Execute POST request
            HttpResponseMessage response = await Client.PostAsync(url, jsonContent);
            User user = await DeserializeObject(response);
            return user;
        }

        /// Serialize an object to Json
        private StringContent SerializeObject(MrzIdRequest content)
        {
            //Serialize Object
            string jsonObject = JsonConvert.SerializeObject(content);

            //Create Json UTF8 String Content
            return new StringContent(jsonObject, Encoding.UTF8, "application/json");
        }

        /// Deserialize object from request response
        private async Task<User> DeserializeObject(HttpResponseMessage response)
        {
            //Read body 
            string responseBody = await response.Content.ReadAsStringAsync();

            //Deserialize Body to object
            var result = (JObject)JsonConvert.DeserializeObject(responseBody);
            string OCR = result["result"]["mrzData"]["rawMrzString"].ToString();
            User user = Utility.ParseOCRData(OCR);
            return user;
        }
    }
}
