import { ReactNode, useRef, useState } from "react";

type DraggableProps = {
  children: ReactNode;
  whiteListClasses?: string[];
};

function DraggableScroll(props: DraggableProps) {
  const ourRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const mouseCoords = useRef({
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0,
  });

  const handleDragStart = (e: any) => {
    if (!ourRef.current) return;
    if (
      props.whiteListClasses &&
      !props.whiteListClasses.includes(e.target.className)
    )
      return;

    const slider = ourRef.current.children[0];
    //@ts-ignore
    const startX = e.pageX - slider.offsetLeft;
    //@ts-ignore
    const startY = e.pageY - slider.offsetTop;
    const scrollLeft = slider.scrollLeft;
    const scrollTop = slider.scrollTop;
    mouseCoords.current = { startX, startY, scrollLeft, scrollTop };
    setIsMouseDown(true);
  };

  const handleDragEnd = () => {
    setIsMouseDown(false);
    if (!ourRef.current) return;
  };

  const handleDrag = (e: any) => {
    if (!isMouseDown || !ourRef.current) return;
    e.preventDefault();
    const slider = ourRef.current.children[0];
    //@ts-ignore
    const x = e.pageX - slider.offsetLeft;
    //@ts-ignore
    const y = e.pageY - slider.offsetTop;
    const walkX = (x - mouseCoords.current.startX) * 1.5;
    const walkY = (y - mouseCoords.current.startY) * 1.5;
    slider.scrollLeft = mouseCoords.current.scrollLeft - walkX;
    slider.scrollTop = mouseCoords.current.scrollTop - walkY;
  };
  
  return (
    <div
      style={{ display: "contents" }}
      ref={ourRef}
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onMouseMove={handleDrag}
    >
      {props.children}
    </div>
  );
}

export default DraggableScroll;
