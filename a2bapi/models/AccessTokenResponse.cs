using System.Text.Json.Serialization;

namespace a2bapi.Models
{
    public class AccessTokenResponse
    {
        [JsonPropertyName("token_type")]
        public string? TokenType { get; set; } // Maps to "token_type" in the JSON

        [JsonPropertyName("access_token")]
        public string? AccessToken { get; set; } // Maps to "access_token" in the JSON

        [JsonPropertyName("expires_in")]
        public int ExpiresIn { get; set; } // Maps to "expires_in" in the JSON
    }
}