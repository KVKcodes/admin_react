from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///employees.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
CORS(app)

# Define Employee model
class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    position = db.Column(db.String(100), nullable=False)
    salary = db.Column(db.Float, nullable=False)

    def __repr__(self):
        return f'<Employee {self.name}>'

# Create database tables within the application context
with app.app_context():
    db.create_all()

    # Pre-fill the database with sample data
    sample_data = [
        {"name": "Atif Hussain", "position": "Data Analyst", "salary": 75000},
        {"name": "Somitav Mishra", "position": "Business Analyst", "salary": 65000},
        # Include other sample data here
    ]

    for data in sample_data:
        employee = Employee(name=data["name"], position=data["position"], salary=data["salary"])
        db.session.add(employee)

    db.session.commit()

@app.route('/employees/delete_all', methods=['DELETE'])
def delete_all_employees():
    try:
        # Execute a DELETE operation to remove all records from the employee table
        db.session.query(Employee).delete()
        db.session.commit()
        return jsonify({'message': 'Employee table emptied successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


# Routes for CRUD operations
@app.route('/employees', methods=['GET'])
def get_employees():
    employees = Employee.query.all()
    result = [{'id': employee.id, 'name': employee.name, 'position': employee.position, 'salary': employee.salary} for employee in employees]
    return jsonify(result)

@app.route('/employees/<int:id>', methods=['GET'])
def get_employee(id):
    employee = Employee.query.get_or_404(id)
    return jsonify({'id': employee.id, 'name': employee.name, 'position': employee.position, 'salary': employee.salary})

@app.route('/employees', methods=['POST'])
def add_employee():
    data = request.get_json()
    employee = Employee(name=data['name'], position=data['position'], salary=data['salary'])
    db.session.add(employee)
    db.session.commit()
    return jsonify({'message': 'Employee added successfully'}), 201

@app.route('/employees/<int:id>', methods=['PUT'])
def update_employee(id):
    employee = Employee.query.get_or_404(id)
    data = request.get_json()
    employee.name = data['name']
    employee.position = data['position']
    employee.salary = data['salary']
    db.session.commit()
    return jsonify({'message': 'Employee updated successfully'})

@app.route('/employees/<int:id>', methods=['DELETE'])
def delete_employee(id):
    employee = Employee.query.get_or_404(id)
    db.session.delete(employee)
    db.session.commit()
    return jsonify({'message': 'Employee deleted successfully'})

if __name__ == '__main__':
    app.run(debug=True)
