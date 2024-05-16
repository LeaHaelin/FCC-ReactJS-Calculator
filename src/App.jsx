import React, { useState } from "react";
import "./style.css";

function App() {
  const [display, setDisplay] = useState(""); //to display what user clicked on the screen.
  const [currentNum, setCurrentNum] = useState(""); // to check the number input
  const [prevNum, setPrevNum] = useState(""); // to save the num that is already displayed
  const [operator, setOperator] = useState(""); // to check the operator input
  const [result, setResult] = useState(""); // to save the result of calculation.

  const numHandler = (num) => {
    //when user clicks the number button, it will display and save the number.
    setDisplay(display == 0 ? num : display + num); // if display is 0, display clicked number or put the number after previous display.
    setCurrentNum(currentNum + num);
    //if "-" comes after operation or the first input is "-", the number is negative.
    if (display === "-" && (operator || currentNum === "")) {
      setDisplay(display + num);
      setCurrentNum(display + num);
    }
  };

  const operatorHandler = (op) => {
    console.log("opH", op, "curr", currentNum, "prev", prevNum);
    if (result) {
      setOperator(op);
      setCurrentNum("");
      setPrevNum(result);
      setResult("");
      setDisplay(result + op);
    }
    //  else if (operator.length >= 1) {
    //   setResult(equalHandler);
    //   setOperator(op); //to save the clicked operator.
    //   setDisplay(display == 0 ? op : display + op); //to display on the screen.
    //   setCurrentNum(""); //to reset the current number after an operator.
    //   setPrevNum(result); //to save the previous number before an operator.
    // }
    else {
      setOperator(op); //to save the clicked operator.
      setDisplay(display == 0 ? op : display + op); //to display on the screen.
      setCurrentNum(""); //to reset the current number after an operator.
      setPrevNum(currentNum); //to save the previous number before an operator.
    }
  };

  const decimalCheckHandler = () => {
    if (!currentNum.includes(".")) {
      setDisplay(display + ".");
      setCurrentNum(currentNum + ".");
    } else if (currentNum.includes(".")) {
      setCurrentNum(currentNum + "");
      setDisplay(display + "");
    }
  };
  const deleteHandler = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
      setCurrentNum(display.slice(0, -1));
    } else {
      setDisplay("");
    }
  };
  const clearHandler = () => {
    setDisplay("0"); // for test case 7
    setResult("");
    setCurrentNum("");
    setPrevNum("");
    setOperator("");
  };

  const equalHandler = () => {
    switch (operator) {
      case "+":
        setResult(Number(prevNum) + Number(currentNum));
        break;
      case "-":
        setResult(Number(prevNum) - Number(currentNum));
        break;
      case "x":
        setResult(Number(prevNum) * Number(currentNum));
        break;
      case "/":
        setResult(Number(prevNum) / Number(currentNum));
        break;
      default:
        return;
    }
  };

  return (
    <>
      <div className="calculator">
        <div className="screen" id="display">
          {result ? result : display}
        </div>
        <div className="keypad">
          <button className="key 7" id="seven" onClick={() => numHandler("7")}>
            7
          </button>
          <button className="key 8" id="eight" onClick={() => numHandler("8")}>
            8
          </button>
          <button className="key 9" id="nine" onClick={() => numHandler("9")}>
            9
          </button>
          <button className="key del" id="del" onClick={deleteHandler}>
            DEL
          </button>
          <button className="key 4" id="four" onClick={() => numHandler("4")}>
            4
          </button>
          <button className="key 5" id="five" onClick={() => numHandler("5")}>
            5
          </button>
          <button className="key 6" id="six" onClick={() => numHandler("6")}>
            6
          </button>
          <button
            className="key plus"
            id="add"
            onClick={() => operatorHandler("+")}
          >
            +
          </button>
          <button className="key 1" id="one" onClick={() => numHandler("1")}>
            1
          </button>
          <button className="key 2" id="two" onClick={() => numHandler("2")}>
            2
          </button>
          <button className="key 3" id="three" onClick={() => numHandler("3")}>
            3
          </button>
          <button
            className="key subtract"
            id="subtract"
            onClick={() => operatorHandler("-")}
          >
            -
          </button>
          <button
            className="key decimal"
            id="decimal"
            onClick={() => {
              numHandler("."), decimalCheckHandler(".");
            }}
          >
            .
          </button>
          <button className="key 0" id="zero" onClick={() => numHandler("0")}>
            0
          </button>
          <button
            className="key divide"
            id="divide"
            onClick={() => operatorHandler("/")}
          >
            /
          </button>
          <button
            className="key multiply"
            id="multiply"
            onClick={() => operatorHandler("x")}
          >
            x
          </button>
          <button className="key ac" id="clear" onClick={clearHandler}>
            AC
          </button>
          <button className="key equal" id="equals" onClick={equalHandler}>
            =
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
