export default function TableItem({ item, onClickUpdateHandler, onClickDeleteHandler }) {
    return (
      <tr>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.rollNo}</td>
        <td>{item.city}</td>
        <td>{item.age}</td>
        <td>{item.class}</td>
        <td>
  <button onClick={() => onClickUpdateHandler(item)}>Update</button>
  <button className="delete" onClick={() => onClickDeleteHandler(item.id)}>Delete</button>
        </td>
      </tr>
    );
  }
  