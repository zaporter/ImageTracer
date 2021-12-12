import React from 'react'
function PointList(props){
    const [mode, setMode] = React.useState("csv")
    const pstyle={margin:0};
    return (
        <div>
            {props.points.map(point=>{
            switch(mode){
                case "csv":
                    return (<p style={pstyle}>{point[0]},{point[1]}</p>);
                case "python":
                    return (<p style={pstyle}>[{point[0]},{point[1]}],</p>);
                case "java":
                    return (<p style={pstyle}>&#123;{point[0]},{point[1]}&#125;,</p>);

                default:
                    console.log("ah shit");
            }
            })}
            <p>Point format:</p>
            <button onClick={()=>setMode("csv")}>csv</button>
            <button onClick={()=>setMode("python")}>square bracket array</button>
            <button onClick={()=>setMode("java")}>curly bracket array</button>
            </div>
    );

}

export default PointList;
