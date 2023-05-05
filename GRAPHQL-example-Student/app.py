from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_graphql import GraphQLView
from graphene import ObjectType, String, ID, Schema, List, Field, Mutation, Int, Boolean
from models import db, StudentModel as User

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db.init_app(app)

with app.app_context():
    db.create_all()


class StudentObject(ObjectType):
    id = ID()
    name = String()
    lastname = String()
    age = Int()
    email = String()
    created_at = String()


class Query(ObjectType):
    users = List(StudentObject, id=Int())

    def resolve_users(self, info, id=None):
        if id:
            return User.query.filter_by(id=id).all()
        else:
            return User.query.all()


class CreateStudent(Mutation):
    class Arguments:
        name = String(required=True)
        lastname = String(required=True)
        age = Int(required=True)
        email = String(required=True)

    user = Field(lambda: StudentObject)

    def mutate(self, info, name, lastname, age, email):
        user = User(name=name, lastname=lastname, age=age, email=email)
        db.session.add(user)
        db.session.commit()
        return CreateStudent(user=user)


class UpdateStudent(Mutation):
    class Arguments:
        id = Int(required=True)
        name = String()
        lastname = String()
        age = Int()
        email = String()

    user = Field(lambda: StudentObject)

    def mutate(self, info, id, name=None, lastname=None, age=None, email=None):
        user = User.query.filter_by(id=id).first()
        if user:
            if name:
                user.name = name
            if lastname:
                user.lastname = lastname
            if age:
                user.age = age
            if email:
                user.email = email
            db.session.commit()
            return UpdateStudent(user=user)
        else:
            return UpdateStudent(user=None)


class DeleteStudent(Mutation):
    class Arguments:
        id = Int(required=True)

    success = Boolean()

    def mutate(self, info, id):
        user = User.query.filter_by(id=id).first()

        if not user:
            return DeleteStudent(success=False)

        db.session.delete(user)
        db.session.commit()

        return DeleteStudent(success=True)


class Mutation(ObjectType):
    create_student = CreateStudent.Field()
    update_student = UpdateStudent.Field()
    delete_student = DeleteStudent.Field()


schema = Schema(query=Query, mutation=Mutation)


@app.route('/')
def index():
    return 'Ejemplo de Graphql. Use la siguiente URL: http://127.0.0.1:5000/graphql'


app.add_url_rule(
    '/graphql', view_func=GraphQLView.as_view('graphql', schema=schema, graphiql=True))

if __name__ == '__main__':
    with app.app_context():
        app.run(debug=True)
