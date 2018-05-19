import React from 'react';
import '../styles/Sandbox.css';

class Sandbox extends React.Component {
    state = {
      value: "Home",
    };

    componentDidMount() {
      const canvas = this.refs.canvas
      const ctx = canvas.getContext("2d")
      document.addEventListener("click", this.handleInput)
    }

    componentWillUnmount() {
      document.removeEventListener("nv-enter", this.handleInput);
    }

    handleInput = () => {
      alert("hello!");
    }
  
    render() {
      return (
        <div>
          <canvas style={{ border: 2 }} ref="canvas" width={480} height={300} />
        </div>
      );
    }
  }
export default Sandbox;