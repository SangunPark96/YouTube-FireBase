import { useState, useEffect } from "react";
import './Comments.css';
import { AiOutlineUser } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { v1 as generateUniqueID } from "uuid";
import { db } from "../../firebase-config";
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from "firebase/firestore";

export default function Comments({ allComments, setAllComments }) {
    const initialComment = {
        commenter: "",
        text: ""
    }

    const initialInput = {
        commenter: false,
        text: false
    }
    
    const [validInput, setValidInput] = useState(initialInput);
    const [visibility, setVisibility] = useState(false);
    const [comment, setComment] = useState(initialComment);
    const [actionsToggle, setActionsToggle] = useState(false);
    const commentsRef = collection(db, "comments");


    function handleInput(event) {
        setComment({...comment, [event.target.id]: event.target.value });
        // Check
        if (event.target.value !== "") {
            setValidInput({...validInput, [event.target.id]: true });
        } else {
            setValidInput({...validInput, [event.target.id]: false });
        }
    }

    useEffect(() => {
        const queryComments = query(
          commentsRef,
          orderBy("createdAt")
        );
        const unsubscribe = onSnapshot(queryComments, (snapshot) => {
          let comments = [];
          snapshot.forEach((doc) => {
            comments.push({ ...doc.data(), id: doc.id });
          });
          setComment(comments);
        });
    
        return () => unsubscribe();
      }, []);

    const handleSubmit = async (event)  => {
        event.preventDefault();
        if (!validInput.commenter || !validInput.text) {
            return
        }
        await addDoc(commentsRef, {
            text: comment,
            createdAt: serverTimestamp()
          });
        setAllComments([...allComments, comment]);
        setComment(initialComment);
        setValidInput(initialInput);
    }

    function toggleComments(event) {
        if (event.target.id === "text") {
            setVisibility(true);
        } else {
            setVisibility(false);
        }
    }

    function toggleActions() {
        setActionsToggle(!actionsToggle);
    }

    return (
        <div className='commentsDiv'>
            <form id="commentsForm" onSubmit={handleSubmit} noValidate>
                {visibility && <input type="text" onChange={handleInput} id="commenter" value={comment.commenter} placeholder="Name" />}
                <input  onClick={toggleComments} onChange={handleInput} id="text" className='addComment' type="text" placeholder="Add a comment..." value={comment.text} />
                <span className='focus-border'></span>
                {visibility && 
                    <div className="commentButtonsDiv">
                        <button onClick={toggleComments} className="cancelButton">Cancel</button>
                        <input 
                            type="submit"
                            value="Comment" 
                            id="submitComment"  
                            style={{
                                background: (validInput.text && validInput.commenter) ? '#4caf50' : '#EFEFEF', 
                                color: (validInput.text && validInput.commenter) ? 'white' : 'black', 
                                cursor: (validInput.text && validInput.commenter) ? 'pointer' : 'auto'
                            }}
                        />
                    </div>
                                }
                                </form>
                                <div>
                                    {allComments.map(comment => {
                                        return (
                                            <div key={generateUniqueID()} className="commentsSectionDiv">
                                                <div className="commentsSection">
                                                    <AiOutlineUser  className="userIcon" size={25} />
                                                    <span className="commentsSection-commenter">{comment.commenter}</span>
                                                    <li className="commentsSection-text">{comment.text}</li>
                                                    <BiDotsVerticalRounded size={25} onClick={toggleActions} style={{cursor: 'pointer'}} className="commentsActionsToggle" />
                                                </div>
                                                {actionsToggle &&
                                                    <div className="actionsDiv">
                                                        <span className="actionEdit"><MdEdit/>Edit</span>
                                                        <span className="actionDelete"><RiDeleteBin5Fill />Delete</span> 
                                                    </div>
                                                }
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    }