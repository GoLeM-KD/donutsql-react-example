import { useEffect, useState } from "react";
import { connectDatabase } from "../lib/db";
import { DonutTypes } from "donutsql";
import "./Home.css";
/*
    Theres the use of query function with parameters and 
    Without parameters.
*/
export default function Home() {
  const [results, setResults] = useState([]);
  const [studentDetails, setStudentDetails] = useState({
    name: "",
    age: "",
    address: "",
  });

  // Without parameters
  const getStudents = async () => {
    try {
      const pool = await connectDatabase(); // connect to database
      const results = await pool.query("SELECT * FROM student"); // You can call the query function without any parameter like this
      // ex:- query('your query')
      setResults(results.result.recordset);
    } catch (err) {
      console.log("GET STUDENT ERROR...", err);
    }
  };

  useEffect(() => {
    const fetchStudents = async () => {
      await getStudents();
    };

    fetchStudents();
  }, []);

  // insertStudent() and deleteStudent(id) functions are for examples of query function with parameters
  const insertStudent = async () => {
    try {
      const pool = await connectDatabase();
      // Here, I have used three parameters: param1, param2, and param3.
      await pool.query(
        "INSERT INTO student (name, age, address) VALUES (@param1, @param2, @param3)",
        {
          param1: {
            type: DonutTypes.VarChar(),
            value: studentDetails.name,
          },
          param2: {
            type: DonutTypes.Int(),
            value: studentDetails.age,
          },
          param3: {
            type: DonutTypes.Text(),
            value: studentDetails.address,
          },
        },
      );
    /* 
        1. When using parameters, you mainly need to provide two properties: 
            the type and the value. 
        
            To define the data type of a parameter, you must import the 
            DonutTypes class and then use the appropriate type function. 
        
            Examples: 
                DonutTypes.Int() 
                DonutTypes.NvarChar() 
        
        2. Make sure you use the same name for the property name as the 
            parameter name when defining its type and value. 
        
            For example, if you use "param1" as the parameter name,
            the property name must also be "param1". 
    */
      await getStudents();
      alert("INSERTED!");
    } catch (err) {
      console.log("INSERT STUDENT ERROR...", err);
    }
  };

  const deleteStudent = async (id) => {
    try {
        const pool = await connectDatabase();
        await pool.query("DELETE FROM student WHERE id = @sid", {
            sid: {
                type: DonutTypes.Int(),
                value: id
            }
        });
        await getStudents();
        alert("DELETED!");
    } catch (err) {
        console.log("DELETE STUDENT ERROR...",err);
    }
  }
  return (
    <div>
      <h1>DonutSQL - React Example</h1>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>age</th>
            <th>address</th>
          </tr>
        </thead>
        <tbody>
          {results?.map((res, idx) => (
            <tr key={idx} onClick={() => deleteStudent(res.id)}>
              <td>{res.id}</td>
              <td>{res.name}</td>
              <td>{res.age}</td>
              <td>{res.address}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <form>
        <p>Insert into student table</p>
        <input
          type="text"
          placeholder="Student Name"
          value={studentDetails.name}
          onChange={(e) =>
            setStudentDetails((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <input
          type="text"
          placeholder="Student Age"
          value={studentDetails.age}
          onChange={(e) =>
            setStudentDetails((prev) => ({ ...prev, age: e.target.value }))
          }
        />
        <input
          type="text"
          placeholder="Student Address"
          value={studentDetails.address}
          onChange={(e) =>
            setStudentDetails((prev) => ({ ...prev, address: e.target.value }))
          }
        />
        <button type="button" onClick={insertStudent}>Insert</button>
      </form>
    </div>
  );
}
