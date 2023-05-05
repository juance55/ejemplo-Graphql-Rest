## Ejemplo Javascript

======================

- Para correr los ejercicios se necesita tener instalado Node en el equipo
- En el terminal ejecutar el comando: 
    cd ejemplo-Graphql
    npm run dev

- consulta:
{
  authors{
    id
    name
    books{
      title
      reviews{
        text
        id
      }
    }
  }
}