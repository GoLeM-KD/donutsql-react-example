import { useState } from "react";
import { connectDatabase } from "../lib/db";
import { DonutTypes } from "donutsql";
import "./Procedure.css";

export default function Procedure() {
  const [executeResult, setExecuteResults] = useState([]);
  const [procedureDetails, setProcedureDetails] = useState({
    studentID: "",
    subjectID: "",
  });
  /*
      Theres the use of execute function with parameters and 
      Without parameters.
  */

  // Without paramters
  const executeWithoutParams = async () => {
    try {
      const pool = await connectDatabase(); // connect the database
      /*
        Stored procedure script:
            CREATE PROCEDURE get_names_of_students_and_their_subjects
            AS
            BEGIN
                SET NOCOUNT ON;
                SELECT stud.name AS student_Name,
                        sub.name AS subject_Name
                FROM student AS stud
                INNER JOIN user_subject AS us
                ON us.studentID = stud.id
                INNER JOIN subject AS sub
                ON us.subjectID = sub.subjectID;
            END;
      */

      // You can execute a stored procedure using the execute function as shown below.
      const result = await pool.execute(
        "get_names_of_students_and_their_subjects",
      );
      // ex:- execute(procedure_name)
      setExecuteResults(result.result.recordset);

      alert("SUCCESSFULLY EXECUTED!");
    } catch (err) {
      console.log("PROCEDURE WITHOUT PARAMS ERROR...\n", err);
    }
  };

  // With parameters
  const executeWithParams = async () => {
    try {
      const pool = await connectDatabase();
      /*
        stored procedure script:
            CREATE PROCEDURE insert_students_subjects
                @sid INT ,
                @subid INT 
            AS
            BEGIN
                SET NOCOUNT ON;
                INSERT INTO user_subject (studentID, subjectID) VALUES (@sid, @subid);
            END;
      */

      // Here, I have used two parameters named sid and subid.
      await pool.execute("insert_students_subjects", {
        sid: {
          type: DonutTypes.Int(),
          value: procedureDetails.studentID,
        },
        subid: {
          type: DonutTypes.Int(),
          value: procedureDetails.subjectID,
        },
      });
      /*
        1. When using parameters, you mainly need to provide two properties: 
            the type and the value. 
        
            To define the data type of a parameter, you must import the 
            DonutTypes class and then use the appropriate type function. 
        
            Examples: 
                DonutTypes.Int() 
                DonutTypes.NvarChar() 
        
        2. Make sure the property names match the parameter names in 
            the stored procedure and are defined in the correct order.

            Example: 
                The stored procedure above has two parameters: sid and subid, 
                in that order.
                
                The property names below use the same names as the stored
                procedure parameters and are defined in the same order.
      */
      alert("PROCEDURE EXECUTED SUCCESSFULLY!");
    } catch (err) {
      console.log("PROCEDURE WITH PARAMS ERROR...\n", err);
    }
  };
  return (
    <div className="mainDiv">
      <div className="insertDiv">
        <p>Insert into user_subject through the procedure</p>
        <input
          type="text"
          placeholder="StudentID to insert user_subject"
          value={procedureDetails.studentID}
          onChange={(e) =>
            setProcedureDetails((prev) => ({
              ...prev,
              studentID: e.target.value,
            }))
          }
        />
        <input
          type="text"
          placeholder="subjectID to insert user_subject"
          value={procedureDetails.subjectID}
          onChange={(e) =>
            setProcedureDetails((prev) => ({
              ...prev,
              subjectID: e.target.value,
            }))
          }
        />
        <button type="button" onClick={executeWithParams}>
          Execute
        </button>
      </div>
      {/* Execute procedure without parameters */}
      <div>
        <button type="button" onClick={executeWithoutParams}>
          Execute without parameters
        </button>
        {executeResult.length > 0 && (
          <table>
            <thead>
              <tr>
                {Object.keys(executeResult[0]).map((column, idx) => (
                  <th key={idx}>{column}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {executeResult.map((res, idx) => (
                <tr key={idx}>
                  {Object.keys(executeResult[0]).map((colName, cidx) => (
                    <td key={cidx}>{res[colName]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
