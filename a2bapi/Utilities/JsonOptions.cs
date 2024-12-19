namespace a2bapi.Utilities
{
    public static class JsonOptions
    {
        public static readonly System.Text.Json.JsonSerializerOptions Default = new System.Text.Json.JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };
    }
}