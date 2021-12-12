import styles from './ImageHolder.module.css';
function Point(props){
    function onContextMenu(event){
        event.preventDefault();
        props.deleteHandle();
    }
return (
     <div 
        className={styles.point}
        style={{
            top:props.y,
            left:props.x
        }}
         onContextMenu={onContextMenu}
        />
);
}
export default Point;
