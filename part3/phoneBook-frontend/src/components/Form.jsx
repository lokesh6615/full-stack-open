const Form = ({
  setNewName,
  setNewPhoneNo,
  addPerson,
  newName,
  newPhoneNo,
}) => {
  return (
    <div>
      <div>
        <b>Add a new</b>
      </div>

      <form onSubmit={addPerson}>
        <div>
          <p>
            name:
            <input
              type="text"
              onChange={(e) => setNewName(e.target.value)}
              value={newName}
            />
          </p>
          <p>
            Phone Number:
            <input
              type="number"
              onChange={(e) => setNewPhoneNo(String(e.target.value))}
              value={newPhoneNo}
            />
          </p>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};
export default Form;
