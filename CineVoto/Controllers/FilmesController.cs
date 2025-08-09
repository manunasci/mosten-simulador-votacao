using CineVoto.Api.Data;
using CineVoto.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace CineVoto.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class FilmesController : ControllerBase
{
    private readonly IFilmesRepo _repo;
    public FilmesController(IFilmesRepo repo) => _repo = repo;

    [HttpGet]
    public async Task<IActionResult> Get() =>
        Ok(await _repo.GetAllAsync());

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] FilmeSerie novo)
    {
        if (string.IsNullOrWhiteSpace(novo.Titulo) ||
            string.IsNullOrWhiteSpace(novo.Genero) ||
            string.IsNullOrWhiteSpace(novo.Imagem))
            return BadRequest("Campos obrigatórios: Titulo, Genero, Imagme.");

        var id = await _repo.CreateAsync(novo);
        novo.Id = id;
        return CreatedAtAction(nameof(Get), new { id }, novo);
    }

    [HttpPost("Voto/{id:int}/gostei")]
    public async Task<IActionResult> VotarGostei(int id) =>
        (await _repo.VotarGosteiAsync(id)) ? NoContent() : NotFound();

    [HttpPost("Voto/{id:int}/naogostei")]
    public async Task<IActionResult> VotarNaoGostei(int id) =>
        (await _repo.VotarNaoGosteiAsync(id)) ? NoContent() : NotFound();

    [HttpGet("totais")]
    public async Task<IActionResult> Totais()
    {
        var (positivos, negativos) = await _repo.GetTotaisAsync();
        return Ok(new { positivos, negativos });
    }
}