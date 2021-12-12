import React from "react";
import Point from './Point.js'
import PointList from './PointList.js'
import styles from './ImageHolder.module.css';
function ImageHolder() {
    const [pimage, setImage] = React.useState(null);
    const [showImage, setShowImage] = React.useState(false);
    const [width, setWidth] = React.useState(0);
    const [height, setHeight] = React.useState(0);
    const [pointLocs, setPointLocs] = React.useState([]);
    function fileSelected(event){
        let image = event.target.files[0];
        setImage(URL.createObjectURL(image));
        setShowImage(true);
        setPointLocs([]);
    }
    function imageOnload(event){
        setWidth(event.target.width);
        setHeight(event.target.height);
    }
    function imageOnClick(event){
        let absX = event.pageX;
        let absY = event.pageY;
        let offX = event.target.offsetLeft;
        let offY = event.target.offsetTop;
        let x = absX-offX;
        let y = absY-offY;

        setPointLocs(pointLocs.concat([[x,y]]));
        console.log("("+x+","+y+")");
    }
    function deletePoint(x,y){
        let pts = [];
        for (let i =0; i<pointLocs.length; i++){
            if (pointLocs[i][0]!==x || pointLocs[i][1]!==y){
                pts.push(pointLocs[i]);
            }
        }
        setPointLocs(pts);
    }
    return (
        <div className={styles.mainwrapper}>
            <div style={{margin:10}}>
            <label>
                <input type="file" accept="image/*" onChange={fileSelected}/>
            </label>
            {showImage && (
                <div>
                    <div className={styles.pointContainer}>
                    {pointLocs.map(point => 
                    <Point x={point[0]-3} y={point[1]-3} deleteHandle={()=>deletePoint(point[0],point[1])}/>
                        )}
                    {[...Array(pointLocs.length).keys()].map(index => { 
                        if (index===0){
                            return(<div/>);
                        }
                        let thisx = pointLocs[index][0];
                        let thisy = pointLocs[index][1];
                        let prevx = pointLocs[index-1][0];
                        let prevy = pointLocs[index-1][1];
                        let dx = thisx-prevx;
                        let dy = thisy-prevy;
                        let dist = Math.sqrt(dx*dx+dy*dy);
                        let angle = Math.atan2(dy, dx);
                        let angleDeg = angle*57.28;
                        let circOffY = (dist/2)*Math.sin(angle+3.14);
                        let circOffX = (dist/2)*Math.cos(angle+3.14);
                        let posy = prevy-circOffY - 10;
                        let posx = prevx-circOffX-(dist/2)-1;

                        return  (<hr
                            className={styles.line}
                            style={{
                                top:posy,
                                left:posx,
                                width:dist,
                                transform: 'rotate('+angleDeg+'deg)'
                            }}
                            />)}
                           
                    )}
                    </div>
                    <img 
                    src={pimage} 
                    onLoad={imageOnload} 
                    alt="No visible file"
                    onClick={imageOnClick}
                    />
                    <br/>
                    <button onClick={()=>setPointLocs([])}>clear all points</button>
                </div>
            )}
            <p> Dimensions: {width} x {height} </p>
            <p>Pixel locations of selected points:</p>
            <PointList points={pointLocs}/>
        </div>
        </div>
   );
}

export default ImageHolder;
