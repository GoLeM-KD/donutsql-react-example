import { useState } from "react";
import { connectDatabase } from "../lib/db";
import { DonutTypes } from "donutsql";
import "./Transaction.css";
/*
  Example for database transaction
*/
export default function Transaction() {
  const [transactionDetails, setTransactionDetails] = useState({
    studentTable: {
      name: "",
      age: "",
    },
    subjectTable: {
      subjectName: "",
      subjectId: "", // To Delete
    },
  });

  const doTransaction = async () => {
    try {
      const pool = await connectDatabase(); // Connecting the database
      /*
        after connecting the database you can call transaction function
        and you can do multiple transactions as below.
      */
      await pool.transaction((tx) => {
        tx.query(`INSERT INTO student(name, age) VALUES (@name, @age)`, {
          age: {
            type: DonutTypes.Int(),
            value: transactionDetails.studentTable.age,
          },
          name: {
            type: DonutTypes.NVarChar(),
            value: transactionDetails.studentTable.name,
          },
        });

        tx.query(`INSERT INTO subject(name) VALUES (@sub)`, {
          sub: {
            type: DonutTypes.Text(),
            value: transactionDetails.subjectTable.subjectName,
          },
        });

        tx.query(`DELETE FROM subject WHERE subjectID = @param`, {
          param: {
            type: DonutTypes.Int(),
            value: transactionDetails.subjectTable.subjectId,
          },
        });
      });

      alert("TRANSACTION SUCCESSFUL!");
    } catch (err) {
      console.log("TRANSACTION ERROR...", err);
    }
  };
  return (
    <div className="mainDiv">
      {/* Student Table */}
      <div>
        <p>Student</p>
        <input
          type="text"
          placeholder="Student Name"
          value={transactionDetails.studentTable.name}
          onChange={(e) =>
            setTransactionDetails((prev) => ({
              ...prev,
              studentTable: { ...prev.studentTable, name: e.target.value },
            }))
          }
        />

        <input
          type="text"
          placeholder="Student Age"
          value={transactionDetails.studentTable.age}
          onChange={(e) =>
            setTransactionDetails((prev) => ({
              ...prev,
              studentTable: { ...prev.studentTable, age: e.target.value },
            }))
          }
        />
      </div>
      {/* Subject Table */}
      <div>
        <p>Subject</p>
        <input
          type="text"
          placeholder="Subject Name to insert"
          value={transactionDetails.subjectTable.subjectName}
          onChange={(e) =>
            setTransactionDetails((prev) => ({
              ...prev,
              subjectTable: {
                ...prev.subjectTable,
                subjectName: e.target.value,
              },
            }))
          }
        />

        <input
          type="text"
          placeholder="Subject id to delete"
          value={transactionDetails.subjectTable.subjectId}
          onChange={(e) =>
            setTransactionDetails((prev) => ({
              ...prev,
              subjectTable: { ...prev.subjectTable, subjectId: e.target.value },
            }))
          }
        />
      </div>
      <button type="button" onClick={doTransaction}>
        Do Transaction
      </button>
    </div>
  );
}
