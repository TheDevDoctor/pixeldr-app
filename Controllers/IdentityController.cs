using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using Newtonsoft.Json;

namespace PixelDrApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IdentityController : Controller
    {
        private readonly AzureADB2CGraphOptions _b2cOptions;
        private readonly LogicAppOptions _logicAppOptions;

        public IdentityController(IOptions<AzureADB2CGraphOptions> b2cOptions, IOptions<LogicAppOptions> logicAppOptions)
        {
            _b2cOptions = b2cOptions.Value;
            _logicAppOptions = logicAppOptions.Value;
        }
        
        /*[HttpGet("{objectId}", Name = "CreateUser")]
        public async Task<string> CreateUser(string objectId)
        {
            AzureADB2CGraphClient b2cGraphClient = new AzureADB2CGraphClient();
            b2cGraphClient.CreateCredentials(_b2cOptions);
            string signInName = await b2cGraphClient.GetUserSignInNameByObjectId(objectId);

            
        }*/
    }

    public class AzureADB2CGraphOptions
    {
        public string Instance { get; set; }
        public string GraphResourceId { get; set; }
        public string GraphEndpoint { get; set; }
        public string GraphSuffix { get; set; }
        public string GraphVersion { get; set; }
        public string Tenant { get; set; }
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
    }

    public class LogicAppOptions
    {
        public string NewUserSignUpEndpoint { get; set; }
        public string ReportABugEndpoint { get; set; }
    }

    public class AzureADB2CGraphClient
    {
        private static AuthenticationContext authContext;
        private static ClientCredential credential;
        private static AzureADB2CGraphOptions graphOptions;
        public void CreateCredentials(AzureADB2CGraphOptions b2cOptions)
        {
            authContext = new AuthenticationContext(b2cOptions.Instance + b2cOptions.Tenant);
            credential = new ClientCredential(b2cOptions.ClientId, b2cOptions.ClientSecret);
            graphOptions = b2cOptions;
        }

        public async Task<string> GetUserSignInNameByObjectId(string objectId)
        {
            return await SendGraphGetRequest("/users/" + objectId + "/signInNames", null);
        }

        public static async Task<string> CreateUser(string json)
        {
            return await SendGraphPostRequest("/users", json);
        }

        public async Task<string> UpdateUser(string userUPN, string json)
        {
            return await SendGraphPatchRequest("/users/" + userUPN, json);
        }

        private static async Task<string> SendGraphPatchRequest(string api, string json)
        {
            // NOTE: This client uses ADAL v2, not ADAL v4
            AuthenticationResult result = await authContext.AcquireTokenAsync(graphOptions.GraphResourceId, credential);
            HttpClient http = new HttpClient();
            string url = graphOptions.GraphEndpoint + graphOptions.Tenant + api + "?" + graphOptions.GraphVersion;

            HttpRequestMessage request = new HttpRequestMessage(new HttpMethod("PATCH"), url);
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", result.AccessToken);
            request.Content = new StringContent(json, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await http.SendAsync(request);

            if (!response.IsSuccessStatusCode)
            {
                string error = await response.Content.ReadAsStringAsync();
                object formatted = JsonConvert.DeserializeObject(error);
                throw new WebException("Error Calling the Graph API: \n" + JsonConvert.SerializeObject(formatted, Formatting.Indented));
            }

            return await response.Content.ReadAsStringAsync();
        }

        public static async Task<string> SendGraphGetRequest(string api, string query)
        {
            // First, use ADAL to acquire a token using the app's identity (the credential)
            // The first parameter is the resource we want an access_token for; in this case, the Graph API.
            AuthenticationResult result = await authContext.AcquireTokenAsync("https://graph.windows.net", credential);

            // For B2C user managment, be sure to use the 1.6 Graph API version.
            HttpClient http = new HttpClient();
            string url = "https://graph.windows.net/" + graphOptions.Tenant + api + "?" + graphOptions.GraphVersion;
            if (!string.IsNullOrEmpty(query))
            {
                url += "&" + query;
            }

            // Append the access token for the Graph API to the Authorization header of the request, using the Bearer scheme.
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, url);
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", result.AccessToken);
            HttpResponseMessage response = await http.SendAsync(request);

            if (!response.IsSuccessStatusCode)
            {
                string error = await response.Content.ReadAsStringAsync();
                object formatted = JsonConvert.DeserializeObject(error);
                throw new WebException("Error Calling the Graph API: \n" + JsonConvert.SerializeObject(formatted, Formatting.Indented));
            }

            return await response.Content.ReadAsStringAsync();
        }

        private static async Task<string> SendGraphPostRequest(string api, string json)
        {
            // NOTE: This client uses ADAL v2, not ADAL v4
            AuthenticationResult result = await authContext.AcquireTokenAsync(graphOptions.GraphResourceId, credential);
            HttpClient http = new HttpClient();
            string url = graphOptions.GraphEndpoint + graphOptions.Tenant + api + "?" + graphOptions.GraphVersion;

            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, url);
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", result.AccessToken);
            request.Content = new StringContent(json, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await http.SendAsync(request);

            if (!response.IsSuccessStatusCode)
            {
                string error = await response.Content.ReadAsStringAsync();
                object formatted = JsonConvert.DeserializeObject(error);
                throw new WebException("Error Calling the Graph API: \n" + JsonConvert.SerializeObject(formatted, Formatting.Indented));
            }

            return await response.Content.ReadAsStringAsync();
        }
    }
}