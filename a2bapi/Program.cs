using MySql.Data.MySqlClient;
using DotNetEnv;
using a2bapi.Models;
using Microsoft.AspNetCore.Diagnostics;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);


Env.Load();

string dbConnectionString = $"Server={Environment.GetEnvironmentVariable("DB_SERVER")};" +
                            $"Port={Environment.GetEnvironmentVariable("DB_PORT")};" +
                            $"Database={Environment.GetEnvironmentVariable("DB_NAME")};" +
                            $"User={Environment.GetEnvironmentVariable("DB_USER")};" +
                            $"Password={Environment.GetEnvironmentVariable("DB_PASSWORD")}";


builder.Services.AddSingleton<MySqlConnection>(_ => new MySqlConnection(dbConnectionString));
builder.Services.AddHttpClient();
builder.Logging.AddConsole();
builder.Logging.AddDebug();


var corsPolicyName = "AllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(corsPolicyName, policy =>
    {
        policy.WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
    
});

var app = builder.Build();

app.UseCors(corsPolicyName);
app.UseExceptionHandler("/error");
app.Map("/error", (HttpContext context) =>
{
    var exception = context.Features.Get<IExceptionHandlerFeature>()?.Error;
    return Results.Problem(exception?.Message ?? "An unknown error occured");
});

app.MapGet("/flights/{from}-{to}", async (string from, string to, IHttpClientFactory httpClientFactory) => 
{
    var apiKey = Environment.GetEnvironmentVariable("API_ACCESS_KEY");

    if (string.IsNullOrEmpty(apiKey)) {
        return Results.Problem("API access key is not set.");
    }

    var client = httpClientFactory.CreateClient();
    var url = "http://api.aviationstack.com/v1/flights";

    var query = new Dictionary<string, string>
    {
        { "access_key", apiKey },
        { "dep_iata", from.Trim().ToUpper() },
        { "arr_iata", to.Trim().ToUpper() }
    };

    try {
        var response = await client.GetAsync($"{url}?{string.Join("&", query.Select(kvp => $"{kvp.Key}={kvp.Value}"))}");

        if (!response.IsSuccessStatusCode) {
            var error = await response.Content.ReadAsStringAsync();
            return Results.Problem($"Error fetching flights: {error}");
        }

        var responseJson = await response.Content.ReadFromJsonAsync<FlightsResponse>();

        if (responseJson?.Data == null || responseJson.Data.Count == 0) {
            return Results.Ok(new { Message = "No flights found for the specified route."});
        }

        return Results.Ok(responseJson.Data);
    }
    catch (Exception ex) {
        return Results.Problem($"Error fetching flights: {ex.Message}");
    }

});

app.MapGet("/test-db", async (MySqlConnection dbConnection) =>
{
    try
    {
        await dbConnection.OpenAsync();
        return Results.Ok("Database connection successful!");
    }
    catch (Exception ex)
    {
        return Results.Problem($"Database connection failed: {ex.Message}");
    }
});

static async Task<string> GetAccessTokenAsync(IHttpClientFactory httpClientFactory)
{
    var apiKey = Environment.GetEnvironmentVariable("AMADEUS_API_KEY");
    var apiSecret = Environment.GetEnvironmentVariable("AMADEUS_API_SECRET");

    if (string.IsNullOrEmpty(apiKey) || string.IsNullOrEmpty(apiSecret))
    {
        throw new Exception("Amadeus API credentials are missing.");
    }

    var client = httpClientFactory.CreateClient();
    var tokenUrl = "https://test.api.amadeus.com/v1/security/oauth2/token";
    var authHeader = Convert.ToBase64String(System.Text.Encoding.ASCII.GetBytes($"{apiKey}:{apiSecret}"));

    var content = new FormUrlEncodedContent(new Dictionary<string, string>
    {
        { "grant_type", "client_credentials" }
    });

    client.DefaultRequestHeaders.Add("Authorization", $"Basic {authHeader}");

    var response = await client.PostAsync(tokenUrl, content);

    if (!response.IsSuccessStatusCode)
    {
        var error = await response.Content.ReadAsStringAsync();
        throw new Exception($"Failed to get access token: {error}");
    }

    var jsonResponse = await response.Content.ReadAsStringAsync();
    Console.WriteLine($"Token Response: {jsonResponse}");

    var tokenResponse = JsonSerializer.Deserialize<AccessTokenResponse>(jsonResponse);

    return tokenResponse?.AccessToken ?? throw new Exception("Access token not found in response.");
}


app.MapGet("/hotels/{to}-{dist}-{stars}", async (string to, string dist, string stars, IHttpClientFactory httpClientFactory) =>
{
    
    try {

        to = to.ToUpper();

        Console.WriteLine("Starting GetAccessTokenAsync...");
        var accessToken = await GetAccessTokenAsync(httpClientFactory);
        Console.WriteLine($"Retrieved Access Token: {accessToken}");

        var client = httpClientFactory.CreateClient();
        var hotelApiUrl = "https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city";

        var queryParameters = new Dictionary<string, string>
        {
            { "cityCode", to },
            { "radius", dist },
            { "radiusUnit", "MILE" },
            { "ratings", stars },
            { "hotelSource", "ALL" }
        };

        var queryString = string.Join("&", queryParameters.Select(kvp => $"{kvp.Key}={Uri.EscapeDataString(kvp.Value)}"));
        var requestUrl = $"{hotelApiUrl}?{queryString}";
        Console.WriteLine($"Request URL: {requestUrl}");

        client.DefaultRequestHeaders.Add("Authorization", $"Bearer {accessToken}");
        var response = await client.GetAsync(requestUrl);

        if (!response.IsSuccessStatusCode) 
        {

            var error = await response.Content.ReadAsStringAsync();
            Console.WriteLine($"Error Response: {error}");
            return Results.Problem($"Error fetching hotels: {error}");

        }

        var jsonString = await response.Content.ReadAsStringAsync();
        Console.WriteLine($"Hotel API Response: {jsonString}");
        
        var hotelResponse = JsonSerializer.Deserialize<a2bapi.Models.Hotels.HotelApiResponse>(jsonString);
        

        if (hotelResponse?.Data == null)
        {
            return Results.Problem("No hotels found.");
        }

        return Results.Ok(hotelResponse.Data);

    }
    catch (Exception ex) {

        Console.WriteLine($"Error: {ex.Message}");
        return Results.Problem($"Error: {ex.Message}");
        
    }
});



app.MapGet("/", () => "Hello World!");

app.Run();
