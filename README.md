# Ejemplo en Python

- cd GRAPHQL-example-Student

*Instalar* paquetes
pip install flask flask-graphql graphene graphene-sqlalchemy flask-sqlalchemy

*Ejecutar* el codigo
python app.py

abrir la siguiente direccion
http://127.0.0.1:5000/graphql

*Ejemplos:*
*Listar* todos los elementos
query{
   users{
     id
     name
     lastname
     age
     email
     createdAt
   }
}

*Listar* por id
query{
   users(id:1){
     id
     name
     lastname
     age
     email
     createdAt
   }
}

*Ingreso* de datos
mutation{
   createStudent(name:"Caroline",lastname:"Lucas",age:22,email:"carolineliseth18@gmail.com"){
     user{
       id
       name
       lastname
       age
       email
       createdAt
     }
   }
}

*Actualización* de datos
mutation{
   updateStudent(id:2,name:"Josthen",lastname:"Avila",age:24,email:"josavi@gmail.com"){
     user{
       id
       name
       lastname
       age
       email
     }
   }
}

*Eliminación* de los datos
mutation{
   deleteStudent(id:2){
     success
   }
}


# Ejemplo Javascript

======================

- Para correr los ejercicios se necesita tener instalado Node en el equipo
- En el terminal ejecutar el comando: 
    - cd ejemplo-Graphql
    - npm run dev

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