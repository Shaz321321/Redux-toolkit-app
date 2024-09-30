import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  students: [
    { id: 1, name: "Sheraz", email: "sheraz@gmail.com", rollNo: "1234", city: "Faisalabad", age: "31", class: "BSCS" },
    { id: 2, name: "Shahzad", email: "shahzad@gmail.com", rollNo: "1235", city: "Islamabad", age: "25", class: "BSCS" },
    { id: 3, name: "Ahmed", email: "ahmed@gmail.com", rollNo: "1236", city: "Lahore", age: "27", class: "BSCS" },
  ],
  currentStudent: null,
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    addStudent: (state, action) => {
      state.students.push({ ...action.payload, id: state.students.length + 1 });
    },
    updateStudent: (state, action) => {
      const { id, student } = action.payload;
      const index = state.students.findIndex(item => item.id === id);
      if (index !== -1) {
        state.students[index] = { ...state.students[index], ...student };
      }
      state.currentStudent = null;
    },
    deleteStudent: (state, action) => {
      state.students = state.students.filter(student => student.id !== action.payload);
    },
    setCurrentStudent: (state, action) => {
      state.currentStudent = action.payload;
    },
  },
});

export const { addStudent, updateStudent, deleteStudent, setCurrentStudent } = studentSlice.actions;
export default studentSlice.reducer;
