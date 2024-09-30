import { useState, useEffect } from 'react';
import * as yup from "yup";

export default function AddStudent({ currentStudent, onAddHandler, onUpdateHandler,existingStudents }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [city, setCity] = useState('');
  const [age, setAge] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentStudent) {
      setName(currentStudent.name);
      setEmail(currentStudent.email);
      setRollNo(currentStudent.rollNo);
      setCity(currentStudent.city);
      setAge(currentStudent.age);
      setStudentClass(currentStudent.class);
    }
  }, [currentStudent]);

  let schema = yup.object().shape({
    name: yup.string().max(10).min(3).required(),
    email: yup.string().email().required()
    .test('is-unique', 'Email already exists', (value) => {
      if (!value) return true; // Skip if the value is empty
      const emailExists = existingStudents.some(student => student.email === value);
      return !emailExists || (currentStudent && currentStudent.email === value);
    }),
    rollNo: yup.string().required().typeError("Must be a number")
    .test('is-unique', 'Roll number already exists', (value) => {
      if (!value) return true; // Skip if the value is empty
      const rollNoExists = existingStudents.some(student => student.rollNo === value);
      return !rollNoExists || (currentStudent && currentStudent.rollNo === value);
    }),
    city: yup.string().required(),
    age: yup.number().required().typeError("Must be a number"),
    class: yup.string().required(),
  });

  const handleSubmit = async () => {
    const data = { name, email, rollNo, city, age, class: studentClass };
    
    try {
      await schema.validate(data);
      setError(''); 

      if (currentStudent) {
        onUpdateHandler(data, currentStudent.id);
      } else {
        onAddHandler(data);
      }
      clearFields();
    } catch (error) {
      console.log("error", error.toString());
      setError(error.toString());
    }
  };

  const clearFields = () => {
    setName('');
    setEmail('');
    setRollNo('');
    setCity('');
    setAge('');
    setStudentClass('');
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter Name" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Enter Email" />
      <input value={rollNo} onChange={(e) => setRollNo(e.target.value.toString())} type="text" placeholder="Enter Roll No" />
      <input value={city} onChange={(e) => setCity(e.target.value)} type="text" placeholder="Enter Your City" />
      <input value={age} onChange={(e) => setAge(e.target.value)} type="text" placeholder="Enter Your Age" />
      <input value={studentClass} onChange={(e) => setStudentClass(e.target.value)} type="text" placeholder="Enter Your Class" />
      <button onClick={handleSubmit}>{currentStudent ? 'Update Student' : 'Add Student'}</button>
    </div>
  );
}
