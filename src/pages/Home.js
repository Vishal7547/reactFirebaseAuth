import { useState, useEffect } from "react";
import "../styles/todo.css";
import { db } from "../firebase";
import {
  collection,
  getDoc,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  doc,
} from "firebase/firestore";

const Home = ({ user }) => {
  const [text, setText] = useState("");
  const [check, setCheck] = useState(false);
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  async function handleAdd() {
    // console.log("list is:", text);
    try {
      const docRef = await addDoc(collection(db, "todos"), {
        list: text,
        check: false,
        createdAt: new Date(),
        userNmae: user,
      });
      alert("task added successfully");
      setText("");
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  useEffect(() => {
    setName(user);
  }, [user]);

  useEffect(() => {
    async function getData() {
      const querySnapshot = await getDocs(collection(db, "todos"));
      const lists = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setData(lists);
    }
    getData();
  }, [data]);

  // delete function
  const handleDelete = async (id) => {
    const userDocs = doc(db, "todos", id);
    await deleteDoc(userDocs);
    alert("task deleted successfully");
  };
  // update function
  const handleComplete = async (id, check) => {
    const userDoc = doc(db, "todos", id);
    await updateDoc(userDoc, {
      check: check,
    });
    alert("task completed successfully");
  };

  return (
    <div className="todoListCon">
      <div className="title">
        <h1>Hii {name}</h1>
      </div>
      <div className="innerTodo">
        <div className="upperDiv">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="list..."
            required
          />
          <button onClick={handleAdd}>ADD</button>
        </div>
        <div className="mainList">
          {data.map((x, index) => {
            return (
              <div className="addList" key={index}>
                <span>
                  <input
                    type="checkbox"
                    onChange={() => {
                      handleComplete(x.id, true);
                    }}
                    checked={check}
                  />
                </span>
                <span>{x.list}</span>
                <span
                  onClick={() => {
                    handleDelete(x.id);
                  }}
                >
                  <i class="bi bi-trash3-fill"></i>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;

// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/Vishal7547/reactFirebaseAuth.git
// git push -u origin main
