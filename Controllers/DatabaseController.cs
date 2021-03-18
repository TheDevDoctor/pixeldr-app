using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Net;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace PixelDrApp.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class DatabaseController : Controller
    {
        // Dependency inject to get cosmos DB creds from appsettings.json
        private readonly CosmosDBOptions _cosmosDBOptions;
        private CosmosDBClient cosmosDBClient;

        public DatabaseController(IOptions<CosmosDBOptions> cosmosDBOptions)
        {
            _cosmosDBOptions = cosmosDBOptions.Value;
            this.cosmosDBClient = new CosmosDBClient(_cosmosDBOptions.URI, _cosmosDBOptions.Key);
        }
        
        // APIs to pull and push data from cosmos DB =======================================================================
        [HttpGet("{collection}/{documentId}", Name = "GetDocument")]
        public async Task<ActionResult> GetDocument(string collection, string documentId)
        {
            return await cosmosDBClient.GetDocument(_cosmosDBOptions.DatabaseName, collection, documentId);
        }

        [HttpGet("{collection}/{query}", Name = "QueryDocuments")]
        public ActionResult QueryDocuments(string collection, string query)
        {
            return cosmosDBClient.QueryDocuments(_cosmosDBOptions.DatabaseName, collection, query);
        }

        [HttpPost("{collection}", Name = "CreateIfNotExists")]
        public async Task<ActionResult> CreateIfNotExists(string collection, [FromBody]JObject jsonContent)
        {
            return await cosmosDBClient.CreateDocumentIfNotExists(_cosmosDBOptions.DatabaseName, collection, jsonContent);
        }

        [HttpPost("{collection}", Name = "UpdateDocument")]
        public async Task<ActionResult> UpdateDocument(string collection, [FromBody]JObject jsonContent)
        {
            return await cosmosDBClient.UpdateDocument(_cosmosDBOptions.DatabaseName, collection, jsonContent);
        }

        [HttpDelete("{collection}/{documentId}", Name = "DeleteDocument")]
        public async Task<ActionResult> DeleteDocument(string collection, string documentId)
        {
            return await cosmosDBClient.DeleteDocument(_cosmosDBOptions.DatabaseName, collection, documentId);
        }
    }

    // Cosmos DB methods ===================================================================================================
    public class CosmosDBOptions
    {
        public string URI { get; set; }
        public string Key { get; set; }
        public string DatabaseName { get; set; }
    }

    public class CosmosDBClient
    {
        private DocumentClient documentClient;

        public CosmosDBClient(string uri, string key)
        {
            this.documentClient = new DocumentClient(new Uri(uri), key);
        }

        public async Task<ActionResult> CreateDocumentIfNotExists(string databaseName, string collectionName, JObject jsonDocument)
        {
            try
            {
                if (jsonDocument.ContainsKey("id"))
                {
                    var result = await this.documentClient.ReadDocumentAsync(UriFactory.CreateDocumentUri(databaseName, collectionName, jsonDocument.Value<string>("id")));
                    return new BadRequestObjectResult("Document with the 'id' specified already exists.");
                }
                else
                {
                    return new BadRequestObjectResult("No valid 'id' field found in the document provided.");
                }
            }
            catch (DocumentClientException de)
            {
                if (de.StatusCode == HttpStatusCode.NotFound)
                {
                    try
                    {
                        var result = await this.documentClient.CreateDocumentAsync(UriFactory.CreateDocumentCollectionUri(databaseName, collectionName), jsonDocument);
                        return new OkResult();
                    }
                    catch(Exception ex)
                    {
                        return new BadRequestObjectResult(ex.Message);
                    }
                }
                else
                {
                    return new BadRequestObjectResult("Unable to create document. The document may already exist.");
                }
            }
        }

        public async Task<ActionResult> GetDocument(string databaseName, string collectionName, string documentId)
        {
            try
            {
                var result = await this.documentClient.ReadDocumentAsync(UriFactory.CreateDocumentUri(databaseName, collectionName, documentId));
                return new JsonResult(result.Resource);
            }
            catch (DocumentClientException de)
            {
                return new BadRequestObjectResult(de.Message);
            }
        }

        public async Task<ActionResult> UpdateDocument(string databaseName, string collectionName, JObject jsonDocument)
        {
            try
            {
                if (jsonDocument.ContainsKey("id"))
                {
                    var result = await this.documentClient.ReplaceDocumentAsync(UriFactory.CreateDocumentUri(databaseName, collectionName, jsonDocument.Value<string>("id")), jsonDocument);
                    return new OkResult();
                }
                else
                {
                    return new BadRequestObjectResult("No valid 'id' field found in the document provided.");
                }
            }
            catch (DocumentClientException de)
            {
                return new BadRequestObjectResult(de.Message);
            }
        }

        public ActionResult QueryDocuments(string databaseName, string collectionName, string query)
        {
            try
            {
                var result = this.documentClient.CreateDocumentQuery(
                    UriFactory.CreateDocumentCollectionUri(databaseName, collectionName),
                    query);
                return new JsonResult(result);
            }
            catch (DocumentClientException de)
            {
                return new BadRequestObjectResult(de.Message);
            }
        }

        public async Task<ActionResult> DeleteDocument(string databaseName, string collectionName, string documentId)
        {
            try
            {
                var result = await this.documentClient.DeleteDocumentAsync(UriFactory.CreateDocumentUri(databaseName, collectionName, documentId));
                return new OkResult();
            }
            catch (DocumentClientException de)
            {
                return new BadRequestObjectResult(de.Message);
            }
        }
    }
}
