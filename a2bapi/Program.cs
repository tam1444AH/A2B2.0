using MySql.Data.MySqlClient;
using DotNetEnv;

var builder = WebApplication.CreateBuilder(args);


Env.Load();

string dbConnectionString = $"Server={Environment.GetEnvironmentVariable("DB_SERVER")};" +
                            $"Port={Environment.GetEnvironmentVariable("DB_PORT")};" +
                            $"Database={Environment.GetEnvironmentVariable("DB_NAME")};" +
                            $"User={Environment.GetEnvironmentVariable("DB_USER")};" +
                            $"Password={Environment.GetEnvironmentVariable("DB_PASSWORD")}";


builder.Services.AddSingleton<MySqlConnection>(_ => new MySqlConnection(dbConnectionString));

var app = builder.Build();

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
