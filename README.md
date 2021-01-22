# STAR WARS API - Replica

Réplica de [SWAPI](http://swapi.py4e.com/). Desarollado utilizando Serverless Framework + DynamoDB y desplegado en AWS
Lambda.

## Rutas desplegadas

- POST https://ho5wqkylj0.execute-api.us-east-1.amazonaws.com/dev/planets

```json
{
  "nombre": "Tatooine",
  "periodoRotacion": "23",
  "periodoOrbital": "304",
  "diametro": "10465",
  "clima": "arid",
  "gravedad": "1 standard",
  "terreno": "desert",
  "aguaSuperficie": "1",
  "poblacion": "200000",
  "residentes": [
    "https://swapi.py4e.com/api/people/1/",
    "https://swapi.py4e.com/api/people/2/",
    "https://swapi.py4e.com/api/people/4/",
    "https://swapi.py4e.com/api/people/6/",
    "https://swapi.py4e.com/api/people/7/",
    "https://swapi.py4e.com/api/people/8/",
    "https://swapi.py4e.com/api/people/9/",
    "https://swapi.py4e.com/api/people/11/",
    "https://swapi.py4e.com/api/people/43/",
    "https://swapi.py4e.com/api/people/62/"
  ],
  "peliculas": [
    "https://swapi.py4e.com/api/films/1/",
    "https://swapi.py4e.com/api/films/3/",
    "https://swapi.py4e.com/api/films/4/",
    "https://swapi.py4e.com/api/films/5/",
    "https://swapi.py4e.com/api/films/6/"
  ],
  "ruta": "https://swapi.py4e.com/api/planets-api/1/"
}
```

- GET https://ho5wqkylj0.execute-api.us-east-1.amazonaws.com/dev/planets
- GET https://ho5wqkylj0.execute-api.us-east-1.amazonaws.com/dev/planets/653902e0-5c7b-11eb-bde3-7b954e3da209
- PATCH https://ho5wqkylj0.execute-api.us-east-1.amazonaws.com/dev/planets/653902e0-5c7b-11eb-bde3-7b954e3da209

```json
{
  "periodoOrbital": "300",
  "periodoRotacion": "20"
}
```

- DELETE https://ho5wqkylj0.execute-api.us-east-1.amazonaws.com/dev/planets/653902e0-5c7b-11eb-bde3-7b954e3da209 
