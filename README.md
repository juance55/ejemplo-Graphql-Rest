*Para correr los ejecrcios se necesita tener instalado Node en el equipo*
*En el terminal ejecutar el comando: npm run dev*


consulta:
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
