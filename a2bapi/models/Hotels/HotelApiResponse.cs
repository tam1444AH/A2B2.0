using System.Text.Json.Serialization;

namespace a2bapi.Models.Hotels
{
    public class HotelApiResponse
    {
        [JsonPropertyName("data")]
        public List<Hotel>? Data { get; set; }
    }
}