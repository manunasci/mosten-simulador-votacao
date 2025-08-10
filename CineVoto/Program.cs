using Microsoft.Extensions.Configuration; // GetValue<T>
using CineVoto.Api.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<FilmesRepo, FilmesRepo>();

builder.Services.AddCors(opt =>
{
    opt.AddPolicy("frontend",
        p => p.AllowAnyHeader()
              .AllowAnyMethod()
              .AllowAnyOrigin());
});

// Lê a porta HTTPS de env/config (funciona com os perfis do launchSettings.json)
int? httpsPort = builder.Configuration.GetValue<int?>("ASPNETCORE_HTTPS_PORT")
    ?? builder.Configuration.GetValue<int?>("HTTPS_PORT");

if (httpsPort.HasValue)
{
    builder.Services.AddHttpsRedirection(o => o.HttpsPort = httpsPort.Value);
}

var app = builder.Build();

if (app.Environment.IsDevelopment()) 
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

if (httpsPort.HasValue)
{
    app.UseHttpsRedirection();
}

app.UseCors("frontend");

app.MapControllers();

app.Run();
