using MySql.Data.MySqlClient;
using DotNetEnv;
using System.Net.Http.Json;
using a2bapi.Models;

var builder = WebApplication.CreateBuilder(args);


Env.Load();

string dbConnectionString = $"Server={Environment.GetEnvironmentVariable("DB_SERVER")};" +
                            $"Port={Environment.GetEnvironmentVariable("DB_PORT")};" +
                            $"Database={Environment.GetEnvironmentVariable("DB_NAME")};" +
                            $"User={Environment.GetEnvironmentVariable("DB_USER")};" +
                            $"Password={Environment.GetEnvironmentVariable("DB_PASSWORD")}";


builder.Services.AddSingleton<MySqlConnection>(_ => new MySqlConnection(dbConnectionString));
builder.Services.AddHttpClient();

var app = builder.Build();

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

        // var result = await response.Content.ReadFromJsonAsync<object>();
        // return Results.Ok(result);

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

app.MapGet("/", () => "Hello World!");

app.Run();
