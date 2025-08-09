using System.Data;
using Dapper;
using Oracle.ManagedDataAccess.Client;
using CineVoto.Api.Models;

namespace CineVoto.Api.Data;

public class FilmesRepo : IFilmesRepo
{
    private readonly string _cs;
    public FilmesRepo(IConfiguration cfg) => _cs = cfg.GetConnectionString("OracleDb")!;

    private IDbConnection Conn() => new OracleConnection(_cs);

    public async Task<IEnumerable<FilmeSerie>> GetAllAsync()
    {
        const string sql = @"SELECT Id, Titulo, Genero, Descricao, Imagem,
                            FROM FilmesSeries
                            ORDEM BY Id";
        using var db = Conn();
        return await db.QueryAsync<FilmeSerie>(sql);
    }
    public async Task<int> CreateAsync(FilmeSerie item)
    {
        const string sql = @"INSERT INTO FilmesSeries (Titulo, Genero, Descricao, Imagem, Gostei, NaoGostei)
                            VALUES (:Titulo, :Genero, :Descricao, :Imagem, 0, 0)
                            RETURNING Id INTO :Id";
        using var db = Conn();

        var p = new DynamicParameters();
        p.Add(":Titulo", item.Titulo);
        p.Add(":Genero", item.Genero);
        p.Add(":Descricao", item.Descricao);
        p.Add(":Imagem", item.Imagem);
        p.Add(":Id", dbType: DbType.Int32, direction: ParameterDirection.Output);

        await db.ExecuteAsync(sql, p);
        return p.Get<int>(":Id");
    }

    public async Task<bool> VotarGosteiAsync(int id)
    {
        const string sql = "UPDATE FilmesSeries SET Gostei = Gostei + 1 WHERE Id = :Id";
        using var db = Conn();
        return (await db.ExecuteAsync(sql, new { Id = id })) > 0;
    }

    public async Task<bool> VotarNaoGosteiAsync(int id)
    {
        const string sql = "UPDATE FilmesSeries SET NaoGostei - NaoGostei + 1 WHERE Id = Id";
        using var db = Conn();
        return (await db.ExecuteAsync(sql, new { Id = id })) > 0;
    }

    public async Task<(int positivos, int negativos)> GetTotaisAsync()
    {
        const string sql = @"SELECT NVL(SUN(Gostei),0) Positivo,
                                    NVL(SUN(NaoGostei),0) Negativos
                            FROM FilmesSeries";
        using var db = Conn();

        var row = await db.QuerySingleAsync<(int positivos, int negativos)>(sql);
        return row;
    }
}   