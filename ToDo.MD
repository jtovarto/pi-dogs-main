# Endpoints
- [https://api.thedogapi.com/v1/breeds](https://api.thedogapi.com/v1/breeds)
- [https://api.thedogapi.com/v1/breeds/search?q={raza_perro}](https://api.thedogapi.com/v1/breeds/search?q={raza_perro})

<br>

# Backend
- [ ] Debe tener un ruta '/dogs'
    - [ ] Debe devolver razas
    - [ ] Debe devolver solo los datos para la ruta principal del frontend
- [ ] Debe tener un ruta '/dogs?name='
    - [ ] debe devolver razas filtradas por name
    - [ ] Si no existe una raza mostrar un mensaje adecuado
- [ ] Debe tener un ruta '/dogs/{idRaza}'
    - [ ] Debe retornar una raza en detalle
    - [ ] Debe retornar solo los datos de detalles de raza
- [ ] Debe tener un ruta '/dog'
    - [ ] Recibe los datos recolectados del formulario
    - [ ] Crea una raza dentro

<br>

# Frontend
- [ ] Debe tener una Landing Page (Pagina Inicial)
  - [ ] Debe tener una imagen de fondo
  - [ ] Debe tener un boton de ingreso a home

- [ ] Ruta Principal
  - [ ] Debe tener un input de busqueda
  - [ ] Debe tener un listado de razas
    - [ ] Debe mostrar Imagen
    - [ ] Debe mostrar Nombre
    - [ ] Debe mostrar Temperamento
    - [ ] Debe tener Peso
  - [ ] Botones de Filtrado
    - [ ] Por Temperamento
    - [ ] Por Raza
  - [ ] Botones de Ordenamiento
    - [ ] Por orden alfabetico
    - [ ] Por peso
  - [ ] Debe paginar mostrando 8 por paginas

- [ ] Ruta de Detalle
  - [ ] Mostrar Imagen, Nombre y Temperamento
  - [ ] Mostrar Altura
  - [ ] Mostrar Peso
  - [ ] Mostrar Años de vida

- [ ] Ruta de creacion de Raza
  - [ ] Debe tener un formulario controlado
  - [ ] Debe tener un input para nomber
  - [ ] Debe tener un input para altura
    - [ ] Diferenciar entre min y max
  - [ ] Debe tener un input para años de vida
  - [ ] Debe tener un input para agregar uno o varios temperamentos
  - [ ] Boton de crear
  - Validaciones con javascript

<br>

  # Base de Datos
  - [ ] Breeds
    - [ ] Debe tener un ID
     - [ ] Requerido
    - [ ] Debe tener un Nombre
        - [ ] Requerido
    - [ ] Debe tener un Altura
        - [ ] Requerido
    - [ ] Debe tener un Peso
        - [ ] Requerido
    - [ ] Debe tener años de vida
        - [ ] Nullable

- [ ] Temperament
    - [ ] Debe tener un ID
    - [ ] Debe tener un Nombre

- [ ] La relacion debe ser muchos a muchos

<br>

# Testing
- [ ] Al menos un component con test
- [ ] Al menos un backend con test
- [ ] Al menos un modelo con test
