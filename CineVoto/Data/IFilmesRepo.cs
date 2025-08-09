using CineVoto.Api.Models;

namespace CineVoto.Api.Data;

public interface IFilmesRepo
{
    Task<IEnumerable<FilmeSerie>> GetAllAsync();
    Task<int> CreateAsync(FilmeSerie item);
    Task<bool> VotarGosteiAsync(int id);
    Task<bool> VotarNaoGosteiAsync(int id);
    Task<(int positivos, int negativos)> GetTotaisAsync();
}