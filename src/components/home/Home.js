import AddStudent from '../addStudent/addStudent';
import TableItem from '../tableItem/TableItem';
import { useSelector, useDispatch } from 'react-redux';
import { addStudent, updateStudent, deleteStudent, setCurrentStudent } from '../../store/slices/studentSlice';
export default function Home() {
  const students = useSelector((state) => state.student.students); // Access students from Redux store
  const currentStudent = useSelector((state) => state.student.currentStudent); // Access current student
  const dispatch = useDispatch();

  const onClickUpdateHandler = (student) => {
    dispatch(setCurrentStudent(student)); // Set the current student in state
  };

  const onClickDeleteHandler = (id) => {
    dispatch(deleteStudent(id)); // Dispatch delete action
  };

  const onUpdateHandler = (student, id) => {
    dispatch(updateStudent({ student, id })); // Dispatch update action
  };

  const onAddHandler = (student) => {
    dispatch(addStudent(student)); // Dispatch add action
  };

  return (
    <div className="container">
      <AddStudent currentStudent={currentStudent} onAddHandler={onAddHandler} onUpdateHandler={onUpdateHandler} 
       existingStudents={students}/>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Roll No</th>
            <th>City</th>
            <th>Age</th>
            <th>Class</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((item) => (
<TableItem  key={item.id} item={item}  onClickUpdateHandler={onClickUpdateHandler} onClickDeleteHandler={onClickDeleteHandler} 
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
