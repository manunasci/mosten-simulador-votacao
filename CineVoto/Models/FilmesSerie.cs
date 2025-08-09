namespace CineVoto.Api.Models;

public class FilmeSerie
{
    public int Id { get; set; }
    public string Titulo { get; set; } = string.Empty;
    public string Genero { get; set; } = string.Empty;
    public string? Descricao { get; set; }
    public string Imagem { get; set; } = string.Empty;
    public int Gostei { get; set; }
    public int NaoGostei { get; set; }
}